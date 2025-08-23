export interface Usuario {
  id: number;
  email: string;
  password_hash: string;
  rol: 'tecnico' | 'coordinador';
  activo: boolean;
  creado_en: Date;
  actualizado_en: Date;
}