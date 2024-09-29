import { OwnerRepository } from "./owner.repository";

export class OwnerService {
  constructor(private ownerRepository: OwnerRepository) {}

  async getOwnerById(id: string) {
    return await this.ownerRepository.findById(id);
  }
}