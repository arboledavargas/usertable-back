import { userFormField } from "/src/user/models/user-form-field.model.ts";
import { UserFormFieldRepository } from "/src/user/user-form-field.repository.ts";
import { UserFormFieldInput, CreateUserFormFieldPayload } from "/src/graphql.ts";

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