import { useState, useEffect } from 'react';
import type { Salida } from '../../types';
import type { Location } from '../../constants/locations';
import { addSalida, updateSalida } from '../../utils/storage';
import { validateSalida } from '../../utils/validation';
import type { ValidationError } from '../../utils/validation';
import { getMinDateTimeLocal } from '../../utils/formatting';
import { ORGANIZERS } from '../../constants/organizers';

interface SalidaFormProps {
  editingSalida: Salida | null;
  selectedLocation: Location | null;
  onClose: () => void;
  onBackToBeaches?: () => void;
}

export default function SalidaForm({ editingSalida, selectedLocation, onClose, onBackToBeaches }: SalidaFormProps) {
  const [organizerName, setOrganizerName] = useState('');
  const [dateTime, setDateTime] = useState('');
  const [distanceKm, setDistanceKm] = useState('');
  const [locationDescription, setLocationDescription] = useState(selectedLocation?.name || '');
  const [showBeachInfo, setShowBeachInfo] = useState(false);
  const [participants, setParticipants] = useState<string[]>([]);
  const [errors, setErrors] = useState<ValidationError[]>([]);
  const minDateTime = getMinDateTimeLocal();

  useEffect(() => {
    if (editingSalida) {
      setOrganizerName(editingSalida.organizerName || '');
      setDateTime(editingSalida.dateTime || '');
      setDistanceKm(editingSalida.distanceKm?.toString() || '');
      setLocationDescription(editingSalida.location?.description || '');
      setParticipants(editingSalida.participants || []);
    } else if (selectedLocation) {
      setOrganizerName('');
      setDateTime('');
      setDistanceKm('');
      setLocationDescription(selectedLocation.name);
      setParticipants([]);
    } else {
      setOrganizerName('');
      setDateTime('');
      setDistanceKm('');
      setLocationDescription('');
      setParticipants([]);
    }
  }, [editingSalida, selectedLocation]);

  const handleToggleParticipant = (name: string) => {
    setParticipants((prev) =>
      prev.includes(name) ? prev.filter((p) => p !== name) : [...prev, name]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let validationErrors = validateSalida(
      organizerName,
      dateTime,
      parseFloat(distanceKm),
      locationDescription
    );

    if (editingSalida) {
      validationErrors = validationErrors.filter((e) => e.field !== 'dateTime');
    }

    if (!dateTime) {
      if (!validationErrors.find((e) => e.field === 'dateTime')) {
        validationErrors.push({ field: 'dateTime', message: 'La fecha y hora son requeridas' });
      }
    }

    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    const salida: Salida = {
      id: editingSalida?.id || Date.now().toString(),
      organizerName,
      dateTime,
      distanceKm: parseFloat(distanceKm),
      location: {
        description: locationDescription,
      },
      participants,
      status: editingSalida?.status || 'pending',
      createdAt: editingSalida?.createdAt || new Date().toISOString(),
    };

    if (editingSalida) {
      updateSalida(editingSalida.id, salida);
    } else {
      addSalida(salida);
    }

    onClose();
  };

  const getErrorMessage = (field: string) => errors.find((e) => e.field === field)?.message;

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px', minHeight: 0 }}>
      {/* SECTION 1: BASIC DETAILS */}
      <div className="glass-container" style={{
        background: 'var(--glass-bg)',
        backdropFilter: 'blur(var(--glass-blur))',
        borderRadius: 'var(--radius-md)',
        margin: '0 16px',
      }}>
        <h3 style={{
          fontFamily: 'var(--font-heading)',
          fontSize: '16px',
          fontWeight: 600,
          color: 'var(--color-on-surface)',
          margin: '0 0 16px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
        }}>
          <span className="material-symbols-outlined">info</span>
          Detalles de la salida
        </h3>

        <div className="form-group">
          <label className="form-label">Organizador</label>
          <select
            value={organizerName}
            onChange={(e) => setOrganizerName(e.target.value)}
            className="input-field"
          >
            <option value="">Selecciona un organizador</option>
            {ORGANIZERS.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
          {getErrorMessage('organizerName') && (
            <span className="error-message">{getErrorMessage('organizerName')}</span>
          )}
        </div>

        <div className="form-group">
          <label className="form-label">Fecha y Hora</label>
          <input
            type="datetime-local"
            value={dateTime}
            onChange={(e) => setDateTime(e.target.value)}
            min={minDateTime}
            className="input-field"
          />
          {getErrorMessage('dateTime') && (
            <span className="error-message">{getErrorMessage('dateTime')}</span>
          )}
        </div>

        <div className="form-group">
          <label className="form-label">Distancia (km)</label>
          <input
            type="number"
            step="0.1"
            value={distanceKm}
            onChange={(e) => setDistanceKm(e.target.value)}
            className="input-field"
            placeholder="Ej: 8.5"
          />
          {getErrorMessage('distanceKm') && (
            <span className="error-message">{getErrorMessage('distanceKm')}</span>
          )}
        </div>
      </div>

      {/* SECTION 2: LOCATION */}
      <div className="glass-container" style={{
        background: 'var(--glass-bg)',
        backdropFilter: 'blur(var(--glass-blur))',
        borderRadius: 'var(--radius-md)',
        margin: '0 16px',
      }}>
        <h3 style={{
          fontFamily: 'var(--font-heading)',
          fontSize: '16px',
          fontWeight: 600,
          color: 'var(--color-on-surface)',
          margin: '0 0 16px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
        }}>
          <span className="material-symbols-outlined">place</span>
          Punto de encuentro
        </h3>

        <div style={{
          padding: '16px',
          background: 'var(--color-surface-container)',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--color-surface-container-high)',
          marginBottom: '12px',
        }}>
          <p style={{
            fontFamily: 'var(--font-heading)',
            fontWeight: 600,
            fontSize: '16px',
            color: 'var(--color-primary)',
            margin: 0,
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}>
            <span className="material-symbols-outlined">place</span>
            {locationDescription}
          </p>
        </div>

        {selectedLocation && (
          <>
            <button
              type="button"
              onClick={() => setShowBeachInfo(!showBeachInfo)}
              className="btn-secondary"
              style={{ width: '100%', marginBottom: showBeachInfo ? '8px' : '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
            >
              <span className="material-symbols-outlined">
                {showBeachInfo ? 'keyboard_arrow_up' : 'water_waves'}
              </span>
              {showBeachInfo ? 'Ocultar pronóstico' : 'Ver pronóstico de olas'}
            </button>

            {showBeachInfo && selectedLocation && (
              <div style={{
                marginBottom: '12px',
                borderRadius: 'var(--radius-sm)',
                overflow: 'hidden',
                border: '1px solid var(--color-surface-container-high)',
                background: 'var(--color-surface-container-low)',
              }}>
                <iframe
                  allowTransparency={true}
                  src={selectedLocation.surfForecastUrl}
                  scrolling="no"
                  frameBorder="0"
                  marginWidth={0}
                  marginHeight={0}
                  style={{ width: '100%', minHeight: 300, display: 'block' }}
                />
              </div>
            )}
          </>
        )}

        {onBackToBeaches && (
          <button
            type="button"
            onClick={onBackToBeaches}
            className="btn-secondary"
            style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
          >
            <span className="material-symbols-outlined">arrow_back</span>
            Cambiar playa
          </button>
        )}
      </div>

      {/* SECTION 3: PARTICIPANTS */}
      <div className="glass-container" style={{
        background: 'var(--glass-bg)',
        backdropFilter: 'blur(var(--glass-blur))',
        borderRadius: 'var(--radius-md)',
        margin: '0 16px',
      }}>
        <h3 style={{
          fontFamily: 'var(--font-heading)',
          fontSize: '16px',
          fontWeight: 600,
          color: 'var(--color-on-surface)',
          margin: '0 0 8px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
        }}>
          <span className="material-symbols-outlined">people</span>
          Participantes
        </h3>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: '13px',
          color: 'var(--color-on-surface-variant)',
          margin: '0 0 12px',
        }}>
          {participants.length === 0 ? 'Selecciona participantes' : `${participants.length} seleccionado${participants.length !== 1 ? 's' : ''}`}
        </p>

        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '8px',
          padding: '12px',
          background: 'var(--color-surface-container)',
          borderRadius: 'var(--radius-md)',
        }}>
          {ORGANIZERS.map((name) => (
            <label
              key={name}
              className={`chip ${participants.includes(name) ? 'active' : ''}`}
              style={{
                padding: '8px 12px',
                fontSize: '12px',
              }}
            >
              <input
                type="checkbox"
                checked={participants.includes(name)}
                onChange={() => handleToggleParticipant(name)}
                style={{
                  cursor: 'pointer',
                  accentColor: 'var(--color-primary)',
                  marginRight: '4px',
                }}
              />
              {name}
            </label>
          ))}
        </div>
      </div>

      {/* ACTION BUTTONS */}
      <div style={{
        display: 'flex',
        gap: '12px',
        padding: '0 16px',
        marginBottom: '16px',
      }}>
        <button
          type="submit"
          className="btn-primary"
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
          }}
        >
          <span className="material-symbols-outlined">
            {editingSalida ? 'check_circle' : 'add_circle'}
          </span>
          {editingSalida ? 'Actualizar' : 'Crear salida'}
        </button>
        <button
          type="button"
          onClick={onClose}
          className="btn-secondary"
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
          }}
        >
          <span className="material-symbols-outlined">close</span>
          Cancelar
        </button>
      </div>

      {/* INFO INLINE */}
    </form>
  );
}
