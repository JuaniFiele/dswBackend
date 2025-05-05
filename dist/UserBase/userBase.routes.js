import { Router } from "express";
import { login } from "./userBase.controller.js";
import { findOne } from "./userBase.controller.js";
import validateRole from "../shared/validateRole.js";
import { Validator } from "../shared/Validator/validator.js";
export const UserBaseRouter = Router();
UserBaseRouter.post('/', login);
UserBaseRouter.get('/:id', validateRole(['secretary']), Validator.validateIdParam, findOne);
//# sourceMappingURL=userBase.routes.js.map