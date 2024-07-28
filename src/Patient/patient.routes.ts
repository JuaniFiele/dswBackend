import { Router } from "express";
import {findAll, findOne, add , update, remove} from "./patient.controller.js";

export const PatientRouter = Router()

PatientRouter.get('/', findAll)

PatientRouter.get('/:id', findOne)

PatientRouter.post('/', add)

PatientRouter.put('/:id', update)

PatientRouter.patch('/:id', update)

PatientRouter.delete('/:id', remove)
