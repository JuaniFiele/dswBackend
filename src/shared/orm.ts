
import { MikroORM } from "@mikro-orm/mysql";
import { SqlHighlighter } from "@mikro-orm/sql-highlighter";
import { ReflectMetadataProvider } from "@mikro-orm/core";

import { Secretary } from "../Secretary/secretary.entity.js";
import { Patient } from "../Patient/patient.entity.js";
import { Attention } from "../Attention/attention.entity.js";
import { Medic } from "../Medic/medic.entity.js";
import { Specialty } from "../Specialty/specialty.entity.js";
import { ConsultationHours } from "../Medic/consultationHours.entity.js";
import { HealthInsurance } from "../Patient/healthinsurance.entity.js";
import { UserBase } from "../UserBase/userBase.entity.js";
import { BaseEntity } from "../shared/baseEntity.entity.js";
;

export const orm = await MikroORM.init({

    //Configuración para excluir validadores
    metadataProvider: ReflectMetadataProvider,
    discovery: {
      requireEntitiesArray: true, // Obliga a usar lista manual
      disableDynamicFileAccess: true, // Evita escaneo automático
    },

    entities: [
        Secretary
        , Patient
        , Attention
        , Medic
        , Specialty
        , ConsultationHours
        , HealthInsurance
        , UserBase
        , BaseEntity
    ],
    
    
    //dbName: 'railway',
    
    //clientUrl: 'mysql://root:DxLliqozsxfoMrMGVsGmRQMlFeECdtdN@hopper.proxy.rlwy.net:37821/railway',
    host: 'mysql',
    port: parseInt(process.env.MYSQL_PORT || '3306'),
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    dbName: process.env.MYSQL_DATABASE,

    driverOptions: {
      connection: {
        ssl: {
          rejectUnauthorized: true, 
        }
      }
    },
    /*mysql://root:CtmQoJRVAGigLsWpStXJwfhPhSaCJfGD@nozomi.proxy.rlwy.net:23946/railway
    user: root
    password: CtmQoJRVAGigLsWpStXJwfhPhSaCJfGD
    port: 23946
    host: 'nozomi.proxy.rlwy.net'
    */
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
