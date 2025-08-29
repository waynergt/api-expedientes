import { Router } from 'express';
import { crearUsuario } from '../controllers/usuario.controller';

const router = Router();

/**
 * @swagger
 * tags:
 *   - name: Usuarios
 *     description: Endpoints para gestión de usuarios
 */

/**
 * @swagger
 * /api/usuarios:
 *   post:
 *     summary: Crear un nuevo usuario
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombre
 *               - email
 *               - password
 *               - rol
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: Jose López
 *               email:
 *                 type: string
 *                 example: jose@gmail.com
 *               password:
 *                 type: string
 *                 example: "@dmin123"
 *               rol:
 *                 type: string
 *                 example: tecnico
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                 usuario_id:
 *                   type: integer
 */
router.post('/', crearUsuario);

export default router;