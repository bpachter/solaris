import { useEffect, useRef, useCallback } from 'react';
import { ViewMode } from '../App';
import { LAUNCH_SITES, AGENCY_COLORS, LaunchSite } from '../data/spaceData';

// Globe.gl is a UMD/ESM library — import dynamically to avoid SSR issues
type GlobeInstance = {
  width: (w: number) => GlobeInstance;
  height: (h: number) => GlobeInstance;
  globeImageUrl: (url: string) => GlobeInstance;
  bumpImageUrl: (url: string) => GlobeInstance;
  backgroundImageUrl: (url: string) => GlobeInstance;
  atmosphereColor: (color: string) => GlobeInstance;
  atmosphereAltitude: (alt: number) => GlobeInstance;
  pointsData: (data: object[]) => GlobeInstance;
  pointLat: (fn: string | ((d: object) => number)) => GlobeInstance;
  pointLng: (fn: string | ((d: object) => number)) => GlobeInstance;
  pointColor: (fn: string | ((d: object) => string)) => GlobeInstance;
  pointAltitude: (fn: string | number | ((d: object) => number)) => GlobeInstance;
  pointRadius: (fn: string | number | ((d: object) => number)) => GlobeInstance;
  pointLabel: (fn: string | ((d: object) => string)) => GlobeInstance;
  onPointClick: (fn: (d: object) => void) => GlobeInstance;
  arcsData: (data: object[]) => GlobeInstance;
  arcStartLat: (fn: string | ((d: object) => number)) => GlobeInstance;
  arcStartLng: (fn: string | ((d: object) => number)) => GlobeInstance;
  arcEndLat: (fn: string | ((d: object) => number)) => GlobeInstance;
  arcEndLng: (fn: string | ((d: object) => number)) => GlobeInstance;
  arcColor: (fn: string | ((d: object) => string)) => GlobeInstance;
  arcAltitudeAutoScale: (v: number) => GlobeInstance;
  arcStroke: (fn: number | ((d: object) => number)) => GlobeInstance;
  arcDashLength: (v: number) => GlobeInstance;
  arcDashGap: (v: number) => GlobeInstance;
  arcDashAnimateTime: (fn: number | ((d: object) => number)) => GlobeInstance;
  ringsData: (data: object[]) => GlobeInstance;
  ringLat: (fn: string | ((d: object) => number)) => GlobeInstance;
  ringLng: (fn: string | ((d: object) => number)) => GlobeInstance;
  ringColor: (fn: string | ((d: object) => string)) => GlobeInstance;
  ringMaxRadius: (fn: number | ((d: object) => number)) => GlobeInstance;
  ringPropagationSpeed: (fn: number | ((d: object) => number)) => GlobeInstance;
  ringRepeatPeriod: (fn: number | ((d: object) => number)) => GlobeInstance;
  customLayerData: (data: object[]) => GlobeInstance;
  customThreeObject: (fn: (d: object) => object) => GlobeInstance;
  customThreeObjectUpdate: (fn: (obj: object, d: object) => void) => GlobeInstance;
  controls: () => { autoRotate: boolean; autoRotateSpeed: number; enableZoom: boolean };
  camera: () => object;
  scene: () => object;
  renderer: () => { setPixelRatio: (r: number) => void };
  pointOfView: (pov: { lat: number; lng: number; altitude: number }, ms?: number) => GlobeInstance;
};

interface Props {
  mode: ViewMode;
  onSiteClick: (site: LaunchSite) => void;
  onSatCountChange: (n: number) => void;
}

// Approximate Starlink satellite positions across orbital planes
function generateStarlinkPositions(count = 300) {
  const sats: { lat: number; lng: number; altitude: number; plane: number }[] = [];
  const planes = 72;
  const satsPerPlane = Math.floor(count / planes);
  for (let p = 0; p < planes; p++) {
    const inc = 53; // degrees inclination
    const raan = (p / planes) * 360; // right ascension of ascending node
    for (let s = 0; s < satsPerPlane; s++) {
      const trueAnomaly = (s / satsPerPlane) * 360;
      // Simplified approximation of lat/lng from orbital elements
      const radI = (inc * Math.PI) / 180;
      const radO = (trueAnomaly * Math.PI) / 180;
      const radR = (raan * Math.PI) / 180;
      const lat = Math.asin(Math.sin(radI) * Math.sin(radO)) * (180 / Math.PI);
      const lng = ((raan + Math.atan2(Math.cos(radI) * Math.sin(radO), Math.cos(radO)) * (180 / Math.PI)) % 360 + 540) % 360 - 180;
      sats.push({ lat, lng, altitude: 0.055, plane: p }); // ~550km / Earth radius ~6371km
    }
  }
  return sats;
}

