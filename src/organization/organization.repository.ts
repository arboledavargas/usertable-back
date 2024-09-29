import { PrismaClient } from '@prisma/client'
import { Organization } from "./models/organization";

export class OrganizationRepository {
    constructor(private readonly prisma: PrismaClient) {

    }

    private async update(organization: Organization):Promise<Organization> {
        const result = await this.prisma.organization.update({
            where: { id: organization.id },
            data: { name: organization.name }
        });

        return new Organization({
            id: result.id,
            name: result.name
        });
    }

    private async create(organization: Organization):Promise<Organization> {
        const result = await this.prisma.organization.create({
            data: {
                name: organization.name
            }
        });

        return new Organization({
            id: result.id,
            name: result.name
        });
    }

    async save(organization: Organization): Promise<Organization> {
        if(organization.id){
            return await this.update(organization);
        } else {
            return await this.create(organization);
        }
    }
}