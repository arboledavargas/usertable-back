export interface Owner {
  id: string;
  name: string;
  email: string;
}

export class Owner implements Owner {
  constructor(props: {id: string, name: string, email: string}) {
    this.id = props.id;
    this.name = props.name;
    this.email = props.email;
  }
}