import { Router } from 'express';
import authRoutes from './auth.routes';
import expedienteRoutes from './expediente.routes';
import indicioRoutes from './indicio.routes';
import usuarioRoutes from './usuario.routes'; // Asegúrate de tener este archivo

const router = Router();

router.use('/auth', authRoutes);
router.use('/expedientes', expedienteRoutes);
router.use('/usuarios', usuarioRoutes); // ← Agrega la ruta para usuarios
router.use('/', indicioRoutes);

export default router;