import { ConsultationHours } from "./consultationHours.entity.js";
import { orm } from "../shared/orm.js";
const em = orm.em;
em.getRepository(ConsultationHours);
function sanitizeHealthInsuranceInput(req, res, next) {
    req.body.sanitizedInput = {
        day: req.body.day,
        startTime: req.body.startTime,
        endTime: req.body.endTime,
        medic: req.body.medic
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
        const _consultationHours = await em.find(ConsultationHours, {});
        res.status(200).json({ message: "Found all HealthInsurances", data: _consultationHours });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function findOne(req, res) {
    try {
        const id = Number.parseInt(req.params.id);
        const aconsultationHours = await em.findOneOrFail(ConsultationHours, { id });
        res.status(200).json({ message: "Health Insurance Found", data: aconsultationHours });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function add(req, res) {
    try {
        const aconsultationHours = em.create(ConsultationHours, req.body.sanitizedInput);
        await em.flush();
        res.status(201).json({ message: "HealthInsurance created", data: aconsultationHours });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function update(req, res) {
    try {
        const id = Number.parseInt(req.params.id);
        const aconsultationHours = em.getReference(ConsultationHours, id);
        em.assign(aconsultationHours, req.body.sanitizedInput);
        await em.flush();
        res.status(200).json({ message: "Health Insurance updated", data: aconsultationHours });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function remove(req, res) {
    try {
        const id = Number.parseInt(req.params.id);
        const aconsultationHours = em.getReference(ConsultationHours, id);
        await em.removeAndFlush(aconsultationHours);
        res.status(200).json({ message: "Health Insurance removed", data: aconsultationHours });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
export { sanitizeHealthInsuranceInput, findAll, findOne, add, update, remove };
//# sourceMappingURL=consultationHours.controller.js.map