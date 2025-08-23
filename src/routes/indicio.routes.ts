import { Router } from 'express';
import * as indicioController from '../controllers/indicio.controller';
import { authMiddleware } from '../auth/auth.middleware';
import { roleMiddleware } from '../auth/role.middleware';

const router = Router();

/**
 * @swagger
 * tags:
 *   - name: Indicios
 *     description: Endpoints para gestión de indicios
 */

/**
 * @swagger
 * /api/expedientes/{expedienteId}/indicios:
 *   get:
 *     summary: Lista los indicios de un expediente.
 *     tags: [Indicios]
 *     parameters:
 *       - in: path
 *         name: expedienteId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lista de indicios.
 */
router.get('/expedientes/:expedienteId/indicios', authMiddleware, indicioController.listarIndiciosPorExpediente);

/**
 * @swagger
 * /api/expedientes/{expedienteId}/indicios:
 *   post:
 *     summary: Crea un indicio en un expediente (solo técnico dueño).
 *     tags: [Indicios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: expedienteId
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - codigo
 *               - descripcion
 *               - peso
 *               - color
 *               - tamano
 *             properties:
 *               codigo:
 *                 type: string
 *               descripcion:
 *                 type: string
 *               peso:
 *                 type: number
 *                 minimum: 0
 *               color:
 *                 type: string
 *               tamano:
 *                 type: string
 *     responses:
 *       201:
 *         description: Indicio creado.
 */
router.post('/expedientes/:expedienteId/indicios', authMiddleware, roleMiddleware(['tecnico']), indicioController.crearIndicio);

/**
 * @swagger
 * /api/indicios/{id}:
 *   put:
 *     summary: Actualiza un indicio (solo técnico dueño).
 *     tags: [Indicios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               descripcion:
 *                 type: string
 *               peso:
 *                 type: number
 *                 minimum: 0
 *               color:
 *                 type: string
 *               tamano:
 *                 type: string
 *     responses:
 *       200:
 *         description: Indicio actualizado.
 */
router.put('/indicios/:id', authMiddleware, roleMiddleware(['tecnico']), indicioController.actualizarIndicio);

/**
 * @swagger
 * /api/indicios/{id}/activo:
 *   patch:
 *     summary: Elimina (soft delete) un indicio.
 *     tags: [Indicios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               activo:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Indicio activado/desactivado.
 */
router.patch('/indicios/:id/activo', authMiddleware, indicioController.activarDesactivarIndicio);

export default router;