import {
  customerFormField,
  customerFormFieldSchema,
} from "./models/customer-form-field";
import { Db, ObjectId } from "mongodb";

export class CustomerFormFieldRepository {
  constructor(private db: Db) {}

  private async create(
    formField: customerFormField,
  ): Promise<customerFormField> {
    const result = await this.db.collection("userFormField").insertOne({
      fieldName: formField.fieldName,
      organizationId: formField.organizationId,
      type: formField.type,
    });

    formField.id = result.insertedId.toString();

    return formField;
  }

  private async update(
    formField: customerFormField,
  ): Promise<customerFormField> {
    const result = await this.db.collection("userFormField").findOneAndUpdate(
      { _id: new ObjectId(formField.id) },
      {
        $set: {
          fieldName: formField.fieldName,
          type: formField.type,
          organizationId: formField.organizationId,
        },
      },
      { returnDocument: "after" },
    );

    if (!result) {
      throw new Error("Update failed");
    }

    return formField;
  }

  async save(model: customerFormField): Promise<customerFormField> {
    if (model.id) {
      return await this.update(model);
    } else {
      return await this.create(model);
    }
  }

  async findByOrganizationId(id: string): Promise<customerFormField[]> {
    const result = await this.db
      .collection("userFormField")
      .find({ organizationId: id })
      .toArray();

    return result.map(
      (doc) =>
        new customerFormField(
          customerFormFieldSchema.parse({ ...doc, _id: doc._id.toString() }),
        ),
    );
  }
}
