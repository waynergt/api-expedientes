import { Usuario } from '../models/usuario.model';

declare global {
  namespace Express {
    interface Request {
      user?: Usuario | any; // Puedes mejorar el tipo según tu modelo de usuario
    }
  }
}