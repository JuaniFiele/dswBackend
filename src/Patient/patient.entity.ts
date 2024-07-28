import { Cascade, Entity, ManyToOne, Property, Collection, DateType, Rel, DateTimeType, OneToOne } from "@mikro-orm/core";
import { BaseEntity } from "../shared/baseEntity.entity.js";
import { HealthInsurance } from "./healthinsurance.entity.js";
import { ClinicHistory } from "./clinicHistory.entity.js";

@Entity()
export class Patient extends BaseEntity {

    @Property({nullable: false})
    firstname!: string
    
    @Property({nullable: false})
    lastname!: string

    @Property({nullable: false})
    dni!: string

    @Property({nullable: false})
    phoneNumber!: string

    @Property({nullable: false})
    address!: string

    @Property({nullable: false})
    email!: string

    @Property({ type: 'date', nullable: false })
    birthDate!: Date;

    @ManyToOne(() => HealthInsurance, {nullable: true})
    healthInsurance?: Rel<HealthInsurance>

    @OneToOne(() => ClinicHistory, (clinicHistory: { patient: any; }) => clinicHistory.patient, { nullable: true, owner: true })
    clinicHistory?: Rel<ClinicHistory>;
   
    
}