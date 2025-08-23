import { Router } from 'express';
import * as expedienteController from '../controllers/expediente.controller';
import { authMiddleware } from '../auth/auth.middleware';
import { roleMiddleware } from '../auth/role.middleware';

const router = Router();

/**
 * @swagger
 * tags:
 *   - name: Expedientes
 *     description: Endpoints para gestión de expedientes
 */

/**
 * @swagger
 * /api/expedientes:
 *   get:
 *     summary: Lista expedientes con paginación y filtros.
 *     tags: [Expedientes]
 *     parameters:
 *       - name: page
 *         in: query
 *         schema:
 *           type: integer
 *         description: Página a mostrar
 *       - name: limit
 *         in: query
 *         schema:
 *           type: integer
 *         description: Cantidad por página
 *     responses:
 *       200:
 *         description: Lista de expedientes.
 */
router.get('/', authMiddleware, expedienteController.listarExpedientes);

/**
 * @swagger
 * /api/expedientes/{id}:
 *   get:
 *     summary: Obtiene un expediente por ID.
 *     tags: [Expedientes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Expediente encontrado.
 *       404:
 *         description: No encontrado.
 */
router.get('/:id', authMiddleware, expedienteController.obtenerExpediente);

/**
 * @swagger
 * /api/expedientes:
 *   post:
 *     summary: Crea un nuevo expediente (solo técnico).
 *     tags: [Expedientes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - codigo
 *               - descripcion
 *             properties:
 *               codigo:
 *                 type: string
 *               descripcion:
 *                 type: string
 *     responses:
 *       201:
 *         description: Expediente creado.
 */
router.post('/', authMiddleware, roleMiddleware(['tecnico']), expedienteController.crearExpediente);

/**
 * @swagger
 * /api/expedientes/{id}:
 *   put:
 *     summary: Actualiza un expediente (solo técnico dueño).
 *     tags: [Expedientes]
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
 *     responses:
 *       200:
 *         description: Expediente actualizado.
 */
router.put('/:id', authMiddleware, roleMiddleware(['tecnico']), expedienteController.actualizarExpediente);

/**
 * @swagger
 * /api/expedientes/{id}/estado:
 *   patch:
 *     summary: Cambia el estado de un expediente (solo coordinador).
 *     tags: [Expedientes]
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
 *             required:
 *               - estado
 *               - justificacion
 *             properties:
 *               estado:
 *                 type: string
 *                 enum: [aprobado, rechazado]
 *               justificacion:
 *                 type: string
 *     responses:
 *       200:
 *         description: Estado cambiado.
 */
router.patch('/:id/estado', authMiddleware, roleMiddleware(['coordinador']), expedienteController.cambiarEstadoExpediente);

/**
 * @swagger
 * /api/expedientes/{id}/activo:
 *   patch:
 *     summary: Elimina (soft delete) un expediente.
 *     tags: [Expedientes]
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
 *         description: Expediente activado/desactivado.
 */
router.patch('/:id/activo', authMiddleware, expedienteController.activarDesactivarExpediente);

export default router;