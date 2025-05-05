import { Router } from "express";
import { findAll, findOne, add, update, remove } from "./specialty.controller.js";
import validateRole from "../shared/validateRole.js";
import { Validator } from "../shared/Validator/validator.js";
export const SpecialtyRouter = Router();
SpecialtyRouter.get('/', findAll, validateRole(['secretary'])); //Esto hay que modificarlo para que solo lo pueda ver el secretario
SpecialtyRouter.get('/:id', validateRole(['secretary']), Validator.validateIdParam, findOne);
SpecialtyRouter.post('/', validateRole(['secretary']), Validator.validateSpecialtyInput, add);
SpecialtyRouter.put('/:id', validateRole(['secretary']), Validator.validateIdParam, Validator.validateUpdateSpecialtyInput, update);
SpecialtyRouter.patch('/:id', validateRole(['secretary']), Validator.validateIdParam, Validator.validateUpdateSpecialtyInput, update);
SpecialtyRouter.delete('/:id', validateRole(['secretary']), Validator.validateIdParam, remove);
//# sourceMappingURL=specialty.routes.js.map