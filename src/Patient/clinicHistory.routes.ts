import { Router } from "express";
import { sanitizeClinicHistoryInput, findAll, findOne, add, update, remove } from "./clinicHistory.controller.js";

export const clinicHistoryRouter = Router()

clinicHistoryRouter.get('/', findAll)
clinicHistoryRouter.get('/:id', findOne)
clinicHistoryRouter.post('/', sanitizeClinicHistoryInput, add )
clinicHistoryRouter.put('/:id',sanitizeClinicHistoryInput, update)
clinicHistoryRouter.patch('/:id',sanitizeClinicHistoryInput, update)
clinicHistoryRouter.delete('/:id', remove)