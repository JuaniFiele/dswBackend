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
        requireEntitiesArray: true,
        disableDynamicFileAccess: true, // Evita escaneo automático
    },
    entities: [
        Secretary,
        Patient,
        Attention,
        Medic,
        Specialty,
        ConsultationHours,
        HealthInsurance,
        UserBase,
        BaseEntity
    ],
    dbName: 'medicsystemdb',
    clientUrl: 'mysql://root:root@localhost:3306/medicsystemdb',
    highlighter: new SqlHighlighter(),
    debug: true,
    schemaGenerator: {
        disableForeignKeys: true,
        createForeignKeyConstraints: true,
        ignoreSchema: [],
    },
});
export const syncSchema = async () => {
    const generator = orm.getSchemaGenerator();
    /*
    //cuidado, solo deberia usarse en desarrollo, esto destruye la base de datos solo usar si falla updateSchema()
    await generator.dropSchema()
    await generator.createSchema()
    */
    await generator.updateSchema();
};
//# sourceMappingURL=orm.js.map