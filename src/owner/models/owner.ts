import { Organization } from "../../organization/models/organization";

export interface Owner {
  id: string;
  name: string;
  email: string;
  organization: Organization
  authId: string;
}

export class Owner implements Owner {
  constructor(props: {id: string, name: string, email: string, organization: Organization, authId: string}) {
    this.id = props.id;
    this.name = props.name;
    this.email = props.email;
    this.organization = props.organization;
    this.authId = props.authId
  }
}