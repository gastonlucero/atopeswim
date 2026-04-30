import { useState } from 'react';
import type { Ruta } from '../../types';
import { updateRuta, deleteRuta } from '../../utils/storage';
import { formatDate, formatDistance } from '../../utils/formatting';

interface RutaDetailProps {
  ruta: Ruta;
  onBack: () => void;
}

export default function RutaDetail({ ruta, onBack }: RutaDetailProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(ruta.name);

  const handleSaveEdit = () => {
    const updated: Ruta = {
      ...ruta,
      name: editName,
    };
    updateRuta(ruta.id, updated);
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (confirm('¿Estás seguro de que deseas eliminar esta ruta?')) {
      deleteRuta(ruta.id);
      onBack();
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', minHeight: 0 }}>
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
        onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.7')}
        onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
      >
        <span className="material-symbols-outlined">arrow_back</span>
        Volver
      </button>

      {/* Ruta Info Card */}
      <div className="glass-container" style={{
        background: 'var(--glass-bg)',
        backdropFilter: 'blur(var(--glass-blur))',
        borderRadius: 'var(--radius-lg)',
        margin: '0 16px',
      }}>
        {isEditing ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <input
              type="text"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              className="input-field"
              autoFocus
            />
            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                onClick={handleSaveEdit}
                className="btn-primary"
                style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
              >
                <span className="material-symbols-outlined">check</span>
                Guardar
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="btn-secondary"
                style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
              >
                <span className="material-symbols-outlined">close</span>
                Cancelar
              </button>
            </div>
          </div>
        ) : (
          <>
            <h2 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '24px',
              fontWeight: 800,
              color: 'var(--color-on-surface)',
              margin: '0 0 16px',
              letterSpacing: '-0.01em',
            }}>
              {ruta.name}
            </h2>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                onClick={() => setIsEditing(true)}
                className="btn-primary"
                style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
              >
                <span className="material-symbols-outlined">edit</span>
                Editar
              </button>
              <button
                onClick={handleDelete}
                className="btn-danger"
                style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
              >
                <span className="material-symbols-outlined">delete</span>
                Eliminar
              </button>
            </div>
          </>
        )}
      </div>

      {/* Stats Card */}
      <div className="glass-container" style={{
        background: 'linear-gradient(135deg, var(--glass-bg) 0%, rgba(187, 222, 251, 0.3) 100%)',
        backdropFilter: 'blur(var(--glass-blur))',
        borderRadius: 'var(--radius-lg)',
        margin: '0 16px',
      }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: '12px',
              color: 'var(--color-on-surface-variant)',
              margin: '0 0 8px',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              fontWeight: 500,
            }}>
              Fecha de la salida
            </p>
            <p style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '18px',
              fontWeight: 700,
              color: 'var(--color-primary)',
              margin: 0,
            }}>
              {formatDate(ruta.salidaDate)}
            </p>
          </div>
          <div>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: '12px',
              color: 'var(--color-on-surface-variant)',
              margin: '0 0 8px',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              fontWeight: 500,
            }}>
              Distancia completada
            </p>
            <p style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '18px',
              fontWeight: 700,
              color: 'var(--color-secondary)',
              margin: 0,
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
            }}>
              <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>
                trending_up
              </span>
              {formatDistance(ruta.distanceKm)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
