import { PrismaClientType } from "../common/db/prisma";
import { Owner } from "./models/owner";
import { Organization } from "../organization/models/organization";

export class OwnerRepository {
  constructor(private prisma: PrismaClientType) {}

  async findById(id: string): Promise<Owner | null> {
    const result =  await this.prisma.owner.findUnique({ where: { id }, include: { organization: true }});

    if(!result) return null;
    
    return new Owner({
      id: result.id,
      name: result.name,
      email: result.email,
      organization: new Organization({ id: result.organization.id, name: result.organization.name })
    });
  }

  async create(owner: Owner): Promise<Owner> {
    const result = await this.prisma.owner.create({
      data: {
        name: owner.name,
        email: owner.email,
        organization: {
          connect: {
            id: owner.organization.id
          }
        }
      },
      include: { organization: true }
    });

    return new Owner({
      id: result.id,
      name: result.name,
      email: result.email,
      organization: new Organization({ id: result.organization.id, name: result.organization.name })
    });
  }

  async update(owner: Owner): Promise<Owner> {
    const result = await this.prisma.owner.update({
      where: { id: owner.id },
      data: {
        name: owner.name,
        email: owner.email,
        organization: {
          connect: {
            id: owner.organization.id
          }
        }
      },
      include: { organization: true }
    });

    return new Owner({
      id: result.id,
      name: result.name,
      email: result.email,
      organization: new Organization({ id: result.organization.id, name: result.organization.name })
    });
  }

  async save(owner: Owner): Promise<Owner> {
    if(owner.id){
      return await this.update(owner);
    } else {
      return await this.create(owner);
    }
  }
}