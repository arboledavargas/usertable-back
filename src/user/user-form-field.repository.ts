import { userFormField } from "./models/user-form-field.model";
import { PrismaClientType } from "../common/db/prisma";

export class UserFormFieldRepository {
    constructor(
        private prisma: PrismaClientType
    ){  }

    private async create(formField: userFormField): Promise<userFormField> {
        const result = await this.prisma.userFormField.create({
            data: { 
                fieldName: formField.fieldName, 
                organizationid: formField.organizationId, 
                type: formField.type,
            }
        });

        return new userFormField({
            fieldName: result.fieldName,
            type: result.type,
            organizationId: result.organizationid,
            id: result.id,
        });
    }

    private async update(formField: userFormField): Promise<userFormField> {
        const result = await this.prisma.userFormField.update({
            where: {id: formField.id},
            data: {
                fieldName: formField.fieldName,
                type: formField.type
            }
        });

        return new userFormField({
            fieldName: result.fieldName,
            type: result.type,
            organizationId: result.organizationid,
            id: result.id,
        });
    }

    async save(model:userFormField): Promise<userFormField>{

        if(model.id) {
            return await this.create(model)
        } else {
            return await this.update(model)
        }
    }
}