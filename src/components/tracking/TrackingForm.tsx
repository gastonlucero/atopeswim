import { useState } from 'react';
import type { Salida, Ruta } from '../../types';
import { updateSalida } from '../../utils/storage';
import { addRuta } from '../../utils/storage';
import { validateMinDistance, type ValidationError } from '../../utils/validation';
import { formatDateTime, formatDistance } from '../../utils/formatting';

interface TrackingFormProps {
  salida: Salida;
  onBack: () => void;
}

export default function TrackingForm({ salida, onBack }: TrackingFormProps) {
  const [distanceCompleted, setDistanceCompleted] = useState('');
  const [errors, setErrors] = useState<ValidationError[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const distance = parseFloat(distanceCompleted);

    if (!distanceCompleted || distance <= 0) {
      setErrors([{ field: 'distance', message: 'Ingresa una distancia válida' }]);
      return;
    }

    const distanceErrors = validateMinDistance(distance);
    if (distanceErrors.length > 0) {
      setErrors(distanceErrors);
      return;
    }

    setIsLoading(true);

    // Mark salida as finished
    const updatedSalida: Salida = {
      ...salida,
      status: 'finished',
    };
    updateSalida(salida.id, updatedSalida);

    // Create a ruta from this salida
    const ruta: Ruta = {
      id: Date.now().toString(),
      name: `${salida.organizerName} - ${salida.location.description}`,
      salidaId: salida.id,
      salidaDate: salida.dateTime,
      salidaDateTime: salida.dateTime,
      distanceKm: distance,
      createdAt: new Date().toISOString(),
    };

    addRuta(ruta);

    setSuccess(true);
    setErrors([]);
    setDistanceCompleted('');

    setTimeout(() => {
      setIsLoading(false);
      onBack();
    }, 2000);
  };

  const getErrorMessage = (field: string) => errors.find((e) => e.field === field)?.message;

  if (success) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100%',
        padding: '48px 20px',
        gap: '20px',
      }}>
        <div className="glass-container" style={{
          background: 'var(--glass-bg)',
          backdropFilter: 'blur(var(--glass-blur))',
          borderRadius: 'var(--radius-lg)',
          textAlign: 'center',
          maxWidth: '400px',
          width: '100%',
        }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>🎉</div>
          <h3 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '20px',
            fontWeight: 700,
            color: 'var(--color-success)',
            margin: '0 0 8px',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
          }}>
            Salida finalizada
          </h3>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '14px',
            color: 'var(--color-on-surface-variant)',
            margin: 0,
          }}>
            La ruta ha sido guardada en tu historial
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', minHeight: 0, paddingBottom: '24px' }}>
      {/* Back Button */}
      <button
        onClick={onBack}
        style={{
          background: 'none',
          border: 'none',
          color: 'var(--color-primary)',
          fontFamily: 'var(--font-heading)',
          fontWeight: 600,
          fontSize: '14px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          padding: '0 16px',
          transition: 'opacity 0.2s ease',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
        }}
        onMouseEnter={(e) => (e.currentTarget as HTMLButtonElement).style.opacity = '0.7'}
        onMouseLeave={(e) => (e.currentTarget as HTMLButtonElement).style.opacity = '1'}
      >
        <span className="material-symbols-outlined">arrow_back</span>
        Volver
      </button>

      {/* Session Summary */}
      <div className="glass-container" style={{
        background: 'linear-gradient(135deg, var(--glass-bg) 0%, rgba(187, 222, 251, 0.5) 100%)',
        backdropFilter: 'blur(var(--glass-blur))',
        borderRadius: 'var(--radius-lg)',
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
          Salida actual
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: '12px',
              color: 'var(--color-on-surface-variant)',
              margin: '0 0 4px',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}>
              Organizador
            </p>
            <p style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '18px',
              fontWeight: 700,
              color: 'var(--color-on-surface)',
              margin: 0,
            }}>
              {salida.organizerName}
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '11px',
                color: 'var(--color-on-surface-variant)',
                margin: '0 0 4px',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}>
                Fecha
              </p>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '13px',
                fontWeight: 500,
                color: 'var(--color-on-surface)',
                margin: 0,
              }}>
                {formatDateTime(salida.dateTime).split(' ')[0]}
              </p>
            </div>
            <div>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '11px',
                color: 'var(--color-on-surface-variant)',
                margin: '0 0 4px',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}>
                Ubicación
              </p>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '13px',
                fontWeight: 500,
                color: 'var(--color-on-surface)',
                margin: 0,
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
              }}>
                <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>place</span>
                {salida.location.description}
              </p>
            </div>
          </div>

          <div style={{
            padding: '12px 16px',
            background: 'var(--color-surface-container)',
            borderRadius: 'var(--radius-md)',
            borderLeft: '4px solid var(--color-primary)',
          }}>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: '12px',
              color: 'var(--color-on-surface-variant)',
              margin: '0 0 4px',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}>
              Distancia planeada
            </p>
            <p style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '20px',
              fontWeight: 700,
              color: 'var(--color-primary)',
              margin: 0,
            }}>
              {formatDistance(salida.distanceKm)}
            </p>
          </div>
        </div>
      </div>

      {/* Distance Input Form */}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div className="glass-container" style={{
          background: 'var(--glass-bg)',
          backdropFilter: 'blur(var(--glass-blur))',
          borderRadius: 'var(--radius-lg)',
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
            <span className="material-symbols-outlined">speed</span>
            Tu nada
          </h3>

          {/* Distance Input */}
          <div className="form-group">
            <label className="form-label">Distancia completada (km)</label>
            <input
              type="number"
              value={distanceCompleted}
              onChange={(e) => setDistanceCompleted(e.target.value)}
              className="input-field"
              placeholder="0.0"
              step="0.1"
              min="0"
              disabled={isLoading}
              style={{ fontSize: '16px' }}
            />
            {getErrorMessage('distance') && (
              <span className="error-message">{getErrorMessage('distance')}</span>
            )}
          </div>

          {/* Distance Slider */}
          {distanceCompleted && (
            <div style={{ marginTop: '16px' }}>
              <label className="form-label">Visualización</label>
              <input
                type="range"
                min="0"
                max={Math.max(salida.distanceKm * 1.5, parseFloat(distanceCompleted) * 1.2)}
                step="0.1"
                value={distanceCompleted}
                onChange={(e) => setDistanceCompleted(e.target.value)}
                disabled={isLoading}
                style={{ width: '100%' }}
              />
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginTop: '8px',
                fontSize: '12px',
                color: 'var(--color-on-surface-variant)',
              }}>
                <span>0 km</span>
                <span style={{ color: 'var(--color-primary)', fontWeight: 600 }}>
                  {parseFloat(distanceCompleted).toFixed(2)} km
                </span>
                <span>{Math.max(salida.distanceKm * 1.5, parseFloat(distanceCompleted) * 1.2).toFixed(1)} km</span>
              </div>
            </div>
          )}

          {/* Comparison Info */}
          <div style={{
            marginTop: '16px',
            padding: '12px 16px',
            background: 'var(--color-surface-container)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--color-surface-container-high)',
          }}>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: '12px',
              color: 'var(--color-on-surface-variant)',
              margin: '0 0 4px',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}>
              Comparación
            </p>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '8px',
            }}>
              <span style={{
                fontFamily: 'var(--font-body)',
                fontSize: '13px',
                fontWeight: 500,
              }}>
                Planeado: <span style={{ color: 'var(--color-primary)', fontWeight: 600 }}>
                  {formatDistance(salida.distanceKm)}
                </span>
              </span>
              {distanceCompleted && (
                <>
                  <span>→</span>
                  <span style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '13px',
                    fontWeight: 600,
                    color: 'var(--color-secondary)',
                  }}>
                    {parseFloat(distanceCompleted).toFixed(2)} km
                  </span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="btn-primary"
          disabled={isLoading}
          style={{
            width: '100%',
            margin: '0 16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            opacity: isLoading ? 0.7 : 1,
            cursor: isLoading ? 'not-allowed' : 'pointer',
          }}
        >
          <span className="material-symbols-outlined">
            {isLoading ? 'hourglass_empty' : 'check_circle'}
          </span>
          {isLoading ? 'Finalizando...' : 'Finalizar nada'}
        </button>
      </form>
    </div>
  );
}
