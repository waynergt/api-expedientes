import { Router } from 'express';
import {
  listarExpedientes,
  obtenerExpediente,
  crearExpediente,
  actualizarExpediente,
  cambiarEstadoExpediente,
  cambiarActivoExpediente
} from '../controllers/expediente.controller';
import { authMiddleware, requireRole } from '../auth/auth.middleware';

const router = Router();

// GET /expedientes (paginado y filtros)
router.get('/', authMiddleware, listarExpedientes);

// GET /expedientes/:id
router.get('/:id', authMiddleware, obtenerExpediente);

// POST /expedientes (solo técnico)
router.post('/', authMiddleware, requireRole(['tecnico']), crearExpediente);

// PUT /expedientes/:id (solo técnico dueño)
router.put('/:id', authMiddleware, requireRole(['tecnico']), actualizarExpediente);

// PATCH /expedientes/:id/estado (solo coordinador)
router.patch('/:id/estado', authMiddleware, requireRole(['coordinador']), cambiarEstadoExpediente);

// PATCH /expedientes/:id/activo (técnico dueño o coordinador)
router.patch('/:id/activo', authMiddleware, cambiarActivoExpediente);

export default router;