import { orm } from "../shared/orm.js";
import { Secretary } from "./secretary.entity.js";
import bcrypt from 'bcryptjs';
const em = orm.em;
em.getRepository(Secretary);
async function findAll(req, res) {
    try {
        const secretaries = await em.find(Secretary, {});
        res.json({ data: secretaries });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function findOne(req, res) {
    try {
        const id = Number.parseInt(req.params.id);
        const secretary = await em.findOneOrFail(Secretary, { id });
        res.status(200).json({ message: 'Found secretary', data: secretary });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function add(req, res) {
    try {
        //Validamos que no exista un usuario con el mismo nombre de usuario
        const secretary_exists = await em.findOne(Secretary, { username: req.body.username });
        if (secretary_exists) {
            return res.status(400).json({ message: ` User already exists with username ${req.body.username}` });
        }
        //Valida que no exista un usuario con el mismo correo
        const secretary_email_exists = await em.findOne(Secretary, { mail: req.body.mail });
        if (secretary_email_exists) {
            return res.status(400).json({ message: ` User already exists with email ${req.body.mail}` });
        }
        // Le asigno el rol a la secretaria
        const aSecretary = req.body;
        aSecretary.role = 'secretary';
        req.body.password = bcrypt.hashSync(req.body.password, 8);
        const secretary = em.create(Secretary, aSecretary);
        await em.flush();
        res.status(201).json({ message: 'Secretary created', data: secretary });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function update(req, res) {
    try {
        const id = Number.parseInt(req.params.id);
        const secretary = em.getReference(Secretary, id);
        em.assign(secretary, req.body);
        await em.flush();
        res.status(200).json({ message: 'Secretary updated', data: secretary });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function remove(req, res) {
    try {
        const id = Number.parseInt(req.params.id);
        const secretary = em.getReference(Secretary, id);
        await em.removeAndFlush(secretary);
        res.status(200).json({ message: 'Secretary deleted', data: secretary });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
export { findAll, findOne, add, update, remove };
//# sourceMappingURL=secretary.controller.js.map