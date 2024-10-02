import { customerFormField } from "./models/customer-form-field.model";
import { CustomerFormFieldRepository } from "./customer-form-field.repository";
import { CustomerFormFieldInput, CreateCustomerFormFieldPayload } from "../graphql";
import { OwnerRepository } from "../owner/owner.repository";

export class CustomerService {
    constructor(
        private readonly customerFormFieldRepository: CustomerFormFieldRepository,
        private readonly ownerRepository: OwnerRepository
    ) {  }

    async createCustomerFormField(input: CustomerFormFieldInput, ownerAuthId: string): Promise<CreateCustomerFormFieldPayload> {
    
        const owner = await this.ownerRepository.findByAuthId(ownerAuthId);

        if(!owner) {
            throw new Error('Owner not found');
        }

        const newCustomerFormField = new customerFormField({
            id: '',
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
                id: ''
            }
        }
    }
}