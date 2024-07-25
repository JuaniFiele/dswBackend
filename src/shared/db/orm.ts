import{ MikroORM } from "@mikro-orm/core"
import { SqlHighlighter } from "@mikro-orm/sql-highlighter"

export const orm = await MikroORM.init({
    entities: ['dist/**/*.entity.js'],

    entitiesTs: ['src/**/*.entity.ts'],
    
    dbName: 'clinicHistorysystemdb',
    
    clientUrl: 'mysql://root:root@localhost:3306/clinicHistorysystemdb',
   
    highlighter: new SqlHighlighter(),
    
    debug: true,
    
    schemaGenerator: { //make sure to never use in production
        disableForeignKeys: true,
        createForeignKeyConstraints: true,
        ignoreSchema:[],
    },
})

export const syncSchema = async() => {
    const generator = orm.getSchemaGenerator()
    await generator.updateSchema()
}