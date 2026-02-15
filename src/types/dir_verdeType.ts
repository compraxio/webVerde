export interface DirVerde {
  success: boolean;
  data: Datum[];
  message: string;
}

export interface Datum {
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
  id_fase: null;
  estado: string;
  ano_verificacion: null;
  autorizado_por: string;
  criterios: any[];
  fotografias: any[];
  grupo: Grupo;
}

export interface Grupo {
  id_grupo: number;
  actividad: string;
  logo_grupo: string;
}
