import { UserFormFieldRepository } from "/src/user/user-form-field.repository.ts";
import { UserService } from "/src/user/user.service.ts";
import { OwnerRepository } from "/src/owner/owner.repository.ts";
import { OwnerService } from "/src/owner/owner.service.ts";
import { prisma } from "/src/common/db/prisma.ts";

const userFormFieldRepository = new UserFormFieldRepository(prisma);
const userService = new UserService(userFormFieldRepository);

const ownerRepository = new OwnerRepository(prisma);
const ownerService = new OwnerService(ownerRepository);

export { userService, userFormFieldRepository, ownerService, ownerRepository }