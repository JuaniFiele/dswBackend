import { Request, Response, NextFunction } from "express";
import { orm } from "../shared/orm.js";
import { Attention } from "./attention.entity.js";

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

async function findAllByDni(req: Request, res: Response) {
    const { dni } = req.params; // Suponiendo que el DNI se pasa como parámetro en la URL

    try {
        const attentions = await em.find(Attention, { patient: { dni } }, { populate: ['patient'] });
        res.status(200).json({ message: "Found all Attentions for patient", data: attentions });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
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

export { findAll, findOne, add, update, remove, findAllByDni }