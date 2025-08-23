import { Request, Response } from 'express';
import { getPool, sql } from '../db/db';

export async function listarExpedientes(req: Request, res: Response) {
  // Implementación real como ya se mostró antes...
  res.json({ ok: true, expedientes: [] });
}

export async function obtenerExpediente(req: Request, res: Response) {
  res.json({ ok: true, expediente: {} });
}

export async function crearExpediente(req: Request, res: Response) {
  res.status(201).json({ ok: true, expediente_id: 1 });
}

export async function actualizarExpediente(req: Request, res: Response) {
  res.json({ ok: true });
}

export async function cambiarEstadoExpediente(req: Request, res: Response) {
  res.json({ ok: true });
}

export async function cambiarActivoExpediente(req: Request, res: Response) {
  res.json({ ok: true });
}