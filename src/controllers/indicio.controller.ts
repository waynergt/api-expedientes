import { Request, Response } from 'express';

export async function listarIndiciosPorExpediente(req: Request, res: Response) {
  // Lógica para llamar al SP y retornar los indicios
  res.json({ ok: true, indicios: [] });
}

export async function crearIndicio(req: Request, res: Response) {
  // Lógica para llamar al SP para crear un indicio
  res.status(201).json({ ok: true, indicio_id: 1 });
}

export async function actualizarIndicio(req: Request, res: Response) {
  // Lógica para llamar al SP para actualizar un indicio
  res.json({ ok: true });
}

export async function cambiarActivoIndicio(req: Request, res: Response) {
  // Lógica para llamar al SP para soft delete/activar un indicio
  res.json({ ok: true });
}