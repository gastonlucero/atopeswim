import { useState } from 'react';
import type { Salida } from '../../types';
import TrackingSelector from '../tracking/TrackingSelector';
import TrackingForm from '../tracking/TrackingForm';

export default function Tracking() {
  const [selectedSalida, setSelectedSalida] = useState<Salida | null>(null);

  return (
    <div className="px-5 py-5 pb-6">
      {!selectedSalida ? (
        <TrackingSelector onSelectSalida={setSelectedSalida} />
      ) : (
        <TrackingForm salida={selectedSalida} onBack={() => setSelectedSalida(null)} />
      )}
    </div>
  );
}
