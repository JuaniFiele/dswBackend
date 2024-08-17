import { Request, Response, NextFunction } from "express";
import { orm } from "../shared/orm.js";
import { Patient } from "./schedule.entity.js";

const em = orm.em
em.getRepository(Schedule)

async function findAll(req: Request, res: Response) {
    try{
        const schedules = await em.find(Schedule, {}, {populate: ['medic']})
        res.status(200).json({message: "Found all Patients", data: schedules})
    }
    catch(error: any){
        res.status(500).json({message: error.message})
    }
}

async function findOne(req: Request, res: Response) {
    try{
        const id = Number.parseInt(req.params.id)
        const aSchedule = await em.findOneOrFail(Patient, {id}, {populate: ["medic"]})
        res.status(200).json({message: "Character Found", data: aSchedule})
    }
    catch(error: any){
        res.status(500).json({message: error.message})
    }
}

async function add(req: Request, res: Response) {
    try{
        const aNewSchedule = em.create(Schedule, req.body)
        await em.flush()
        res.status(201).json({message: "Schedule created", data: aNewSchedule})
    }
    catch(error: any){
        res.status(500).json({message: error.message})
    }
}

async function update(req: Request, res: Response) {
    try{
        const id = Number.parseInt(req.params.id)
        const aScheduleToUpdate = await em.findOneOrFail(Schedule, {id})
        em.assign(aScheduleToUpdate, req.body)
        await em.flush()
        res.status(200).json({message: "Schedule updated", data: aScheduleToUpdate})
    }
    catch(error: any){
        res.status(500).json({message: error.message})
    }
}

async function remove(req: Request, res: Response) {
    try{
        const id = Number.parseInt(req.params.id)
        const aSchedule = await em.findOneOrFail(Schedule, {id})
        await em.removeAndFlush(aSchedule)
        res.status(200).json({message: "Schedule deleted", data: aSchedule})
    }
    catch(error : any){
        res.status(500).json({message: error.message})
    
    }
}

export {findAll, findOne, add, update, remove}