export interface Contacto {
  id_contacto: number;
  nombre: string;
  telefono: string;
  correo: string;
}

export interface ContactosResponse {
  success: boolean;
  data: Contacto[];
  message: string;
}
