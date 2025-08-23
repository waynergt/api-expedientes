import * as dotenv from 'dotenv';
dotenv.config();

export const DB_USER = process.env.DB_USER as string;
export const DB_PASS = process.env.DB_PASS as string;
export const DB_HOST = process.env.DB_HOST as string;
export const DB_NAME = process.env.DB_NAME as string;
export const JWT_SECRET = process.env.JWT_SECRET as string;
export const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;