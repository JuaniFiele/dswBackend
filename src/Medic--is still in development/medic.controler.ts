import { Request, Response, NextFunction } from 'express'
import { MedicRepository } from './medic.repository.js'
import { Medic } from './medic.entity.js'

const repository = new MedicRepository()

function sanitizeMedicInput(req: Request, res: Response, next: NextFunction){

    req.body.sanitizedInput = {
        name: req.body.name,
        surname: req.body.surname,
        dni: req.body.dni,
        license: req.body.license,
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
    const aMedic = repository.findOne({id: req.params.dni})
    if(!aMedic){
        return res.status(404).send({message: 'Medic not found'})
    }
    res.json(aMedic)
}


function add( req:Request, res:Response)  {
    const input = req.body.sanitizedInput
  
    const aNewMedicInput = new Medic( 
        input.name, 
        input.surname, 
        input.dni, 
        input.license 
    )
  
    const aNewMedic = repository.add(aNewMedicInput)
    res.status(201).send({message: 'Medic created succesfully', data: aNewMedic})
}
  
  
function update(req:Request, res:Response) {
    req.body.sanitizedInput.dni = Number(req.params.dni)
    const medic = repository.update(req.body.sanitizedInput)
  
    if(!medic){
        res.status(404).send({ message: 'Medic not found' })
    } 
    res.status(200).send({ message:'Medic updated succesfully', data: medic})
}
  
function remove(req:Request, res:Response){
    const id = req.params.dni
    const medic = repository.delete({id})
  
    if(!medic){
        res.status(404).send({message: 'Medic not found'})
    }else{
        res.status(200).send({message: 'Medic deleted succesfully'})
    }
}



export { sanitizeMedicInput, findAll, findOne, add, update, remove}