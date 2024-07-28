import { PrimaryKey } from "@mikro-orm/core"


export abstract class BaseEntity {
    @PrimaryKey()
    id?: number


    //TODO, ADD WHEN ALL DB IS READY, THIS IS TO CONTROL THE LIFESPAN OF AN ENITTY
    /*
    @Property({ type: DateTimeType })
    createdAt = new Date()

    @Property({
        type: DateTimeType,
        onUpdate: () => new Date(),
        })
    updatedAt = new Date()
    */
}