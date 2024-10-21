import { DateTime } from "luxon";
import {
  CreateCustomerFormFieldPayload,
  CreateCustomerPayload,
  CustomerConnection,
  CustomerEdge,
  CustomerFormField,
  CustomerFormFieldInput,
  CustomerInput,
  OrderDirection,
  QueryFilterCustomersArgs,
  PaginationDirection,
  Customer as gqlCustomer
} from "../graphql";
import { UserRepository } from "../user/user.repository";
import { CustomerFormFieldRepository } from "./customer-form-field.repository";
import { CustomerRepository } from "./customer.repository";
import { Customer } from "./models/customer";
import { customerFormField } from "./models/customer-form-field";
import { fromPairs } from 'lodash';


export class CustomerService {

  constructor(
    private readonly customerFormFieldRepository: CustomerFormFieldRepository,
    private readonly userRepository: UserRepository,
    private readonly customerRepository: CustomerRepository,
  ) {}

  private createCursor = (customer: Customer, fieldName?: string) => {
    const fieldValue = fieldName
      ? customer.properties[fieldName]
      : customer.createDate;

    if (!fieldValue) {
      throw new Error("Field value not found for field name: " + fieldName);
    }

    const cursorStringValue =
      fieldValue instanceof Date ? fieldValue.toISOString() : fieldValue;

    return Buffer.from(cursorStringValue).toString("base64");
  };

  private decodeCursor = (cursor: string): string => {
    return Buffer.from(cursor, "base64").toString("utf8");
  };

  async createCustomerFormField(
    input: CustomerFormFieldInput,
    ownerAuthId: string,
  ): Promise<CreateCustomerFormFieldPayload> {
    const owner = await this.userRepository.findByAuthId(ownerAuthId);

    if (!owner) {
      throw new Error("Owner not found");
    }

    const newCustomerFormField = new customerFormField({
      _id: "",
      fieldName: input.fieldName,
      type: input.type,
      organizationId: owner.organization.id,
    });

    await this.customerFormFieldRepository.save(newCustomerFormField);

    return {
      success: true,
      message: null,
      customerFormField: {
        fieldName: input.fieldName,
        type: input.type,
        id: "",
      },
    };
  }

  async getCustomerFormFields(userId: string): Promise<CustomerFormField[]> {
    const owner = await this.userRepository.findByAuthId(userId);

    if (!owner) {
      throw new Error("Owner not found");
    }

    const result = await this.customerFormFieldRepository.findByOrganizationId(
      owner.organization.id,
    );

    return result.map((item) => item.serialize());
  }

  async createCustomer(
    input: CustomerInput,
    userId: string,
  ): Promise<CreateCustomerPayload> {
    const currentUser = await this.userRepository.findByAuthId(userId);

    if (!currentUser) {
      throw new Error("Owner not found");
    }

    const formFields =
      await this.customerFormFieldRepository.findByOrganizationId(
        currentUser.organization.id,
      );

    const newCustomer = new Customer({
      _id: "",
      organization: {
        id: currentUser.organization.id,
        name: currentUser.organization.name,
      },
      createDate: DateTime.now().toUTC().toJSDate(),
      properties: fromPairs(input.properties.map(({customerFormFieldId, value}) => {
        const formField = formFields.find(
          (field) => customerFormFieldId == field.id,
        );

        if (!formField) {
          throw new Error(
            "Form field not found with id: " +
              customerFormFieldId,
          );
        }

        return [
            formField.fieldName,
            value
        ]
      })),
    });

    await this.customerRepository.save(newCustomer);

    return {
      success: true,
      customer: newCustomer.serialize(),
    };
  }

  async filterCustomers(
    { filters, cursor, direction, take, orderBy }: QueryFilterCustomersArgs,
    userId: string,
  ): Promise<CustomerConnection> {
    const decodedCursor = cursor ? this.decodeCursor(cursor) : undefined;

    const currentUser = await this.userRepository.findByAuthId(userId);

    if (!currentUser) {
      throw new Error("User not found");
    }

    const page = await this.customerRepository.filterCustomers({
      cursor: {
        field: orderBy?.field ?? "createDate",
        value: decodedCursor ?? DateTime.now().toUTC().toJSDate(),
      },
      filters: filters,
      order: orderBy ? orderBy.direction : OrderDirection.Desc,
      paginationDirection: direction ?? PaginationDirection.Forward,
      organizationId: currentUser.organization.id,
      take: take ?? 100,
    });

    const edges: CustomerEdge[] = page.map((customer) => {
      return {
        cursor: this.createCursor(customer, orderBy?.field),
        node: customer.serialize(),
      };
    });

    return {
      edges,
    };
  }

  async getCustomerById(id: string): Promise<gqlCustomer> {
     const customer = await this.customerRepository.findCustomerById(id);

     if(!customer) {
        throw new Error("Customer not found");
     }

     return customer.serialize();
  }
}
