import { Usuario } from '../models/usuario.model';

declare global {
  namespace Express {
    interface Request {
      user?: Pick<Usuario, 'usuario_id' | 'rol'>;
    }
  }
}

export {};