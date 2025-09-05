import { Router } from "express";
import { findAll, findOne, add, update, remove, findOneByDni, getAttentionsForOneMedic } from "./patient.controller.js";
import validateRole from "../shared/validateRole.js";

export const PatientRouter = Router()

PatientRouter.get('/', findAll)
// PatientRouter.get('/:Id/attentions', findAttentionsByID) 

PatientRouter.get('/:id', findOne)

PatientRouter.get('/dni/:dni', findOneByDni)

PatientRouter.get('/:patientId/attentions', getAttentionsForOneMedic)

PatientRouter.post('/', add)

PatientRouter.put('/:id', update)

PatientRouter.patch('/:id', update)

PatientRouter.delete('/:id', remove)
