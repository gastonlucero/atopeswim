import { useState } from 'react';
import { addRuta } from '../../utils/storage';
import { validateRouteNaming, validateMinDistance } from '../../utils/validation';
import type { ValidationError } from '../../utils/validation';
import type { Ruta } from '../../types';

interface RouteNamerProps {
  elapsedSeconds: number;
  onReset: () => void;
}

export default function RouteNamer({ elapsedSeconds, onReset }: RouteNamerProps) {
  const [routeName, setRouteName] = useState('');
  const [distance, setDistance] = useState('');
  const [errors, setErrors] = useState<ValidationError[]>([]);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const nameErrors = validateRouteNaming(routeName);
    const distanceErrors = validateMinDistance(parseFloat(distance));
    const allErrors = [...nameErrors, ...distanceErrors];

    if (allErrors.length > 0) {
      setErrors(allErrors);
      return;
    }

    const ruta: Ruta = {
      id: Date.now().toString(),
      name: routeName,
      salidaId: '',
      salidaDate: new Date().toISOString(),
      salidaDateTime: new Date().toISOString(),
      distanceKm: parseFloat(distance),
      createdAt: new Date().toISOString(),
    };

    addRuta(ruta);
    setSuccess(true);
    setRouteName('');
    setDistance('');
    setErrors([]);

    setTimeout(() => {
      setSuccess(false);
      onReset();
    }, 2000);
  };

  const getErrorMessage = (field: string) => errors.find((e) => e.field === field)?.message;

  if (success) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
        <p className="text-green-700 font-medium">✅ Ruta guardada exitosamente</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="font-bold text-lg">Guardar Ruta</h3>

      <div>
        <label className="block text-sm font-medium mb-1">Nombre de la ruta</label>
        <input
          type="text"
          value={routeName}
          onChange={(e) => setRouteName(e.target.value)}
          className="input-field"
          placeholder="Ej: Nada del Sardinero"
        />
        {getErrorMessage('routeName') && <div className="error-message">{getErrorMessage('routeName')}</div>}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Distancia (km)</label>
        <input
          type="number"
          value={distance}
          onChange={(e) => setDistance(e.target.value)}
          className="input-field"
          placeholder="0.0"
          step="0.1"
          min="0"
        />
        {getErrorMessage('distance') && <div className="error-message">{getErrorMessage('distance')}</div>}
      </div>

      <div className="bg-gray-50 p-3 rounded text-sm">
        <p className="text-gray-700">
          <strong>Tiempo:</strong> {Math.floor(elapsedSeconds / 60).toString().padStart(2, '0')}:
          {(elapsedSeconds % 60).toString().padStart(2, '0')}
        </p>
      </div>

      <button type="submit" className="btn-primary w-full">
        Guardar Ruta
      </button>
    </form>
  );
}
