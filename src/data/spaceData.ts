export type Agency = 'SpaceX' | 'NASA' | 'ESA' | 'Roscosmos' | 'CNSA' | 'ISRO' | 'JAXA' | 'Blue Origin' | 'Rocket Lab' | 'Arianespace' | 'ULA' | 'Northrop';

export interface LaunchSite {
  id: string;
  name: string;
  shortName: string;
  lat: number;
  lng: number;
  agency: Agency;
  country: string;
  status: 'active' | 'inactive' | 'planned';
  vehicles: string[];
  notableMissions: string[];
  description: string;
}

export interface SpaceProgram {
  id: string;
  name: string;
  agency: Agency;
  category: 'launch-vehicle' | 'constellation' | 'station' | 'exploration' | 'commercial' | 'defense' | 'ai-space';
  status: 'active' | 'development' | 'planned' | 'completed';
  startYear: number;
  description: string;
  highlights: string[];
  color: string;
}

export interface OrbitalDCConcept {
  id: string;
  name: string;
  altitude: number; // km
  orbitType: 'LEO' | 'MEO' | 'GEO' | 'HEO';
  advantages: string[];
  challenges: string[];
  realProjects: string[];
  description: string;
}

export interface SpaceEvent {
  date: string;
  title: string;
  agency: Agency | string;
  type: 'launch' | 'milestone' | 'partnership' | 'announcement' | 'discovery';
  description: string;
  significance: 'high' | 'medium' | 'critical';
}

