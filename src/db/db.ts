import sql from 'mssql';
import { DB_USER, DB_PASS, DB_HOST, DB_NAME } from '../config/env';

const dbConfig: sql.config = {
  user: DB_USER,
  password: DB_PASS,
  server: DB_HOST,
  database: DB_NAME,
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
};

export const pool = new sql.ConnectionPool(dbConfig);

export async function getPool() {
  if (!pool.connected) await pool.connect();
  return pool;
}

export { sql };