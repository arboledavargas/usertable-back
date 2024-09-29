import { userFormField } from "./models/user-form-field.model";
import { PrismaClientType } from "../common/db/prisma";

export class UserFormFieldRepository {
    constructor(
        private prisma: PrismaClientType
    ){  }

    async save(model:userFormField): Promise<userFormField>{
        const result = await this.prisma.userFormField.upsert({
            where: {id: model.id},
            update: {
                fieldName: model.fieldName,
                organizationId: model.organizationId,
                type: model.type
            },
            create: {
                fieldName: model.fieldName,
                organization: {
                    connectOrCreate: {
                        where: {id: model.organizationId},
                        create: {
                            name: "test organization",
                        }
                    }
                },
                type: model.type
            }
        });

        model.id = result.id;
        return model;
    }
}