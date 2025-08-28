import { Usuario } from '../models/usuario.model';

declare global {
  namespace Express {
    interface Request {
      user?: {
        usuario_id: number | string;
        rol: string;
      };
    }
  }
}


export {};