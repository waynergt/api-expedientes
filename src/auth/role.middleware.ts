import { Request, Response, NextFunction } from 'express';

export function authorizeRoles(...roles: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    // @ts-ignore
    const user = req.user;
    if (!user || !roles.includes(user.rol)) {
      return res.status(403).json({ message: 'No autorizado' });
    }
    next();
  };
}