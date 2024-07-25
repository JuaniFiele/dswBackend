import { ObjectId } from "mongodb";
import { Cascade, Entity, OneToMany, Property, Collection, PrimaryKey, BaseEntity } from "@mikro-orm/core";

@Entity()
export class ClinicHistory extends BaseEntity{
    
    @PrimaryKey({nullable: false, unique: true})
    id!: number

    @Property({nullable: false})
    bloodType!: string

    @Property({nullable: false})
    personalHistory!: string

    @Property({nullable: false})
    familyBackground!: string

}