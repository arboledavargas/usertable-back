// @ts-types="npm:@types/luxon"
import { DateTime } from "luxon";
import {
  CreateCustomerFormFieldPayload,
  CreateCustomerPayload,
  Customer as gqlCustomer,
  CustomerConnection,
  CustomerEdge,
  CustomerFormField,
  CustomerFormFieldInput,
  CustomerInput,
  OrderDirection,
  PaginationDirection,
  QueryFilterCustomersArgs,
} from "../graphql.ts";
import { UserRepository } from "../user/user.repository.ts";
import { CustomerFormFieldRepository } from "./customer-form-field.repository.ts";
import { CustomerRepository } from "./customer.repository.ts";
import { Customer } from "./models/customer.ts";
import { customerFormField } from "./models/customer-form-field.ts";
import { fromPairs } from "@es-toolkit/es-toolkit/compat";
import { decodeBase64, encodeBase64 } from "@std/encoding/base64";
import {
  DeleteCustomerPayload,
  UpdateCustomerInput,
  UpdateCustomerPayload,
} from "../graphql.ts";

export class CustomerService {
  constructor(
    private readonly customerFormFieldRepository: CustomerFormFieldRepository,
    private readonly userRepository: UserRepository,
    private readonly customerRepository: CustomerRepository,
  ) {}

  async deleteCustomers(
    userIds: string[],
  ): Promise<DeleteCustomerPayload> {
    await this.customerRepository.deleteCustomers(userIds);
    return {
      success: true,
    };
  }

  private createCursor = (customer: Customer, fieldName?: string) => {
    const fieldValue: string | Date = fieldName
      ? customer.properties[fieldName] as string
      : customer.createDate;

    if (!fieldValue) {
      throw new Error("Field value not found for field name: " + fieldName);
    }

    const cursorStringValue = fieldValue instanceof Date
      ? fieldValue.toISOString()
      : fieldValue;

    return encodeBase64(cursorStringValue);
  };

  private decodeCursor = (cursor: string): string => {
    return new TextDecoder().decode(decodeBase64(cursor));
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

    const formFields = await this.customerFormFieldRepository
      .findByOrganizationId(
        currentUser.organization.id,
      );

    const newCustomer = new Customer({
      _id: "",
      organization: {
        id: currentUser.organization.id,
        name: currentUser.organization.name,
      },
      createDate: DateTime.now().toUTC().toJSDate(),
      properties: fromPairs(
        input.properties.map(({ customerFormFieldId, value }) => {
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
            value,
          ];
        }),
      ),
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
        value: decodedCursor ?? DateTime.now().toUTC().toJSDate().toISOString(),
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

    if (!customer) {
      throw new Error("Customer not found");
    }

    return customer.serialize();
  }

  async updateCustomer(
    customerId: string,
    input: UpdateCustomerInput,
  ): Promise<UpdateCustomerPayload> {
    const customer = await this.customerRepository.findCustomerById(customerId);

    if (!customer) {
      throw new Error("Customer not found");
    }

    const properties = Object.fromEntries(
      input.properties.map(({ name, value }) => [name, value]),
    );

    customer.update(properties);

    await this.customerRepository.save(customer);

    return {
      success: true,
      customer: customer.serialize(),
    };
  }
}
