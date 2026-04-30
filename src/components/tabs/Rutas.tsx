import { useState } from 'react';
import type { Ruta } from '../../types';
import RutaList from '../rutas/RutaList';
import RutaDetail from '../rutas/RutaDetail';

export default function Rutas() {
  const [selectedRuta, setSelectedRuta] = useState<Ruta | null>(null);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', minHeight: 0 }}>
      {selectedRuta ? (
        <RutaDetail ruta={selectedRuta} onBack={() => setSelectedRuta(null)} />
      ) : (
        <RutaList onSelectRuta={setSelectedRuta} />
      )}
    </div>
  );
}
