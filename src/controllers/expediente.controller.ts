import { Request, Response } from "express";
import { ejecutarSP } from "../db/db";

// Listar expedientes con filtros y paginación
export async function listarExpedientes(req: Request, res: Response) {
  try {
    // Si no se pasa tecnico_id por query, usa el del usuario autenticado
    const tecnico_id = req.query.tecnico_id
      ? Number(req.query.tecnico_id)
      : req.user!.usuario_id;

    const {
      estado = null,
      buscar = null,
      offset = 0,
      limit = 20,
    } = req.query;

    const expedientes = await ejecutarSP("sp_Expedientes_Listar", {
      TecnicoId: tecnico_id,
      Estado: estado ? String(estado) : null,
      Buscar: buscar ? String(buscar) : null,
      Offset: Number(offset),
      Limit: Number(limit),
    });

    res.json({ ok: true, expedientes });
  } catch (error: any) {
    res.status(500).json({ ok: false, error: error.message });
  }
}

// Obtener un expediente por su ID
export async function obtenerExpediente(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const expediente = await ejecutarSP("sp_Expedientes_Obtener", {
      ExpedienteId: Number(id),
    });
    if (!expediente[0]) {
      return res.status(404).json({ ok: false, error: "Expediente no encontrado" });
    }
    res.json({ ok: true, expediente: expediente[0] });
  } catch (error: any) {
    res.status(500).json({ ok: false, error: error.message });
  }
}

// Crear un nuevo expediente (usa el usuario autenticado como tecnico)
export async function crearExpediente(req: Request, res: Response) {
  try {
    const { codigo, descripcion } = req.body;
    const tecnico_id = req.user!.usuario_id;

    if (!codigo || !descripcion) {
      return res.status(400).json({
        ok: false,
        error: "Faltan campos obligatorios: codigo o descripcion.",
      });
    }

    const result = await ejecutarSP("sp_Expedientes_Crear", {
      Codigo: codigo,
      Descripcion: descripcion,
      TecnicoId: tecnico_id,
    });

    const expediente_id = result[0]?.expediente_id;
    res.status(201).json({ ok: true, expediente_id });
  } catch (error: any) {
    res.status(400).json({ ok: false, error: error.message });
  }
}

// Actualizar la descripción de un expediente
export async function actualizarExpediente(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { descripcion } = req.body;
    await ejecutarSP("sp_Expedientes_Actualizar", {
      ExpedienteId: Number(id),
      Descripcion: descripcion,
    });
    res.json({ ok: true });
  } catch (error: any) {
    res.status(400).json({ ok: false, error: error.message });
  }
}

// Cambiar el estado de un expediente
export async function cambiarEstadoExpediente(req: Request, res: Response) {
  try {
    // Admite ambos nombres para el estado
    const nuevo_estado = req.body.nuevo_estado ?? req.body.estado;
    const justificacion = req.body.justificacion;
    // Puedes poner aquí el aprobador, por ejemplo el coordinador autenticado
    const aprobador_id = req.user!.usuario_id;

    if (!nuevo_estado || !justificacion) {
      return res.status(400).json({ ok: false, error: "Faltan campos obligatorios." });
    }

    await ejecutarSP("sp_Expedientes_CambiarEstado", {
      ExpedienteId: Number(req.params.id),
      NuevoEstado: nuevo_estado,
      Justificacion: justificacion,
      AprobadorId: aprobador_id,
    });

    res.json({ ok: true });
  } catch (error: any) {
    res.status(400).json({ ok: false, error: error.message });
  }
}

// Activar o desactivar (soft delete) un expediente
export async function activarDesactivarExpediente(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { activo } = req.body; // Debe ser 1 o 0
    await ejecutarSP("sp_Expedientes_ActivarDesactivar", {
      ExpedienteId: Number(id),
      Activo: Number(activo),
    });
    res.json({ ok: true });
  } catch (error: any) {
    res.status(400).json({ ok: false, error: error.message });
  }
}