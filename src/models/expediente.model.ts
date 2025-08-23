export interface Expediente {
  expediente_id: number;
  codigo: string;
  descripcion: string;
  tecnico_id: number;
  estado: 'pendiente' | 'aprobado' | 'rechazado';
  justificacion: string | null;
  aprobador_id: number | null;
  fecha_estado: string | null;
  activo: boolean;
}