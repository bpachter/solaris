import { ViewMode } from '../App';
import { LAUNCH_SITES, SPACE_PROGRAMS, SpaceProgram } from '../data/spaceData';

interface Props {
  mode: ViewMode;
  selectedProgram: SpaceProgram | null;
}

const AGENCY_STATS: { name: string; sats: number; launches2024: number; color: string }[] = [
  { name: 'SpaceX',       sats: 6242, launches2024: 98,  color: '#e8734a' },
  { name: 'CNSA',         sats: 541,  launches2024: 67,  color: '#ef4444' },
  { name: 'Roscosmos',    sats: 188,  launches2024: 17,  color: '#c8102e' },
  { name: 'ESA',          sats: 139,  launches2024: 8,   color: '#004494' },
  { name: 'ISRO',         sats: 58,   launches2024: 9,   color: '#ff9933' },
  { name: 'Blue Origin',  sats: 27,   launches2024: 2,   color: '#0ea5e9' },
  { name: 'Rocket Lab',   sats: 14,   launches2024: 11,  color: '#ff0000' },
];

const DC_METRICS = [
  { label: 'Cooling Cost Reduction', value: '~95%', note: 'vs terrestrial data center' },
  { label: 'Solar Power Density',    value: '1,361 W/m²', note: 'vs ~850 W/m² at surface' },
  { label: 'ISL Link Speed',         value: '299,792 km/s', note: 'speed of light in vacuum' },
  { label: 'LEO Latency (round-trip)', value: '~5 ms',  note: '+ 2ms atmospheric' },
  { label: 'GEO Latency (round-trip)', value: '~600 ms', note: 'physics constraint' },
  { label: 'Launch Cost per kg (F9)', value: '~$2,700', note: 'decreasing with Starship' },
  { label: 'Starship $/kg (target)', value: '~$100',   note: 'fully reusable target' },
];

export default function RightPanel({ mode, selectedProgram }: Props) {
  if (selectedProgram) {
    return (
      <div className="panel-right">
        <div className="panel-header">Program Intel</div>
        <div className="panel-body">
          <div className="site-info">
            <div className="section-label" style={{ margin: '0 -12px 8px', padding: '4px 12px' }}>Agency</div>
            <div style={{ padding: '0 0 10px', display: 'flex', gap: 8, alignItems: 'center' }}>
              <span className="program-dot" style={{ backgroundColor: selectedProgram.color, width: 10, height: 10 }} />
              <span style={{ fontFamily: 'var(--mono)', fontSize: '0.75rem', color: 'var(--text-bright)' }}>
                {selectedProgram.agency}
              </span>
            </div>
            <div className="section-label" style={{ margin: '0 -12px 8px', padding: '4px 12px' }}>Active Since</div>
            <div style={{ padding: '0 0 10px', fontFamily: 'var(--mono)', fontSize: '0.8rem', color: 'var(--text-bright)' }}>
              {selectedProgram.startYear}
            </div>
            <div className="section-label" style={{ margin: '0 -12px 8px', padding: '4px 12px' }}>Launch Sites</div>
            <div style={{ padding: '0 0 10px' }}>
              {LAUNCH_SITES
                .filter(s => s.agency === selectedProgram.agency)
                .map(s => (
                  <div key={s.id} style={{ fontSize: '0.67rem', color: 'var(--text-dim)', padding: '2px 0', paddingLeft: 12, position: 'relative' }}>
                    <span style={{ position: 'absolute', left: 0, color: 'var(--cyan)' }}>›</span>
                    {s.shortName} — {s.country}
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (mode === 'orbital-dc') {
    return (
      <div className="panel-right">
        <div className="panel-header">Orbital DC Metrics</div>
        <div className="panel-body">
          {DC_METRICS.map(m => (
            <div key={m.label} style={{ padding: '8px 12px', borderBottom: '1px solid var(--border)' }}>
              <div style={{ fontFamily: 'var(--mono)', fontSize: '0.7rem', color: 'var(--text-dim)', marginBottom: 2 }}>{m.label}</div>
              <div style={{ fontFamily: 'var(--mono)', fontSize: '0.85rem', fontWeight: 600, color: 'var(--cyan)', marginBottom: 2 }}>{m.value}</div>
              <div style={{ fontSize: '0.6rem', color: 'var(--text-dim)', fontStyle: 'italic' }}>{m.note}</div>
            </div>
          ))}
          <div style={{ padding: '12px', borderTop: '1px solid var(--border)' }}>
            <div style={{ fontFamily: 'var(--mono)', fontSize: '0.62rem', color: 'var(--green)', lineHeight: 1.6 }}>
              KEY INSIGHT: As Starship drives launch costs from $2,700/kg to ~$100/kg, the economics of orbital compute
              flip entirely. A 1MW LEO data center becomes cost-competitive with terrestrial alternatives by
              ~2030 at projected Starship flight rates.
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="panel-right">
      <div className="panel-header">Agency Leaderboard</div>
      <div className="panel-body">
        <div className="section-label">2024 Orbital Launches</div>
        {AGENCY_STATS.sort((a, b) => b.launches2024 - a.launches2024).map((agency, i) => (
          <div key={agency.name} style={{ padding: '8px 12px', borderBottom: '1px solid var(--border)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
              <span style={{ fontFamily: 'var(--mono)', fontSize: '0.6rem', color: 'var(--text-dim)', width: 14 }}>
                #{i + 1}
              </span>
              <span className="program-dot" style={{ backgroundColor: agency.color }} />
              <span style={{ fontFamily: 'var(--mono)', fontSize: '0.72rem', color: 'var(--text-bright)', fontWeight: 600 }}>
                {agency.name}
              </span>
              <span style={{ fontFamily: 'var(--mono)', fontSize: '0.72rem', color: 'var(--cyan)', marginLeft: 'auto' }}>
                {agency.launches2024}
              </span>
            </div>
            <div style={{ paddingLeft: 22 }}>
              <div
                style={{
                  height: 3,
                  borderRadius: 2,
                  background: `${agency.color}44`,
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <div style={{
                  position: 'absolute',
                  top: 0, left: 0,
                  height: '100%',
                  width: `${(agency.launches2024 / 98) * 100}%`,
                  background: agency.color,
                  borderRadius: 2,
                }} />
              </div>
              <div style={{ marginTop: 3, fontSize: '0.6rem', color: 'var(--text-dim)' }}>
                {agency.sats.toLocaleString()} satellites on orbit
              </div>
            </div>
          </div>
        ))}
        <div className="section-label">Global Satellite Count</div>
        <div style={{ padding: '10px 12px', fontFamily: 'var(--mono)', fontSize: '0.7rem' }}>
          <div style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--cyan)', marginBottom: 2 }}>
            {AGENCY_STATS.reduce((s, a) => s + a.sats, 0).toLocaleString()}
          </div>
          <div style={{ color: 'var(--text-dim)', fontSize: '0.62rem' }}>
            Active tracked objects in LEO/MEO/GEO<br />
            <span style={{ color: 'var(--orange)' }}>+23,000</span> tracked debris objects
          </div>
        </div>
      </div>
    </div>
  );
}
