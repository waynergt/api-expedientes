import { Request, Response } from 'express';
import { execSP } from '../db/sp/sp.helper';
import bcrypt from 'bcrypt';
import { signJwt } from '../auth/jwt.utils';

export async function login(req: Request, res: Response) {
  const { email, password } = req.body;
  const users = await execSP('sp_Usuarios_Login', { Email: email });

  const user = users[0];
  if (!user || !user.activo) {
    return res.status(401).json({ ok: false, error: 'Usuario o clave inválidos' });
  }
  const match = await bcrypt.compare(password, user.password_hash);
  if (!match) {
    return res.status(401).json({ ok: false, error: 'Usuario o clave inválidos' });
  }
  const token = signJwt({ usuario_id: user.usuario_id, rol: user.rol });
  res.json({ ok: true, token, usuario: { usuario_id: user.usuario_id, nombre: user.nombre, rol: user.rol } });
}