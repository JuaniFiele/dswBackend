import { Request, Response, NextFunction } from "express";
import { orm } from "../shared/orm.js";
import { Attention } from "./attention.entity.js";
import { Patient } from "../Patient/patient.entity.js";

const em = orm.em
em.getRepository(Attention)

async function findAll(req: Request, res: Response) {
    try{
        const attentions = await em.find(Attention, {}, {populate: ['patient']})
        res.status(200).json({message: "Found all Attentions", data: attentions})
    }
    catch(error: any){
        res.status(500).json({message: error.message})
    }
}

async function findOne(req: Request, res: Response) {
    try{
        const id = Number.parseInt(req.params.id)
        const aattention = await em.findOneOrFail(Attention, {id}, {populate: ["patient"]})
        res.status(200).json({message: "Attention Found", data: aattention})
    }
    catch(error: any){
        res.status(500).json({message: error.message})
    }
}

async function findAttentionsByDni(req: Request, res: Response) {
    try {
        const dni = req.params.dni;

        // Obtiene el repositorio de Patient
        const patientRepository = orm.em.getRepository(Patient);

        // Busca el paciente por su DNI para obtener su ID
        const patient = await patientRepository.findOne({ dni }); // Asegúrate de que la propiedad DNI esté definida en Patient

        // Verifica si se encontró el paciente
        if (!patient) {
            return res.status(404).json({ message: "Paciente no encontrado" });
        }

        // Obtiene el ID del paciente
        const patientId = patient.id;

        // Obtiene el repositorio de Attention
        const attentionRepository = orm.em.getRepository(Attention);

        // Busca todas las atenciones relacionadas con el paciente usando su ID
        const attentions = await attentionRepository.find(
            { patient: { id: patientId } }, // Usa el ID del paciente para buscar las atenciones
            { populate: ["patient"] }
        );

        // Verifica si se encontraron atenciones para el paciente
        if (!attentions || attentions.length === 0) {
            return res.status(404).json({ message: "No se encontraron atenciones para este paciente" });
        }

        res.status(200).json({ message: "Atenciones encontradas", data: attentions });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}

async function add(req: Request, res: Response) {
    try{
        const aattention = em.create(Attention, req.body)
        await em.flush()
        res.status(201).json({message: "Attention created", data: aattention})
    }
    catch(error: any){
        res.status(500).json({message: error.message})
    }
}

async function update(req: Request, res: Response) {
    try{
        const id = Number.parseInt(req.params.id)
        const aattention = await em.findOneOrFail(Attention, {id})
        em.assign(aattention, req.body)
        await em.flush()
        res.status(200).json({message: "Attention updated", data: aattention})
    }
    catch(error: any){
        res.status(500).json({message: error.message})
    }
}

async function remove(req: Request, res: Response) {
    try{
        const id = Number.parseInt(req.params.id)
        const aattention = await em.findOneOrFail(Attention, {id})
        await em.removeAndFlush(aattention)
        res.status(200).json({message: "Attention deleted", data: aattention})
    }
    catch(error : any){
        res.status(500).json({message: error.message})
    
    }
}

export {findAll, findOne, add, update, remove, findAttentionsByDni}