// Static ISS approximate position (updates over time via simple propagation)
function getISSPosition(time = Date.now()) {
  const period = 92.68 * 60 * 1000; // ms
  const t = (time % period) / period;
  const angle = t * 2 * Math.PI;
  const inc = 51.6 * Math.PI / 180;
  const lat = Math.asin(Math.sin(inc) * Math.sin(angle)) * (180 / Math.PI);
  const lng = ((angle * 180 / Math.PI) - (time / (24 * 60 * 60 * 1000)) * 360) % 360;
  return { lat, lng };
}

// Orbital DC waypoints (hypothetical LEO data center nodes)
const ORBITAL_DC_NODES = [
  { lat: 51.6, lng: 0,    label: 'LEO-DC Alpha',   altitude: 0.086 },
  { lat: 51.6, lng: 90,   label: 'LEO-DC Beta',    altitude: 0.086 },
  { lat: 51.6, lng: 180,  label: 'LEO-DC Gamma',   altitude: 0.086 },
  { lat: 51.6, lng: -90,  label: 'LEO-DC Delta',   altitude: 0.086 },
  { lat: 0,    lng: 45,   label: 'GEO-Relay East', altitude: 5.62  }, // GEO
  { lat: 0,    lng: -90,  label: 'GEO-Relay West', altitude: 5.62  },
];

