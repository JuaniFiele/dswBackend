import { Request, Response, NextFunction } from "express";
import { orm } from "../shared/orm.js";
import { Medic } from "./medic.entity.js";

const em = orm.em
em.getRepository(Medic)

async function findAll(req: Request, res: Response) {
    try {
        const medics = await em.find(Medic, {}, { populate: ['specialty'] })
        res.json({ data: medics })
    }
    catch (error: any) {
        res.status(500).json({ message: error.message })
    }
}

async function findOne(req: Request, res: Response) {
    try {
        const id = Number.parseInt(req.params.id);
        const medic = await em.findOneOrFail(Medic, { id });
        res.status(200).json({ message: 'Found Medic', data: medic });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}

async function add(req: Request, res: Response) {
    try {
        const medic = em.create(Medic, req.body)
        await em.flush()
        res.status(201).json({ message: 'Medic created', data: medic })
    }
    catch (error: any) {
        res.status(500).json({ message: error.message })
    }
}

async function update(req: Request, res: Response) {
    try {
        const id = Number.parseInt(req.params.id)
        const medic = await em.getReference(Medic, id)
        em.assign(medic, req.body)
        await em.flush()
        res.status(200).json({ message: 'Medic updated', data: medic })
    }
    catch (error: any) {
        res.status(500).json({ message: error.message })
    }
}

async function remove(req: Request, res: Response) {
    try {
        const id = Number.parseInt(req.params.id)
        const medic = em.getReference(Medic, id)
        await em.removeAndFlush(medic)
        res.status(200).json({ message: 'Medic deleted', data: medic })
    }
    catch (error: any) {
        res.status(500).json({ message: error.message })

    }
}

export { findAll, findOne, add, update, remove }