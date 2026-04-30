import { useState, useEffect } from 'react';
import type { Salida } from '../../types';
import { getSalidas } from '../../utils/storage';
import { formatDateTime, formatDistance } from '../../utils/formatting';

interface TrackingSelectorProps {
  onSelectSalida: (salida: Salida) => void;
}

export default function TrackingSelector({ onSelectSalida }: TrackingSelectorProps) {
  const [pendingSalidas, setPendingSalidas] = useState<Salida[]>([]);

  useEffect(() => {
    const allSalidas = getSalidas();
    const pending = allSalidas
      .filter((s) => s.status === 'pending')
      .sort((a, b) => new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime());
    setPendingSalidas(pending);
  }, []);

  if (pendingSalidas.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '48px 20px' }}>
        <div style={{ fontSize: '2.5rem', marginBottom: 12 }}>⏳</div>
        <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, color: 'var(--color-on-surface)', marginBottom: 4 }}>Sin salidas pendientes</p>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: 'var(--color-on-surface-variant)' }}>Crea una salida primero en la pestaña Salidas</p>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '1.25rem', color: 'var(--color-on-surface)', padding: '0 var(--space-margin)', letterSpacing: '-0.01em', margin: 0 }}>
        Selecciona una salida
      </h2>
      {pendingSalidas.map((salida) => (
        <button
          key={salida.id}
          onClick={() => onSelectSalida(salida)}
          className="card card-waterline shadow-underwater-sm"
          style={{ width: '100%', textAlign: 'left', cursor: 'pointer', background: 'none', margin: '0 var(--space-margin)', transition: 'all 0.2s ease' }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-2px)';
            (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 8px 20px rgba(0, 93, 144, 0.12)';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)';
            (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 4px 12px rgba(0, 93, 144, 0.06)';
          }}
        >
          <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '1rem', color: 'var(--color-on-surface)', marginBottom: 8 }}>
            {salida.organizerName}
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: 'var(--color-on-surface-variant)' }}>
              📅 {formatDateTime(salida.dateTime)}
            </span>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: 'var(--color-on-surface-variant)' }}>
              📍 {salida.location.description}
            </span>
          </div>
          <div style={{ marginTop: 10 }}>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: 4,
              padding: '4px 12px', borderRadius: 'var(--radius-full)',
              background: 'var(--color-primary-fixed)', color: 'var(--color-primary)',
              fontFamily: 'var(--font-heading)', fontSize: '0.8rem', fontWeight: 600,
            }}>
              🌊 {formatDistance(salida.distanceKm)}
            </span>
          </div>
        </button>
      ))}
    </div>
  );
}
