import { ViewMode } from '../App';
import { LAUNCH_SITES, SPACE_PROGRAMS, ORBITAL_DC_CONCEPTS, LaunchSite, SpaceProgram } from '../data/spaceData';

interface Props {
  mode: ViewMode;
  selectedSite: LaunchSite | null;
  selectedProgram: SpaceProgram | null;
  onProgramClick: (p: SpaceProgram) => void;
}

function SiteDetail({ site }: { site: LaunchSite }) {
  return (
    <div className="site-info">
      <div className="site-name">{site.name}</div>
      <div className="site-meta">{site.agency} · {site.country} · {site.status.toUpperCase()}</div>
      <div className="site-description">{site.description}</div>
      <div className="section-label">Active Vehicles</div>
      <div className="vehicles-list" style={{ padding: '8px 12px' }}>
        {site.vehicles.map(v => <span key={v} className="vehicle-chip">{v}</span>)}
      </div>
      <div className="section-label">Notable Missions</div>
      <ul className="highlight-list" style={{ padding: '8px 12px' }}>
        {site.notableMissions.map(m => <li key={m}>{m}</li>)}
      </ul>
    </div>
  );
}

function ProgramDetail({ program }: { program: SpaceProgram }) {
  return (
    <div className="site-info">
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
        <span className="program-dot" style={{ backgroundColor: program.color, width: 10, height: 10 }} />
        <div className="site-name" style={{ marginBottom: 0 }}>{program.name}</div>
      </div>
      <div className="site-meta">
        {program.agency} · {program.category.replace('-', ' ').toUpperCase()} · {program.startYear}
      </div>
      <span className={`program-status ${program.status}`} style={{ marginBottom: 8, display: 'inline-block' }}>
        {program.status}
      </span>
      <div className="site-description">{program.description}</div>
      <div className="section-label">Highlights</div>
      <ul className="highlight-list" style={{ padding: '8px 12px' }}>
        {program.highlights.map(h => <li key={h}>{h}</li>)}
      </ul>
    </div>
  );
}

function DCConcepts() {
  return (
    <>
      {ORBITAL_DC_CONCEPTS.map(dc => (
        <div key={dc.id} className="dc-concept">
          <div className="dc-orbit-type">{dc.orbitType} · {dc.altitude.toLocaleString()} km Altitude</div>
          <div className="dc-name">{dc.name}</div>
          <div className="dc-desc">{dc.description}</div>
          <div className="section-label" style={{ margin: '0 -12px 6px', padding: '4px 12px' }}>Advantages</div>
          <div className="advantages-grid">
            {dc.advantages.map(a => <div key={a} className="adv-item">{a}</div>)}
          </div>
          <div className="section-label" style={{ margin: '6px -12px', padding: '4px 12px' }}>Challenges</div>
          <div className="advantages-grid">
            {dc.challenges.map(c => <div key={c} className="challenge-item">{c}</div>)}
          </div>
          <div className="section-label" style={{ margin: '6px -12px', padding: '4px 12px' }}>Real-World Projects</div>
          <ul className="highlight-list" style={{ marginTop: 6 }}>
            {dc.realProjects.map(r => <li key={r}>{r}</li>)}
          </ul>
        </div>
      ))}
    </>
  );
}

export default function LeftPanel({ mode, selectedSite, selectedProgram, onProgramClick }: Props) {
  const renderContent = () => {
    if (selectedSite && mode !== 'orbital-dc') {
      return (
        <>
          <div className="panel-header">Launch Site</div>
          <div className="panel-body">
            <SiteDetail site={selectedSite} />
          </div>
        </>
      );
    }

    if (selectedProgram) {
      return (
        <>
          <div className="panel-header">Program Detail</div>
          <div className="panel-body">
            <ProgramDetail program={selectedProgram} />
          </div>
        </>
      );
    }

    if (mode === 'orbital-dc') {
      return (
        <>
          <div className="panel-header">Orbital Data Centers</div>
          <div className="panel-body">
            <DCConcepts />
          </div>
        </>
      );
    }

    if (mode === 'live' || mode === 'programs') {
      const programs = SPACE_PROGRAMS.filter(p =>
        mode === 'live'
          ? p.status === 'active'
          : true
      );
      return (
        <>
          <div className="panel-header">Space Programs</div>
          <div className="panel-body">
            {programs.map(p => (
              <div
                key={p.id}
                className="program-card"
                onClick={() => onProgramClick(p)}
              >
                <div className="program-header">
                  <span className="program-dot" style={{ backgroundColor: p.color }} />
                  <span className="program-name">{p.name}</span>
                  <span className="program-agency">{p.agency}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                  <span className={`program-status ${p.status}`}>{p.status}</span>
                  <span style={{ fontSize: '0.6rem', color: 'var(--text-dim)' }}>{p.category.replace('-', ' ')}</span>
                </div>
                <div className="program-desc">{p.description.slice(0, 100)}…</div>
              </div>
            ))}
          </div>
        </>
      );
    }

    if (mode === 'starlink') {
      return (
        <>
          <div className="panel-header">Starlink Constellation</div>
          <div className="panel-body">
            <div className="dc-concept">
              <div className="dc-orbit-type">LEO Shell 1 — 550 km · 53° Inclination</div>
              <div className="dc-name">Gen2 V2 Mini Satellites</div>
              <div className="dc-desc">
                Over 6,000 Starlink satellites now operational, with V2 Mini offering 4× more capacity than Gen1.
                Direct-to-Cell service launched in 2024 connects standard smartphones without any hardware modification.
              </div>
            </div>
            <div className="section-label">Launch Sites</div>
            {LAUNCH_SITES
              .filter(s => s.vehicles.some(v => v.includes('Falcon')))
              .map(site => (
                <div key={site.id} className="program-card">
                  <div className="program-header">
                    <span className="program-dot" style={{ backgroundColor: '#e8734a' }} />
                    <span className="program-name">{site.shortName}</span>
                    <span className="program-agency">{site.country}</span>
                  </div>
                  <div className="program-desc">{site.description.slice(0, 80)}…</div>
                </div>
              ))}
          </div>
        </>
      );
    }

    return (
      <>
        <div className="panel-header">Overview</div>
        <div className="panel-body">
          <div className="empty-state">Select a mode above to explore space programs, satellite constellations, launch sites, or orbital data center concepts.</div>
        </div>
      </>
    );
  };

  return <div className="panel-left">{renderContent()}</div>;
}
