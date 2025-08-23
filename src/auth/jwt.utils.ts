import jwt from 'jsonwebtoken';
import { Usuario } from '../models/usuario.model';
import { JWT_SECRET } from '../config/env';

export function signJwt(usuario: Pick<Usuario, 'usuario_id' | 'rol'>): string {
  return jwt.sign(
    {
      usuario_id: usuario.usuario_id,
      rol: usuario.rol
    },
    JWT_SECRET,
    { expiresIn: '8h' }
  );
}

export function verifyJwt(token: string): { usuario_id: number, rol: string } {
  return jwt.verify(token, JWT_SECRET) as { usuario_id: number, rol: string };
}