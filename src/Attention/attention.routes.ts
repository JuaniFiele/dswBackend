import { Router } from "express";
import {
  findAll,
  findOne,
  add,
  update,
  remove,
  findAllByID,
  obtenerFechasOcupadas,
  getAttentionsByDate,
} from "./attention.controller.js";
import validateRole from "../shared/validateRole.js";

export const AttentionRoutes = Router()
// hay que ver bien cuales son para medico y cuales para secretaria
AttentionRoutes.get('/', findAll)

AttentionRoutes.get('/:id', findOne)

AttentionRoutes.post('/', add)

AttentionRoutes.put('/:id', update)

AttentionRoutes.patch('/:id', update)

AttentionRoutes.delete('/:id',)

AttentionRoutes.get("/unavailable-dates/:medicoId", obtenerFechasOcupadas)

AttentionRoutes.get("/unavailable-hours/:date", getAttentionsByDate);

AttentionRoutes.get('/ByPatient/:patientId', findAllByID)