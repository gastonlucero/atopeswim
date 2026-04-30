interface TabNavigationProps {
  activeTab: 'salidas' | 'tracking' | 'rutas';
  onTabChange: (tab: 'salidas' | 'tracking' | 'rutas') => void;
}

export default function TabNavigation({ activeTab, onTabChange }: TabNavigationProps) {
  const tabs = [
    { id: 'salidas', label: 'Salidas', icon: 'group' },
    { id: 'tracking', label: 'Tracking', icon: 'trending_up' },
    { id: 'rutas', label: 'Rutas', icon: 'map' },
  ] as const;

  return (
    <nav
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        display: 'flex',
        flexDirection: 'row',
        background: 'var(--glass-bg)',
        backdropFilter: 'blur(var(--glass-blur))',
        WebkitBackdropFilter: 'blur(var(--glass-blur))',
        borderTop: '1px solid var(--color-surface-container-high)',
        paddingBottom: 'env(safe-area-inset-bottom, 0px)',
        boxShadow: 'var(--shadow-lg)',
      }}
    >
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
          aria-label={tab.label}
          style={{
            flex: 1,
            height: '56px',
            background: 'transparent',
            border: 'none',
            color: activeTab === tab.id ? 'var(--color-primary)' : 'var(--color-on-surface-variant)',
            fontFamily: 'var(--font-heading)',
            fontWeight: 600,
            fontSize: '12px',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '4px',
            position: 'relative',
            transition: 'all 0.2s ease',
          }}
        >
          <span className="material-symbols-outlined" style={{
            fontSize: '24px',
            fontWeight: 400,
            transition: 'all 0.2s ease',
            color: 'inherit',
          }}>
            {tab.icon}
          </span>
          <span>{tab.label}</span>

          {activeTab === tab.id && (
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: '20%',
              right: '20%',
              height: '3px',
              background: 'linear-gradient(90deg, var(--color-primary) 0%, var(--color-secondary) 100%)',
              borderRadius: '1.5px 1.5px 0 0',
            }} />
          )}
        </button>
      ))}
    </nav>
  );
}
