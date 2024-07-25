import { ObjectId } from "mongodb";

export class ClinicHistory {
    constructor(
        public nro: number, 
        public bloodType: string,
        public personalHistory: string,
        public familyBackground: string,
    ) {}

}