import {Address} from "../login/address.model";

export interface Deserializable {
    deserialize(input: any): this;
}

export class User implements Deserializable {
    id: number;
    name: string;
    email: string;
    picture: string;
    phone: number;
    addresses: Address[];

    constructor(){
        this.id = null;
        this.name = null;
        this.email = null;
        this.phone = null;
        this.addresses = [];
    }

    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }
}

