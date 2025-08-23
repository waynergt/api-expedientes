import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/env';
import { Usuario } from '../models/usuario.model';

// Middleware para autenticación JWT
export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    if (
      typeof decoded === 'object' &&
      decoded !== null &&
      'usuario_id' in decoded &&
      'rol' in decoded
    ) {
      // TypeScript ya reconoce req.user si extendiste Express correctamente
      req.user = {
        usuario_id: (decoded as any).usuario_id,
        rol: (decoded as any).rol,
      };
      next();
    } else {
      return res.status(401).json({ error: 'Invalid token payload' });
    }
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
}

// Middleware para autorización por roles
export function requireRole(roles: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.rol)) {
      return res.status(403).json({ error: 'No tienes permisos suficientes' });
    }
    next();
  };
}