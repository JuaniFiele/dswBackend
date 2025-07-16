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

const mercadopago = require('mercadopago')
mercadopago.configure({
  access_token: 'APP_USR-388573148319047-071607-63e29c31d42a6fa6defc04f323bbe505-615075660'
});
//TODO: routers PONER EN MINUSCULA Y -
app.use('/api/medics', MedicRouter)
app.use('/api/patients', PatientRouter)
app.use('/api/secretaries', SecretaryRouter)
app.use('/api/specialties',SpecialtyRouter)
app.use('/api/consultation-hours', ConsultationHoursRouter)
app.use('/api/attentions', AttentionRoutes)
app.use('/api/health-insurances', HealthInsuranceRouter)
app.use('/api/login', UserBaseRouter)

//Ruta para crear preferencia de pago
app.post('/crear-preferencia', async (req, res) => {
  try {
    const { descripcion, precio, cantidad } = req.body;
    const preference = {
      items: [
        {
          title: descripcion,
          unit_price: parseFloat(precio),
          quantity: parseInt(cantidad),
        },
      ],
      back_urls: {
        success: 'http://localhost:3000/success',
        failure: 'http://localhost:3000/failure',
        pending: 'http://localhost:3000/pending',
      },
      auto_return: 'approved',
    };
    const response = await mercadopago.preferences.create(preference);
    res.json({ init_point: response.body.init_point });
  } catch (error) {
    console.error('Error al crear preferencia:', error);
    res.status(500).json({ error: 'Error al crear el pago' });
  }
});


//middleware de errores
app.use((_, res) => {
  return res.status(404).send({ message: 'Resource not found' })
})

/*await syncSchema() //never in production, only for development, when in production, the schema should be permanent*/

const PORT = Number(process.env.PORT || 3000)

//activar el servidor
app.listen(PORT,() => {
  //console.log("Server running on http://localhost:3000/")
})