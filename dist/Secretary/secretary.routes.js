import { Router } from "express";
import { findAll, findOne, add, update, remove } from "./secretary.controller.js";
import validateRole from "../shared/validateRole.js";
import { Validator } from "../shared/Validator/validator.js";
export const SecretaryRouter = Router();
SecretaryRouter.get('/', validateRole(['secretary']), findAll);
SecretaryRouter.get('/:id', validateRole(['secretary']), Validator.validateIdParam, findOne);
SecretaryRouter.post('/', validateRole(['secretary']), Validator.validateSecretaryInput, add);
SecretaryRouter.put('/:id', validateRole(['secretary']), Validator.validateIdParam, Validator.validateUpdateSecretaryInput, update);
SecretaryRouter.patch('/:id', validateRole(['secretary']), Validator.validateIdParam, Validator.validateUpdateSecretaryInput, update);
SecretaryRouter.delete('/:id', validateRole(['secretary']), Validator.validateIdParam, remove);
//# sourceMappingURL=secretary.routes.js.map