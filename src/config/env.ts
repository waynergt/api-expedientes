import dotenv from 'dotenv';
dotenv.config();

export const config = {
  PORT: process.env.PORT || 3000,
  DB_USER: process.env.DB_USER || '',
  DB_PASSWORD: process.env.DB_PASSWORD || '',
  DB_SERVER: process.env.DB_SERVER || '',
  DB_NAME: process.env.DB_NAME || '',
  JWT_SECRET: process.env.JWT_SECRET || 'supersecret'
};