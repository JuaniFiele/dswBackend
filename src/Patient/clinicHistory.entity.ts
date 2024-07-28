//Stil in development

import { Cascade, Entity, ManyToOne, Property, Collection, DateType, Rel, DateTimeType, OneToOne } from "@mikro-orm/core";
import { BaseEntity } from "../shared/baseEntity.entity.js";
import { Patient } from "./patient.entity.js"; // Import the Patient class


@Entity()
export class ClinicHistory extends BaseEntity {

    @Property({nullable: false})
    grupoSanguineo!: string
    
    @Property({nullable: false})
    antecedentesPersonales!: string

    @Property({nullable: false})
    antecedentesFamiliares!: string

    @OneToOne(() => Patient, (patient: Patient) => patient.clinicHistory, { nullable: false}) // Specify the type for 'patient'
    patient!: Rel<Patient>;
    
}