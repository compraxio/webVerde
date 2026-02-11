export interface DirVerde {
  success: boolean;
  message: string;
  data: Data;
}

export interface Data {
  id_negocio: number;
  negocio: string;
  id_grupo: number;
  sub_categoria: string;
  descripcion: string;
  actividad: string;
  unidad_productiva: string;
  zona: string;
  municipio: string;
  direccion: string;
  representante: string;
  whatsup: string;
  logo: null;
  url_youtube: string;
  url_facebook: string;
  url_instagram: string;
  url_tiktok: string;
  correo: string;
  url_negocio: string;
  pos_gps: string;
  id_fase: number;
  estado: string;
  ano_verificacion: null;
  autorizado_por: string;
  grupo: Grupo;
  fotografias: string[];
  criterios: string[];
}

export interface Grupo {
  id_grupo: number;
  actividad: string;
  logo_grupo: null;
}
