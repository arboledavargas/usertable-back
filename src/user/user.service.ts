import { UserRepository } from "./user.repository";

export class OwnerService {
  constructor(private ownerRepository: UserRepository) {}

  async getOwnerById(id: string) {
    return await this.ownerRepository.findByAuthId(id);
  }
}
