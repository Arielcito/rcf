export interface Cancha {
  id: string;
  predioId: string;
  nombre: string;
  tipo?: string;
  capacidadJugadores?: number;
  longitud?: number;
  ancho?: number;
  tipoSuperficie?: string;
  tieneIluminacion?: boolean;
  esTechada?: boolean;
  precioPorHora?: number;
  estado?: string;
  ultimoMantenimiento?: Date;
  equipamientoIncluido?: string;
  imagenUrl?: string;
}

export interface CanchaCreationData {
  predioId: string;
  nombre: string;
  tipo?: string;
  capacidadJugadores?: number;
  longitud?: number;
  ancho?: number;
  tipoSuperficie?: string;
  tieneIluminacion?: boolean;
  esTechada?: boolean;
  precioPorHora?: number;
  estado?: string;
  ultimoMantenimiento?: Date;
  equipamientoIncluido?: string;
  imagenUrl?: string;
}

export interface CanchaUpdateData extends Partial<CanchaCreationData> {}