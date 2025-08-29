import { Request, Response } from 'express';
import { ejecutarSP } from '../db/db';

// Listar indicios por expediente
export async function listarIndiciosPorExpediente(req: Request, res: Response) {
  try {
    // Usa el nombre correcto del parámetro
    const expediente_id = req.params.expedienteId;
    if (!expediente_id) {
      return res.status(400).json({ ok: false, error: 'Falta el expediente_id.' });
    }

    const indicios = await ejecutarSP('sp_Indicios_ListarPorExpediente', {
      ExpedienteId: Number(expediente_id),
    });

    res.json({ ok: true, indicios });
  } catch (error: any) {
    res.status(500).json({ ok: false, error: error.message });
  }
}

// Crear un nuevo indicio
export async function crearIndicio(req: Request, res: Response) {
  try {
    const expediente_id = req.params.expedienteId; // <-- de los params
    const { codigo, descripcion, peso, color, tamano } = req.body;

    if (!expediente_id || !codigo || !descripcion || peso == null || !color || !tamano) {
      return res.status(400).json({
        ok: false,
        error: 'Faltan campos obligatorios.',
      });
    }

    // Aquí podrías validar si el usuario autenticado tiene permisos sobre el expediente
    // const tecnico_id = req.user!.usuario_id;

    const result = await ejecutarSP('sp_Indicios_Crear', {
      ExpedienteId: Number(expediente_id),
      Codigo: codigo,
      Descripcion: descripcion,
      Peso: Number(peso),
      Color: color,
      Tamano: tamano,
      // Si tu SP acepta tecnico_id, lo agregas aquí
      // TecnicoId: tecnico_id,
    });

    const indicio_id = result[0]?.indicio_id;
    res.status(201).json({ ok: true, indicio_id });
  } catch (error: any) {
    res.status(400).json({ ok: false, error: error.message });
  }
}

// Actualizar un indicio
export async function actualizarIndicio(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { descripcion, peso, color, tamano } = req.body;

    if (!descripcion || peso == null || !color || !tamano) {
      return res.status(400).json({
        ok: false,
        error: 'Faltan campos obligatorios.',
      });
    }

    // Si tuvieras técnico_id podrías validar si el usuario puede modificar este indicio

    await ejecutarSP('sp_Indicios_Actualizar', {
      IndicioId: Number(id),
      Descripcion: descripcion,
      Peso: Number(peso),
      Color: color,
      Tamano: tamano,
      // TecnicoId: req.user!.usuario_id (si lo agregas en el SP)
    });

    res.json({ ok: true });
  } catch (error: any) {
    res.status(400).json({ ok: false, error: error.message });
  }
}

// Activar o desactivar (soft delete) un indicio
export async function activarDesactivarIndicio(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { activo } = req.body; // 1 o 0

    if (activo == null) {
      return res.status(400).json({ ok: false, error: 'Falta el campo activo.' });
    }

    await ejecutarSP('sp_Indicios_ActivarDesactivar', {
      IndicioId: Number(id),
      Activo: Number(activo),
    });

    res.json({ ok: true });
  } catch (error: any) {
    res.status(400).json({ ok: false, error: error.message });
  }
}