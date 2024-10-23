import { OrganizationRepository } from "./organization.repository.ts";
import { Organization } from "./models/organization.ts";
import { OrganizationInput, CreateOrganizationPayload } from "../graphql.ts";
import { UserRepository } from "../user/user.repository.ts";
import { User } from "../user/models/user.ts";

export class OrganizationService {
  constructor(
    private readonly organizationRepository: OrganizationRepository,
    private readonly ownerRepository: UserRepository,
  ) {}

  async createOrganization(
    input: OrganizationInput,
    owner: { name: string; email: string; authId: string },
  ): Promise<CreateOrganizationPayload> {
    const newOrganization = new Organization({
      _id: "",
      name: input.name,
    });

    const savedOrganization =
      await this.organizationRepository.save(newOrganization);

    const newOwner = new User({
      _id: "",
      name: owner.name,
      email: owner.email,
      organization: savedOrganization,
      authId: owner.authId,
    });

    await this.ownerRepository.save(newOwner);

    return {
      success: true,
      message: null,
      organization: {
        id: newOrganization.id,
        name: newOrganization.name,
      },
    };
  }
}
