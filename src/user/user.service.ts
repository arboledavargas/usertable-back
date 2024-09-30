import { userFormField } from "./models/user-form-field.model";
import { UserFormFieldRepository } from "./user-form-field.repository";
import { UserFormFieldInput, CreateUserFormFieldPayload } from "../graphql";
import { OwnerRepository } from "../owner/owner.repository";

export class UserService {
    constructor(
        private readonly userFormFieldRepository: UserFormFieldRepository,
        private readonly ownerRepository: OwnerRepository
    ) {  }

    async createUserFormField(input: UserFormFieldInput, ownerAuthId: string): Promise<CreateUserFormFieldPayload> {
    
        const owner = await this.ownerRepository.findByAuthId(ownerAuthId);

        if(!owner) {
            throw new Error('Owner not found');
        }

        const newUserFormField = new userFormField({
            id: '',
            fieldName: input.fieldName,
            type: input.type,
            organizationId: owner.organization.id,
        });

        await this.userFormFieldRepository.save(newUserFormField);

        return {
            success: true,
            message: null,
            userFormField: {
                fieldName: input.fieldName,
                type: input.type,
                id: ''
            }
        }
    }
}