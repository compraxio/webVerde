export interface Fase {
  success: boolean;
  data: Data[];
  message: string;
}

export interface Data {
  id_fase: number;
  des_fase: string;
  logo_fase: string;
  id_fasex: string;
}
