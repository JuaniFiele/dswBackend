import { DateTimeType, PrimaryKey, Property } from "@mikro-orm/core";

export abstract class BaseEntity {
  @PrimaryKey()
  id!: number;

  @Property({ type: DateTimeType, defaultRaw: 'CURRENT_TIMESTAMP' })
  createdAt!: Date;

  @Property({
    type: DateTimeType,
    defaultRaw: 'CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP',
    onUpdate: () => new Date(),
  })
  updatedAt!: Date;
}
