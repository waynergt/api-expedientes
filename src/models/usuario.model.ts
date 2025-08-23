export interface Usuario {
  usuario_id: number;
  nombre: string;
  email: string;
  password_hash: string;
  rol: 'tecnico' | 'coordinador';
  activo: boolean;
}