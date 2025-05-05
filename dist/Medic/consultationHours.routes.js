import { Router } from "express";
import { sanitizeHealthInsuranceInput, findAll, findOne, add, update, remove } from "./consultationHours.controller.js";
import validateRole from "../shared/validateRole.js";
import { Validator } from "../shared/Validator/validator.js";
export const ConsultationHoursRouter = Router();
ConsultationHoursRouter.get('/', findAll);
ConsultationHoursRouter.get('/:id', Validator.validateIdParam, findOne);
ConsultationHoursRouter.post('/', validateRole(['secretary']), sanitizeHealthInsuranceInput, Validator.validateConsultationHoursInput, add);
ConsultationHoursRouter.put('/:id', validateRole(['secretary']), sanitizeHealthInsuranceInput, Validator.validateIdParam, Validator.validateUpdateConsultationHoursInput, update);
ConsultationHoursRouter.patch('/:id', validateRole(['secretary']), sanitizeHealthInsuranceInput, Validator.validateIdParam, Validator.validateUpdateConsultationHoursInput, update);
ConsultationHoursRouter.delete('/:id', validateRole(['secretary']), Validator.validateIdParam, remove);
//# sourceMappingURL=consultationHours.routes.js.map