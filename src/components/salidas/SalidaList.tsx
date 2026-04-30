import { useState, useEffect } from 'react';
import type { Salida, Ruta } from '../../types';
import { getSalidas, deleteSalida, getRutas } from '../../utils/storage';
import { formatDistance, formatDate } from '../../utils/formatting';

interface SalidaListProps {
  onEdit: (salida: Salida) => void;
}

const getInitials = (name: string) => {
  if (!name) return '??';
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
};

const getStatusInfo = (dateTime: string) => {
  const now = new Date();
  const eventDate = new Date(dateTime);
  const hoursUntil = (eventDate.getTime() - now.getTime()) / (1000 * 60 * 60);

  if (hoursUntil < 0) {
    return { status: 'finished', label: 'FINALIZADO', icon: '✓' };
  } else if (hoursUntil < 2) {
    return { status: 'active', label: 'ACTIVO AHORA', icon: '⚡' };
  } else if (hoursUntil < 24) {
    return { status: 'upcoming', label: `HOY • ${String(eventDate.getHours()).padStart(2, '0')}:${String(eventDate.getMinutes()).padStart(2, '0')}`, icon: '📅' };
  } else {
    return { status: 'upcoming', label: 'PRÓXIMA', icon: '📅' };
  }
};

const getRelativeDay = (dateTime: string): string => {
  const eventDate = new Date(dateTime);
  const weekday = eventDate.toLocaleDateString('es-ES', { weekday: 'short' });
  const dayNum = eventDate.getDate();
  return `${weekday} ${dayNum}`;
};

const getDayNumber = (dateTime: string): string => {
  return new Date(dateTime).getDate().toString();
};

const getWeekday = (dateTime: string): string => {
  return new Date(dateTime).toLocaleDateString('es-ES', { weekday: 'short' });
};

const getTimeStr = (dateTime: string): string => {
  const d = new Date(dateTime);
  return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
};

