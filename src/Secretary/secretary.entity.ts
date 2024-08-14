import { Entity, Property } from "@mikro-orm/core";
import { BaseEntity } from "../shared/baseEntity.entity.js";


@Entity()
export class Secretary extends BaseEntity {

  @Property({ nullable: false })
  dni!: string

  @Property({ nullable: false })
  firstname!: string

  @Property({ nullable: false })
  lastname!: string

  @Property({ nullable: false })
  Mail!: string

  @Property({ nullable: false })
  DniType!: string

  @Property({ nullable: false })
  Username!: string

  @Property({ nullable: false })
  Password!: string

  @Property({ nullable: true })
  BornDate!: Date
}