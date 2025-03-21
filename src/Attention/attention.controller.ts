import { Request, Response, NextFunction } from "express";
import { orm } from "../shared/orm.js";
import { Attention } from "./attention.entity.js";
import { ConsultationHours } from "../Medic/consultationHours.entity.js";

const em = orm.em
em.getRepository(Attention)

async function findAll(req: Request, res: Response) {
    try{
        const attentions = await em.find(Attention, {}, {populate: ['patient']})
        res.status(200).json({message: "Found all Attentions", data: attentions})
    }
    catch(error: any){
        res.status(500).json({message: error.message})
    }
}

async function findOne(req: Request, res: Response) {
    try{
        const id = Number.parseInt(req.params.id)
        const aattention = await em.findOneOrFail(Attention, {id}, {populate: ["patient"]})
        res.status(200).json({message: "Attention Found", data: aattention})
    }
    catch(error: any){
        res.status(500).json({message: error.message})
    }
}

async function add(req: Request, res: Response) {
    try{
        const aattention = em.create(Attention, req.body)
        await em.flush()
        res.status(201).json({message: "Attention created", data: aattention})
    }
    catch(error: any){
        res.status(500).json({message: error.message})
    }
}

async function update(req: Request, res: Response) {
    try{
        const id = Number.parseInt(req.params.id)
        const aattention = await em.findOneOrFail(Attention, {id})
        em.assign(aattention, req.body)
        await em.flush()
        res.status(200).json({message: "Attention updated", data: aattention})
    }
    catch(error: any){
        res.status(500).json({message: error.message})
    }
}

async function remove(req: Request, res: Response) {
    try{
        const id = Number.parseInt(req.params.id)
        const aattention = await em.findOneOrFail(Attention, {id})
        await em.removeAndFlush(aattention)
        res.status(200).json({message: "Attention deleted", data: aattention})
    }
    catch(error : any){
        res.status(500).json({message: error.message})
    
    }
}


async function findAllByID(req: Request, res: Response) {
    try {
        const patientId = Number.parseInt(req.params.patientId);  // Assuming patient ID is passed in the URL

        // Fetch attentions for the specific patient
        const attentions = await em.find(Attention, { patient: patientId }, { populate: ['patient'] });

        if (!attentions.length) {
            return res.status(404).json({ message: "No attentions found for this patient." });
        }

        res.status(200).json({ message: "Found all attentions for patient", data: attentions });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}

async function obtenerFechasOcupadas(req: Request, res: Response) {
  try {
    const medicoId = Number.parseInt(req.params.medicoId); // ID del médico desde la URL

    // Obtener todos los horarios del médico
    const horariosMedico = await em.find(ConsultationHours, { medic: medicoId });

    if (!horariosMedico.length) {
      return res.status(404).json({ message: "El médico no tiene horarios asignados." });
    }

    // Obtener los IDs de los horarios del médico
    const horariosIds = horariosMedico.map(horario => horario.id).filter((id): id is number => id !== undefined);

    // Obtener todas las atenciones relacionadas con esos horarios
    const atenciones = await em.find(
      Attention,
      { consultationHours: { $in: horariosIds } }, // Filtrar por los horarios del médico
      { populate: ["consultationHours"] }
    );

    // Contar cuántas atenciones hay por fecha
    const contadorFechas: Record<string, number> = {};
    atenciones.forEach(atencion => {
      const fecha = atencion.date.toISOString().split("T")[0]; // Convertir a formato YYYY-MM-DD
      contadorFechas[fecha] = (contadorFechas[fecha] || 0) + 1;
    });

    // Determinar qué fechas tienen todos los horarios ocupados
    const totalHorarios = horariosMedico.length; // Cantidad total de horarios del médico
    const fechasOcupadas = Object.keys(contadorFechas).filter(
      fecha => contadorFechas[fecha] >= totalHorarios
    );

    res
      .status(200)
      .json({ message: "Found all unabailables dates", data: fechasOcupadas }); // Enviar lista de fechas ocupadas al frontend
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

//Esta funcion devuelve los ids de los horarios ocupados en una fecha especifica
async function getAttentionsByDate(req: Request, res: Response) {
  try {
    const date = req.params.date; // Recibimos la fecha en formato YYYY-MM-DD desde la URL

    // Buscamos las atenciones para esa fecha
    const attentions = await em.find(
      Attention,
      { date },
      { populate: ["consultationHours"] }
    );

    // Si no hay atenciones para esa fecha, respondemos con un array vacío
    if (!attentions.length) {
      return res
        .status(200)
        .json({ message: "No attentions found for this date", data: [] });
    }

    // Filtramos los IDs de los horarios ocupados
    const occupiedConsultationHourIds = attentions.map(
      (attention) => attention.consultationHours?.id
    );

    res.status(200).json({
      message: "Found all occupied consultation hours for the specified date",
      data: occupiedConsultationHourIds,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export {findAll, findOne, add, update, remove, findAllByID, obtenerFechasOcupadas, getAttentionsByDate}