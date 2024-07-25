import express, { NextFunction, Request, Response } from 'express'
import { HealthInsurance } from './HealthInsurance/healthinsurance.entity.js'
import { medicRouter } from './Medic/medic.routers.js'
import { ClinicHistory } from './ClinicHistory/clinichistory.entity.js'
import { clinicHistoryRouter } from './ClinicHistory/clinichistory.routers.js'
const app = express()

app.use(express.json())

const HealthInsurances = [
    new HealthInsurance(
        'Osde'
        ,1
    ),
]




//rutas de obras sociales

function sanitizeHealthInsuranceInput(req: Request, res: Response, next: NextFunction){

    req.body.sanitizedInput = {
        name: req.body.name,
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

app.get('/api/HealthInsurances', (req, res) => {
    res.json(HealthInsurances)
})


app.get('/api/HealthInsurances/:code', (req, res) => {
    const aHealthInsurance = HealthInsurances.find( (HealthInsurance) => HealthInsurance.code === Number(req.params.code) )
    
    if(!aHealthInsurance){
        return res.status(404).send({message: 'Health Insurance not found'})
    }
    res.json(aHealthInsurance)
})


app.post('/api/HealthInsurances', (req, res) => {
    const {name, code} = req.body

    const aNewHealthInsurance = new HealthInsurance( name, code )

    HealthInsurances.push(aNewHealthInsurance)

    return res.status(201).send({message: 'Health Insurance created succesfully', data: aNewHealthInsurance})
})


app.put('/api/HealthInsurances/:code', sanitizeHealthInsuranceInput, (req, res) => {
    const HealthInsuranceIdx = HealthInsurances.findIndex((HealthInsurance) => HealthInsurance.code === Number(req.params.code))

    if(HealthInsuranceIdx === -1){
        return res.status(404).send({ message: 'Health Insurance not found' })
    }

    const {name} = req.body.sanitizedInput

    HealthInsurances[HealthInsuranceIdx] = { ...HealthInsurances[HealthInsuranceIdx], ...req.body.sanitizedInput}
    //Otra forma de hacerlo...
    //Object.assign(HealthInsurances[HealthInsuranceIdx], req.body.sanitizedInput)

    res.status(200).send({ message:'Health Insurance updated succesfully', data: HealthInsurances[HealthInsuranceIdx]})
})

app.patch('/api/HealthInsurances/:code', sanitizeHealthInsuranceInput, (req, res) => {
    const HealthInsuranceIdx = HealthInsurances.findIndex((HealthInsurance) => HealthInsurance.code === Number(req.params.code))

    if(HealthInsuranceIdx === -1){
        return res.status(404).send({ message: 'Health Insurance not found' })
    }

    const {name} = req.body.sanitizedInput

    HealthInsurances[HealthInsuranceIdx] = { ...HealthInsurances[HealthInsuranceIdx], ...req.body.sanitizedInput}

    res.status(200).send({ message:'Health Insurance updated succesfully', data: HealthInsurances[HealthInsuranceIdx]})
})

app.delete('/api/HealthInsurances/:code', (req, res) => {
    const HealthInsuranceIdx = HealthInsurances.findIndex((HealthInsurance) => HealthInsurance.code === Number(req.params.code))

    if(HealthInsuranceIdx === -1){
        res.status(404).send({message: 'Medic not found'})
    }else{
        HealthInsurances.splice(HealthInsuranceIdx, 1)
        res.status(200).send({message: 'Medic deleted succesfully'})
    }
})

//rutas de medicos

app.use('/api/Medics', medicRouter)
app.use('/api/ClinicHistorys', clinicHistoryRouter)

app.use((_, res) => {
    return res.status(404).send({ message: 'Resource not found' })
  })



const ClinicHistorys = [
    new ClinicHistory(
        1
        , 'A+'
        , 'Enfermedades Crónicas: Hipertensión arterial diagnosticada a los 40 años. Cirugías: Apendicectomía a los 25 años. Alergias: Alergia a la penicilina. Hábitos: No fumador, Consumo de alcohol moderado (1-2 copas de vino por semana), Ejercicio físico regular (3 veces por semana). Medicación Actual: Losartán 50 mg una vez al día.'
        , 'Padre: Edad: 70 años. Enfermedades: Hipertensión arterial, infarto al miocardio a los 68 años. Madre: Edad: 68 años. Enfermedades: Diabetes tipo 2 diagnosticada a los 60 años, hipotiroidismo. Hermano Mayor: Edad: 48 años. Enfermedades: Ninguna conocida. Hermana Menor: Edad: 42 años. Enfermedades: Asma desde la infancia. Abuelos Paternos: Abuelo: Fallecido a los 75 años por complicaciones de un derrame cerebral, tenía hipertensión. Abuela: Fallecida a los 72 años por cáncer de mama. Abuelos Maternos: Abuelo: Fallecido a los 80 años por causas naturales, tenía diabetes tipo 2. Abuela: Fallecida a los 78 años por enfermedad pulmonar obstructiva crónica (EPOC).'
    ),
]

//rutas de historias clinicas

function sanitizeClinicHistoryInput(req: Request, res: Response, next: NextFunction){

    req.body.sanitizedInput = {
        nro: req.body.nro,
    } 

    Object.keys(req.body.sanitizedInput).forEach((key) => {
        if (req.body.sanitizedInput[key] === undefined) {
          delete req.body.sanitizedInput[key]
        }
      })
    next()
}
  
app.get('/api/ClinicHistorys', (req, res) => {
    res.json(ClinicHistorys)
})

app.get('/api/ClinicHistorys/:nro', (req, res) => {
    const aClinicHistory = ClinicHistorys.find( (ClinicHistory) => ClinicHistory.nro === Number(req.params.nro) )
    
    if(!aClinicHistory){
        return res.status(404).send({message: 'Clinic History not found'})
    }
    res.json(aClinicHistory)
})

app.post('/api/ClinicHistorys', (req, res) => {
    const {nro, bloodType, personalHistory, familyBackground} = req.body

    const aNewClinicHistory = new ClinicHistory( nro, bloodType, personalHistory, familyBackground )

    ClinicHistorys.push(aNewClinicHistory)

    return res.status(201).send({message: 'Clinic History created succesfully', data: aNewClinicHistory})
})

app.put('/api/ClinicHistorys/:nro', sanitizeClinicHistoryInput, (req, res) => {
    const ClinicHistoryIdx = ClinicHistorys.findIndex((ClinicHistory) => ClinicHistory.nro === Number(req.params.nro))

    if(ClinicHistoryIdx === -1){
        return res.status(404).send({ message: 'Clinic History not found' })
    }

    const {nro} = req.body.sanitizedInput

    ClinicHistorys[ClinicHistoryIdx] = { ...ClinicHistorys[ClinicHistoryIdx], ...req.body.sanitizedInput}

    res.status(200).send({ message:'Clinic History updated succesfully', data: ClinicHistorys[ClinicHistoryIdx]})
})

app.patch('/api/ClinicHistorys/:nro', sanitizeClinicHistoryInput, (req, res) => {
    const ClinicHistoryIdx = ClinicHistorys.findIndex((ClinicHistory) => ClinicHistory.nro === Number(req.params.nro))

    if(ClinicHistoryIdx === -1){
        return res.status(404).send({ message: 'Clinic History not found' })
    }

    const {nro} = req.body.sanitizedInput

    ClinicHistorys[ClinicHistoryIdx] = { ...ClinicHistorys[ClinicHistoryIdx], ...req.body.sanitizedInput}

    res.status(200).send({ message:'Clinic History updated succesfully', data: ClinicHistorys[ClinicHistoryIdx]})
})

app.delete('/api/ClinicHistorys/:nro', (req, res) => {
    const ClinicHistoryIdx = ClinicHistorys.findIndex((ClinicHistory) => ClinicHistory.nro === Number(req.params.nro))

    if(ClinicHistoryIdx === -1){
        res.status(404).send({message: 'Clinic History not found'})
    }else{
        ClinicHistorys.splice(ClinicHistoryIdx, 1)
        res.status(200).send({message: 'Clinic History deleted succesfully'})
    }
})


app.use((_, res) => {
    return res.status(404).send({ message: 'Resource not found' })
  })
  

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000/")
})