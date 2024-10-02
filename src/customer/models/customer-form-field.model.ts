import { Model } from "../../common/primitives";
import { FieldType } from "@prisma/client";

export class customerFormField implements Model {

    id: string;
    fieldName: string;
    type: FieldType;
    organizationId: string;

    constructor(props: {
        fieldName: string, 
        type: FieldType, 
        organizationId: string,
        id: string,
    }){
        this.fieldName = props.fieldName;
        this.type = props.type;
        this.organizationId = props.organizationId;
        this.id = props.id;
    }
}