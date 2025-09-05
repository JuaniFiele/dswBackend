import { Request, Response, NextFunction } from "express";
import { orm } from "../shared/orm.js";
import { Secretary } from "../Secretary/secretary.entity.js";
import { Medic } from "../Medic/medic.entity.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const em = orm.em

async function login(req: Request, res: Response) {
    try {
      const { username, password } = req.body;
  
      // Buscar el usuario en ambas tablas
      const secretary = await em.findOne(Secretary, { username });
      const medic = !secretary ? await em.findOne(Medic, { username }) : null;
  
      const user = secretary || medic;
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Verificar la contraseña
      const isValidPassword = bcrypt.compareSync(password, user.password);
      if (!isValidPassword) {
        return res.status(401).json({ message: 'Invalid password' });
      }

      //Determinar el rol del usuario
      const role = secretary ? 'secretary' : 'medic';
  
      // Generar y devolver un token o una respuesta con información del usuario
      const secretKey = process.env.SECRET_KEY
      const token =jwt.sign(
        { id: user.id, username: user.username,role:user.role}
        ,"Contraseña123", { expiresIn: '5h' });
      // devolver el token y el role de usuario
      res.status(200).json({ message: 'Login successful', token, role });

      //res.status(200).json({ message: 'Login successful', token});

    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
  export { login }