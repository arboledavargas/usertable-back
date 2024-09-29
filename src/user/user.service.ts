import { userFormField } from "./models/user-form-field.model";
import { UserFormFieldRepository } from "./user-form-field.repository";
import { UserFormFieldInput, CreateUserFormFieldPayload } from "../graphql";

export class UserService {
    constructor(
        private readonly userFormFieldRepository: UserFormFieldRepository
    ) {  }

    async createUserFormField(input: UserFormFieldInput): Promise<CreateUserFormFieldPayload> {
        
        const newUserFormField = new userFormField({
            id: '',
            fieldName: input.fieldName,
            type: input.type,
            organizationId: '1',
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