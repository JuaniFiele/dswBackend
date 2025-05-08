import { Router } from "express";
import { findAll, findOne, add, update, remove, findOneByDni , getAttentionsForOneMedic} from "./patient.controller.js";
import validateRole from "../shared/validateRole.js";
import { Validator } from "../shared/Validator/validator.js";
export const PatientRouter = Router()

PatientRouter.get('/', findAll)
// PatientRouter.get('/:Id/attentions', findAttentionsByID) 

PatientRouter.get('/:id',validateRole(['secretary']), Validator.validateIdParam, findOne)

PatientRouter.get('/dni/:dni',validateRole(['medic', 'secretary']), findOneByDni)

PatientRouter.get('/:patientId/attentions', validateRole(['medic']), getAttentionsForOneMedic)

PatientRouter.post('/',validateRole(['medic', 'secretary']), Validator.validatePatientInput,add)

PatientRouter.put('/:id',validateRole(['medic', 'secretary']), Validator.validateIdParam, Validator.validateUpdatePatientInput, update)

PatientRouter.patch('/:id',validateRole(['medic', 'secretary']), Validator.validateIdParam, Validator.validateUpdatePatientInput, update)

PatientRouter.delete('/:id',validateRole(['secretary']), Validator.validateIdParam, remove)
