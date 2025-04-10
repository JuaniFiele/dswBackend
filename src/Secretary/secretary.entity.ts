import { Entity, Property } from "@mikro-orm/core";
import { BaseEntity } from "../shared/baseEntity.entity.js";
import { UserBase } from "../UserBase/userBase.entity.js";


@Entity()
export class Secretary extends UserBase {

  @Property({ nullable: false })
  dni!: string

  @Property({ nullable: false })
  firstname!: string

  @Property({ nullable: false })
  lastname!: string

  @Property({ nullable: false })
  mail!: string

  @Property({ nullable: false })
  dniType!: string

  @Property({ nullable: true })
  username!: string

  @Property({ nullable: true })
  password!: string

  @Property({ nullable: true })
  bornDate!: Date
}