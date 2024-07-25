import { Router } from "express";
import { sanitizeClinicHistoryInput, findAll, findOne, add, update, remove } from "./clinichistory.controllers.js";

export const clinicHistoryRouter = Router()

clinicHistoryRouter.get('/', findAll)
clinicHistoryRouter.get('/:nro', findOne)
clinicHistoryRouter.post('/', sanitizeClinicHistoryInput, add )
clinicHistoryRouter.put('/:nro',sanitizeClinicHistoryInput, update)
clinicHistoryRouter.patch('/:nro',sanitizeClinicHistoryInput, update)
clinicHistoryRouter.delete('/:nro', remove)