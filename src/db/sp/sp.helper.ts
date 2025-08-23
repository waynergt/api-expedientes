import { getPool, sql } from '../db';

export async function execSP<T = any>(spName: string, params: Record<string, any> = {}) {
  const pool = await getPool();
  let req = pool.request();
  for (const key in params) {
    req = req.input(key, params[key]);
  }
  const result = await req.execute<T>(spName);
  return result.recordset;
}