import type { Location } from '../../constants/locations';

interface BeachInfoCardProps {
  location: Location;
  isOpen: boolean;
  onClose: () => void;
}

export default function BeachInfoCard({ location, isOpen, onClose }: BeachInfoCardProps) {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0, 0, 0, 0.4)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 50,
        padding: 16,
        backdropFilter: 'blur(4px)',
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: 'var(--color-surface-lowest)',
          borderRadius: 'var(--radius-lg)',
          maxWidth: '90vw',
          width: '100%',
          maxHeight: '85vh',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          border: '1px solid var(--color-outline-variant)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            position: 'sticky',
            top: 0,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 20,
            borderBottom: '1px solid var(--color-outline-variant)',
            background: 'var(--color-surface-lowest)',
            zIndex: 10,
          }}
        >
          <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '1.25rem', color: 'var(--color-primary)', margin: 0 }}>
            {location.name}
          </h2>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '1.5rem',
              cursor: 'pointer',
              color: 'var(--color-outline)',
              padding: 8,
              transition: 'color 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-on-surface)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-outline)')}
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 20, overflow: 'auto' }}>
          {/* Info Links Section */}
          <div className="form-section">
            <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 500, fontSize: '0.875rem', color: 'var(--color-on-surface-variant)', textTransform: 'uppercase', letterSpacing: '0.04em', margin: 0, marginBottom: 12 }}>
              ℹ️ Información
            </h3>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <a
                href={location.infoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
                style={{ flex: 1, minWidth: 120, textDecoration: 'none', minHeight: 44 }}
              >
                📋 Info Playa
              </a>
            </div>
          </div>

          {/* Surf Forecast Widget Section */}
          <div className="form-section">
            <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 500, fontSize: '0.875rem', color: 'var(--color-on-surface-variant)', textTransform: 'uppercase', letterSpacing: '0.04em', margin: 0, marginBottom: 12 }}>
              🌊 Pronóstico de Olas
            </h3>
            <div style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', background: 'var(--color-surface-container-low)' }}>
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
          </div>
        </div>
      </div>
    </div>
  );
}
