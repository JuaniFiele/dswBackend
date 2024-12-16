import { Router } from "express";
import { findAll, findOne, add, update, remove } from "./medic.controler.js";
import validateRole from "../shared/validateRole.js";

export const MedicRouter = Router()

MedicRouter.get('/',validateRole('secretary'), findAll)
MedicRouter.get('/:id', findOne)
MedicRouter.post('/', add )
MedicRouter.put('/:id', update)
MedicRouter.patch('/:id', update)
MedicRouter.delete('/:id', remove)
