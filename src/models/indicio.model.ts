export interface Indicio {
  id: number;
  expediente_id: number;
  codigo: string;
  descripcion: string;
  peso: number;
  color: string;
  tamano: string;
  tecnico_id: number;
  activo: boolean;
  creado_en: Date;
  actualizado_en: Date;
}