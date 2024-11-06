import { Cascade, Entity, OneToMany, Property, Collection, ManyToMany, ManyToOne, Rel } from "@mikro-orm/core";
import { BaseEntity } from "../shared/baseEntity.entity.js";
import { Medic } from "./medic.entity.js";

@Entity()
export class ConsultationHours extends BaseEntity {
    

    @Property({nullable: false})
    day!: string
    @Property({nullable: false})
    startTime!: string
    @Property({nullable: false})
    endTime!: string
    
    @ManyToOne(() => Medic, { nullable: true, eager: true })
    medic!: Rel<Medic>;
 
}