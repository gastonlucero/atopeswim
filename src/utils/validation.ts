export interface ValidationError {
  field: string;
  message: string;
}

export function validateSalida(
  organizerName: string,
  dateTime: string,
  distanceKm: number,
  locationDescription: string
): ValidationError[] {
  const errors: ValidationError[] = [];

  if (!organizerName.trim()) {
    errors.push({ field: 'organizerName', message: 'El nombre del organizador es requerido' });
  }

  if (!dateTime) {
    errors.push({ field: 'dateTime', message: 'La fecha y hora son requeridas' });
  } else if (new Date(dateTime) <= new Date()) {
    errors.push({ field: 'dateTime', message: 'La fecha debe ser en el futuro' });
  }

  if (!distanceKm || distanceKm <= 0) {
    errors.push({ field: 'distanceKm', message: 'La distancia debe ser mayor a 0' });
  }

  if (!locationDescription.trim()) {
    errors.push({ field: 'location', message: 'La descripción del punto de encuentro es requerida' });
  }

  return errors;
}

export function validateRouteNaming(routeName: string): ValidationError[] {
  const errors: ValidationError[] = [];

  if (!routeName.trim()) {
    errors.push({ field: 'routeName', message: 'El nombre de la ruta es requerido' });
  }

  return errors;
}

export function validateMinDistance(distanceKm: number): ValidationError[] {
  const errors: ValidationError[] = [];

  if (distanceKm < 0.1) {
    errors.push({
      field: 'distance',
      message: 'La distancia registrada debe ser mayor a 0.1 km',
    });
  }

  return errors;
}
