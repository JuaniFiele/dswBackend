import { Request, Response, NextFunction } from "express";
import { orm } from "../shared/orm.js";
import { Secretary } from "./secretary.entity.js";

const em = orm.em
em.getRepository(Secretary)

async function findAll(req: Request, res: Response) {
  try {
    const secretaries = await em.find(Secretary, {})
    res.json({ message: 'Finded all secretaries classes', data: secretaries })
  }
  catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

async function findOne(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id);
    const secretary = await em.findOneOrFail(Secretary, { id });
    res.status(200).json({ message: 'Found secretary', data: secretary });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function add(req: Request, res: Response) {
  try {
    const secretary = em.create(Secretary, req.body)
    await em.flush()
    res.status(201).json({ message: 'Secretary created', data: secretary })
  }
  catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

async function update(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id)
    const secretary = em.getReference(Secretary, id)
    em.assign(secretary, req.body)
    await em.flush()
    res.status(200).json({ message: 'Secretary updated', data: secretary })
  }
  catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

async function remove(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id)
    const secretary = em.getReference(Secretary, id)
    await em.removeAndFlush(secretary)
    res.status(200).json({ message: 'Secretary deleted', data: secretary })
  }
  catch (error: any) {
    res.status(500).json({ message: error.message })

  }
}

export { findAll, findOne, add, update, remove }