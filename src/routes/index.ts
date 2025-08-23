import { Router } from 'express';
import expedienteRoutes from './expediente.routes';
// Agrega otras rutas aquí...

const router = Router();

router.use('/expedientes', expedienteRoutes);

export default router;