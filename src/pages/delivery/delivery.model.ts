import { Location } from "../login/address.model";

export interface Deserializable {
    deserialize(input: any): this;
}
export class Delivery implements Deserializable {
    number: number;
    comment: string;
    userId: number;
    location: Location;
    date: string;
    time: string;

    constructor(){
        this.number = null;
        this.comment = null;
        this.userId = null;
        this.location = new Location();
        this.date = null;
        this.time = null;
    }

    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }
}