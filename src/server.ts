import express, { Application } from 'express';
import routesPersonas from './routes/persona.routes.js'

class Server {
  private app: Application;
  private port: string;

  constructor() {
    this.app = express();
    this.port = process.env.PORT || '4000';
    this.middlewares();
    this.routes();
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log('Aplicacion corriendo por el puerto: ', this.port);
    })
  }

  middlewares() {
    // parseo del body
    this.app.use(express.json());
  }


  routes() {
    this.app.use('/api/personas', routesPersonas);
  }



}

export default Server;