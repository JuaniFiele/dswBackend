import { Request, Response, NextFunction } from 'express'
import { ClinicHistoryRepository } from './clinichistory.repository.js'
import { ClinicHistory } from './clinichistory.entity.js'

const repository = new ClinicHistoryRepository()

function sanitizeClinicHistoryInput(req: Request, res: Response, next: NextFunction){

    req.body.sanitizedInput = {
        nro: req.body.nro,
        bloodType: req.body.bloodType,
        personalHistory: req.body.personalHistory,
        familyBackground: req.body.familyBackground,
    } 

    //validar info traida (validar info maliciosa, tipo de dato, etc...)
     //Validamos que los campos no sean undefined ( para el patch)
    Object.keys(req.body.sanitizedInput).forEach((key) => {
        if (req.body.sanitizedInput[key] === undefined) {
          delete req.body.sanitizedInput[key]
        }
      })

    next()
}

function findAll(req:Request, res:Response)  {
    res.json({data: repository.findAll()})
}
function findOne(req:Request, res:Response) {
    const aClinicHistory = repository.findOne({nro: Number(req.params.nro)})
    if(!aClinicHistory){
        return res.status(404).send({message: 'Clinic History not found'})
    }
    res.json(aClinicHistory)
}



function add( req:Request, res:Response)  {
    const input = req.body.sanitizedInput
  
    const aNewClinicHistoryInput = new ClinicHistory( 
        input.nro, 
        input.bloodType, 
        input.personalHistory, 
        input.familyBackground 
    )
  
    const aNewClinicHistory = repository.add(aNewClinicHistoryInput)
    res.status(201).send({message: 'Clinic History created succesfully', data: aNewClinicHistory})
}
  
  
function update(req:Request, res:Response) {
    req.body.sanitizedInput.nro = req.params.nro
    const clinicHistory = repository.update(req.body.sanitizedInput)
  
    if(!clinicHistory){
        res.status(404).send({ message: 'Clinic History not found' })
    }else{
        res.status(200).send({ message:'Clinic History updated succesfully', data: clinicHistory})
    }
}
  
function remove(req:Request, res:Response){
    const nro = Number(req.params.nro)
    const clinicHistory = repository.delete({nro})
  
    if(!clinicHistory){
        res.status(404).send({message: 'Clinic History not found'})
    }else{
        res.status(200).send({message: 'Clinic History deleted succesfully'})
    }
}



export { sanitizeClinicHistoryInput, findAll, findOne, add, update, remove}