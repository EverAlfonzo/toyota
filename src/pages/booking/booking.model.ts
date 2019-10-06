import { Location } from "../login/address.model";

export interface Deserializable {
    deserialize(input: any): this;
}
export class Service implements Deserializable {
    userId: number;
    document: number;
    serviceTypeId: number;
    brandId: number; 
    modelId: number; 
    year: number; 
    carKm: number;
    licensePlate: string;
    idType: string;
    workshopId: number;
    comment: string;
    location: Location;
    date: string;
    time: string;

    constructor(){
        this.userId = null;
        this.document = null;
        this.serviceTypeId = null;
        this.brandId = null;
        this.modelId = null;
        this.year = 1990;
        this.carKm = 0;
        this.licensePlate = null;
        this.idType = 'CHAPA';
        this.workshopId = null;
        this.comment = null;
        this.location = new Location();
        this.date = null;
        this.time = null;

    }

    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }
}