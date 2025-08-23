// @ts-ignore
import swaggerUi from 'swagger-ui-express';
// @ts-ignore
import swaggerJSDoc from 'swagger-jsdoc';
import { Express } from 'express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Gestión de Expedientes e Indicios',
      version: '1.0.0',
      description: 'Documentación de la API',
    },
    servers: [
      { url: 'http://localhost:3000' }
    ]
  },
  apis: ['./src/routes/*.ts'], // Puedes documentar tus rutas con JSDoc
};

// @ts-ignore
const swaggerSpec = swaggerJSDoc(options);

export function setupSwagger(app: Express) {
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}