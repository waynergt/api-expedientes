import { Request, Response, NextFunction } from 'express';

export function validate(schema: any) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ ok: false, error: error.details[0].message });
    }
    next();
  };
}