export default function Globe({ mode, onSiteClick, onSatCountChange }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const globeRef = useRef<GlobeInstance | null>(null);
  const animFrameRef = useRef<number>(0);

  const applyMode = useCallback((globe: GlobeInstance, currentMode: ViewMode) => {
    const sitesData = LAUNCH_SITES.map(s => ({
      ...s,
      color: AGENCY_COLORS[s.agency] || '#00c8ff',
    }));

    if (currentMode === 'live') {
      const issPos = getISSPosition();
      const trackData = [
        // ISS launch arcs (simplified great-circle arcs to current ISS pos)
        ...LAUNCH_SITES.slice(0, 3).map(site => ({
          startLat: site.lat, startLng: site.lng,
          endLat: issPos.lat, endLng: issPos.lng,
          color: ['rgba(0,200,255,0)', 'rgba(0,200,255,0.6)', 'rgba(0,200,255,0)'],
          stroke: 0.5,
        })),
      ];

      globe
        .pointsData(sitesData)
        .pointLat('lat')
        .pointLng('lng')
        .pointColor((d: object) => (d as typeof sitesData[0]).color)
        .pointAltitude(0.01)
        .pointRadius(0.5)
        .pointLabel((d: object) => {
          const s = d as typeof sitesData[0];
          return `<div style="font-family:monospace;font-size:11px;background:#0a1220cc;padding:4px 8px;border:1px solid rgba(0,200,255,0.4);border-radius:4px;color:#c8d8e8"><b style="color:#00c8ff">${s.shortName}</b><br/>${s.agency} · ${s.country}<br/>${s.vehicles.slice(0, 2).join(', ')}</div>`;
        })
        .onPointClick((d: object) => onSiteClick(d as LaunchSite))
        .arcsData(trackData)
        .arcStartLat('startLat').arcStartLng('startLng')
        .arcEndLat('endLat').arcEndLng('endLng')
        .arcColor('color')
        .arcAltitudeAutoScale(0.4)
        .arcStroke(0.5)
        .arcDashLength(0.4).arcDashGap(0.3).arcDashAnimateTime(3000)
        .ringsData(sitesData.filter(s => s.status === 'active'))
        .ringLat('lat').ringLng('lng')
        .ringColor(() => 'rgba(0,200,255,0.25)')
        .ringMaxRadius(3).ringPropagationSpeed(1).ringRepeatPeriod(2000);

      onSatCountChange(sitesData.length + 6000); // Starlink fleet size

    } else if (currentMode === 'starlink') {
      const starlinkSats = generateStarlinkPositions(450);
      onSatCountChange(starlinkSats.length + 5600);

      globe
        .pointsData([...starlinkSats, ...sitesData])
        .pointLat('lat').pointLng('lng')
        .pointColor((d: object) => {
          const sat = d as typeof starlinkSats[0];
          return sat.altitude !== undefined && sat.altitude < 0.1
            ? `rgba(0,180,255,0.7)`
            : AGENCY_COLORS[(d as typeof sitesData[0]).agency] || '#00c8ff';
        })
        .pointAltitude((d: object) => (d as typeof starlinkSats[0]).altitude ?? 0.01)
        .pointRadius((d: object) => (d as typeof starlinkSats[0]).altitude < 0.1 ? 0.12 : 0.5)
        .pointLabel((d: object) => {
          const s = d as typeof sitesData[0];
          if (!s.shortName) return '';
          return `<div style="font-family:monospace;font-size:11px;background:#0a1220cc;padding:4px 8px;border:1px solid rgba(0,200,255,0.4);border-radius:4px;color:#c8d8e8"><b style="color:#00c8ff">${s.shortName}</b><br/>${s.agency}</div>`;
        })
        .onPointClick((d: object) => {
          if ((d as typeof sitesData[0]).shortName) onSiteClick(d as LaunchSite);
        })
        .arcsData([])
        .ringsData([]);

    } else if (currentMode === 'programs') {
      globe
        .pointsData(sitesData)
        .pointLat('lat').pointLng('lng')
        .pointColor((d: object) => (d as typeof sitesData[0]).color)
        .pointAltitude(0.01)
        .pointRadius(0.7)
        .pointLabel((d: object) => {
          const s = d as typeof sitesData[0];
          return `<div style="font-family:monospace;font-size:11px;background:#0a1220cc;padding:4px 8px;border:1px solid rgba(0,200,255,0.4);border-radius:4px;color:#c8d8e8"><b style="color:#00c8ff">${s.shortName}</b><br/>${s.agency} · ${s.vehicles.join(', ')}</div>`;
        })
        .onPointClick((d: object) => onSiteClick(d as LaunchSite))
        .arcsData(
          LAUNCH_SITES.flatMap(site =>
            LAUNCH_SITES
              .filter(t => t.id !== site.id && t.agency === site.agency)
              .slice(0, 1)
              .map(t => ({
                startLat: site.lat, startLng: site.lng,
                endLat: t.lat, endLng: t.lng,
                color: [
                  `${AGENCY_COLORS[site.agency]}00`,
                  `${AGENCY_COLORS[site.agency]}88`,
                  `${AGENCY_COLORS[site.agency]}00`,
                ],
                stroke: 0.3,
              }))
          )
        )
        .arcStartLat('startLat').arcStartLng('startLng')
        .arcEndLat('endLat').arcEndLng('endLng')
        .arcColor('color')
        .arcAltitudeAutoScale(0.25)
        .arcStroke(0.4)
        .arcDashLength(0.5).arcDashGap(0.5).arcDashAnimateTime(4000)
        .ringsData([]);

      onSatCountChange(6242);

    } else if (currentMode === 'orbital-dc') {
      // Show orbital DC nodes + laser-link arcs between them
      const dcArcs = [
        { startLat: 51.6, startLng: 0,   endLat: 51.6, endLng: 90,  label: 'ISL 1-2' },
        { startLat: 51.6, startLng: 90,  endLat: 51.6, endLng: 180, label: 'ISL 2-3' },
        { startLat: 51.6, startLng: 180, endLat: 51.6, endLng: -90, label: 'ISL 3-4' },
        { startLat: 51.6, startLng: -90, endLat: 51.6, endLng: 0,   label: 'ISL 4-1' },
        // Ground links
        { startLat: 51.6, startLng: 0,   endLat: 51.508, endLng: -0.128, label: 'Ground London' },
        { startLat: 51.6, startLng: -90, endLat: 40.713, endLng: -74.006, label: 'Ground NYC' },
        { startLat: 51.6, startLng: 90,  endLat: 35.689, endLng: 139.692, label: 'Ground Tokyo' },
        { startLat: 51.6, startLng: 180, endLat: 37.774, endLng: -122.419, label: 'Ground SF' },
      ];

      globe
        .pointsData([...ORBITAL_DC_NODES, ...sitesData.slice(0, 4)])
        .pointLat('lat').pointLng('lng')
        .pointColor((d: object) => {
          const n = d as typeof ORBITAL_DC_NODES[0];
          return n.altitude > 0.1 ? '#ff9933' : '#00c8ff';
        })
        .pointAltitude((d: object) => (d as typeof ORBITAL_DC_NODES[0]).altitude ?? 0.01)
        .pointRadius((d: object) => (d as typeof ORBITAL_DC_NODES[0]).altitude > 0.05 ? 0.8 : 0.5)
        .pointLabel((d: object) => {
          const n = d as typeof ORBITAL_DC_NODES[0];
          if (!n.label) return '';
          return `<div style="font-family:monospace;font-size:11px;background:#0a1220cc;padding:4px 8px;border:1px solid rgba(0,200,255,0.4);border-radius:4px;color:#c8d8e8"><b style="color:#00c8ff">${n.label}</b><br/>Orbital Data Center Node<br/>Alt: ${n.altitude > 1 ? '35,786 km (GEO)' : '550 km (LEO)'}</div>`;
        })
        .onPointClick(() => {})
        .arcsData(dcArcs)
        .arcStartLat('startLat').arcStartLng('startLng')
        .arcEndLat('endLat').arcEndLng('endLng')
        .arcColor(() => ['rgba(34,211,160,0)', 'rgba(34,211,160,0.9)', 'rgba(34,211,160,0)'])
        .arcAltitudeAutoScale(0.15)
        .arcStroke(1)
        .arcDashLength(0.3).arcDashGap(0.15).arcDashAnimateTime(1200)
        .ringsData(ORBITAL_DC_NODES.slice(0, 4))
        .ringLat('lat').ringLng('lng')
        .ringColor(() => 'rgba(0,200,255,0.3)')
        .ringMaxRadius(4).ringPropagationSpeed(2).ringRepeatPeriod(1500);

      onSatCountChange(ORBITAL_DC_NODES.length);
    }
  }, [onSiteClick, onSatCountChange]);

  useEffect(() => {
    if (!containerRef.current) return;
    const el = containerRef.current;

    import('globe.gl').then(({ default: GlobeGL }) => {
      const globe = (GlobeGL as unknown as (el: HTMLElement) => GlobeInstance)(el)
        .globeImageUrl('https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg')
        .bumpImageUrl('https://unpkg.com/three-globe/example/img/earth-topology.png')
        .backgroundImageUrl('https://unpkg.com/three-globe/example/img/night-sky.png')
        .atmosphereColor('rgba(0,160,255,0.4)')
        .atmosphereAltitude(0.18);

      globe.width(el.offsetWidth).height(el.offsetHeight);
      globeRef.current = globe;
      applyMode(globe, 'live');

      // Controls and renderer are only available after the first render tick
      requestAnimationFrame(() => {
        const controls = globe.controls();
        if (controls) {
          controls.autoRotate = true;
          controls.autoRotateSpeed = 0.3;
        }
        try { globe.renderer().setPixelRatio(Math.min(window.devicePixelRatio, 2)); } catch (_) {}
      });
    });

    const onResize = () => {
      if (globeRef.current) {
        globeRef.current.width(el.offsetWidth).height(el.offsetHeight);
      }
    };
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(animFrameRef.current);
    };
  }, [applyMode]);

  // Re-apply when mode changes
  useEffect(() => {
    if (globeRef.current) applyMode(globeRef.current, mode);
  }, [mode, applyMode]);

  return <div ref={containerRef} style={{ width: '100%', height: '100%' }} />;
}
