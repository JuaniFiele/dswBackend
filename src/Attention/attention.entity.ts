import { Cascade, Entity, ManyToOne, Property, Collection, DateType, Rel, DateTimeType, OneToOne, OneToMany } from "@mikro-orm/core";
import { BaseEntity } from "../shared/baseEntity.entity.js";
import { ConsultationHours } from "../Medic/consultationHours.entity.js";
import { Patient } from "../Patient/patient.entity.js";

@Entity()
export class Attention extends BaseEntity {

    @Property({nullable: false})
    date!: Date
    
    @Property({nullable: true})
    paymentDate!: Date

    @Property({nullable: true})
    result!: string

    @Property({nullable: true})
    reason!: string

    //atributos eliminados: CurrentIllness, VitalSigns, PhysicalExamination, Diagnosis, Treatment
    
    @Property({ nullable: true })
    observation!: string;

    @Property({ nullable: true })
    dateCancelled!: Date;

    @ManyToOne(() => ConsultationHours, { eager: true})
    consultationHours?: Rel<ConsultationHours>
    
    @ManyToOne(() => Patient, {nullable: true, eager: true})
    patient?: Rel<Patient>
   
    
}