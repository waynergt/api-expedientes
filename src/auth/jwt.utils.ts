import jwt from 'jsonwebtoken';
import { config } from '../config/env';

export function generateToken(payload: object) {
  return jwt.sign(payload, config.JWT_SECRET, { expiresIn: '8h' });
}

export function verifyToken(token: string) {
  return jwt.verify(token, config.JWT_SECRET);
}