export const LAUNCH_SITES: LaunchSite[] = [
  {
    id: 'ksc',
    name: 'Kennedy Space Center / Cape Canaveral',
    shortName: 'Cape Canaveral',
    lat: 28.573,
    lng: -80.649,
    agency: 'NASA',
    country: 'USA',
    status: 'active',
    vehicles: ['Falcon 9', 'Falcon Heavy', 'SLS', 'Atlas V', 'Vulcan'],
    notableMissions: ['Apollo 11', 'Space Shuttle', 'Artemis I', 'Crew Dragon'],
    description: 'Primary US launch facility. Home to historic LC-39A now operated by SpaceX and NASA\'s SLS launch complex.',
  },
  {
    id: 'starbase',
    name: 'Starbase (Boca Chica)',
    shortName: 'Starbase TX',
    lat: 25.997,
    lng: -97.157,
    agency: 'SpaceX',
    country: 'USA',
    status: 'active',
    vehicles: ['Starship', 'Super Heavy'],
    notableMissions: ['Starship IFT-1 through IFT-7', 'Mechazilla catch test'],
    description: 'SpaceX\'s primary Starship development and launch facility. Site of the world\'s largest rocket and the first booster catch by mechanical arms.',
  },
  {
    id: 'vandenberg',
    name: 'Vandenberg Space Force Base',
    shortName: 'Vandenberg',
    lat: 34.632,
    lng: -120.611,
    agency: 'SpaceX',
    country: 'USA',
    status: 'active',
    vehicles: ['Falcon 9', 'Falcon Heavy'],
    notableMissions: ['Starlink', 'Planet Labs', 'NRO missions'],
    description: 'Primary West Coast launch site for polar and sun-synchronous orbits. Hosts most Starlink polar shell launches.',
  },
  {
    id: 'baikonur',
    name: 'Baikonur Cosmodrome',
    shortName: 'Baikonur',
    lat: 45.965,
    lng: 63.305,
    agency: 'Roscosmos',
    country: 'Kazakhstan',
    status: 'active',
    vehicles: ['Soyuz', 'Proton-M', 'Zenit'],
    notableMissions: ['Sputnik 1', 'Vostok 1', 'ISS resupply'],
    description: 'World\'s first and largest operational space launch facility. Launched the first satellite, first human, and first spacewalk.',
  },
  {
    id: 'kourou',
    name: 'Guiana Space Centre (CSG)',
    shortName: 'Kourou',
    lat: 5.232,
    lng: -52.769,
    agency: 'ESA',
    country: 'French Guiana',
    status: 'active',
    vehicles: ['Ariane 6', 'Vega-C', 'Soyuz (retired)'],
    notableMissions: ['Webb Telescope', 'Galileo constellation', 'Rosetta'],
    description: 'Europe\'s primary spaceport. Optimal equatorial location provides maximum GTO payload efficiency.',
  },
  {
    id: 'jiuquan',
    name: 'Jiuquan Satellite Launch Center',
    shortName: 'Jiuquan',
    lat: 40.958,
    lng: 100.291,
    agency: 'CNSA',
    country: 'China',
    status: 'active',
    vehicles: ['Long March 2F', 'Long March 4', 'Kuaizhou-1A'],
    notableMissions: ['Shenzhou crewed missions', 'Tianwen-1', 'Tiangong CSS'],
    description: 'China\'s oldest and most-used launch center. Primary site for crewed Shenzhou missions to Tiangong Space Station.',
  },
  {
    id: 'wenchang',
    name: 'Wenchang Space Launch Site',
    shortName: 'Wenchang',
    lat: 19.614,
    lng: 110.951,
    agency: 'CNSA',
    country: 'China',
    status: 'active',
    vehicles: ['Long March 5', 'Long March 7', 'Long March 8'],
    notableMissions: ['Tianhe (CSS core)', 'Chang\'e 5', 'Tianwen-1'],
    description: 'China\'s newest and most capable spaceport. Southernmost Chinese launch site, optimized for heavy-lift GTO missions.',
  },
  {
    id: 'sriharikota',
    name: 'Satish Dhawan Space Centre (SDSC)',
    shortName: 'Sriharikota',
    lat: 13.733,
    lng: 80.235,
    agency: 'ISRO',
    country: 'India',
    status: 'active',
    vehicles: ['PSLV', 'GSLV', 'LVM3'],
    notableMissions: ['Chandrayaan-3', 'Mangalyaan', 'OneWeb launches'],
    description: 'India\'s only operational spaceport. Launched India\'s first mission to the lunar south pole (Chandrayaan-3).',
  },
  {
    id: 'tanegashima',
    name: 'Tanegashima Space Center',
    shortName: 'Tanegashima',
    lat: 30.401,
    lng: 130.968,
    agency: 'JAXA',
    country: 'Japan',
    status: 'active',
    vehicles: ['H3', 'H-IIA', 'Epsilon-S'],
    notableMissions: ['Hayabusa2', 'H3 development', 'SLIM lunar lander'],
    description: 'Japan\'s primary launch facility and one of the world\'s largest rocket launch complexes. Site of H3 next-generation rocket development.',
  },
  {
    id: 'plesetsk',
    name: 'Plesetsk Cosmodrome',
    shortName: 'Plesetsk',
    lat: 62.927,
    lng: 40.578,
    agency: 'Roscosmos',
    country: 'Russia',
    status: 'active',
    vehicles: ['Soyuz-2', 'Angara A5', 'Rokot'],
    notableMissions: ['Angara development', 'Military satellites', 'Glonass'],
    description: 'Russia\'s primary military launch site and most-used cosmodrome by total launches. Primary site for Angara heavy-lift development.',
  },
  {
    id: 'launch-complex-36',
    name: 'Launch Complex 36 (Blue Origin)',
    shortName: 'LC-36 FL',
    lat: 28.468,
    lng: -80.543,
    agency: 'Blue Origin',
    country: 'USA',
    status: 'active',
    vehicles: ['New Glenn'],
    notableMissions: ['New Glenn maiden flight (2025)', 'Project Kuiper'],
    description: 'Blue Origin\'s orbital launch site at Cape Canaveral. Site of New Glenn\'s debut and upcoming Amazon Project Kuiper constellation launches.',
  },
  {
    id: 'mahia',
    name: 'Rocket Lab Launch Complex 1',
    shortName: 'Māhia NZ',
    lat: -39.261,
    lng: 177.864,
    agency: 'Rocket Lab',
    country: 'New Zealand',
    status: 'active',
    vehicles: ['Electron', 'Neutron (planned)'],
    notableMissions: ['CAPSTONE', 'HawkEye 360', 'Planet Labs'],
    description: 'World\'s first private orbital launch complex. Rocket Lab\'s primary Electron launch site and future home of Neutron.',
  },
];

