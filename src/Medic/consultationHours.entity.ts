import { Cascade, Entity, OneToMany, Property, Collection, ManyToMany, ManyToOne, Rel } from "@mikro-orm/core";
import { BaseEntity } from "../shared/baseEntity.entity.js";
import { Medic } from "./medic.entity.js";

@Entity()
export class ConsultationHours extends BaseEntity {
    

    @Property({nullable: false})
    day!: string
    @Property({nullable: false, type: 'time'})
    startTime!: string
    @Property({nullable: false, type: 'time'})
    endTime!: string
    @Property({ default: true })
    isAvailable = true;
    @ManyToOne(() =>Medic, {nullable: true})
    medic!: Rel<Medic>;
 
}