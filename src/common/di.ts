import { UserFormFieldRepository } from "../user/user-form-field.repository";
import { UserService } from "../user/user.service";
import { OwnerRepository } from "../owner/owner.repository";
import { OwnerService } from "../owner/owner.service";
import { prisma } from "../common/db/prisma";
import { OrganizationService } from "../organization/organization.service";
import { OrganizationRepository } from "../organization/organization.repository";

const userFormFieldRepository = new UserFormFieldRepository(prisma);
const userService = new UserService(userFormFieldRepository);

const ownerRepository = new OwnerRepository(prisma);
const ownerService = new OwnerService(ownerRepository);
const organizationRepository = new OrganizationRepository(prisma);
const organizationService = new OrganizationService(organizationRepository, ownerRepository);

export { userService, userFormFieldRepository, ownerService, ownerRepository, organizationService }