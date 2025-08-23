declare namespace Express {
  export interface Request {
    user?: { usuario_id: number; rol: string };
  }
}