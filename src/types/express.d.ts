import 'express';

interface AuthUser {
  usuario_id: number;
  rol: 'tecnico' | 'coordinador';
  email?: string;
  nombre?: string;
  [key: string]: any;
}

declare global {
  namespace Express {
    interface Request {
      user?: AuthUser;
    }
  }
}

export { AuthUser };