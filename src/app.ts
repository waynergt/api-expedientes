import express from 'express';
import cors from 'cors';
import router from './routes';
import { errorHandler } from './middlewares/error.middleware';
import { setupSwagger } from './swagger';

const app = express();

app.use(express.json());
app.use(cors());

// Swagger UI en /api-docs
setupSwagger(app);

// Redirige la raíz "/" a swagger
app.get('/', (req, res) => {
  res.redirect('/api-docs');
});

// Aquí va tu API principal
app.use('/api', router);

// Handler 404 para rutas no encontradas (excepto / y /api-docs)
app.use((req, res) => res.status(404).json({ ok: false, error: 'No encontrado' }));

// Manejador de errores global
app.use(errorHandler);

export { app };