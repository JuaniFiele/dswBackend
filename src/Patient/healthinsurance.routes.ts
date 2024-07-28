import { Router } from "express";
import { sanitizeHealthInsuranceInput, findAll, findOne, add , update, remove} from "./healthinsurance.controller.js";

export const HealthInsuranceRouter = Router()

HealthInsuranceRouter.get('/', findAll)

HealthInsuranceRouter.get('/:id', findOne)

HealthInsuranceRouter.post('/',sanitizeHealthInsuranceInput, add)

HealthInsuranceRouter.put('/:id', sanitizeHealthInsuranceInput, update)

HealthInsuranceRouter.patch('/:id',sanitizeHealthInsuranceInput, update)

HealthInsuranceRouter.delete('/:id', remove)