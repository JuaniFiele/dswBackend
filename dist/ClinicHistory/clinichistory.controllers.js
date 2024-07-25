import { ClinicHistory } from './clinichistory.entity.js';
import { orm } from "../shared/db/orm.js";
const em = orm.em;
em.getRepository(ClinicHistory);
function sanitizeClinicHistoryInput(req, res, next) {
    req.body.sanitizedInput = {
        id: req.body.id,
        bloodType: req.body.bloodType,
        personalHistory: req.body.personalHistory,
        familyBackground: req.body.familyBackground,
    };
    //validar info traida (validar info maliciosa, tipo de dato, etc...)
    //Validamos que los campos no sean undefined ( para el patch)
    Object.keys(req.body.sanitizedInput).forEach((key) => {
        if (req.body.sanitizedInput[key] === undefined) {
            delete req.body.sanitizedInput[key];
        }
    });
    next();
}
async function findAll(req, res) {
    try {
        const ClinicHistorys = await em.find(ClinicHistory, {});
        res.status(200).json({ message: "Found all Clinic Historys", data: ClinicHistorys });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function findOne(req, res) {
    try {
        const id = Number.parseInt(req.params.id);
        const aClinicHistory = await em.findOneOrFail(ClinicHistory, { id });
        res.status(200).json({ message: "Clinic History Found", data: aClinicHistory });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function add(req, res) {
    try {
        const aNewClinicHistory = em.create(ClinicHistory, req.body.sanitizedInput);
        await em.flush();
        res.status(201).json({ message: "Clinic History created", data: aNewClinicHistory });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function update(req, res) {
    try {
        const id = Number.parseInt(req.params.id);
        const aClinicHistory = em.getReference(ClinicHistory, id);
        em.assign(aClinicHistory, req.body.sanitizedInput);
        await em.flush();
        res.status(200).json({ message: "Clinic History updated", data: aClinicHistory });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function remove(req, res) {
    try {
        const id = Number.parseInt(req.params.id);
        const aClinicHistory = em.getReference(ClinicHistory, id);
        await em.removeAndFlush(aClinicHistory);
        res.status(200).json({ message: "Health Insurance removed", data: aClinicHistory });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
export { sanitizeClinicHistoryInput, findAll, findOne, add, update, remove };
//# sourceMappingURL=clinichistory.controllers.js.map