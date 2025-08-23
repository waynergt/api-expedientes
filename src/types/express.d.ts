import { Usuario } from '../models/usuario.model';

declare global {
  namespace Express {
    interface Request {
      user?: Usuario; // o el tipo que uses para el usuario autenticado
    }
  }
}

export {};