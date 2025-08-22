import express from 'express';
import { getConnection } from './db/db';

const app = express();

app.get('/dbtest', async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query('SELECT 1 AS resultado');
    res.json({ db: 'Conexión exitosa', resultado: result.recordset });
  } catch (e: any) {
    // Serializamos el error completamente, incluyendo objetos anidados
    function deepStringify(obj: any): any {
      if (obj === null || obj === undefined) return obj;
      if (typeof obj === 'object') {
        const result: Record<string, any> = {};
        for (const key in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, key)) {
            result[key] = deepStringify(obj[key]);
          }
        }
        return result;
      }
      return obj;
    }

    res.status(500).json({
      db: 'Error de conexión',
      error: deepStringify(e)
    });
  }
});

export default app;