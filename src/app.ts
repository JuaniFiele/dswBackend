import 'reflect-metadata'
import express, { NextFunction, Request, Response } from 'express'
import { MedicRouter } from './Medic/medic.routes.js'
import { HealthInsuranceRouter } from './Patient/healthinsurance.routes.js'
import { orm, syncSchema } from './shared/orm.js'
import { RequestContext } from '@mikro-orm/core'
import { PatientRouter } from './Patient/patient.routes.js'
import { SecretaryRouter } from './Secretary/secretary.routes.js'
import cors from 'cors'
import { SpecialtyRouter } from './Specialty/specialty.routes.js'
import { ConsultationHoursRouter } from './Medic/consultationHours.routes.js'
import { AttentionRoutes } from './Attention/attention.routes.js'
import { UserBaseRouter } from './UserBase/userBase.routes.js'

const app = express()

app.use(express.json())

//Cors
app.use(cors());
//luego de los middelewares base (express, express json)
app.use((req, res, next) => {
  RequestContext.create(orm.em, next)
})
//antes de middlewares de negocio

//routers PONER EN MINUSCULA Y -
app.use('/api/Medics', MedicRouter)
app.use('/api/Patients', PatientRouter)
app.use('/api/Secretaries', SecretaryRouter)
app.use('/api/Specialties',SpecialtyRouter)
app.use('/api/consultationhours', ConsultationHoursRouter)
app.use('/api/attention', AttentionRoutes)
app.use('/api/HealthInsurances', HealthInsuranceRouter)
app.use('/api/login', UserBaseRouter)


//middleware de errores
app.use((_, res) => {
  return res.status(404).send({ message: 'Resource not found' })
})

await syncSchema() //never in production, only for development, when in production, the schema should be permanent

//activar el servidor
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000/")
})