import { Router } from 'express';
import {
  listarIndiciosPorExpediente,
  crearIndicio,
  actualizarIndicio,
  cambiarActivoIndicio,
} from '../controllers/indicio.controller';
import { authMiddleware, requireRole } from '../auth/auth.middleware';

const router = Router();

// GET /expedientes/:id/indicios
router.get(
  '/expedientes/:id/indicios',
  authMiddleware,
  listarIndiciosPorExpediente
);

// POST /expedientes/:id/indicios  (solo técnico dueño)
router.post(
  '/expedientes/:id/indicios',
  authMiddleware,
  requireRole(['tecnico']),
  crearIndicio
);

// PUT /indicios/:id   (solo técnico dueño)
router.put(
  '/:id',
  authMiddleware,
  requireRole(['tecnico']),
  actualizarIndicio
);

// PATCH /indicios/:id/activo   (técnico dueño o coordinador)
router.patch(
  '/:id/activo',
  authMiddleware,
  cambiarActivoIndicio
);

export default router;