import sql from 'mssql';
import { config } from '../config/env';

const dbSettings: sql.config = {
  server: config.DB_SERVER,
  database: config.DB_NAME,
  user: config.DB_USER,
  password: config.DB_PASSWORD,
  options: {
    encrypt: false, // Para local, pon true si usas Azure
    trustServerCertificate: true,
  }
};

export async function getConnection() {
  try {
    const pool = await sql.connect(dbSettings);
    return pool;
  } catch (error) {
    console.error('Error de conexión a la base de datos:', error);
    throw error;
  }
}

export { sql };