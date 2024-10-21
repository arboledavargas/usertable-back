import { z } from "zod";
import { Customer as gqlCustomer } from "../../graphql";

function serializeValue(value: any): string {
  if (typeof value === "string") {
    return value;
  } else if (typeof value === "number") {
    return value.toString();
  } else if (typeof value === "boolean") {
    return JSON.stringify(value);
  } else if (value instanceof Date) {
    return value.toISOString();
  } else {
    return JSON.stringify(value);
  }
}

export const CustomerSchema = z.object({
  _id: z.string(),
  organization: z.object({
    id: z.string(),
    name: z.string(),
  }),
  createDate: z.date(),
  properties: z.record(z.string(), z.unknown()),
});

type CustomerType = z.infer<typeof CustomerSchema>;

export class Customer {
  id: string;
  organization: { id: string; name: string };
  createDate: Date;
  properties: Record<string, any>;

  constructor(props: CustomerType) {
    this.id = props._id;
    this.organization = props.organization;
    this.createDate = props.createDate;
    this.properties = props.properties;
  }

  serialize(): gqlCustomer {
    return {
      id: this.id,
      properties: Object.entries(this.properties).map(([key, value]) => ({
        name: key,
        value: serializeValue(value),
      })),
    };
  }
}
