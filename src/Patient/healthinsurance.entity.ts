import { Cascade, Entity, OneToMany, Property, Collection } from "@mikro-orm/core";
import { BaseEntity } from "../shared/baseEntity.entity.js";
import { Patient } from "./patient.entity.js";

@Entity()
export class HealthInsurance extends BaseEntity {
    

    @Property({nullable: false, unique: true})
    name!: string
    
    
    @OneToMany(() => Patient, patient => patient.healthInsurance, {cascade: [Cascade.ALL], nullable: true})
    patients = new Collection<Patient>(this)
    
}