export default function SalidaList({ onEdit }: SalidaListProps) {
  const [salidas, setSalidas] = useState<Salida[]>([]);
  const [rutas, setRutas] = useState<Ruta[]>([]);

  useEffect(() => {
    const allSalidas = getSalidas()
      .filter(s => getStatusInfo(s.dateTime).status !== 'finished' && s.status !== 'finished')
      .sort((a, b) => new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime());
    setSalidas(allSalidas);

    const allRutas = getRutas()
      .sort((a, b) => new Date(b.salidaDate).getTime() - new Date(a.salidaDate).getTime());
    setRutas(allRutas);
  }, []);

  const handleDelete = (id: string) => {
    if (confirm('¿Estás seguro de que deseas eliminar esta salida?')) {
      deleteSalida(id);
      setSalidas(getSalidas()
        .filter(s => getStatusInfo(s.dateTime).status !== 'finished' && s.status !== 'finished')
        .sort((a, b) => new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime()));
    }
  };

  // Weekly stats from rutas
  const now = new Date();
  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const weekRutas = rutas.filter(r => r?.salidaDate && new Date(r.salidaDate) >= weekAgo);
  const weekDistance = weekRutas.reduce((sum, r) => sum + (r?.distanceKm || 0), 0);
  const weekCount = weekRutas.length;

  const featuredSalida = salidas.length > 0 ? salidas[0] : null;
  const upcomingSalidas = salidas.slice(1);
  const recentRutas = rutas.slice(0, 3);

  if (salidas.length === 0 && rutas.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '48px 20px', minHeight: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ fontSize: '48px', marginBottom: 12 }}>🌊</div>
        <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, color: 'var(--color-on-surface)', marginBottom: 4, fontSize: '18px' }}>Sin salidas planificadas</h3>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--color-on-surface-variant)' }}>Crea tu primera salida al océano</p>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', minHeight: 0, paddingBottom: '80px' }}>

      {/* ═══ HERO — Próxima salida ═══ */}
      {featuredSalida && (
        <div style={{
          background: 'linear-gradient(135deg, #e8f4f8 0%, #f0f7fa 100%)',
          borderRadius: 'var(--radius-lg)',
          padding: '20px',
          margin: '0 16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          border: '1px solid rgba(0, 119, 182, 0.1)',
        }}>
          <div style={{
            fontFamily: 'var(--font-body)',
            fontSize: '12px',
            fontWeight: 500,
            color: 'var(--color-on-surface-variant)',
            textTransform: 'uppercase',
            letterSpacing: '0.04em',
          }}>
            Próxima salida · {getRelativeDay(featuredSalida.dateTime)} {getTimeStr(featuredSalida.dateTime)}
          </div>

          <div style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '22px',
            fontWeight: 700,
            color: 'var(--color-on-surface)',
            letterSpacing: '-0.01em',
          }}>
            {featuredSalida.location.description} · {formatDistance(featuredSalida.distanceKm)}
          </div>

          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
            fontFamily: 'var(--font-body)',
            fontSize: '13px',
            color: 'var(--color-on-surface-variant)',
          }}>
            <span><b>Organiza:</b> {featuredSalida.organizerName}</span>
          </div>

          {/* Crew */}
          {featuredSalida.participants && featuredSalida.participants.length > 0 && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '4px' }}>
              <div style={{ display: 'flex' }}>
                {featuredSalida.participants.slice(0, 3).map((p, idx) => (
                  <div
                    key={p}
                    className="avatar sm"
                    style={{
                      marginLeft: idx > 0 ? '-6px' : 0,
                      zIndex: 3 - idx,
                      width: '28px',
                      height: '28px',
                      fontSize: '10px',
                      background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)',
                      color: 'white',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontFamily: 'var(--font-heading)',
                      fontWeight: 600,
                      border: '2px solid white',
                    }}
                  >
                    {getInitials(p)}
                  </div>
                ))}
              </div>
              <span style={{
                fontFamily: 'var(--font-body)',
                fontSize: '13px',
                color: 'var(--color-on-surface-variant)',
              }}>
                {featuredSalida.participants?.join(', ') || 'Sin participantes'}
              </span>
            </div>
          )}

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
            <button
              onClick={() => onEdit(featuredSalida)}
              className="btn-primary"
              style={{ flex: 1, height: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>edit</span>
              Editar salida
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDelete(featuredSalida.id);
              }}
              className="btn-secondary"
              style={{ width: '44px', height: '44px', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>delete</span>
            </button>
          </div>
        </div>
      )}

      {/* ═══ STATS — Esta semana ═══ */}
      <div style={{ padding: '0 16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <h3 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '16px',
            fontWeight: 600,
            color: 'var(--color-on-surface)',
            margin: 0,
          }}>
            Esta semana
          </h3>
        </div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '8px',
        }}>
          <div style={{
            background: 'var(--color-surface-container-low)',
            borderRadius: 'var(--radius-md)',
            padding: '14px 12px',
            textAlign: 'center',
            border: '1px solid var(--color-surface-container-high)',
          }}>
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: '22px', fontWeight: 700, color: 'var(--color-primary)' }}>
              {weekDistance.toFixed(1)}<small style={{ fontSize: '12px', fontWeight: 500, color: 'var(--color-on-surface-variant)' }}>km</small>
            </div>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: 'var(--color-on-surface-variant)', marginTop: '4px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Distancia
            </div>
          </div>
          <div style={{
            background: 'var(--color-surface-container-low)',
            borderRadius: 'var(--radius-md)',
            padding: '14px 12px',
            textAlign: 'center',
            border: '1px solid var(--color-surface-container-high)',
          }}>
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: '22px', fontWeight: 700, color: 'var(--color-primary)' }}>
              {weekCount}
            </div>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: 'var(--color-on-surface-variant)', marginTop: '4px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Salidas
            </div>
          </div>
          <div style={{
            background: 'var(--color-surface-container-low)',
            borderRadius: 'var(--radius-md)',
            padding: '14px 12px',
            textAlign: 'center',
            border: '1px solid var(--color-surface-container-high)',
          }}>
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: '22px', fontWeight: 700, color: 'var(--color-primary)' }}>
              {salidas.length}
            </div>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: 'var(--color-on-surface-variant)', marginTop: '4px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Próximas
            </div>
          </div>
        </div>
      </div>

      {/* ═══ PRÓXIMAS — Lista compacta ═══ */}
      {upcomingSalidas.length > 0 && (
        <div style={{ padding: '0 16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <h3 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '16px',
              fontWeight: 600,
              color: 'var(--color-on-surface)',
              margin: 0,
            }}>
              Próximas
            </h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {upcomingSalidas.map((salida) => (
              <div
                key={salida.id}
                onClick={() => onEdit(salida)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px',
                  background: 'var(--glass-bg)',
                  backdropFilter: 'blur(var(--glass-blur))',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--color-surface-container-high)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                {/* Date block */}
                <div style={{
                  minWidth: '42px',
                  textAlign: 'center',
                  flexShrink: 0,
                }}>
                  <div style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '20px',
                    fontWeight: 700,
                    color: 'var(--color-primary)',
                    lineHeight: 1,
                  }}>
                    {getDayNumber(salida.dateTime)}
                  </div>
                  <div style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '11px',
                    color: 'var(--color-on-surface-variant)',
                    textTransform: 'capitalize',
                    marginTop: '2px',
                  }}>
                    {getWeekday(salida.dateTime)}
                  </div>
                </div>

                {/* Body */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '14px',
                    fontWeight: 600,
                    color: 'var(--color-on-surface)',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}>
                    {salida.location.description}
                  </div>
                  <div style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '12px',
                    color: 'var(--color-on-surface-variant)',
                    marginTop: '2px',
                  }}>
                    {getTimeStr(salida.dateTime)} · {salida.organizerName}
                    {salida.participants && salida.participants.length > 0 && ` · ${salida.participants.length} personas`}
                  </div>
                </div>

                {/* Right — km + time */}
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <div style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '15px',
                    fontWeight: 700,
                    color: 'var(--color-primary)',
                  }}>
                    {salida.distanceKm.toFixed(1)}<small style={{ fontSize: '10px', fontWeight: 500, color: 'var(--color-on-surface-variant)' }}>km</small>
                  </div>
                  <div style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '11px',
                    color: 'var(--color-on-surface-variant)',
                    marginTop: '2px',
                  }}>
                    {getTimeStr(salida.dateTime)}
                  </div>
                </div>

                {/* Delete Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(salida.id);
                  }}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    padding: '8px',
                    color: 'var(--color-on-surface-variant)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>delete</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ═══ HISTORIAL — Últimas rutas completadas ═══ */}
      {recentRutas.length > 0 && (
        <div style={{ padding: '0 16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <h3 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '16px',
              fontWeight: 600,
              color: 'var(--color-on-surface)',
              margin: 0,
            }}>
              Historial
            </h3>
            <span style={{
              fontFamily: 'var(--font-body)',
              fontSize: '13px',
              color: 'var(--color-primary)',
              cursor: 'pointer',
              fontWeight: 500,
            }}>
              Ver todo ›
            </span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {recentRutas.map((ruta) => (
              <div
                key={ruta.id}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '12px',
                  background: 'var(--glass-bg)',
                  backdropFilter: 'blur(var(--glass-blur))',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--color-surface-container-high)',
                }}
              >
                <div>
                  <div style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '14px',
                    fontWeight: 600,
                    color: 'var(--color-on-surface)',
                  }}>
                    {ruta.name}
                  </div>
                  <div style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '12px',
                    color: 'var(--color-on-surface-variant)',
                    marginTop: '2px',
                  }}>
                    {formatDate(ruta.salidaDate)}
                  </div>
                </div>
                <div style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '15px',
                  fontWeight: 700,
                  color: 'var(--color-primary)',
                }}>
                  {ruta.distanceKm.toFixed(2)}<small style={{ fontSize: '10px', fontWeight: 500, color: 'var(--color-on-surface-variant)', marginLeft: '1px' }}>km</small>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

