export interface Deserializable {
    deserialize(input: any): this;
}
export class Location implements Deserializable {
    lattitude: number;
    longitude: number;

    constructor(){
        this.lattitude = null;
        this.longitude = null;
    }

    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }
}
export class Address implements Deserializable {
    id: number;
    name: string;
    location: Location;
    street1: string;
    street2: string;
    reference: string;
    number: number;
    main: boolean;
    user_id: number;
    addressType: string;

     constructor(){
        this.id = null;
        this.name = null;
        this.location = new Location();
        this.street1 = null;
        this.street2 = null;
        this.reference = null;
        this.number = null;
        this.main = true;
        this.user_id = null;
        this.addressType = "home";

    }

    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }
}

