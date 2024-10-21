import { Db, ObjectId } from "mongodb";
import { User, UserSchema } from "./models/user";

export class UserRepository {
  constructor(private db: Db) {}

  async findByAuthId(id: string): Promise<User | null> {
    const result = await this.db.collection("users").findOne({ authId: id });

    if (!result) return null;

    return new User(
      UserSchema.parse({ ...result, _id: result._id.toString() }),
    );
  }

  async create(user: User): Promise<User> {
    const result = await this.db.collection("users").insertOne({
      name: user.name,
      email: user.email,
      authId: user.authId,
      organization: {
        id: user.organization.id,
        name: user.organization.name,
      },
    });

    user.id = result.insertedId.toString();
    return user;
  }

  async update(user: User): Promise<User> {
    const result = await this.db.collection("users").findOneAndUpdate(
      { _id: new ObjectId(user.id) },
      {
        $set: {
          name: user.name,
          email: user.email,
          authId: user.authId,
          organization: {
            id: user.organization.id,
            name: user.organization.name,
          },
        },
      },
      { returnDocument: "after" },
    );

    if (!result) {
      throw new Error("Update failed");
    }

    return user;
  }

  async save(user: User): Promise<User> {
    if (user.id) {
      return await this.update(user);
    } else {
      return await this.create(user);
    }
  }
}
