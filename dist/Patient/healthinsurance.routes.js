import { Router } from "express";
import { findAll, findOne, add, update, remove } from "./healthinsurance.controller.js";
import { Validator } from "../shared/Validator/validator.js";
export const HealthInsuranceRouter = Router();
HealthInsuranceRouter.get('/', findAll);
HealthInsuranceRouter.get('/:id', Validator.validateIdParam, findOne);
HealthInsuranceRouter.post('/', Validator.validateHealthInsuranceInput, add);
HealthInsuranceRouter.put('/:id', Validator.validateIdParam, Validator.validateUpdateHealthInsuranceInput, update);
HealthInsuranceRouter.patch('/:id', Validator.validateIdParam, Validator.validateUpdateHealthInsuranceInput, update);
HealthInsuranceRouter.delete('/:id', Validator.validateIdParam, remove);
//# sourceMappingURL=healthinsurance.routes.js.map