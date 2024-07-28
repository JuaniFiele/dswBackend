import { Router } from "express";
import { findAll, findOne, add, update, remove } from "./secretary.controller.js";

export const SecretaryRouter = Router()

SecretaryRouter.get('/', findAll)

SecretaryRouter.get('/:id', findOne)

SecretaryRouter.post('/', add)

SecretaryRouter.put('/:id', update)

SecretaryRouter.patch('/:id', update)

SecretaryRouter.delete('/:id', remove)
