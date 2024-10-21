import { z } from "zod";

export const OrganizationSchema = z.object({
  _id: z.string(),
  name: z.string(),
});

type OrganizationType = z.infer<typeof OrganizationSchema>;

export class Organization {
  id: string;
  name: string;

  constructor({ _id, name }: OrganizationType) {
    this.id = _id;
    this.name = name;
  }
}
