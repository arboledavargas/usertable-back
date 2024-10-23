import { CustomerFormFieldRepository } from "../customer/customer-form-field.repository.ts";
import { CustomerService } from "../customer/customer.service.ts";
import { UserRepository } from "../user/user.repository.ts";
import { OwnerService } from "../user/user.service.ts";
import { mongoClient } from "./db/mongodb.ts";
import { OrganizationService } from "../organization/organization.service.ts";
import { OrganizationRepository } from "../organization/organization.repository.ts";
import { CustomerRepository } from "../customer/customer.repository.ts";

const db = mongoClient.db("user-table");

const customerFormFieldRepository = new CustomerFormFieldRepository(db);

const ownerRepository = new UserRepository(db);

const organizationRepository = new OrganizationRepository(db);

const customerRepository = new CustomerRepository(db);

const customerService = new CustomerService(
  customerFormFieldRepository,
  ownerRepository,
  customerRepository,
);

const ownerService = new OwnerService(ownerRepository);

const organizationService = new OrganizationService(
  organizationRepository,
  ownerRepository,
);

export {
  customerService,
  customerFormFieldRepository,
  ownerService,
  ownerRepository,
  organizationService,
};
