import { Request, Response, NextFunction } from "express";
import { ClinicHistory } from "./clinicHistory.entity.js";
import { orm } from "../shared/orm.js";

const em = orm.em
em.getRepository(ClinicHistory)


function sanitizeClinicHistoryInput(req: Request, res: Response, next: NextFunction){

    req.body.sanitizedInput = {
        grupoSanguineo: req.body.grupoSanguineo,
        antecedentesPersonales: req.body.antecedentesPersonales,
        antecedentesFamiliares: req.body.antecedentesFamiliares
    } 

    //validar info traida (validar info maliciosa, tipo de dato, etc...)
     //Validamos que los campos no sean undefined ( para el patch)
    Object.keys(req.body.sanitizedInput).forEach((key) => {
        if (req.body.sanitizedInput[key] === undefined) {
          delete req.body.sanitizedInput[key]
        }
      })
    next()
}



async function findAll(req: Request, res: Response) {
    try{
        const clinicHistorys = await em.find(ClinicHistory, {})
        res.status(200).json({message: "Found all HealthInsurances", data: clinicHistorys})
    }
    catch(error: any){
        res.status(500).json({message: error.message})
    }
}

async function findOne(req: Request, res: Response) {
    try{
        const id = Number.parseInt(req.params.id)
        const aClinicHistory = await em.findOneOrFail(ClinicHistory, {id})
        
        res.status(200).json({message: "Health Insurance Found", data: aClinicHistory})
    }
    catch(error: any){
        res.status(500).json({message: error.message})
    }
}

async function add(req: Request, res: Response) {
    try{
        const aNewClinicHistory = em.create(ClinicHistory, req.body.sanitizedInput)
        await em.flush()
        res.status(201).json({message: "Patient created", data: aNewClinicHistory})
    }
    catch(error: any){
        res.status(500).json({message: error.message, data: req.body})
    }
}

async function update(req: Request, res: Response) {
    try{
        const id = Number.parseInt(req.params.id)
        const aClinicHistory =  em.getReference(ClinicHistory, id)
        em.assign(aClinicHistory, req.body.sanitizedInput)
        await em.flush()
        res.status(200).json({message: "Health Insurance updated", data: aClinicHistory})
    }
    catch(error: any){
        res.status(500).json({message: error.message})
    }
}

async function remove(req: Request, res: Response) {
    try{
        const id = Number.parseInt(req.params.id)
        const aClinicHistory =  em.getReference(ClinicHistory, id)
        await em.removeAndFlush(aClinicHistory)
        res.status(200).json({message: "Health Insurance removed", data: aClinicHistory})
    }
    catch(error : any){
        res.status(500).json({message: error.message})
    
    }
}

export {sanitizeClinicHistoryInput, findAll, findOne, add, update, remove}