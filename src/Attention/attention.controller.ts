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

async function cancelAttention(req: Request, res: Response) {
    const em = orm.em.fork();
    await em.begin();

    try {
        const attention = await em.findOneOrFail(Attention, { 
            id: Number(req.params.id) 
        }, { 
            populate: ['consultationHours'] 
        });

        if (attention.dateCancelled) {
            throw new Error("La atención ya fue cancelada");
        }

        if (attention.consultationHours) {
            attention.consultationHours.isAvailable = true;
            em.persist(attention.consultationHours);
        }

        attention.dateCancelled = new Date();
        await em.commit();
        
        res.status(200).json({ 
            success: true,
            data: attention 
        });

    } catch (error: unknown) {
        await em.rollback();
        
        // Verificar si es un Error estándar
        const errorMessage = error instanceof Error 
            ? error.message 
            : "Error desconocido al cancelar";
        
        res.status(500).json({ 
            success: false,
            error: errorMessage
        });
    }
}

export {cancelAttention, findAll, findOne, add, update, remove}