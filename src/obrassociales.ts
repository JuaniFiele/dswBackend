import crypto from 'node:crypto'
export class ObraSocial{
    constructor(
        public name: string,
        public id = crypto.randomUUID() //Id temporal, luego se debe crear en la base de datos
      ){}
}