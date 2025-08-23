import { Request, Response } from 'express';

export async function listarUsuarios(req: Request, res: Response) {
  // Aquí deberías llamar al SP para listar usuarios
  res.json({ ok: true, usuarios: [] });
}

export async function crearUsuario(req: Request, res: Response) {
  // Aquí deberías llamar al SP para crear usuario
  res.status(201).json({ ok: true, usuario_id: 1 });
}