import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { ejecutarSP } from "../db/db";
import { Usuario } from "../models/usuario.model";
import { IRecordSet } from "mssql";

interface UsuarioCreado {
  usuario_id: number;
}

interface UsuarioRecord {
  id: number;
  nombre: string;
  email: string;
  rol: string;
  usuario_id: number;
  [key: string]: any; // Para otras propiedades que pueda devolver el SP
}

interface UsuarioResponse {
  id: number;
  nombre: string;
  email: string;
  rol: string;
}

/**
 * Listar usuarios
 */
export async function listarUsuarios(req: Request, res: Response) {
  try {
    // Validar que el usuario está autenticado
    if (!req.user) {
      return res.status(401).json({ 
        ok: false, 
        error: 'Usuario no autenticado' 
      });
    }

    const page = parseInt(req.query.page as string) || 1;
    const pageSize = parseInt(req.query.pageSize as string) || 10;

    // Validar parámetros de paginación
    if (page < 1 || pageSize < 1) {
      return res.status(400).json({ 
        ok: false, 
        error: 'Parámetros de paginación inválidos' 
      });
    }

    // Ejecutar el procedimiento almacenado para listar usuarios con paginación
    const results = await ejecutarSP("sp_Usuarios_Listar", {
      PageNumber: page,
      PageSize: pageSize
    });

    console.log('Resultado completo:', results);

    if (!Array.isArray(results)) {
      throw new Error('El SP no devolvió los resultados esperados');
    }

    // El primer resultado es el total
    const totalResult = results[0];
    const total = totalResult && totalResult.length > 0 ? totalResult[0].total : 0;

    // El segundo resultado son los usuarios
    const usuarios = (results[1] || []) as UsuarioRecord[];

    // Calcular información de paginación
    const totalPages = Math.ceil(total / pageSize);

    res.json({ 
      ok: true, 
      usuarios: usuarios.map((usuario: UsuarioRecord): UsuarioResponse => ({
        id: usuario.id,
        nombre: usuario.nombre,
        email: usuario.email,
        rol: usuario.rol
      })),
      paginacion: {
        total: total,
        totalPages: totalPages,
        currentPage: page,
        pageSize: pageSize,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1
      }
    });
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
    const result = await ejecutarSP("sp_Usuarios_Crear", {
      Nombre: nombre,
      Email: email,
      PasswordHash: passwordHash,
      Rol: rol,
    });

    // 3. Obtener el usuario_id insertado (accediendo a la primera fila del primer recordset)
    const firstRecord = result[0] && result[0][0];
    const usuario_id = firstRecord ? (firstRecord as any).usuario_id : null;

    res.status(201).json({ ok: true, usuario_id });
  } catch (error: any) {
    let msg = error.message;
    if (msg.includes("UNIQUE")) {
      msg = "El email ya está registrado.";
    }
    res.status(400).json({ ok: false, error: msg });
  }
}