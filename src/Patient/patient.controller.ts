import { Request, Response, NextFunction } from "express";
import { orm } from "../shared/orm.js";
import { Patient } from "./patient.entity.js";

const em = orm.em
em.getRepository(Patient)

async function findAll(req: Request, res: Response) {
    try{
        const patients = await em.find(Patient, {}, {populate: ['healthInsurance']})
        res.status(200).json({message: "Found all Patients", data: patients})
    }
    catch(error: any){
        res.status(500).json({message: error.message})
    }
}

async function findOne(req: Request, res: Response) {
    try{
        const id = Number.parseInt(req.params.id)
        const aPatient = await em.findOneOrFail(Patient, {id}, {populate: ["healthInsurance"]})
        res.status(200).json({message: "Character Found", data: aPatient})
    }
    catch(error: any){
        res.status(500).json({message: error.message})
    }
}
async function findOneByDni(req: Request, res: Response) {
    try {
        const dni = req.params.dni; // Suponiendo que el DNI se pasa como parámetro en la URL
        
        // Busca el paciente por dni utilizando `findOne` en lugar de `findOneOrFail`
        const aPatient = await em.findOne(Patient, { dni }, { populate: ["healthInsurance"] });

        // Verifica si se encontró un paciente
        if (!aPatient) {
            return res.status(404).json({ message: "Patient not found" });
        }

        res.status(200).json({ message: "Patient Found", data: aPatient });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}

async function add(req: Request, res: Response) {
    try{
        const aNewPatient = em.create(Patient, req.body)
        await em.flush()
        res.status(201).json({message: "Patient created", data: aNewPatient})
    }
    catch(error: any){
        res.status(500).json({message: error.message})
    }
}

async function update(req: Request, res: Response) {
    try{
        const id = Number.parseInt(req.params.id)
        const aPatientToUpdate = await em.findOneOrFail(Patient, {id})
        em.assign(aPatientToUpdate, req.body)
        await em.flush()
        res.status(200).json({message: "Patient updated", data: aPatientToUpdate})
    }
    catch(error: any){
        res.status(500).json({message: error.message})
    }
}

async function remove(req: Request, res: Response) {
    try{
        const id = Number.parseInt(req.params.id)
        const aPatient = await em.findOneOrFail(Patient, {id})
        await em.removeAndFlush(aPatient)
        res.status(200).json({message: "Patient deleted", data: aPatient})
    }
    catch(error : any){
        res.status(500).json({message: error.message})
    
    }
}

export {findAll, findOne, add, update, remove, findOneByDni}