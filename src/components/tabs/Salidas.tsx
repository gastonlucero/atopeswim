import { useState } from 'react';
import type { Salida } from '../../types';
import SalidaList from '../salidas/SalidaList';
import QuickCreate from '../salidas/QuickCreate';

type ViewMode = 'list' | 'create';

export default function Salidas() {
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [editingSalida, setEditingSalida] = useState<Salida | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleNewSalida = () => {
    setEditingSalida(null);
    setViewMode('create');
  };

  const handleEdit = (salida: Salida) => {
    setEditingSalida(salida);
    setViewMode('create');
  };

  const handleFormClose = () => {
    setViewMode('list');
    setEditingSalida(null);
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', minHeight: 0 }}>
      {viewMode === 'list' && (
        <>
          <SalidaList key={refreshKey} onEdit={handleEdit} />
          <button
            onClick={handleNewSalida}
            className="btn-primary"
            style={{
              position: 'fixed',
              bottom: '100px',
              right: '20px',
              zIndex: 40,
              height: '48px',
              borderRadius: '999px',
              padding: '0 20px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: '0 4px 20px rgba(0, 93, 144, 0.3)',
            }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>add</span>
            Crear salida
          </button>
        </>
      )}

      {viewMode === 'create' && (
        <QuickCreate
          editingSalida={editingSalida}
          onClose={handleFormClose}
        />
      )}
    </div>
  );
}
