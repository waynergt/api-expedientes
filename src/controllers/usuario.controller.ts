import { Request, Response } from 'express';
import { getPool, sql } from '../db/db';

export async function listarUsuarios(req: Request, res: Response) {
  // Implementar la lógica real usando SP de la BD
  res.json({ ok: true, usuarios: [] });
}

export async function crearUsuario(req: Request, res: Response) {
  // Implementar la lógica real usando SP de la BD
  res.status(201).json({ ok: true, usuario_id: 1 });
}