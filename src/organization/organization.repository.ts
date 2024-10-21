import { Organization } from "./models/organization";
import { Db, ObjectId } from "mongodb";

export class OrganizationRepository {
  constructor(private db: Db) {}

  private async update(organization: Organization): Promise<Organization> {
    const result = await this.db
      .collection("organizations")
      .findOneAndUpdate(
        { _id: new ObjectId(organization.id) },
        { $set: { name: organization.name } },
        { returnDocument: "after" },
      );

    if (!result) {
      throw new Error("Update failed");
    }

    return organization;
  }

  private async create(organization: Organization): Promise<Organization> {
    const result = await this.db.collection("organizations").insertOne({
      name: organization.name,
    });

    organization.id = result.insertedId.toString();
    return organization;
  }

  async save(organization: Organization): Promise<Organization> {
    if (organization.id) {
      return await this.update(organization);
    } else {
      return await this.create(organization);
    }
  }
}
