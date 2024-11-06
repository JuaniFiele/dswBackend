import { Router } from "express";
import { findAll, findOne, add, update, remove, findAllByDni } from "./attention.controller.js";
import { Attention } from "./attention.entity.js";

export const AttentionRoutes = Router()

AttentionRoutes.get('/', findAll)

AttentionRoutes.get('/:dni', findAllByDni)

AttentionRoutes.get('/:id', findOne)

AttentionRoutes.post('/', add)

AttentionRoutes.put('/:id', update)

AttentionRoutes.patch('/:id', update)

AttentionRoutes.delete('/:id', remove)
