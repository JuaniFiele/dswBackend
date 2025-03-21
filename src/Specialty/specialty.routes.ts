import { Router } from "express";
import { findAll, findOne, add, update, remove } from "./specialty.controller.js";
import validateRole from "../shared/validateRole.js";

export const SpecialtyRouter = Router()

SpecialtyRouter.get('/', findAll) //Esto hay que modificarlo para que solo lo pueda ver el secretario

SpecialtyRouter.get('/:id',validateRole('secretary'), findOne)

SpecialtyRouter.post('/',validateRole('secretary'), add)

SpecialtyRouter.put('/:id',validateRole('secretary'), update)

SpecialtyRouter.patch('/:id',validateRole('secretary'), update)

SpecialtyRouter.delete('/:id',validateRole('secretary'), remove)