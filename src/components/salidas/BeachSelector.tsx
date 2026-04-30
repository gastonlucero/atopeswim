import { useState } from 'react';
import type { Location } from '../../constants/locations';
import { LOCATIONS } from '../../constants/locations';

interface BeachSelectorProps {
  onSelectBeach: (location: Location) => void;
}

export default function BeachSelector({ onSelectBeach }: BeachSelectorProps) {
  const [expandedForecastId, setExpandedForecastId] = useState<string | null>(null);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', minHeight: 0 }}>
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
          🏖️ Selecciona una playa
        </h2>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: '14px',
          fontWeight: 400,
          color: 'var(--color-on-surface-variant)',
          margin: 0,
          lineHeight: '20px',
        }}>
          Elige el punto de encuentro para tu nada en el mar
        </p>
      </div>

      {/* Beach Cards Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
        gap: '16px',
        padding: '0 16px',
        overflow: 'auto',
      }}>
        {LOCATIONS.map((location) => (
          <div
            key={location.id}
            onClick={() => onSelectBeach(location)}
            className="card-glass"
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              padding: 0,
              margin: 0,
              overflow: 'hidden',
              cursor: 'pointer',
              border: 'none',
              background: 'none',
              textAlign: 'left',
              width: '100%',
            }}
          >
            {/* Beach Image with Gradient Overlay */}
            <div style={{
              position: 'relative',
              height: '160px',
              width: '100%',
              overflow: 'hidden',
              borderRadius: 'var(--radius-lg)',
            }}>
              <img
                src={location.imageUrl}
                alt={location.name}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                  transition: 'transform 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  const img = e.currentTarget as HTMLImageElement;
                  img.style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  const img = e.currentTarget as HTMLImageElement;
                  img.style.transform = 'scale(1)';
                }}
              />
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.2) 100%)',
              }} />
            </div>

            {/* Content Wrapper */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              padding: '16px',
              background: 'var(--glass-bg)',
              backdropFilter: 'blur(var(--glass-blur))',
            }}>
              {/* Beach Name */}
              <h3 style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '18px',
                fontWeight: 700,
                color: 'var(--color-primary)',
                margin: 0,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}>
                <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>
                  place
                </span>
                {location.name}
              </h3>


              {/* Wave Forecast Toggle */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  setExpandedForecastId(expandedForecastId === location.id ? null : location.id);
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontFamily: 'var(--font-body)',
                  fontSize: '13px',
                  color: 'var(--color-secondary)',
                  textDecoration: 'none',
                  fontWeight: 500,
                  transition: 'opacity 0.2s ease',
                  border: 'none',
                  background: 'none',
                  borderBottom: expandedForecastId === location.id ? 'none' : '1px solid rgba(13, 71, 161, 0.2)',
                  padding: 0,
                  paddingBottom: expandedForecastId === location.id ? '0' : '8px',
                  marginTop: '8px',
                  cursor: 'pointer',
                  width: 'fit-content'
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.7')}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
              >
                <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>
                  {expandedForecastId === location.id ? 'keyboard_arrow_up' : 'water_waves'}
                </span>
                {expandedForecastId === location.id ? 'Ocultar pronóstico' : 'Ver pronóstico de olas'}
              </button>

              {/* Inline Forecast Widget */}
              {expandedForecastId === location.id && (
                <div style={{
                  marginTop: '4px',
                  borderRadius: 'var(--radius-sm)',
                  overflow: 'hidden',
                  border: '1px solid var(--color-surface-container-high)',
                  background: 'var(--color-surface-container-low)',
                }}
                onClick={(e) => e.stopPropagation()}
                >
                  <iframe
                    allowTransparency={true}
                    src={location.surfForecastUrl}
                    scrolling="no"
                    frameBorder="0"
                    marginWidth={0}
                    marginHeight={0}
                    style={{ width: '100%', minHeight: 300, display: 'block' }}
                  />
                </div>
              )}

              {/* Select Button */}
              <button
                style={{
                  marginTop: '8px',
                  padding: '8px 16px',
                  background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: 'var(--radius-pill)',
                  fontFamily: 'var(--font-heading)',
                  fontSize: '12px',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectBeach(location);
                }}
                onMouseEnter={(e) => {
                  const btn = e.currentTarget as HTMLButtonElement;
                  btn.style.transform = 'translateY(-2px)';
                  btn.style.boxShadow = 'var(--shadow-lg)';
                }}
                onMouseLeave={(e) => {
                  const btn = e.currentTarget as HTMLButtonElement;
                  btn.style.transform = 'translateY(0)';
                  btn.style.boxShadow = 'none';
                }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>
                  arrow_forward
                </span>
                Seleccionar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