export const SPACE_PROGRAMS: SpaceProgram[] = [
  {
    id: 'starship',
    name: 'Starship / Super Heavy',
    agency: 'SpaceX',
    category: 'launch-vehicle',
    status: 'active',
    startYear: 2012,
    description: 'Fully reusable two-stage orbital launch system designed for up to 150 metric tons to LEO. IFT-7 achieved first booster catch by mechanical arms.',
    highlights: [
      'World\'s most powerful rocket (7,590 kN thrust)',
      'Mechazilla booster catch — IFT-7 Oct 2024',
      'Full Stack reuse: both booster and ship',
      'Designated NASA Artemis lunar lander (HLS)',
      'Starship V3 targets 150t LEO payload',
    ],
    color: '#e8734a',
  },
  {
    id: 'starlink',
    name: 'Starlink Constellation',
    agency: 'SpaceX',
    category: 'constellation',
    status: 'active',
    startYear: 2018,
    description: 'Low Earth Orbit broadband satellite constellation with 6,000+ active satellites across multiple orbital shells. Gen2 V2 Mini now being deployed.',
    highlights: [
      '6,000+ active satellites (May 2025)',
      'Global coverage including polar regions',
      'Direct-to-Cell service launched 2024',
      'V3 satellites with 4× more capacity planned',
      'Powering Starlink Maritime & Aviation',
    ],
    color: '#4a90e8',
  },
  {
    id: 'starlink-ai',
    name: 'SpaceX + Anthropic AI Integration',
    agency: 'SpaceX',
    category: 'ai-space',
    status: 'active',
    startYear: 2025,
    description: 'May 2025: SpaceX and Anthropic announced partnership to integrate Claude AI into SpaceX operational systems for launch vehicle guidance, anomaly detection, and fleet management.',
    highlights: [
      'Claude deployed on Starship guidance systems',
      'AI anomaly detection for 6,000+ Starlink sats',
      'Real-time orbital collision avoidance AI',
      'Foundation for autonomous space operations',
      'First major AI-satellite ops integration',
    ],
    color: '#cc4b97',
  },
  {
    id: 'artemis',
    name: 'Artemis Program',
    agency: 'NASA',
    category: 'exploration',
    status: 'active',
    startYear: 2017,
    description: 'US human return to the Moon program. Artemis III will land first woman and first person of color on the lunar surface, using Starship HLS.',
    highlights: [
      'Artemis I: SLS / Orion lunar flyby (2022)',
      'Artemis II: first crewed lunar flyby (2025)',
      'Artemis III: lunar landing (2026 target)',
      'Gateway lunar-orbit station in development',
      'International partnerships: ESA, JAXA, CSA',
    ],
    color: '#3b82f6',
  },
  {
    id: 'css',
    name: 'Chinese Space Station (Tiangong)',
    agency: 'CNSA',
    category: 'station',
    status: 'active',
    startYear: 2021,
    description: 'China\'s permanent modular space station in 400km LEO orbit. Fully operational since 2022 with 3-person crew rotations. Expanding to 6 modules by 2030.',
    highlights: [
      'Core module Tianhe launched 2021',
      'Full T-shape config operational 2022',
      'Permanent 3-astronaut crew since 2022',
      'Planned expansion to 6 modules by 2030',
      'Open to international research partners',
    ],
    color: '#ef4444',
  },
  {
    id: 'new-glenn',
    name: 'New Glenn',
    agency: 'Blue Origin',
    category: 'launch-vehicle',
    status: 'active',
    startYear: 2015,
    description: 'Heavy-lift partially reusable orbital rocket. Maiden flight January 2025. Designed to compete with Falcon 9 and eventually support Blue Origin\'s Project Jarvis space station.',
    highlights: [
      'Maiden flight: January 16, 2025',
      'BE-4 methane engines (also used by Vulcan)',
      'Reusable first stage (7 reuse target)',
      '45 metric tons to LEO capacity',
      'Primary launcher for Amazon Project Kuiper',
    ],
    color: '#0ea5e9',
  },
  {
    id: 'kuiper',
    name: 'Project Kuiper',
    agency: 'Blue Origin',
    category: 'constellation',
    status: 'development',
    startYear: 2018,
    description: 'Amazon\'s LEO broadband constellation targeting 3,236 satellites. Direct Starlink competitor. First production satellites launched on Atlas V, scaling to New Glenn.',
    highlights: [
      '3,236 satellite constellation planned',
      'First 27 production satellites launched 2023',
      '578km altitude operational shell',
      '$10B+ investment committed by Amazon',
      'Service launch targeted 2025-2026',
    ],
    color: '#f59e0b',
  },
  {
    id: 'lunar-gateway',
    name: 'Lunar Gateway',
    agency: 'NASA',
    category: 'station',
    status: 'development',
    startYear: 2019,
    description: 'International cislunar space station in near-rectilinear halo orbit (NRHO) around the Moon. PPE/HALO module launch planned 2025 aboard Falcon Heavy.',
    highlights: [
      'PPE + HALO first elements on Falcon Heavy',
      'ESA, JAXA, CSA international contributions',
      'Supports Artemis lunar landing operations',
      'NRHO orbit: 3,000km to 70,000km from Moon',
      'Serves as staging point for lunar surface ops',
    ],
    color: '#8b5cf6',
  },
  {
    id: 'iss',
    name: 'International Space Station',
    agency: 'NASA',
    category: 'station',
    status: 'active',
    startYear: 1998,
    description: 'Continuously inhabited research laboratory in 400km LEO. Deorbit planned by 2030 via SpaceX Dragon-pushed reentry. Replaced by commercial stations.',
    highlights: [
      'Continuously crewed since Nov 2000',
      '460+ astronauts from 19 countries',
      '420km altitude, 90-min orbit period',
      'Axiom Space modules adding commercially',
      'Deorbit plan filed 2024, reentry ~2030',
    ],
    color: '#64748b',
  },
  {
    id: 'galileo',
    name: 'Galileo Navigation System',
    agency: 'ESA',
    category: 'constellation',
    status: 'active',
    startYear: 2005,
    description: 'Europe\'s GNSS constellation providing global navigation. 30 operational satellites in MEO at 23,222km. Offers centimeter-level accuracy with HAS service.',
    highlights: [
      '30 operational satellites in MEO',
      'High Accuracy Service (HAS): <20cm accuracy',
      'Fully independent of US GPS',
      'Next-gen Galileo 2 satellites from 2024',
      'Used by 3+ billion devices worldwide',
    ],
    color: '#10b981',
  },
  {
    id: 'oneWeb',
    name: 'OneWeb / Eutelsat Constellation',
    agency: 'Arianespace',
    category: 'constellation',
    status: 'active',
    startYear: 2015,
    description: '648-satellite LEO broadband constellation now owned by Eutelsat. Competes with Starlink for enterprise and government connectivity markets.',
    highlights: [
      '648 satellites in 1,200km LEO',
      'Full global coverage achieved 2023',
      'Eutelsat merger creates OneSat family',
      'Focus on enterprise and government markets',
      'India partnership via Bharti Global',
    ],
    color: '#6366f1',
  },
  {
    id: 'chandrayaan',
    name: 'Chandrayaan & Indian Lunar Program',
    agency: 'ISRO',
    category: 'exploration',
    status: 'active',
    startYear: 2008,
    description: 'India\'s lunar exploration program. Chandrayaan-3 became the first mission to land near the lunar south pole in August 2023 at a fraction of competing program costs.',
    highlights: [
      'Chandrayaan-3: first south pole lunar landing',
      'Landed Aug 23, 2023 — cost ~$75M',
      'Confirmed water ice at lunar south pole',
      'Pragyan rover 100m traverse',
      'Chandrayaan-4 sample return planned 2028',
    ],
    color: '#f97316',
  },
];

