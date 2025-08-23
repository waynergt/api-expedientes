import { Request, Response, NextFunction } from 'express';

/**
 * Middleware para verificar si el usuario tiene al menos uno de los roles requeridos.
 * @param roles Array de roles permitidos, ej: ['tecnico'], ['coordinador'], ['tecnico', 'coordinador']
 */
export function roleMiddleware(roles: ('tecnico' | 'coordinador')[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user;
    if (!user || !roles.includes(user.rol)) {
      return res.status(403).json({ ok: false, error: 'No autorizado' });
    }
    next();
  };
}