import { customerFormField } from "./models/customer-form-field.model";
import { PrismaClientType } from "../common/db/prisma";

export class CustomerFormFieldRepository {
    constructor(
        private prisma: PrismaClientType
    ){  }

    private async create(formField: customerFormField): Promise<customerFormField> {
        const result = await this.prisma.userFormField.create({
            data: { 
                fieldName: formField.fieldName, 
                organizationid: formField.organizationId, 
                type: formField.type,
            }
        });

        return new customerFormField({
            fieldName: result.fieldName,
            type: result.type,
            organizationId: result.organizationid,
            id: result.id,
        });
    }

    private async update(formField: customerFormField): Promise<customerFormField> {
        const result = await this.prisma.userFormField.update({
            where: {id: formField.id},
            data: {
                fieldName: formField.fieldName,
                type: formField.type
            }
        });

        return new customerFormField({
            fieldName: result.fieldName,
            type: result.type,
            organizationId: result.organizationid,
            id: result.id,
        });
    }

    async save(model:customerFormField): Promise<customerFormField>{

        if(model.id) {
            return await this.create(model)
        } else {
            return await this.update(model)
        }
    }
}