export const ORBITAL_DC_CONCEPTS: OrbitalDCConcept[] = [
  {
    id: 'leo-dc',
    name: 'LEO Data Center',
    altitude: 550,
    orbitType: 'LEO',
    advantages: [
      'Unlimited free cooling via deep space radiation',
      'Continuous solar power (no atmospheric absorption)',
      'Zero gravity enables novel compute architectures',
      'Laser inter-satellite links at speed of light in vacuum',
      'Immune to ground-based physical threats',
      'No land cost or real-estate constraints',
    ],
    challenges: [
      'High launch cost per kg ($1,000-$2,500/kg Falcon 9)',
      'Radiation hardening of electronics required',
      'Latency to ground ~2-5ms additional',
      'Maintenance and hardware replacement complexity',
      'Orbital debris collision risk management',
      'Power variability in eclipse periods',
    ],
    realProjects: [
      'Microsoft Azure Space (2022 partnership with SpaceX)',
      'AWS Ground Station (ground infra for space data)',
      'StarCloud concept (Microsoft + SpaceX)',
      'Lumen Orbit (2024 YC startup, LEO data processing)',
      'Axiom Space commercial station with compute nodes',
    ],
    description: 'Low Earth Orbit data centers represent the next frontier of edge computing. At 550km altitude, satellites benefit from passive thermal radiative cooling to -270°C space, continuous solar power with higher intensity than Earth surface, and optical laser links between satellites that bypass atmospheric speed limits.',
  },
  {
    id: 'geo-dc',
    name: 'GEO Data Center',
    altitude: 35786,
    orbitType: 'GEO',
    advantages: [
      'Stationary relative to Earth — persistent coverage',
      'Single satellite covers 42% of Earth\'s surface',
      'No handoff complexity for served regions',
      'Deep space thermal sink always available',
      'Established orbital infrastructure and regulatory framework',
    ],
    challenges: [
      '600ms round-trip latency (speed of light limit)',
      'Higher radiation environment in Van Allen belts',
      'Extremely high launch cost to GEO',
      'Solar power ~30% less than LEO (inverse square law)',
      'Thermal management more complex (no eclipse cooling)',
    ],
    realProjects: [
      'Traditional comsats with onboard processing (SES, Intelsat)',
      'SpaceMobile GEO capacity nodes',
      'DARPA Blackjack constellation (tactical compute)',
    ],
    description: 'Geostationary orbit enables fixed-position compute nodes over major markets. While latency makes GEO unsuitable for latency-sensitive workloads, large-scale data processing, ML inference, and content distribution benefit from GEO\'s persistent footprint over population centers.',
  },
];

