import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { signJwt } from "../auth/jwt.utils";
import { ejecutarSP } from "../db/db";

// Interfaz que representa el resultado del SP de login
interface UserAuth {
  usuario_id: number;
  nombre: string;
  email: string;
  password_hash: string;
  rol: 'tecnico' | 'coordinador';
  activo: number | boolean; // SQL Server puede devolver 0/1 o true/false
}

export async function login(req: Request, res: Response) {
  const { email, password } = req.body;

  const result = await ejecutarSP("sp_Usuarios_Login", { Email: email });
  
  // Asegurarnos de que tenemos un resultado
  if (!Array.isArray(result) || result.length === 0) {
    return res
      .status(401)
      .json({ ok: false, error: "Usuario o clave inválidos" });
  }

  // El SP devuelve un recordset, necesitamos la primera fila
  const firstRecordset = result[0];
  if (!firstRecordset || firstRecordset.length === 0) {
    return res
      .status(401)
      .json({ ok: false, error: "Usuario o clave inválidos" });
  }

  // Obtener el primer usuario del recordset
  const user = firstRecordset[0] as UserAuth;

  // Verificar si el usuario existe y está activo
  if (!user || (typeof user.activo === 'number' ? user.activo !== 1 : !user.activo)) {
    return res
      .status(401)
      .json({ ok: false, error: "Usuario o clave inválidos" });
  }

  // Verificar la contraseña
  const match = await bcrypt.compare(password, user.password_hash);
  if (!match) {
    return res
      .status(401)
      .json({ ok: false, error: "Usuario o clave inválidos" });
  }

  // Generar el token
  const token = signJwt({ 
    usuario_id: user.usuario_id, 
    rol: user.rol 
  });

  // Enviar respuesta
  res.json({
    ok: true,
    token,
    usuario: {
      usuario_id: user.usuario_id,
      nombre: user.nombre,
      rol: user.rol,
    },
  });
}
