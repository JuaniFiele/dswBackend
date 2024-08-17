import { Cascade, Entity, ManyToOne, Property, Collection, DateType, Rel, DateTimeType, OneToOne } from "@mikro-orm/core";
import { BaseEntity } from "../shared/baseEntity.entity.js";
import { Medic } from "./medic.entity.js";


@Entity()
export class Patient extends BaseEntity {

    @Property({nullable: false})
    horaInicio!: string
    
    @Property({nullable: false})
    horaFin!: string

    @Property({nullable: false})
    dia!: string

    @ManyToOne(() => medic, {nullable: true})
    medic?: Rel<Medic>