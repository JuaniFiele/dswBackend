import 'reflect-metadata'
import express, { NextFunction, Request, Response } from 'express'
import { HealthInsurance } from './HealthInsurance/healthinsurance.entity.js'
import { medicRouter } from './Medic/medic.routers.js'
import { ClinicHistory } from './ClinicHistory/clinichistory.entity.js'
import { clinicHistoryRouter } from './ClinicHistory/clinichistory.routers.js'
import { orm, syncSchema } from './shared/db/orm.js'
import { RequestContext } from '@mikro-orm/core'
import { request } from 'http'

const app = express()

app.use(express.json())

app.use((req, res, next) => {
    RequestContext.create(orm.em, next)
})
app.use('/api/Medics', medicRouter)
app.use('/api/ClinicHistorys', clinicHistoryRouter)

app.use((_, res) => {
    return res.status(404).send({ message: 'Resource not found' })
  })
  
/*function sanitizeHealthInsuranceInput(req: Request, res: Response, next: NextFunction){

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
}*/



//await syncSchema()

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000/")
})