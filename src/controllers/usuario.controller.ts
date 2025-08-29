import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { ejecutarSP } from "../db/db";

/**
 * Listar usuarios
 */
export async function listarUsuarios(req: Request, res: Response) {
  try {
    // Ejecutar consulta directa (puedes crear un SP específico si lo prefieres)
    const usuarios = await ejecutarSP(
      "SELECT usuario_id, nombre, email, rol, activo FROM Usuarios"
    );

    res.json({ ok: true, usuarios });
  } catch (error: any) {
    res.status(500).json({ ok: false, error: error.message });
  }
}

/**
 * Crear usuario
 */
export async function crearUsuario(req: Request, res: Response) {
  try {
    const { nombre, email, password, rol } = req.body;

    // 1. Hashear la contraseña antes de guardar
    const passwordHash = await bcrypt.hash(password, 10);

    // 2. Ejecutar el procedimiento almacenado
    // Suponiendo que ejecutarSP devuelve un array de objetos resultado
    const result = await ejecutarSP("sp_Usuarios_Crear", {
      Nombre: nombre,
      Email: email,
      PasswordHash: passwordHash,
      Rol: rol,
    });

    // 3. Obtener el usuario_id insertado
    const usuario_id = result[0]?.usuario_id;

    res.status(201).json({ ok: true, usuario_id });
  } catch (error: any) {
    let msg = error.message;
    if (msg.includes("UNIQUE")) {
      msg = "El email ya está registrado.";
    }
    res.status(400).json({ ok: false, error: msg });
  }
}