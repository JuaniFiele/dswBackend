import { Router } from "express";
import {findAll, findOne, add , update, remove, cancelAttention} from "./attention.controller.js";

export const AttentionRoutes = Router()

AttentionRoutes.get('/', findAll)

AttentionRoutes.get('/:id', findOne)

AttentionRoutes.post('/', add)

AttentionRoutes.put('/:id', update)

AttentionRoutes.patch('/:id', update)

AttentionRoutes.delete('/:id', remove)

AttentionRoutes.patch("/:id/cancel", cancelAttention)