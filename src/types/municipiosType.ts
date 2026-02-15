export interface Municipios {
  success: boolean;
  data: Datum[];
  message: string;
}
export interface MunicipiosEditar {
  success: boolean;
  data: Datum;
  message: string;
}

export interface Datum {
  cod_munic: number;
  departamento: string;
  zona: string;
  municipio: string;
}
