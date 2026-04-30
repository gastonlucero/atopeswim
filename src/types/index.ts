export interface Salida {
  id: string;
  organizerName: string;
  dateTime: string; // ISO 8601
  distanceKm: number;
  location: {
    description: string;
  };
  participants: string[];
  status: 'pending' | 'finished';
  createdAt: string;
}

export interface Ruta {
  id: string;
  name: string;
  salidaId: string; // Reference to the original Salida
  salidaDate: string; // Date of the original Salida (ISO 8601)
  salidaDateTime: string; // Date and time of the original Salida (ISO 8601)
  distanceKm: number;
  createdAt: string;
}

export type TrackingStatus = 'idle' | 'recording' | 'finished';
