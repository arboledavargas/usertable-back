import { CustomerFormFieldRepository } from "../customer/customer-form-field.repository";
import { CustomerService } from "../customer/customer.service";
import { UserRepository } from "../user/user.repository";
import { OwnerService } from "../user/user.service";
import { mongoClient } from "./db/mongodb";
import { OrganizationService } from "../organization/organization.service";
import { OrganizationRepository } from "../organization/organization.repository";
import { CustomerRepository } from "../customer/customer.repository";

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
