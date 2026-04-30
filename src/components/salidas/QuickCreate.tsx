import { useState } from 'react';
import type { Salida } from '../../types';
import type { Location } from '../../constants/locations';
import { LOCATIONS } from '../../constants/locations';
import { ORGANIZERS } from '../../constants/organizers';
import { addSalida, updateSalida, deleteSalida } from '../../utils/storage';

interface QuickCreateProps {
  editingSalida: Salida | null;
  onClose: () => void;
}

const TIME_OPTIONS = ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '17:30', '18:00'];

const getNextDays = (): { label: string; value: string }[] => {
  const days: { label: string; value: string }[] = [];
  const now = new Date();

  for (let i = 1; i <= 7; i++) {
    const d = new Date(now);
    d.setDate(d.getDate() + i);
    const weekday = d.toLocaleDateString('es-ES', { weekday: 'short' });
    const dayNum = d.getDate();
    days.push({ label: `${weekday} ${dayNum}`, value: d.toISOString().slice(0, 10) });
  }
  return days;
};

export default function QuickCreate({ editingSalida, onClose }: QuickCreateProps) {
  const dayOptions = getNextDays();

  const [selectedBeach, setSelectedBeach] = useState<Location | null>(
    editingSalida
      ? LOCATIONS.find(l => l.name === editingSalida.location.description) || null
      : null
  );
  const [selectedDay, setSelectedDay] = useState<string>(
    editingSalida
      ? new Date(editingSalida.dateTime).toISOString().slice(0, 10)
      : dayOptions[0].value
  );
  const [selectedTime, setSelectedTime] = useState<string>(
    editingSalida
      ? `${String(new Date(editingSalida.dateTime).getHours()).padStart(2, '0')}:${String(new Date(editingSalida.dateTime).getMinutes()).padStart(2, '0')}`
      : '07:30'
  );
  const [distance, setDistance] = useState<number>(
    editingSalida ? editingSalida.distanceKm : 2.5
  );
  const [selectedPeople, setSelectedPeople] = useState<string[]>(
    editingSalida ? editingSalida.participants || [] : []
  );
  const [organizerName, setOrganizerName] = useState<string>(
    editingSalida ? editingSalida.organizerName : ''
  );

  const togglePerson = (name: string) => {
    setSelectedPeople(prev =>
      prev.includes(name) ? prev.filter(p => p !== name) : [...prev, name]
    );
  };

  const handleSubmit = () => {
    if (!selectedBeach || !organizerName) return;

    const dateTime = `${selectedDay}T${selectedTime}:00`;

    const salida: Salida = {
      id: editingSalida?.id || Date.now().toString(),
      organizerName,
      dateTime,
      distanceKm: distance,
      location: {
        description: selectedBeach.name,
      },
      participants: selectedPeople,
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

  const stepLabelStyle: React.CSSProperties = {
    fontSize: '11px',
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    color: 'var(--color-on-surface-variant)',
    fontWeight: 600,
    fontFamily: 'var(--font-heading)',
    margin: '20px 0 10px',
  };

  const chipStyle = (active: boolean): React.CSSProperties => ({
    padding: '10px 16px',
    borderRadius: '999px',
    background: active ? 'var(--color-primary)' : 'transparent',
    border: active ? '1px solid var(--color-primary)' : '1px solid var(--color-surface-container-high)',
    color: active ? 'white' : 'var(--color-on-surface)',
    fontFamily: 'var(--font-body)',
    fontSize: '14px',
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'all 0.15s ease',
  });

  const crewChipStyle = (active: boolean): React.CSSProperties => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '6px',
    padding: '12px 0',
    borderRadius: '14px',
    background: active ? 'var(--color-surface-container-low)' : 'transparent',
    border: active ? '1px solid var(--color-primary)' : '1px solid var(--color-surface-container-high)',
    cursor: 'pointer',
    transition: 'all 0.15s ease',
  });

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '0',
      minHeight: 0,
    }}>
      {/* Header */}
      <div style={{ padding: '0 4px', marginBottom: '4px' }}>
        <h3 style={{
          fontFamily: 'var(--font-heading)',
          fontSize: '24px',
          fontWeight: 600,
          letterSpacing: '-0.5px',
          color: 'var(--color-on-surface)',
          margin: '0 0 4px',
        }}>
          {editingSalida ? 'Editar salida' : 'Nueva salida'}
        </h3>
        <p style={{
          fontSize: '14px',
          color: 'var(--color-on-surface-variant)',
          fontFamily: 'var(--font-body)',
          margin: 0,
        }}>
          Tres pasos. Sin prisa.
        </p>
      </div>

      {/* ── ¿Quién organiza? ── */}
      <div style={stepLabelStyle}>¿Quién organiza?</div>
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        {ORGANIZERS.map(name => (
          <button
            key={name}
            type="button"
            onClick={() => setOrganizerName(name)}
            style={chipStyle(organizerName === name)}
          >
            {name}
          </button>
        ))}
      </div>

      {/* ── ¿Dónde? ── */}
      <div style={stepLabelStyle}>¿Dónde?</div>
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        {LOCATIONS.map(loc => (
          <button
            key={loc.id}
            type="button"
            onClick={() => setSelectedBeach(loc)}
            style={chipStyle(selectedBeach?.id === loc.id)}
          >
            {loc.name.split(',')[0]}
          </button>
        ))}
      </div>

      {/* ── Beach Photo & Forecast (always visible when selected) ── */}
      {selectedBeach && (
        <div style={{
          marginTop: '12px',
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden',
          border: '1px solid var(--color-surface-container-high)',
          background: 'var(--glass-bg)',
        }}>
          {/* Beach Photo */}
          <div style={{ position: 'relative', height: '160px', overflow: 'hidden' }}>
            <img
              src={selectedBeach.imageUrl}
              alt={selectedBeach.name}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
              }}
            />
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              padding: '12px 16px',
              background: 'linear-gradient(transparent, rgba(0,0,0,0.6))',
              color: 'white',
              fontFamily: 'var(--font-heading)',
              fontSize: '16px',
              fontWeight: 600,
            }}>
              📍 {selectedBeach.name}
            </div>
          </div>

          {/* Surf Forecast Widget */}
          <div style={{ padding: '12px' }}>
            <div style={{
              fontSize: '11px',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--color-on-surface-variant)',
              fontWeight: 600,
              fontFamily: 'var(--font-heading)',
              marginBottom: '8px',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
            }}>
              <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>waves</span>
              Pronóstico de olas
            </div>
            <div style={{
              borderRadius: 'var(--radius-sm)',
              overflow: 'hidden',
              border: '1px solid var(--color-surface-container-high)',
              background: 'var(--color-surface-container-low)',
            }}>
              <iframe
                src={selectedBeach.surfForecastUrl}
                scrolling="no"
                frameBorder="0"
                style={{ width: '100%', minHeight: 500, display: 'block' }}
              />
            </div>
          </div>
        </div>
      )}

      {/* ── ¿Cuándo? ── */}
      <div style={stepLabelStyle}>¿Cuándo?</div>
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        {dayOptions.slice(0, 4).map(day => (
          <button
            key={day.value}
            type="button"
            onClick={() => setSelectedDay(day.value)}
            style={chipStyle(selectedDay === day.value)}
          >
            {day.label}
          </button>
        ))}
      </div>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(70px, 1fr))',
        gap: '8px',
        marginTop: '8px',
      }}>
        {TIME_OPTIONS.map(time => (
          <button
            key={time}
            type="button"
            onClick={() => setSelectedTime(time)}
            style={{
              ...chipStyle(selectedTime === time),
              padding: '12px 0',
              textAlign: 'center',
              fontVariantNumeric: 'tabular-nums',
            }}
          >
            {time}
          </button>
        ))}
      </div>

      {/* ── Distancia ── */}
      <div style={stepLabelStyle}>Distancia</div>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '14px 18px',
        border: '1px solid var(--color-surface-container-high)',
        borderRadius: '16px',
        background: 'var(--glass-bg)',
      }}>
        <button
          type="button"
          onClick={() => setDistance(d => Math.max(0.5, +(d - 0.5).toFixed(1)))}
          style={{
            width: '40px', height: '40px',
            borderRadius: '999px',
            background: 'transparent',
            border: '1px solid var(--color-surface-container-high)',
            color: 'var(--color-on-surface)',
            fontSize: '20px',
            fontWeight: 400,
            cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >−</button>
        <div style={{
          flex: 1,
          fontFamily: 'var(--font-heading)',
          fontSize: '30px',
          fontWeight: 600,
          color: 'var(--color-on-surface)',
          letterSpacing: '-0.5px',
        }}>
          {distance.toFixed(1)}<small style={{
            fontFamily: 'var(--font-body)',
            fontSize: '13px',
            color: 'var(--color-on-surface-variant)',
            fontWeight: 400,
            marginLeft: '4px',
          }}>km</small>
        </div>
        <button
          type="button"
          onClick={() => setDistance(d => +(d + 0.5).toFixed(1))}
          style={{
            width: '40px', height: '40px',
            borderRadius: '999px',
            background: 'transparent',
            border: '1px solid var(--color-surface-container-high)',
            color: 'var(--color-on-surface)',
            fontSize: '20px',
            fontWeight: 400,
            cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >+</button>
      </div>

      {/* ── Quién viene ── */}
      <div style={stepLabelStyle}>Quién viene · {selectedPeople.length}</div>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(70px, 1fr))',
        gap: '8px',
      }}>
        {ORGANIZERS.map(name => (
          <button
            key={name}
            type="button"
            onClick={() => togglePerson(name)}
            style={crewChipStyle(selectedPeople.includes(name))}
          >
            <div style={{
              width: '32px', height: '32px',
              borderRadius: '50%',
              background: selectedPeople.includes(name)
                ? 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)'
                : 'var(--color-surface-container)',
              color: selectedPeople.includes(name) ? 'white' : 'var(--color-on-surface)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'var(--font-heading)',
              fontSize: '12px',
              fontWeight: 600,
              transition: 'all 0.15s ease',
            }}>
              {name[0]}
            </div>
            <span style={{
              fontSize: '12px',
              color: selectedPeople.includes(name) ? 'var(--color-on-surface)' : 'var(--color-on-surface-variant)',
              fontFamily: 'var(--font-body)',
            }}>
              {name}
            </span>
          </button>
        ))}
      </div>

      {/* ── Actions ── */}
      <button
        type="button"
        onClick={handleSubmit}
        disabled={!selectedBeach || !organizerName}
        className="btn-primary"
        style={{
          marginTop: '24px',
          width: '100%',
          height: '52px',
          fontSize: '16px',
          opacity: (!selectedBeach || !organizerName) ? 0.5 : 1,
        }}
      >
        {editingSalida ? 'Guardar cambios' : 'Crear salida'}
      </button>
      <button
        type="button"
        onClick={onClose}
        className="btn-secondary"
        style={{ marginTop: '8px', width: '100%', height: '44px' }}
      >
        Cancelar
      </button>

      {editingSalida && (
        <button
          type="button"
          onClick={() => {
            if (confirm('¿Estás seguro de que deseas eliminar esta salida?')) {
              deleteSalida(editingSalida.id);
              onClose();
            }
          }}
          className="btn-danger"
          style={{ 
            marginTop: '32px', 
            width: '100%', 
            height: '48px', 
            background: 'transparent',
            border: 'none',
            color: '#dc2626',
            fontSize: '14px',
            textTransform: 'uppercase',
            fontWeight: 600,
            letterSpacing: '0.05em',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px'
          }}
        >
          <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>delete</span>
          Eliminar Salida
        </button>
      )}
    </div>
  );
}
