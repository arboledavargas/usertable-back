import { CustomerFormFieldRepository } from "../customer/customer-form-field.repository";
import { CustomerService } from "../customer/customer.service";
import { OwnerRepository } from "../owner/owner.repository";
import { OwnerService } from "../owner/owner.service";
import { prisma } from "../common/db/prisma";
import { OrganizationService } from "../organization/organization.service";
import { OrganizationRepository } from "../organization/organization.repository";

const customerFormFieldRepository = new CustomerFormFieldRepository(prisma);

const ownerRepository = new OwnerRepository(prisma);
const organizationRepository = new OrganizationRepository(prisma);
const customerService = new CustomerService(customerFormFieldRepository, ownerRepository);
const ownerService = new OwnerService(ownerRepository);
const organizationService = new OrganizationService(organizationRepository, ownerRepository);

export { customerService, customerFormFieldRepository, ownerService, ownerRepository, organizationService }