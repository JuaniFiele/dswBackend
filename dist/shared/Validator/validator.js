import { orm } from "../orm.js";
import { Medic } from "../../Medic/medic.entity.js";
import { HealthInsurance } from "../../Patient/healthinsurance.entity.js";
import { Attention } from "../../Attention/attention.entity.js";
import { ConsultationHours } from "../../Medic/consultationHours.entity.js";
import { Patient } from "../../Patient/patient.entity.js";
import { Secretary } from "../../Secretary/secretary.entity.js";
import { Specialty } from "../../Specialty/specialty.entity.js";
import { UserBase } from "../../UserBase/userBase.entity.js";
export class Validator {
    constructor() { }
    // Validación de cualquier parámetro tipo number
    static validateIdParam(req, res, next) {
        // Agarra el primer parámetro de la URL, no importa si se llama "id", "medicoId", etc.
        const paramName = Object.keys(req.params)[0];
        // Intenta convertir el valor de ese parámetro a número
        const value = Number.parseInt(req.params[paramName]);
        // Si no es un número válido, manda un error 400
        if (isNaN(value)) {
            return res.status(400).json({ message: "ID debe ser un número válido" });
        }
        // Si es válido, pasa al siguiente controlador
        next();
    }
    // Validaciones para Medic
    static async validateMedicInput(req, res, next) {
        const requiredFields = ['dni', 'dniType', 'firstname', 'lastname', 'username', 'password'];
        const validDniTypes = ['DNI', 'Libreta Civica', 'Pasaporte'];
        // Valida campos requeridos
        for (const field of requiredFields) {
            if (!req.body[field]) {
                return res.status(400).json({ message: `Campo '${field}' es obligatorio` });
            }
        }
        // Valida que el DNI sea un número válido
        if (isNaN(Number(req.body.dni))) {
            return res.status(400).json({ message: "El DNI debe ser un número válido" });
        }
        // Valida que el conjunto dniType y dni sean unicos
        const existingMedicDni = await orm.em.findOne(Medic, { dni: req.body.dni, dniType: req.body.dniType });
        if (existingMedicDni && existingMedicDni.id !== Number(req.params.id)) {
            return res.status(400).json({ message: "Ya existe un médico con este DNI" });
        }
        // Validar que la specialty exista
        if (req.body.specialty) {
            const specialty = await orm.em.findOne(Specialty, { id: req.body.specialty });
            if (!specialty) {
                return res.status(404).json({ message: "Especialidad no encontrada" });
            }
        }
        // Valida tipo de DNI
        if (!validDniTypes.includes(req.body.dniType)) {
            return res.status(400).json({ message: "Tipo de DNI inválido" });
        }
        // Valida username único
        const existingMedic = await orm.em.findOne(UserBase, { username: req.body.username });
        if (existingMedic && existingMedic.username != req.body.username) {
            return res.status(400).json({ message: "El nombre de usuario ya está en uso" });
        }
        // Valida fortaleza de contraseña
        if (req.body.password && req.body.password.length < 6) {
            return res.status(400).json({ message: "La contraseña debe tener al menos 6 caracteres" });
        }
        next();
    }
    // Validaciones para HealthInsurance
    static async validateHealthInsuranceInput(req, res, next) {
        if (!req.body.name) {
            return res.status(400).json({ message: "El nombre es obligatorio" });
        }
        // Valida nombre único y Id unico
        const existingHI = await orm.em.findOne(HealthInsurance, { name: req.body.name });
        if (existingHI && existingHI.id != Number(req.params.id)) {
            return res.status(400).json({ message: "Ya existe una obra social con ese ID" });
        }
        if (existingHI && existingHI.name != req.body.name) {
            return res.status(400).json({ message: "Ya existe una obra social con ese nombre" });
        }
        next();
    }
    // Validaciones para ConsultationHours
    static async validateConsultationHoursInput(req, res, next) {
        const requiredFields = ['day', 'startTime', 'medic'];
        const validDays = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"];
        const validstartTime = ["07:00", "07:15", "07:30", "07:45", "08:00", "08:15", "08:30", "08:45", "09:00", "09:15", "09:30",
            "09:45", "10:00", "10:15", "10:30", "10:45", "11:00", "11:15", "11:30", "11:45", "12:00",
            "12:15", "12:30", "12:45", "13:00", "13:15", "13:30", "13:45", "14:00", "14:15", "14:30", "14:45", "15:00"];
        for (const field of requiredFields) {
            if (!req.body[field]) {
                return res.status(400).json({ message: `Campo '${field}' es obligatorio` });
            }
        }
        //Validar que el horario no exista para un mismo médico
        const existingHours = await orm.em.findOne(ConsultationHours, { medic: req.body.medic, day: req.body.day, startTime: req.body.startTime });
        if (existingHours) {
            return res.status(400).json({ message: "Ya existe un horario de consulta para este médico en este día y hora" });
        }
        //Validar que el medico exista
        const medic = await orm.em.findOne(Medic, { id: req.body.medic });
        if (!medic) {
            return res.status(404).json({ message: "Médico no encontrado" });
        }
        if (!validstartTime.includes(req.body.startTime)) {
            return res.status(400).json({ message: "Hora de inicio inválida" });
        }
        if (!validDays.includes(req.body.day)) {
            return res.status(400).json({ message: "Día de la semana inválido" });
        }
        next();
    }
    // Validaciones para Attention
    static async validateAttentionInput(req, res, next) {
        const requiredFields = ['date', 'consultationHours', 'patient'];
        for (const field of requiredFields) {
            if (!req.body[field]) {
                return res.status(400).json({ message: `Campo '${field}' es obligatorio` });
            }
        }
        // Validar que la fecha no sea en el pasado
        if (new Date(req.body.date) < new Date()) {
            return res.status(400).json({ message: "La fecha no puede ser en el pasado" });
        }
        // Validar que el paciente exista
        const patient = await orm.em.findOne(Patient, { id: req.body.patient });
        if (!patient) {
            return res.status(404).json({ message: "Paciente no encontrado" });
        }
        // Validar que no se cargue una atencion en un mismo consultationHours para un mismo dia
        const existingAttention = await orm.em.findOne(Attention, { consultationHours: req.body.consultationHours, date: req.body.date });
        if (existingAttention) {
            return res.status(400).json({ message: "Ya existe una atención para este horario de consulta en esta fecha" });
        }
        // Validar que el horario de consulta exista
        const consultationHours = await orm.em.findOne(ConsultationHours, { id: req.body.consultationHours });
        if (!consultationHours) {
            return res.status(404).json({ message: "Horario de consulta no encontrado" });
        }
        next();
    }
    // Validaciones para Secretary
    static async validateSecretaryInput(req, res, next) {
        const requiredFields = ['dni', 'dniType', 'firstname', 'lastname', 'mail', 'username', 'password'];
        const validDniTypes = ['DNI', 'Libreta Civica', 'Pasaporte'];
        // Validar campos requeridos
        for (const field of requiredFields) {
            if (!req.body[field]) {
                return res.status(400).json({ message: `Campo '${field}' es obligatorio` });
            }
        }
        // Validar tipo de DNI
        if (!validDniTypes.includes(req.body.dniType)) {
            return res.status(400).json({ message: "Tipo de DNI inválido" });
        }
        // Validar formato de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(req.body.mail)) {
            return res.status(400).json({ message: "Formato de email inválido" });
        }
        // Validar que el conjunto dniType y dni sean únicos
        const existingSecretaryDni = await orm.em.findOne(Secretary, { dni: req.body.dni, dniType: req.body.dniType });
        if (existingSecretaryDni && existingSecretaryDni.id !== Number(req.params.id)) {
            return res.status(400).json({ message: "Ya existe una secretaria con esta identificacion" });
        }
        // Validar que la fecha de nacimiento no sea en el futuro
        if (req.body.bornDate && new Date(req.body.bornDate) > new Date()) {
            return res.status(400).json({ message: "La fecha de nacimiento no puede ser en el futuro" });
        }
        // Validar username único
        const existingSecretary = await orm.em.findOne(Secretary, { username: req.body.username });
        if (existingSecretary && existingSecretary.id !== Number(req.params.id)) {
            return res.status(400).json({ message: "El nombre de usuario ya está en uso" });
        }
        // Validar email único
        const existingEmail = await orm.em.findOne(Secretary, { mail: req.body.mail });
        if (existingEmail && existingEmail.id !== Number(req.params.id)) {
            return res.status(400).json({ message: "El email ya está en uso" });
        }
        // Validar fortaleza de contraseña
        if (req.body.password && req.body.password.length < 6) {
            return res.status(400).json({ message: "La contraseña debe tener al menos 6 caracteres" });
        }
        // Validar formato de fecha de nacimiento si está presente
        if (req.body.bornDate && isNaN(Date.parse(req.body.bornDate))) {
            return res.status(400).json({ message: "Formato de fecha inválido (use YYYY-MM-DD)" });
        }
        next();
    }
    // Validaciones para Patient
    static async validatePatientInput(req, res, next) {
        const requiredFields = ['dni', 'firstname', 'lastname', 'phoneNumber', 'address', 'email', 'birthDate'];
        // Validar campos requeridos
        for (const field of requiredFields) {
            if (!req.body[field]) {
                return res.status(400).json({ message: `Campo '${field}' es obligatorio` });
            }
        }
        // Validar formato de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(req.body.email)) {
            return res.status(400).json({ message: "Formato de email inválido" });
        }
        // Validar formato de teléfono (ejemplo básico)
        const phoneRegex = /^[0-9]{10,15}$/;
        if (!phoneRegex.test(req.body.phoneNumber)) {
            return res.status(400).json({ message: "Formato de teléfono inválido (solo números, 10-15 dígitos)" });
        }
        // Validar formato de fecha de nacimiento
        if (isNaN(Date.parse(req.body.birthDate))) {
            return res.status(400).json({ message: "Formato de fecha inválido (use YYYY-MM-DD)" });
        }
        // Validar que la fecha de nacimiento no sea en el futuro
        if (new Date(req.body.birthDate) > new Date()) {
            return res.status(400).json({ message: "La fecha de nacimiento no puede ser en el futuro" });
        }
        // Validar DNI único
        const existingPatient = await orm.em.findOne(Patient, { dni: req.body.dni });
        if (existingPatient && existingPatient.id !== Number(req.params.id)) {
            return res.status(400).json({ message: "Ya existe un paciente con este DNI" });
        }
        // Validar email único
        const existingEmail = await orm.em.findOne(Patient, { email: req.body.email });
        if (existingEmail && existingEmail.id !== Number(req.params.id)) {
            return res.status(400).json({ message: "El email ya está en uso" });
        }
        // Validar obra social si está presente
        if (req.body.healthInsurance) {
            const healthInsurance = await orm.em.findOne(HealthInsurance, { id: req.body.healthInsurance });
            if (!healthInsurance) {
                return res.status(404).json({ message: "Obra social no encontrada" });
            }
        }
        next();
    }
    // Validaciones para Specialty
    static async validateSpecialtyInput(req, res, next) {
        const requiredFields = ['code', 'name'];
        const maxNameLength = 100;
        // Valida campos requeridos
        for (const field of requiredFields) {
            if (!req.body[field]) {
                return res.status(400).json({ message: `Campo '${field}' es obligatorio` });
            }
        }
        // Valida que el código sea numérico
        if (isNaN(Number(req.body.code))) {
            return res.status(400).json({ message: "El código debe ser un número válido" });
        }
        // Valida longitud máxima del nombre
        if (req.body.name.length > maxNameLength) {
            return res.status(400).json({
                message: `El nombre no puede exceder los ${maxNameLength} caracteres`
            });
        }
        // Valida código único (solo para creación)
        if (req.method === 'POST') {
            const existingCode = await orm.em.findOne(Specialty, { code: req.body.code });
            if (existingCode) {
                return res.status(400).json({
                    message: "Ya existe una especialidad con este código"
                });
            }
        }
        // Valida nombre único (excepto en actualización del mismo registro)
        const existingName = await orm.em.findOne(Specialty, { name: req.body.name });
        if (existingName && existingName.id !== Number(req.params.id)) {
            return res.status(400).json({
                message: "Ya existe una especialidad con este nombre"
            });
        }
        next();
    }
    // Validaciones para actualizar Specialty (permite que se actualicen solo algunos campos de una especialidad existente)
    static async validateUpdateSpecialtyInput(req, res, next) {
        const validFields = ['code', 'name'];
        const maxNameLength = 100;
        // Validar que al menos un campo válido esté presente
        const hasValidField = validFields.some(field => req.body[field] !== undefined);
        if (!hasValidField) {
            return res.status(400).json({ message: "Al menos uno de los campos 'code' o 'name' es obligatorio" });
        }
        // Validar longitud máxima del nombre
        if (req.body.name && req.body.name.length > maxNameLength) {
            return res.status(400).json({ message: `El nombre no puede exceder los ${maxNameLength} caracteres` });
        }
        // Validar código único (solo para creación)
        if (req.body.code) {
            const existingCode = await orm.em.findOne(Specialty, { code: req.body.code });
            if (existingCode && existingCode.id !== Number(req.params.id)) {
                return res.status(400).json({ message: "Ya existe una especialidad con este código" });
            }
        }
        // Validar nombre único (excepto en actualización del mismo registro)
        if (req.body.name) {
            const existingName = await orm.em.findOne(Specialty, { name: req.body.name });
            if (existingName && existingName.id !== Number(req.params.id)) {
                return res.status(400).json({ message: "Ya existe una especialidad con este nombre" });
            }
        }
        next();
    }
    // Validaciones para actualizar Medic (permite que se actualicen solo algunos campos de un médico existente)
    static async validateUpdateMedicInput(req, res, next) {
        const validFields = ['dni', 'dniType', 'firstname', 'lastname', 'username', 'password', 'specialty'];
        const validDniTypes = ['DNI', 'Libreta Civica', 'Pasaporte'];
        // Validar que al menos un campo válido esté presente
        const hasValidField = validFields.some(field => req.body[field] !== undefined);
        if (!hasValidField) {
            return res.status(400).json({ message: "Al menos uno de los campos 'dni', 'dniType', 'firstname', 'lastname', 'username' o 'password' es obligatorio" });
        }
        // Validar tipo de DNI
        if (req.body.dniType && !validDniTypes.includes(req.body.dniType)) {
            return res.status(400).json({ message: "Tipo de DNI inválido" });
        }
        // Validar DNI único (excepto en actualización del mismo registro)
        if (req.body.dni) {
            const existingMedicDni = await orm.em.findOne(Medic, { dni: req.body.dni, dniType: req.body.dniType });
            if (existingMedicDni && existingMedicDni.id !== Number(req.params.id)) {
                return res.status(400).json({ message: "Ya existe un médico con este DNI" });
            }
        }
        // Validar nombre de usuario único (excepto en actualización del mismo registro)
        if (req.body.username) {
            const existingMedic = await orm.em.findOne(UserBase, { username: req.body.username });
            if (existingMedic && existingMedic.id !== Number(req.params.id)) {
                return res.status(400).json({ message: "El nombre de usuario ya está en uso" });
            }
        }
        // Validar fortaleza de contraseña
        if (req.body.password && req.body.password.length < 6) {
            return res.status(400).json({ message: "La contraseña debe tener al menos 6 caracteres" });
        }
        // Validar especialidad si está presente
        if (req.body.specialty) {
            const specialty = await orm.em.findOne(Specialty, { id: req.body.specialty });
            if (!specialty) {
                return res.status(404).json({ message: "Especialidad no encontrada" });
            }
        }
        next();
    }
    // Validaciones para actualizar HealthInsurance (permite que se actualicen solo algunos campos de una obra social existente)
    static async validateUpdateHealthInsuranceInput(req, res, next) {
        const validFields = ['name'];
        // Validar que al menos un campo válido esté presente
        const hasValidField = validFields.some(field => req.body[field] !== undefined);
        if (!hasValidField) {
            return res.status(400).json({ message: "Al menos uno de los campos 'name' es obligatorio" });
        }
        // Validar nombre único (excepto en actualización del mismo registro)
        if (req.body.name) {
            const existingHI = await orm.em.findOne(HealthInsurance, { name: req.body.name });
            if (existingHI && existingHI.id !== Number(req.params.id)) {
                return res.status(400).json({ message: "Ya existe una obra social con ese nombre" });
            }
        }
        next();
    }
    // Validacion para secretary (igual que las otras) pero permite actualizar al menos un campo
    static async validateUpdateSecretaryInput(req, res, next) {
        const validFields = ['dni', 'dniType', 'firstname', 'lastname', 'mail', 'username', 'password', 'bornDate'];
        const validDniTypes = ['DNI', 'Libreta Civica', 'Pasaporte'];
        // Validar que al menos un campo válido esté presente
        const hasValidField = validFields.some(field => req.body[field] !== undefined);
        if (!hasValidField) {
            return res.status(400).json({ message: "Al menos uno de los campos 'dni', 'dniType', 'firstname', 'lastname', 'mail', 'username' o 'password' es obligatorio" });
        }
        // Validar tipo de DNI
        if (req.body.dniType && !validDniTypes.includes(req.body.dniType)) {
            return res.status(400).json({ message: "Tipo de DNI inválido" });
        }
        // Validar formato de email
        if (req.body.mail) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(req.body.mail)) {
                return res.status(400).json({ message: "Formato de email inválido" });
            }
        }
        // Validar que el conjunto dniType y dni sean únicos (excepto en actualización del mismo registro)
        if (req.body.dni && req.body.dniType) {
            const existingSecretaryDni = await orm.em.findOne(Secretary, { dni: req.body.dni, dniType: req.body.dniType });
            if (existingSecretaryDni && existingSecretaryDni.id !== Number(req.params.id)) {
                return res.status(400).json({ message: "Ya existe una secretaria con esta identificacion" });
            }
        }
        // Validar que la fecha de nacimiento no sea en el futuro
        if (req.body.bornDate && new Date(req.body.bornDate) > new Date()) {
            return res.status(400).json({ message: "La fecha de nacimiento no puede ser en el futuro" });
        }
        // Validar username único
        const existingSecretary = await orm.em.findOne(Secretary, { username: req.body.username });
        if (existingSecretary && existingSecretary.id !== Number(req.params.id)) {
            return res.status(400).json({ message: "El nombre de usuario ya está en uso" });
        }
        // Validar email único
        const existingEmail = await orm.em.findOne(Secretary, { mail: req.body.mail });
        if (existingEmail && existingEmail.id !== Number(req.params.id)) {
            return res.status(400).json({ message: "El email ya está en uso" });
        }
        // Validar fortaleza de contraseña
        if (req.body.password && req.body.password.length < 6) {
            return res.status(400).json({ message: "La contraseña debe tener al menos 6 caracteres" });
        }
        // Validar formato de fecha de nacimiento si está presente
        if (req.body.bornDate && isNaN(Date.parse(req.body.bornDate))) {
            return res.status(400).json({ message: "Formato de fecha inválido (use YYYY-MM-DD)" });
        }
        next();
    }
    // Validaciones para ConsultationHours (igual que las otras) pero permite actualizar al menos un campo
    static async validateUpdateConsultationHoursInput(req, res, next) {
        const validFields = ['day', 'startTime', 'medic'];
        const validDays = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"];
        const validstartTime = ["07:00", "07:15", "07:30", "07:45", "08:00", "08:15", "08:30", "08:45", "09:00", "09:15", "09:30",
            "09:45", "10:00", "10:15", "10:30", "10:45", "11:00", "11:15", "11:30", "11:45", "12:00",
            "12:15", "12:30", "12:45", "13:00", "13:15", "13:30", "13:45", "14:00", "14:15", "14:30",
            "14:45", "15:00"];
        // Validar que al menos un campo válido esté presente
        const hasValidField = validFields.some(field => req.body[field] !== undefined);
        if (!hasValidField) {
            return res.status(400).json({ message: `Al menos uno de los campos 'day', 'startTime' o 'medic' es obligatorio` });
        }
        // Validar que el horario no exista para un mismo médico (excepto en actualización del mismo registro)
        if (req.body.medic && req.body.day && req.body.startTime) {
            const existingHours = await orm.em.findOne(ConsultationHours, { medic: req.body.medic, day: req.body.day, startTime: req.body.startTime });
            if (existingHours && existingHours.id !== Number(req.params.id)) {
                return res.status(400).json({ message: `Ya existe un horario de consulta para este médico en este día y hora` });
            }
        }
        //Validar que el medico exista
        const medic = await orm.em.findOne(Medic, { id: req.body.medic });
        if (!medic) {
            return res.status(404).json({ message: "Médico no encontrado" });
        }
        if (!validstartTime.includes(req.body.startTime)) {
            return res.status(400).json({ message: "Hora de inicio inválida" });
        }
        if (!validDays.includes(req.body.day)) {
            return res.status(400).json({ message: "Día de la semana inválido" });
        }
        next();
    }
    // Validaciones para Patient (igual que las otras) pero permite actualizar al menos un campo
    static async validateUpdatePatientInput(req, res, next) {
        const validFields = ['dni', 'firstname', 'lastname', 'phoneNumber', 'address', 'email', 'birthDate', 'healthInsurance'];
        // Validar que al menos un campo válido esté presente
        const hasValidField = validFields.some(field => req.body[field] !== undefined);
        if (!hasValidField) {
            return res.status(400).json({ message: "Al menos uno de los campos 'dni', 'firstname', 'lastname', 'phoneNumber', 'address', 'email' o 'birthDate' es obligatorio" });
        }
        // Validar formato de email
        if (req.body.email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(req.body.email)) {
                return res.status(400).json({ message: "Formato de email inválido" });
            }
        }
        // Validar formato de teléfono (ejemplo básico)
        if (req.body.phoneNumber) {
            const phoneRegex = /^[0-9]{10,15}$/;
            if (!phoneRegex.test(req.body.phoneNumber)) {
                return res.status(400).json({ message: "Formato de teléfono inválido (solo números, 10-15 dígitos)" });
            }
        }
        // Validar formato de fecha de nacimiento
        if (req.body.birthDate && isNaN(Date.parse(req.body.birthDate))) {
            return res.status(400).json({ message: "Formato de fecha inválido (use YYYY-MM-DD)" });
        }
        // Validar que la fecha de nacimiento no sea en el futuro
        if (req.body.birthDate && new Date(req.body.birthDate) > new Date()) {
            return res.status(400).json({ message: "La fecha de nacimiento no puede ser en el futuro" });
        }
        // Validar DNI único (excepto en actualización del mismo registro)
        if (req.body.dni) {
            const existingPatient = await orm.em.findOne(Patient, { dni: req.body.dni });
            if (existingPatient && existingPatient.id !== Number(req.params.id)) {
                return res.status(400).json({ message: "Ya existe un paciente con este DNI" });
            }
        }
        // Validar email único (excepto en actualización del mismo registro)
        if (req.body.email) {
            const existingEmail = await orm.em.findOne(Patient, { email: req.body.email });
            if (existingEmail && existingEmail.id !== Number(req.params.id)) {
                return res.status(400).json({ message: "El email ya está en uso" });
            }
        }
        // Validar obra social si está presente
        if (req.body.healthInsurance) {
            const healthInsurance = await orm.em.findOne(HealthInsurance, { id: req.body.healthInsurance });
            if (!healthInsurance) {
                return res.status(404).json({ message: "Obra social no encontrada" });
            }
        }
        next();
    }
}
//# sourceMappingURL=validator.js.map