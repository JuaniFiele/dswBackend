import { Router } from "express";
import { sanitizeMedicInput, findAll, findOne, add, update, remove } from "./medic.controler.js";

export const MedicRouter = Router()

MedicRouter.get('/', findAll)
MedicRouter.get('/:dni', findOne)
MedicRouter.post('/', sanitizeMedicInput, add )
MedicRouter.put('/:dni',sanitizeMedicInput, update)
MedicRouter.patch('/:dni',sanitizeMedicInput, update)
MedicRouter.delete('/:dni', remove)
