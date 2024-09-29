type props = {
    id: string,
    name: string
}

export class Organization {
    id: string;
    name: string;
    
    constructor({id, name}: props){
        this.id = id;
        this.name = name;
    }
}