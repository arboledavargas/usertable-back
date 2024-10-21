import { z } from "zod";

export const UserSchema = z.object({
  _id: z.string(),
  name: z.string(),
  email: z.string(),
  authId: z.string(),
  organization: z.object({
    id: z.string(),
    name: z.string(),
  }),
});

type UserType = z.infer<typeof UserSchema>;

export class User {
  id: string;
  name: string;
  email: string;
  organization: {
    id: string;
    name: string;
  };

  authId: string;

  constructor(props: UserType) {
    this.id = props._id;
    this.name = props.name;
    this.email = props.email;
    this.organization = props.organization;
    this.authId = props.authId;
  }
}
