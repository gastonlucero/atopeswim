import { useState } from 'react';
import TabNavigation from './components/TabNavigation';
import Salidas from './components/tabs/Salidas';
import Tracking from './components/tabs/Tracking';
import Rutas from './components/tabs/Rutas';

function App() {
  const [activeTab, setActiveTab] = useState<'salidas' | 'tracking' | 'rutas'>('salidas');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', width: '100vw', overflow: 'hidden', background: 'var(--gradient-page)' }}>
      {/* Header */}
      <header
        style={{
          background: 'var(--gradient-header)',
          paddingTop: 'max(env(safe-area-inset-top), 0px)',
          flexShrink: 0,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div style={{ position: 'relative', zIndex: 10, padding: '1rem 1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
          <div>
            <h1 style={{ fontSize: '1.375rem', fontWeight: 700, color: 'var(--color-primary)', letterSpacing: '-0.01em', lineHeight: 1, margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <img src="/icon.png" alt="A Tope Swim" style={{ width: '28px', height: '28px', borderRadius: '6px' }} />
              A Tope Swim
            </h1>
            <p style={{ fontSize: '0.75rem', color: 'var(--color-on-surface-variant)', marginTop: '0.25rem', margin: 0 }}>
              A llorar a la llorería
            </p>
          </div>
        </div>
      </header>

      <main
        style={{
          flex: '1 1 0',
          overflowY: 'auto',
          overflowX: 'hidden',
          paddingBottom: 88,
          minHeight: 0,
          WebkitOverflowScrolling: 'touch',
          scrollBehavior: 'smooth',
          padding: '1.25rem'
        }}
      >
        {activeTab === 'salidas' && <Salidas />}
        {activeTab === 'tracking' && <Tracking />}
        {activeTab === 'rutas' && <Rutas />}
      </main>

      <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}

export default App;
