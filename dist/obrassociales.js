import crypto from 'node:crypto';
export class ObraSocial {
    constructor(name, id = crypto.randomUUID() //Id temporal, luego se debe crear en la base de datos
    ) {
        this.name = name;
        this.id = id;
    }
}
//# sourceMappingURL=obrassociales.js.map