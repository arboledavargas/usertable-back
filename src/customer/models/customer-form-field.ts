import { Model } from "../../common/primitives";
import { FieldType, CustomerFormField } from "../../graphql";
import { z } from "zod";

export const customerFormFieldSchema = z.object({
  _id: z.string(),
  fieldName: z.string(),
  type: z.enum([
    FieldType.Boolean,
    FieldType.Date,
    FieldType.Number,
    FieldType.Text,
  ]),
  organizationId: z.string(),
});

type customerFormFieldProps = z.infer<typeof customerFormFieldSchema>;

export class customerFormField implements Model {
  id: string;
  fieldName: string;
  type: FieldType;
  organizationId: string;

  constructor(props: customerFormFieldProps) {
    this.fieldName = props.fieldName;
    this.type = props.type;
    this.organizationId = props.organizationId;
    this.id = props._id;
  }

  serialize(): CustomerFormField {
    return {
      fieldName: this.fieldName,
      type: this.type,
      id: this.id,
    };
  }
}
