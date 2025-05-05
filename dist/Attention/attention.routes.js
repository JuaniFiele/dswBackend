import { Router } from "express";
import { findAll, findOne, add, update, remove, obtenerFechasOcupadas, getAttentionsByDate, } from "./attention.controller.js";
import validateRole from "../shared/validateRole.js";
import { Validator } from "../shared/Validator/validator.js";
export const AttentionRoutes = Router();
// hay que ver bien cuales son para medico y cuales para secretaria
AttentionRoutes.get('/', findAll, validateRole(['medic', 'secretary']));
AttentionRoutes.get('/:id', validateRole(['medic', 'secretary']), Validator.validateIdParam, findOne);
AttentionRoutes.post('/', validateRole(['secretary']), Validator.validateAttentionInput, add);
AttentionRoutes.put('/:id', validateRole(['medic', 'secretary']), update);
AttentionRoutes.patch('/:id', validateRole(['medic', 'secretary']), update);
AttentionRoutes.delete('/:id', Validator.validateIdParam, validateRole(['secretary']), remove);
AttentionRoutes.get("/unavailable-dates/:medicoId", Validator.validateIdParam, obtenerFechasOcupadas);
AttentionRoutes.get("/unavailable-hours/:date", getAttentionsByDate);
//# sourceMappingURL=attention.routes.js.map