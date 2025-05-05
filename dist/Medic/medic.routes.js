import { Router } from "express";
import { findAll, findOne, add, update, remove } from "./medic.controler.js";
import validateRole from "../shared/validateRole.js";
import { Validator } from "../shared/Validator/validator.js";
export const MedicRouter = Router();
MedicRouter.get('/', validateRole(['secretary']), findAll);
MedicRouter.get('/:id', validateRole(['secretary']), Validator.validateIdParam, findOne);
MedicRouter.post('/', validateRole(['secretary']), Validator.validateMedicInput, add);
MedicRouter.put('/:id', validateRole(['secretary']), Validator.validateIdParam, Validator.validateUpdateMedicInput, update);
MedicRouter.patch('/:id', validateRole(['secretary']), Validator.validateIdParam, Validator.validateUpdateMedicInput, update);
MedicRouter.delete('/:id', validateRole(['secretary']), Validator.validateIdParam, remove);
//# sourceMappingURL=medic.routes.js.map