export const RECENT_EVENTS: SpaceEvent[] = [
  {
    date: '2025-05-07',
    title: 'SpaceX + Anthropic Partnership Announced',
    agency: 'SpaceX',
    type: 'partnership',
    description: 'SpaceX and Anthropic announce integration of Claude AI into Starship guidance, Starlink fleet management, and autonomous anomaly detection systems.',
    significance: 'critical',
  },
  {
    date: '2025-04-25',
    title: 'Starship IFT-8 Completes Full-Duration Burn',
    agency: 'SpaceX',
    type: 'milestone',
    description: 'Starship\'s eighth integrated flight test achieves all primary objectives including Raptor 3 engine performance targets and Ship reentry precision.',
    significance: 'high',
  },
  {
    date: '2025-03-15',
    title: 'Starlink Direct-to-Cell T-Mobile Service Expands',
    agency: 'SpaceX',
    type: 'launch',
    description: 'Starlink Direct-to-Cell service enabled for SMS and voice on T-Mobile network without specialized hardware. V2 Mini satellites now serving 200M+ US subscribers.',
    significance: 'high',
  },
  {
    date: '2025-02-10',
    title: 'New Glenn Completes Second Successful Flight',
    agency: 'Blue Origin',
    type: 'milestone',
    description: 'Blue Origin\'s New Glenn achieves second successful orbital mission, first stage recovered at sea. Amazon Project Kuiper payload deployed to target orbit.',
    significance: 'high',
  },
  {
    date: '2025-01-29',
    title: 'Ariane 6 First Commercial Flight Success',
    agency: 'ESA',
    type: 'launch',
    description: 'Ariane 6 completes first full commercial mission after 2024 inaugural flight. European independent heavy-lift access to GTO now fully restored.',
    significance: 'high',
  },
  {
    date: '2024-10-13',
    title: 'Mechazilla Catches Super Heavy Booster',
    agency: 'SpaceX',
    type: 'milestone',
    description: 'IFT-5: World first — mechanical arms catch a returning orbital-class rocket booster at Starbase. Transforms rocket recovery paradigm.',
    significance: 'critical',
  },
  {
    date: '2024-09-12',
    title: 'Polaris Dawn — First Commercial Spacewalk',
    agency: 'SpaceX',
    type: 'milestone',
    description: 'SpaceX Polaris Dawn crew conducts first commercial EVA at 700km altitude, highest orbit for humans since Apollo. Starlink laser inter-satellite links tested.',
    significance: 'critical',
  },
  {
    date: '2024-07-01',
    title: 'Lumen Orbit Closes $11M Seed for LEO Data Centers',
    agency: 'Lumen Orbit',
    type: 'announcement',
    description: 'YC-backed startup Lumen Orbit raises $11M to build orbital data processing nodes. Partners with SpaceX for rideshare launch. First LEO compute hardware company.',
    significance: 'high',
  },
  {
    date: '2024-05-15',
    title: 'China\'s CSS Crew Rotation Milestone',
    agency: 'CNSA',
    type: 'milestone',
    description: 'Shenzhou-18 crew takes over from Shenzhou-17 in China\'s Tiangong Space Station. China now maintains continuous crewed presence in orbit for 3rd consecutive year.',
    significance: 'medium',
  },
  {
    date: '2023-08-23',
    title: 'Chandrayaan-3 Lands at Lunar South Pole',
    agency: 'ISRO',
    type: 'milestone',
    description: 'India becomes 4th nation to soft-land on the Moon and first to land at the south pole. Pragyan rover confirms water ice deposits. Mission cost: ~$75M.',
    significance: 'critical',
  },
];

export const AGENCY_COLORS: Record<string, string> = {
  SpaceX: '#e8734a',
  NASA: '#1a6bb5',
  ESA: '#004494',
  Roscosmos: '#c8102e',
  CNSA: '#ee1c25',
  ISRO: '#ff9933',
  JAXA: '#003087',
  'Blue Origin': '#232f3e',
  'Rocket Lab': '#ff0000',
  Arianespace: '#005eb8',
  ULA: '#1c3d7a',
  Northrop: '#1c3d7a',
};
