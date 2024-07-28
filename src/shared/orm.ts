
import { MikroORM } from "@mikro-orm/mysql";
import { SqlHighlighter } from "@mikro-orm/sql-highlighter";

export const orm = await MikroORM.init({
    entities: ['dist/**/*.entity.js'],
    
    entitiesTs: ['src/**/*.entity.ts'],
    
    dbName: 'medicsystemdb',
    
    clientUrl: 'mysql://root:root@localhost:3306/medicsystemdb',
   
    highlighter: new SqlHighlighter(),
    
    debug: true,
    
    schemaGenerator: { //make sure to never use in production
        disableForeignKeys: true,
        createForeignKeyConstraints: true,
        ignoreSchema:[],
    },
    
})

export const syncSchema = async () => {
    const generator = orm.getSchemaGenerator()
    
    /*
    //cuidado, solo deberia usarse en desarrollo, esto destruye la base de datos solo usar si falla updateSchema()
    await generator.dropSchema()  
    await generator.createSchema()
    */

    await generator.updateSchema()
}