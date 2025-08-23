import { Request, Response, NextFunction } from 'express';

export function roleMiddleware(role: 'tecnico' | 'coordinador') {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user;
    if (!user || user.rol !== role) {
      return res.status(403).json({ ok: false, error: 'No autorizado' });
    }
    next();
  };
}