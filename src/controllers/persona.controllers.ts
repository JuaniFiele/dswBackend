import { Request, Response } from "express";

export const getPersonas = (req: Request, res: Response) => {
  res.json({
    msg: "getPesonas"
  })
}

export const getPersona = (req: Request, res: Response) => {
  const { id } = req.params

  res.json({
    msg: "getPesona",
    id: id
  })
}

export const deletePersona = (req: Request, res: Response) => {
  const { id } = req.params

  res.json({
    msg: "DeletePersona",
    id: id
  })
}

export const postPersona = (req: Request, res: Response) => {
  const { body } = req;

  res.json({
    msg: "postPersona",
    body: body
  })
}

export const putPersona = (req: Request, res: Response) => {
  const { body } = req;
  const { id } = req.params;

  res.json({
    msg: "postPersona",
    body: body,
    id: id
  })
}