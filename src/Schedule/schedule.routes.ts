import { Router } from "express";
import {findAll, findOne, add , update, remove} from "./schedule.controller.js";

export const ScheduleRouter = Router()

ScheduleRouter.get('/', findAll)

ScheduleRouter.get('/:id', findOne)

ScheduleRouter.post('/', add)

ScheduleRouter.put('/:id', update)

ScheduleRouter.patch('/:id', update)

ScheduleRouter.delete('/:id', remove)