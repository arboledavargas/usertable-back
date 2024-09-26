import { OwnerRepository } from "./owner.repository.ts";
import { OwnerInput, OwnerPayload } from "../graphql.ts";
import { Owner } from "./models/owner.model.ts";

export class OwnerService {
  constructor(private ownerRepository: OwnerRepository) {}

  async getAllOwners() {
    return await this.ownerRepository.findAll();
  }

  async getOwnerById(id: string) {
    return await this.ownerRepository.findById(id);
  }

  async createOwner(input: OwnerInput, id?: string): Promise<OwnerPayload> {
    const owner: Owner = new Owner({...input, id: ''});

    const savedOwner = await this.ownerRepository.save(owner);

    const message = id ? "Owner updated successfully" : "Owner created successfully";

    return { owner: savedOwner, success: true, message };
  }

  async deleteOwner(id: string): Promise<OwnerPayload> {
    await this.ownerRepository.delete(id);
    return { owner: null, success: true, message: "Owner deleted successfully" };
  }
}