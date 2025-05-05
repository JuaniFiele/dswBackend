import { orm } from "../shared/orm.js";
import { Medic } from "./medic.entity.js";
import bcrypt from 'bcryptjs';
const em = orm.em;
em.getRepository(Medic);
async function findAll(req, res) {
    try {
        const medics = await em.find(Medic, {}, { populate: ['specialty'] });
        res.json({ data: medics });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function findOne(req, res) {
    try {
        const id = Number.parseInt(req.params.id);
        const medic = await em.findOneOrFail(Medic, { id });
        res.status(200).json({ message: 'Found Medic', data: medic });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function add(req, res) {
    try {
        // Validamos que no exista un usuario con el mismo nombre de usuario
        const medic_exists = await em.findOne(Medic, { username: req.body.username });
        if (medic_exists) {
            return res.status(400).json({ message: `User already exists with username ${req.body.username}` });
        }
        // HAY QUE AGREGARLE MAIL AL MEDICO   
        // Valida que no exista un usuario con el mismo correo
        //const medic_email_exists = await em.findOne(Medic, { mail: req.body.mail });
        //if (medic_email_exists) {
        //  return res.status(400).json({ message: `User already exists with email ${req.body.mail}` });
        //}
        // Asigno el rol al médico
        const aMedic = { ...req.body, role: 'medic' };
        // Encriptar la contraseña antes de guardarla
        aMedic.password = bcrypt.hashSync(aMedic.password, 8);
        // Crear el objeto medico
        const medic = em.create(Medic, aMedic);
        await em.flush(); // Persistir el médico en la base de datos
        res.status(201).json({ message: 'Medic created', data: medic });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function update(req, res) {
    try {
        const id = Number.parseInt(req.params.id);
        const medic = await em.getReference(Medic, id);
        em.assign(medic, req.body);
        await em.flush();
        res.status(200).json({ message: 'Medic updated', data: medic });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function remove(req, res) {
    try {
        const id = Number.parseInt(req.params.id);
        const medic = em.getReference(Medic, id);
        await em.removeAndFlush(medic);
        res.status(200).json({ message: 'Medic deleted', data: medic });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
export { findAll, findOne, add, update, remove };
//# sourceMappingURL=medic.controler.js.map