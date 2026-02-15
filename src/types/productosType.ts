export interface Productos {
  success: boolean;
  data: Datum[];
  message: string;
}

export interface ProductosEditar {
  success: boolean;
  data: Datum;
  message: string;
}
export interface Datum {
  id_prodcucto: number;
  nombre: string;
  descripcion: string;
  precio: number;
  img_prodcto: string;
}
