import { useState, useEffect } from 'react';
import type { Ruta } from '../../types';
import { getRutas } from '../../utils/storage';
import { formatDate } from '../../utils/formatting';

interface RutaListProps {
  onSelectRuta: (ruta: Ruta) => void;
}

export default function RutaList({ onSelectRuta }: RutaListProps) {
  const [rutas, setRutas] = useState<Ruta[]>([]);

  useEffect(() => {
    setRutas(getRutas().sort((a, b) => new Date(b.salidaDate).getTime() - new Date(a.salidaDate).getTime()));
  }, []);

  if (rutas.length === 0) {
    return (
      <div style={{
        textAlign: 'center',
        padding: '48px 20px',
        minHeight: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '12px',
      }}>
        <div style={{ fontSize: '48px' }}>🏊</div>
        <h3 style={{
          fontFamily: 'var(--font-heading)',
          fontWeight: 700,
          color: 'var(--color-on-surface)',
          margin: 0,
          fontSize: '18px',
        }}>
          Sin rutas registradas
        </h3>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: '14px',
          color: 'var(--color-on-surface-variant)',
          margin: 0,
        }}>
          Finaliza una salida para ver tu historial
        </p>
      </div>
    );
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
      minHeight: 0,
    }}>
      {/* Header */}
      <div style={{ padding: '0 16px' }}>
        <h2 style={{
          fontFamily: 'var(--font-heading)',
          fontSize: '28px',
          fontWeight: 800,
          margin: '0 0 8px',
          background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          letterSpacing: '-0.01em',
        }}>
          🏊 Tu historial
        </h2>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: '14px',
          fontWeight: 400,
          color: 'var(--color-on-surface-variant)',
          margin: 0,
          lineHeight: '20px',
        }}>
          {rutas.length} nada{rutas.length !== 1 ? 's' : ''} completada{rutas.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Rutas List */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        padding: '0 16px',
        paddingBottom: '24px',
        overflow: 'auto',
      }}>
        {rutas.map((ruta) => (
          <div
            key={ruta.id}
            onClick={() => onSelectRuta(ruta)}
            className="card-glass"
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '16px',
              cursor: 'pointer',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--color-surface-container-high)',
              background: 'var(--glass-bg)',
              backdropFilter: 'blur(var(--glass-blur))',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLDivElement;
              el.style.transform = 'translateY(-2px)';
              el.style.boxShadow = 'var(--shadow-md)';
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLDivElement;
              el.style.transform = 'translateY(0)';
              el.style.boxShadow = 'none';
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <div style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '15px',
                fontWeight: 600,
                color: 'var(--color-on-surface)'
              }}>
                {ruta.name}
              </div>
              <div style={{
                fontFamily: 'var(--font-body)',
                fontSize: '13px',
                color: 'var(--color-on-surface-variant)'
              }}>
                {formatDate(ruta.salidaDate)}
              </div>
            </div>
            <div style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '16px',
              fontWeight: 700,
              color: 'var(--color-primary)'
            }}>
              {ruta.distanceKm.toFixed(2)}<small style={{ fontSize: '11px', marginLeft: '2px', color: 'var(--color-on-surface-variant)', fontWeight: 500 }}>km</small>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
