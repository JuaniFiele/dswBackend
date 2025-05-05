import { orm } from "../shared/orm.js";
import { Specialty } from "./specialty.entity.js";
const em = orm.em;
em.getRepository(Specialty);
async function findAll(req, res) {
    try {
        const specialties = await em.find(Specialty, {});
        res.json({ data: specialties });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function findOne(req, res) {
    try {
        const id = Number.parseInt(req.params.id);
        const specialty = await em.findOneOrFail(Specialty, { id });
        res.status(200).json({ message: 'Found Specialty', data: specialty });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function add(req, res) {
    try {
        const specialty = em.create(Specialty, req.body);
        await em.flush();
        res.status(201).json({ message: 'Specialty created', data: specialty });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function update(req, res) {
    try {
        const id = Number.parseInt(req.params.id);
        const specialty = await em.getReference(Specialty, id);
        em.assign(specialty, req.body);
        await em.flush();
        res.status(200).json({ message: 'Specialty updated', data: specialty });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function remove(req, res) {
    try {
        const id = Number.parseInt(req.params.id);
        const specialty = em.getReference(Specialty, id);
        await em.removeAndFlush(specialty);
        res.status(200).json({ message: 'Specialty deleted', data: specialty });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
export { findAll, findOne, add, update, remove };
//# sourceMappingURL=specialty.controller.js.map