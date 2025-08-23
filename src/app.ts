import express from 'express';
import cors from 'cors';
import router from './routes';
import { errorHandler } from './middlewares/error.middleware';
import { setupSwagger } from './swagger';

const app = express();

app.use(express.json());
app.use(cors());

setupSwagger(app); // Swagger UI en /docs

app.use('/api', router);

// 404 handler
app.use((req, res) => res.status(404).json({ ok: false, error: 'No encontrado' }));

// Error handler
app.use(errorHandler);

export { app };