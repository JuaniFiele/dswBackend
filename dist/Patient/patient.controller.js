import { orm } from "../shared/orm.js";
import { Patient } from "./patient.entity.js";
import { Medic } from "../Medic/medic.entity.js";
import { Attention } from "../Attention/attention.entity.js";
import jwt from 'jsonwebtoken';
const em = orm.em;
em.getRepository(Patient);
em.getRepository(Attention);
async function findAll(req, res) {
    try {
        const patients = await em.find(Patient, {}, { populate: ['healthInsurance'] });
        res.status(200).json({ message: "Found all Patients", data: patients });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function findOne(req, res) {
    try {
        const id = Number.parseInt(req.params.id);
        const aPatient = await em.findOneOrFail(Patient, { id }, { populate: ["healthInsurance"] });
        res.status(200).json({ message: "Character Found", data: aPatient });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function findOneByDni(req, res) {
    try {
        const dni = req.params.dni; // Suponiendo que el DNI se pasa como parámetro en la URL
        // Busca el paciente por dni utilizando `findOne` en lugar de `findOneOrFail`
        const aPatient = await em.findOne(Patient, { dni }, { populate: ["healthInsurance"] });
        // Verifica si se encontró un paciente
        if (!aPatient) {
            return res.status(404).json({ message: "Patient not found" });
        }
        res.status(200).json({ message: "Patient Found", data: aPatient });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function add(req, res) {
    try {
        const aNewPatient = em.create(Patient, req.body);
        await em.flush();
        res.status(201).json({ message: "Patient created", data: aNewPatient });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function update(req, res) {
    try {
        const id = Number.parseInt(req.params.id);
        const aPatientToUpdate = await em.findOneOrFail(Patient, { id });
        em.assign(aPatientToUpdate, req.body);
        await em.flush();
        res.status(200).json({ message: "Patient updated", data: aPatientToUpdate });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function remove(req, res) {
    try {
        const id = Number.parseInt(req.params.id);
        const aPatient = await em.findOneOrFail(Patient, { id });
        await em.removeAndFlush(aPatient);
        res.status(200).json({ message: "Patient deleted", data: aPatient });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
//TODO FIND BY TOKEN, NOT BY MEDIC ID
async function getAttentionsForOneMedic(req, res) {
    try {
        let medicId;
        const patientId = Number.parseInt(req.params.patientId);
        const headerToken = req.headers['authorization'];
        if (headerToken != undefined && headerToken.startsWith('Bearer ')) {
            // Tiene token
            try {
                const bearerToken = headerToken.slice(7);
                const secretKey = process.env.SECRET_KEY;
                // Verificar el token
                const decoded = jwt.verify(bearerToken, 'Contraseña123');
                medicId = Number.parseInt(decoded.id);
            }
            catch (error) {
                return res.status(401).json({ message: 'Invalid token' });
            }
        }
        else {
            return res.status(403).json({ message: 'Acceso Denegado' });
        }
        const medic = await em.findOneOrFail(Medic, { id: medicId });
        const attentions = await em.find(Attention, {
            patient: { id: patientId },
            consultationHours: { medic: { id: medicId } } // filter by medic
        }, {
            populate: ["consultationHours", "consultationHours.medic", "patient"] // load necessary relations
        });
        //filter so that attentions with dateCancelled are not returned
        const attentionsFiltered = attentions.filter((attention) => attention.dateCancelled === null);
        if (attentionsFiltered.length === 0) {
            return res.status(404).json({ message: `No attentions found for patient ${patientId} and medic ${medicId} that had not been canceled previously.` });
        }
        res.status(200).json({ message: `Retrieved all attentions for a medic with ${medicId} that had not been canceled previously`, data: attentionsFiltered });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
export { findAll, findOne, add, update, remove, findOneByDni, getAttentionsForOneMedic };
//# sourceMappingURL=patient.controller.js.map