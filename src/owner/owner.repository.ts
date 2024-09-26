import { PrismaClient } from "@prisma/client";
import { Owner } from "./models/owner.model.ts";

export class OwnerRepository {
  constructor(private prisma: PrismaClient) {}

  async findAll() {
    return this.prisma.owner.findMany();
  }

  async findById(id: string) {
    return this.prisma.owner.findUnique({ where: { id } });
  }

  async save(owner: Owner): Promise<Owner> {
    return this.prisma.owner.upsert({
      where: { id: owner.id || '' },
      update: { name: owner.name, email: owner.email },
      create: { name: owner.name, email: owner.email },
    });
  }

  async delete(id: string) {
    return this.prisma.owner.delete({ where: { id } });
  }
}