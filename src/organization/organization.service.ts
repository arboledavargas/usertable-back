import { OrganizationRepository } from "./organization.repository";
import { Organization } from "./models/organization";
import { OrganizationInput, CreateOrganizationPayload } from "../graphql";
import { OwnerRepository } from "../owner/owner.repository";
import { Owner } from "../owner/models/owner";

export class OrganizationService {
    constructor(
        private readonly organizationRepository: OrganizationRepository,
        private readonly ownerRepository: OwnerRepository
    ){ }

    async createOrganization(input: OrganizationInput, owner: { name: string, email: string, authId: string }): Promise<CreateOrganizationPayload>{

        const newOrganization = new Organization({
            id: '',
            name: input.name
        });

        const savedOrganization = await this.organizationRepository.save(newOrganization);

        const newOwner = new Owner({
            id: '',
            name: owner.name,
            email: owner.email,
            organization: savedOrganization
        });

        await this.ownerRepository.save(newOwner);

        return {
            success: true,
            message: null,
            organization: {
                id: newOrganization.id,
                name: newOrganization.name
            }
        }
    }
}