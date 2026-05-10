import { useState, useCallback } from 'react';
import Globe from './components/Globe';
import LeftPanel from './components/LeftPanel';
import RightPanel from './components/RightPanel';
import EventsFeed from './components/EventsFeed';
import { LaunchSite, SpaceProgram } from './data/spaceData';

export type ViewMode = 'live' | 'starlink' | 'programs' | 'orbital-dc';

export default function App() {
  const [mode, setMode] = useState<ViewMode>('live');
  const [selectedSite, setSelectedSite] = useState<LaunchSite | null>(null);
  const [selectedProgram, setSelectedProgram] = useState<SpaceProgram | null>(null);
  const [satCount, setSatCount] = useState(0);

  const handleSiteClick = useCallback((site: LaunchSite) => {
    setSelectedSite(site);
    setSelectedProgram(null);
  }, []);

  const handleProgramClick = useCallback((program: SpaceProgram) => {
    setSelectedProgram(program);
    setSelectedSite(null);
  }, []);

  return (
    <div className="app">
      {/* ── Top bar ───────────────────────────────────── */}
      <header className="topbar">
        <a className="back-link" href="../" title="Back to portfolio">← Portfolio</a>

        <div className="topbar-logo">SOLARIS</div>

        <nav className="topbar-modes">
          {(['live', 'starlink', 'programs', 'orbital-dc'] as ViewMode[]).map(m => (
            <button
              key={m}
              className={`mode-btn${mode === m ? ' active' : ''}`}
              onClick={() => setMode(m)}
            >
              {m === 'live'       ? '◉ Live'
               : m === 'starlink' ? '⬡ Starlink'
               : m === 'programs' ? '◈ Programs'
               : '⬡ Orbital DC'}
            </button>
          ))}
        </nav>

        <div className="topbar-stats">
          <div className="stat-item">
            <span className="stat-value">{satCount.toLocaleString()}</span>
            <span className="stat-label">Tracked Sats</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">12</span>
            <span className="stat-label">Launch Sites</span>
          </div>
          <div className="stat-item">
            <span className="stat-value" style={{ color: 'var(--green)' }}>LIVE</span>
            <span className="stat-label">Status</span>
          </div>
        </div>
      </header>

      {/* ── Left panel ────────────────────────────────── */}
      <LeftPanel
        mode={mode}
        selectedSite={selectedSite}
        selectedProgram={selectedProgram}
        onProgramClick={handleProgramClick}
      />

      {/* ── Globe ─────────────────────────────────────── */}
      <div className="globe-wrap">
        <Globe
          mode={mode}
          onSiteClick={handleSiteClick}
          onSatCountChange={setSatCount}
        />
      </div>

      {/* ── Right panel ───────────────────────────────── */}
      <RightPanel mode={mode} selectedProgram={selectedProgram} />

      {/* ── Events feed ───────────────────────────────── */}
      <EventsFeed />
    </div>
  );
}
