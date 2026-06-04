import React, { useState, useEffect } from 'react';
import { TEAM_DATA, GROUP_TEAMS, getFlagUrl, matchesData } from '../../utils/matchesData';
import { PRE, PLAYERS_DB, getTournamentStats, getTopScorers } from '../../utils/statsData';

// Confederation lookup mapping
const getConfederation = (code) => {
  const uefa = ['ENG', 'GER', 'ESP', 'POR', 'NED', 'FRA', 'BEL', 'NOR', 'SUI', 'SCO', 'UKR', 'SWE', 'CRO', 'SRB', 'AUT', 'CZE', 'BIH', 'TUR'];
  const conmebol = ['ARG', 'BRA', 'CHI', 'COL', 'ECU', 'PAR', 'URU'];
  const concacaf = ['USA', 'MEX', 'CAN', 'CRC', 'PAN', 'HON', 'GTM', 'CUW', 'HAI'];
  const caf = ['MAR', 'GHA', 'SEN', 'NGR', 'TUN', 'EGY', 'ALG', 'CIV', 'CMR', 'DRC', 'SSD', 'RSA'];
  const afc = ['KOR', 'JAP', 'QAT', 'IRN', 'IRQ', 'SAU', 'UZB', 'JOR', 'AUS'];
  if (uefa.includes(code)) return 'UEFA';
  if (conmebol.includes(code)) return 'CONMEBOL';
  if (concacaf.includes(code)) return 'CONCACAF';
  if (caf.includes(code)) return 'CAF';
  if (afc.includes(code)) return 'AFC';
  return 'OFC';
};

const getRank = (code) => {
  const ranks = {
    ARG: 3, FRA: 2, ENG: 4, BEL: 8, BRA: 5, POR: 6, NED: 7, ESP: 3, ITA: 9, CRO: 10,
    GER: 11, USA: 13, MEX: 15, SEN: 17, JAP: 18, MAR: 12, COL: 14, URU: 16, SUI: 19,
    DEN: 21, KOR: 22, AUS: 24, UKR: 22, AUT: 25, SWE: 28, ECU: 31, WAL: 29, NOR: 47,
    CAN: 49, RSA: 59, GHA: 68, CZE: 36, BIH: 74, QAT: 34, SCO: 39, PAR: 56, TUR: 40,
    CUW: 88, CIV: 38, TUN: 41, EGY: 30, IRN: 20, NZL: 104, CPV: 65, SAU: 53, IRQ: 58,
    ALG: 43, JOR: 71, DRC: 63, UZB: 64, PAN: 45, GTM: 108, HAI: 86, SSD: 120
  };
  return ranks[code] || 50;
};

// Generate list of all 48 teams
const all48Teams = [];
Object.entries(GROUP_TEAMS).forEach(([groupLetter, codes]) => {
  codes.forEach(code => {
    const data = TEAM_DATA[code];
    if (data) {
      // simulated values
      const mockGoals = PRE ? 0 : (code === 'FRA' ? 8 : code === 'ENG' ? 7 : code === 'ARG' ? 6 : code === 'BRA' ? 5 : code === 'ESP' ? 5 : (code.charCodeAt(0) % 3));
      const mockYellows = PRE ? 0 : (code === 'NED' ? 5 : code === 'MAR' ? 7 : (code.charCodeAt(0) % 4));
      const mockReds = PRE ? 0 : (code === 'NED' ? 2 : code === 'BRA' ? 1 : code === 'MAR' ? 1 : (code.charCodeAt(1) % 12 === 0 ? 1 : 0));
      all48Teams.push({
        name: data.name,
        code: code,
        color: data.color || '#74ACDF',
        iso2: data.iso2.toLowerCase(),
        stage: ['USA', 'MEX', 'CAN'].includes(code) ? 'Qualified (Host)' : 'Qualified',
        group: `Group ${groupLetter}`,
        rank: getRank(code),
        confederation: getConfederation(code),
        goals: mockGoals,
        yellows: mockYellows,
        reds: mockReds,
        points: mockYellows * 1 + mockReds * 3
      });
    }
  });
});

// Spotlight player list
const SPOTLIGHT_PLAYERS = [
  { name: 'Messi', number: '10', team: 'ARG', flag: 'ar', color: '#74ACDF' },
  { name: 'Mbappé', number: '10', team: 'FRA', flag: 'fr', color: '#003189' },
  { name: 'Haaland', number: '9', team: 'NOR', flag: 'no', color: '#EF2B2D' },
  { name: 'Bellingham', number: '10', team: 'ENG', flag: 'gb-eng', color: '#B3CDE3' },
  { name: 'Vinicius', number: '7', team: 'BRA', flag: 'br', color: '#009C3B' },
  { name: 'Pulisic', number: '10', team: 'USA', flag: 'us', color: '#002868' },
  { name: 'Hakimi', number: '2', team: 'MAR', flag: 'ma', color: '#C1272D' },
  { name: 'Pedri', number: '8', team: 'ESP', flag: 'es', color: '#AA151B' }
];

// Flip Card Records Data
const flipCardsData = [
  {
    title: 'MOST WC TITLES',
    value: '5',
    sub: 'Brazil',
    flag: 'br',
    bg: '#009C3B',
    backTitle: 'Seleção Dominance',
    backDesc: 'Brazil won in 1958, 1962, 1970, 1994 and 2002. No nation comes close to their 5 championships.'
  },
  {
    title: 'MOST APPEARANCES',
    value: '20',
    sub: 'Germany',
    flag: 'de',
    bg: '#000000',
    backTitle: 'German Precision',
    backDesc: 'Die Mannschaft have qualified for 20 of 22 tournaments, missing only 1930 and 1950.'
  },
  {
    title: 'ALL-TIME TOP SCORER',
    value: '16',
    sub: 'Miroslav Klose',
    flag: 'de',
    bg: '#E8192C',
    backTitle: 'Golden Boot King',
    backDesc: "Klose broke Ronaldo's record at Brazil 2014, scoring his 16th WC goal across 4 tournaments."
  },
  {
    title: 'AVG ATTENDANCE',
    value: '68K',
    sub: '1994 USA',
    flag: 'us',
    bg: '#002868',
    backTitle: 'American Giants',
    backDesc: 'The 1994 World Cup averaged 68,604 fans per match, a record that still stands 30 years later.'
  }
];

// Winners Timeline Data
const WINNERS_TIMELINE = [
  { year: 1930, country: 'Uruguay', flag: 'uy', score: '4-2 vs ARG' },
  { year: 1934, country: 'Italy', flag: 'it', score: '2-1 vs CZE' },
  { year: 1938, country: 'Italy', flag: 'it', score: '4-2 vs HUN' },
  { year: 1950, country: 'Uruguay', flag: 'uy', score: '2-1 vs BRA' },
  { year: 1954, country: 'W.Germany', flag: 'de', score: '3-2 vs HUN' },
  { year: 1958, country: 'Brazil', flag: 'br', score: '5-2 vs SWE' },
  { year: 1962, country: 'Brazil', flag: 'br', score: '3-1 vs CZE' },
  { year: 1966, country: 'England', flag: 'gb-eng', score: '4-2 vs WGE' },
  { year: 1970, country: 'Brazil', flag: 'br', score: '4-1 vs ITA' },
  { year: 1974, country: 'W.Germany', flag: 'de', score: '2-1 vs NED' },
  { year: 1978, country: 'Argentina', flag: 'ar', score: '3-1 vs NED' },
  { year: 1982, country: 'Italy', flag: 'it', score: '3-1 vs WGE' },
  { year: 1986, country: 'Argentina', flag: 'ar', score: '3-2 vs WGE' },
  { year: 1990, country: 'W.Germany', flag: 'de', score: '1-0 vs ARG' },
  { year: 1994, country: 'Brazil', flag: 'br', score: '0-0 AET (3-2 pens) vs ITA' },
  { year: 1998, country: 'France', flag: 'fr', score: '3-0 vs BRA' },
  { year: 2002, country: 'Brazil', flag: 'br', score: '2-0 vs GER' },
  { year: 2006, country: 'Italy', flag: 'it', score: '1-1 AET (5-3 pens) vs FRA' },
  { year: 2010, country: 'Spain', flag: 'es', score: '1-0 AET vs NED' },
  { year: 2014, country: 'Germany', flag: 'de', score: '1-0 AET vs ARG' },
  { year: 2018, country: 'France', flag: 'fr', score: '4-2 vs CRO' },
  { year: 2022, country: 'Argentina', flag: 'ar', score: '3-3 AET (4-2 pens) vs FRA' },
  { year: 2026, country: '??? 🏆', flag: 'un', score: 'TBD', isTbd: true }
];

// Pre-tournament countdown component
const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({ days: '00', hours: '00', minutes: '00', seconds: '00' });

  useEffect(() => {
    const target = new Date('2026-06-11T19:00:00-05:00');
    const updateCountdown = () => {
      const diff = target - new Date();
      if (diff > 0) {
        const d = Math.floor(diff / (1000 * 60 * 60 * 24));
        const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const m = Math.floor((diff / 1000 / 60) % 60);
        const s = Math.floor((diff / 1000) % 60);
        setTimeLeft({
          days: d.toString().padStart(2, '0'),
          hours: h.toString().padStart(2, '0'),
          minutes: m.toString().padStart(2, '0'),
          seconds: s.toString().padStart(2, '0')
        });
      }
    };
    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex gap-4 items-center justify-center px-10">
      <div className="flex flex-col items-center">
        <div className="font-fwc text-3xl md:text-5xl text-white">{timeLeft.days}</div>
        <div className="text-[10px] text-fifa-gold font-body-bold tracking-widest mt-1">DAYS</div>
      </div>
      <div className="font-fwc text-2xl md:text-4xl text-white/50">:</div>
      <div className="flex flex-col items-center">
        <div className="font-fwc text-3xl md:text-5xl text-white">{timeLeft.hours}</div>
        <div className="text-[10px] text-fifa-gold font-body-bold tracking-widest mt-1">HOURS</div>
      </div>
      <div className="font-fwc text-2xl md:text-4xl text-white/50">:</div>
      <div className="flex flex-col items-center">
        <div className="font-fwc text-3xl md:text-5xl text-white">{timeLeft.minutes}</div>
        <div className="text-[10px] text-fifa-gold font-body-bold tracking-widest mt-1">MINS</div>
      </div>
      <div className="font-fwc text-2xl md:text-4xl text-white/50">:</div>
      <div className="flex flex-col items-center">
        <div className="font-fwc text-3xl md:text-5xl text-white">{timeLeft.seconds}</div>
        <div className="text-[10px] text-fifa-gold font-body-bold tracking-widest mt-1">SECS</div>
      </div>
    </div>
  );
};

export default function Stats() {
  const [activeSidebarTab, setActiveSidebarTab] = useState('Overview');
  const [activePlayerTab, setActivePlayerTab] = useState('Goals');
  const [disSortConfig, setDisSortConfig] = useState({ key: 'points', direction: 'ascending' });
  const [animateBars, setAnimateBars] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimateBars(true);
    }, 150);
    return () => clearTimeout(timer);
  }, [activeSidebarTab]);

  // Compute Stats values
  const stats = getTournamentStats(matchesData);
  const topScorers = getTopScorers(PLAYERS_DB, activePlayerTab.toLowerCase());

  // Sorting Disciplinary Table
  const sortedDisciplinary = [...all48Teams].sort((a, b) => {
    let aVal = a[disSortConfig.key];
    let bVal = b[disSortConfig.key];
    if (typeof aVal === 'string') {
      return disSortConfig.direction === 'ascending'
        ? aVal.localeCompare(bVal)
        : bVal.localeCompare(aVal);
    }
    return disSortConfig.direction === 'ascending' ? aVal - bVal : bVal - aVal;
  });

  const requestDisSort = (key) => {
    let direction = 'ascending';
    if (disSortConfig.key === key && disSortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setDisSortConfig({ key, direction });
  };

  const fairPlayRanking = [...all48Teams].sort((a, b) => a.points - b.points);

  // Group goals for Section A (Team stats)
  const sortedTeamGoals = PRE
    ? [...all48Teams].sort((a, b) => a.name.localeCompare(b.name))
    : [...all48Teams].sort((a, b) => b.goals - a.goals);

  // Split Comparison (Possession & Shots)
  const mockPossession = [
    { team1: 'BRA', name1: 'Brazil', val1: 52, team2: 'ARG', name2: 'Argentina', val2: 48, label: 'Possession %' },
    { team1: 'GER', name1: 'Germany', val1: 18, team2: 'ESP', name2: 'Spain', val2: 12, label: 'Shots on Target' },
    { team1: 'FRA', name1: 'France', val1: 89, team2: 'ENG', name2: 'England', val2: 86, label: 'Pass Accuracy %' }
  ];

  return (
    <div style={{ paddingTop: '64px', minHeight: '100vh', backgroundColor: 'var(--background)' }}>
      <style>{`
        /* Sidebar transition and styles */
        .stats-sidebar {
          position: fixed;
          left: 0;
          top: 64px;
          bottom: 0;
          width: 240px;
          background-color: #FFFFFF;
          border-right: 1px solid #E0E0E0;
          z-index: 30;
          overflow-y: auto;
          box-shadow: 2px 0 8px rgba(0,0,0,0.06);
          display: flex;
          flex-direction: column;
        }
        
        .stats-main-content {
          margin-left: 240px;
          min-height: calc(100vh - 64px);
          background-color: var(--background);
        }
        
        @media (max-width: 1023px) {
          .stats-sidebar {
            display: none;
          }
          .stats-main-content {
            margin-left: 0;
          }
        }

        /* Nav item styles */
        .stats-nav-item {
          height: 48px;
          display: flex;
          align-items: center;
          padding: 0 16px;
          gap: 12px;
          border-radius: 8px;
          margin: 4px 12px;
          cursor: pointer;
          transition: all 200ms ease;
          color: #9E9E9E;
        }
        
        .stats-nav-item:hover {
          background-color: #F5F5F5;
          color: #000000;
        }
        
        .stats-nav-item.active {
          background-color: #E8192C;
          color: #FFFFFF;
          box-shadow: 0 4px 12px rgba(232,25,44,0.25);
        }
        
        .stats-nav-item.active:hover {
          background-color: #E8192C;
          color: #FFFFFF;
        }
        
        /* 3D Flip Card Styles */
        .flip-card {
          perspective: 1200px;
        }
        .flip-card-inner {
          position: relative;
          width: 100%;
          height: 100%;
          transition: transform 600ms ease;
          transform-style: preserve-3d;
        }
        .flip-card:hover .flip-card-inner {
          transform: rotateY(180deg);
        }
        .flip-card-front, .flip-card-back {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
          border-radius: 12px;
        }
        .flip-card-back {
          transform: rotateY(180deg);
        }
        
        /* Tab animation styles */
        .tab-fade-enter {
          opacity: 0;
          transform: translateY(8px);
          animation: tabEnter 250ms ease-out forwards;
        }
        
        @keyframes tabEnter {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Shimmer effect */
        .shimmer-sweep {
          position: absolute;
          top: 0;
          left: -150%;
          width: 50%;
          height: 100%;
          background: linear-gradient(to right, transparent, rgba(255,255,255,0.3), transparent);
          transform: skewX(-25deg);
          transition: all 0.75s ease;
        }
        .spotlight-card:hover .shimmer-sweep {
          left: 150%;
        }
      `}</style>

      {/* SideNavBar Fixed */}
      <aside className="stats-sidebar">
        {/* Header section */}
        <div className="p-xl border-b border-border-grey flex flex-col justify-center" style={{ minHeight: '120px' }}>
          <span className="font-fwc text-[20px] text-fifa-black uppercase tracking-wider leading-none">FIFA WORLD CUP 26™</span>
          <h2 className="font-fwc text-[16px] text-primary uppercase leading-tight mt-1">TOURNAMENT STATS</h2>
          <p className="text-mid-grey font-body text-[13px] font-semibold">United 2026</p>
        </div>

        {/* Nav Items */}
        <nav className="flex-1 py-md space-y-xs overflow-y-auto">
          {[
            { id: 'Overview', label: 'Overview', icon: 'dashboard' },
            { id: 'Player Stats', label: 'Player Stats', icon: 'person' },
            { id: 'Team Stats', label: 'Team Stats', icon: 'groups' },
            { id: 'Records', label: 'Records', icon: 'military_tech' },
            { id: 'Disciplinary', label: 'Disciplinary', icon: 'gavel' }
          ].map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveSidebarTab(item.id)}
              className={`stats-nav-item ${activeSidebarTab === item.id ? 'active' : ''}`}
            >
              <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
              <span className="font-body-bold text-[14px]">{item.label}</span>
            </div>
          ))}
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="stats-main-content">
        {/* TOP STATS STRIP */}
        <section className="bg-fifa-black py-xl border-b border-white/5 relative overflow-hidden">
          <div className="max-w-max-width mx-auto px-lg grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-lg">
            {/* Goals Scored */}
            <div className="text-center group">
              <p className="text-fifa-gold font-label-eyebrow mb-xs uppercase text-[11px] tracking-widest font-black opacity-80">
                {PRE ? '104 MATCHES' : 'Goals Scored'}
              </p>
              <div className="font-fwc text-[54px] text-white leading-none font-black">{stats.goalsScored}</div>
              <div className="h-0.5 w-8 bg-primary mx-auto mt-2 rounded-full group-hover:w-16 transition-all duration-300"></div>
            </div>
            {/* Matches Played */}
            <div className="text-center group">
              <p className="text-fifa-gold font-label-eyebrow mb-xs uppercase text-[11px] tracking-widest font-black opacity-80">
                {PRE ? '48 TEAMS' : 'Matches Played'}
              </p>
              <div className="font-fwc text-[54px] text-white leading-none font-black">{stats.matchesPlayed}</div>
              <div className="h-0.5 w-8 bg-primary mx-auto mt-2 rounded-full group-hover:w-16 transition-all duration-300"></div>
            </div>
            {/* Avg Goals */}
            <div className="text-center group">
              <p className="text-fifa-gold font-label-eyebrow mb-xs uppercase text-[11px] tracking-widest font-black opacity-80">
                {PRE ? 'HOST CITIES' : 'Avg Goals/Match'}
              </p>
              <div className="font-fwc text-[54px] text-white leading-none font-black">{stats.avgGoals}</div>
              <div className="h-0.5 w-8 bg-primary mx-auto mt-2 rounded-full group-hover:w-16 transition-all duration-300"></div>
            </div>
            {/* Yellow Cards */}
            <div className="text-center group">
              <p className="text-fifa-gold font-label-eyebrow mb-xs uppercase text-[11px] tracking-widest font-black opacity-80">
                {PRE ? 'DAYS TO GO' : 'Yellow Cards'}
              </p>
              <div className="font-fwc text-[54px] text-white leading-none font-black">{stats.yellowCards}</div>
              <div className="h-0.5 w-8 bg-primary mx-auto mt-2 rounded-full group-hover:w-16 transition-all duration-300"></div>
            </div>
            {/* Red Cards */}
            <div className="text-center group">
              <p className="text-fifa-gold font-label-eyebrow mb-xs uppercase text-[11px] tracking-widest font-black opacity-80">
                {PRE ? 'NATIONS' : 'Red Cards'}
              </p>
              <div className="font-fwc text-[54px] text-white leading-none font-black">{stats.redCards}</div>
              <div className="h-0.5 w-8 bg-primary mx-auto mt-2 rounded-full group-hover:w-16 transition-all duration-300"></div>
            </div>
            {/* Total Shots */}
            <div className="text-center group">
              <p className="text-fifa-gold font-label-eyebrow mb-xs uppercase text-[11px] tracking-widest font-black opacity-80">
                {PRE ? 'CONTINENTS' : 'Total Shots'}
              </p>
              <div className="font-fwc text-[54px] text-white leading-none font-black">{stats.totalShots}</div>
              <div className="h-0.5 w-8 bg-primary mx-auto mt-2 rounded-full group-hover:w-16 transition-all duration-300"></div>
            </div>
          </div>
        </section>

        {/* TABS CONTAINER */}
        <div key={activeSidebarTab} className="tab-fade-enter p-lg max-w-max-width mx-auto">
          {/* TAB 1: OVERVIEW */}
          {activeSidebarTab === 'Overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-xl">
              {/* Left Column (2/3 width) */}
              <div className="lg:col-span-2 space-y-xl">
                <div>
                  <h3 className="font-fwc text-[32px] text-fifa-black uppercase border-l-8 border-primary pl-md">
                    Tournament At A Glance
                  </h3>
                </div>

                {PRE ? (
                  /* Pre Tournament overview card */
                  <div className="bg-[#111] text-white rounded-2xl p-xl border border-white/5 relative overflow-hidden shadow-2xl flex flex-col justify-between" style={{ minHeight: '380px' }}>
                    {/* Background Video */}
                    <div className="absolute inset-0 pointer-events-none z-0">
                      <video
                        src="/stats.webm"
                        autoPlay
                        loop
                        muted
                        playsInline
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                      {/* Dark overlay to ensure contrast and readability */}
                      <div className="absolute inset-0 bg-black/10 bg-gradient-to-t from-black/85 via-black/40 to-black/25"></div>
                    </div>

                    <div className="relative z-10">
                      <h4 className="font-fwc text-[36px] md:text-[48px] uppercase text-white leading-none font-black max-w-xl">
                        THE LARGEST WORLD CUP IN HISTORY
                      </h4>
                      <div className="grid grid-cols-3 gap-md mt-6 pt-6 border-t border-white/15 max-w-md">
                        <div>
                          <p className="font-fwc text-2xl md:text-3xl text-fifa-gold font-black">48</p>
                          <p className="text-[10px] text-gray-400 font-body-bold tracking-wider mt-1 uppercase">Nations</p>
                        </div>
                        <div>
                          <p className="font-fwc text-2xl md:text-3xl text-fifa-gold font-black">104</p>
                          <p className="text-[10px] text-gray-400 font-body-bold tracking-wider mt-1 uppercase">Matches</p>
                        </div>
                        <div>
                          <p className="font-fwc text-2xl md:text-3xl text-fifa-gold font-black">16</p>
                          <p className="text-[10px] text-gray-400 font-body-bold tracking-wider mt-1 uppercase">Cities</p>
                        </div>
                      </div>
                    </div>

                    <div className="relative z-10 mt-8 pt-6 border-t border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-lg">
                      <div className="flex-1">
                        <CountdownTimer />
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Live tournament matches overview */
                  <div className="bg-white rounded-xl border border-border-grey p-xl shadow-sm space-y-md">
                    <h4 className="font-fwc text-xl text-fifa-black uppercase">Live Goals Progression</h4>
                    <div className="h-48 bg-soft-grey rounded-lg flex items-end justify-between p-lg relative border border-border-grey">
                      <div className="absolute top-4 left-4 text-xs font-semibold text-mid-grey">Goals Per Match Day Sparkline</div>
                      <div className="w-1/6 bg-primary/20 h-[30%] rounded-t transition-all duration-1000 flex items-center justify-center text-xs font-bold text-primary">MD 1</div>
                      <div className="w-1/6 bg-primary/30 h-[55%] rounded-t transition-all duration-1000 flex items-center justify-center text-xs font-bold text-primary">MD 2</div>
                      <div className="w-1/6 bg-primary/45 h-[80%] rounded-t transition-all duration-1000 flex items-center justify-center text-xs font-bold text-primary">MD 3</div>
                      <div className="w-1/6 bg-primary h-[95%] rounded-t transition-all duration-1000 flex items-center justify-center text-xs font-bold text-white">MD 4</div>
                    </div>
                    <div className="pt-6 grid grid-cols-2 gap-md">
                      <div className="border border-border-grey rounded-lg p-lg text-center bg-soft-grey/30 hover:bg-soft-grey/50 cursor-pointer transition-colors" onClick={() => setActiveSidebarTab('Player Stats')}>
                        <span className="material-symbols-outlined text-primary text-3xl">person</span>
                        <h5 className="font-body-bold text-sm mt-1 uppercase text-fifa-black">Go to Player Stats</h5>
                      </div>
                      <div className="border border-border-grey rounded-lg p-lg text-center bg-soft-grey/30 hover:bg-soft-grey/50 cursor-pointer transition-colors" onClick={() => setActiveSidebarTab('Team Stats')}>
                        <span className="material-symbols-outlined text-primary text-3xl">groups</span>
                        <h5 className="font-body-bold text-sm mt-1 uppercase text-fifa-black">Go to Team Stats</h5>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Right Column (1/3 width) */}
              <div className="space-y-xl">
                {/* Next Match / Live Now */}
                <div className="bg-white rounded-xl border border-border-grey p-lg shadow-sm">
                  <div className="border-b border-border-grey pb-md mb-md flex justify-between items-center">
                    <span className="font-fwc text-[12px] text-mid-grey tracking-wider uppercase">Opening Match</span>
                    <span className="bg-primary/10 text-primary font-body-bold text-[10px] px-2 py-0.5 rounded-full uppercase">Estadio Azteca</span>
                  </div>
                  <div className="flex justify-between items-center py-sm">
                    <div className="flex items-center gap-2">
                      <img src="https://cdn.jsdelivr.net/gh/lipis/flag-icons/flags/4x3/mx.svg" className="w-8 h-5.5 object-cover rounded border border-gray-150" alt="MEX" />
                      <span className="font-body-bold text-fifa-black text-[15px]">MEX</span>
                    </div>
                    <span className="text-[12px] font-body-bold text-mid-grey">VS</span>
                    <div className="flex items-center gap-2">
                      <span className="font-body-bold text-fifa-black text-[15px]">RSA</span>
                      <img src="https://cdn.jsdelivr.net/gh/lipis/flag-icons/flags/4x3/za.svg" className="w-8 h-5.5 object-cover rounded border border-gray-150" alt="RSA" />
                    </div>
                  </div>
                  <div className="text-center text-[11px] text-mid-grey font-body-base mt-4 pt-4 border-t border-border-grey">
                    June 11, 2026 • 19:00 LOCAL
                  </div>
                </div>

                {/* Group Stage Progress */}
                <div className="bg-white rounded-xl border border-border-grey p-lg shadow-sm space-y-md">
                  <h4 className="font-fwc text-sm text-fifa-black uppercase">Group Stage Progress</h4>
                  <div>
                    <div className="flex justify-between text-xs text-mid-grey mb-1">
                      <span>{PRE ? '0' : '4'} of 72 matches played</span>
                      <span className="font-semibold text-fifa-black">{PRE ? '0%' : '5%'}</span>
                    </div>
                    <div className="w-full bg-soft-grey h-2.5 rounded-full overflow-hidden">
                      <div className="bg-primary h-full rounded-full transition-all duration-1000" style={{ width: PRE ? '0%' : '5%' }}></div>
                    </div>
                  </div>
                </div>

                {/* Quick Standings */}
                <div className="bg-white rounded-xl border border-border-grey p-lg shadow-sm space-y-sm">
                  <h4 className="font-fwc text-sm text-fifa-black uppercase border-b border-border-grey pb-md">Fair Play Leaders</h4>
                  <div className="space-y-sm pt-xs">
                    {fairPlayRanking.slice(0, 4).map((team, idx) => (
                      <div key={team.code} className="flex justify-between items-center text-sm">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-mid-grey">#{idx + 1}</span>
                          <img src={`https://cdn.jsdelivr.net/gh/lipis/flag-icons/flags/4x3/${team.iso2}.svg`} className="w-6 h-4 object-cover rounded border border-gray-150" alt={team.name} />
                          <span className="font-body text-fifa-black">{team.name}</span>
                        </div>
                        <span className="font-body-bold text-mid-grey">{team.points} pts</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PLAYER STATS */}
          {activeSidebarTab === 'Player Stats' && (
            <div className="space-y-xl">
              <div>
                <h3 className="font-fwc text-[32px] text-fifa-black uppercase border-l-8 border-primary pl-md">
                  Player Stats
                </h3>
              </div>

              {PRE ? (
                /* Pre Tournament spotlight players grid */
                <div className="text-center space-y-lg border border-border-grey rounded-2xl p-xl shadow-sm relative overflow-hidden bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/we-are-26.png')" }}>
                  {/* Overlay for better contrast */}
                  <div className="absolute inset-0 bg-black/65 pointer-events-none z-0"></div>

                  <div className="relative z-10 flex flex-col items-center justify-center py-xl max-w-lg mx-auto">
                    <h4 className="font-fwc text-[20px] md:text-[24px] uppercase text-white leading-none font-black">
                      PLAYER STATS AVAILABLE FROM JUNE 11
                    </h4>
                    <p className="text-gray-300 font-body-base text-sm mt-2">
                      Check back when the tournament kicks off to see live stats, leaderboards, and progress.
                    </p>
                  </div>

                  <div className="relative z-10 pt-6 border-t border-white/10">
                    <h5 className="font-fwc text-[16px] text-white uppercase text-left mb-lg tracking-wide">
                      Player Spotlight &amp; Stars
                    </h5>
                    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-md justify-items-center">
                      {SPOTLIGHT_PLAYERS.map((player) => (
                        <div
                          key={player.name}
                          className="spotlight-card w-[130px] sm:w-[150px] lg:w-[130px] aspect-[1/1.3] bg-white rounded-xl border border-gray-200 overflow-hidden relative flex flex-col group transition-all duration-300 hover:-translate-y-1 hover:scale-[1.04] hover:shadow-lg cursor-pointer"
                        >
                          {/* Upper Card section */}
                          <div className="h-[55%] relative flex items-center justify-center overflow-hidden" style={{ backgroundColor: player.color }}>
                            {/* Watermark number */}
                            <div className="absolute inset-0 flex items-center justify-center font-fwc text-[44px] text-white/15 select-none pointer-events-none z-0">
                              {player.number}
                            </div>
                            <img
                              src={`https://cdn.jsdelivr.net/gh/lipis/flag-icons/flags/4x3/${player.flag}.svg`}
                              className="w-10 h-6.5 rounded border border-white/20 shadow-md relative z-10"
                              alt={player.team}
                            />
                            {/* Shimmer sweep effect */}
                            <div className="shimmer-sweep"></div>
                          </div>

                          {/* Bottom strip */}
                          <div className="h-[45%] bg-[#111] px-2 py-3 flex flex-col justify-center text-left">
                            <span className="font-fwc text-[14px] text-white truncate font-black leading-none">{player.name}</span>
                            <span className="text-gray-400 text-[10px] font-sans font-bold mt-1 uppercase">{player.team}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                /* Live Tournament active scorers list */
                <div className="bg-white rounded-xl border border-border-grey shadow-sm overflow-hidden p-lg">
                  {/* Category switcher */}
                  <div className="flex gap-lg border-b border-border-grey pb-md mb-xl overflow-x-auto">
                    {['Goals', 'Assists', 'Shots', 'Minutes'].map((category) => (
                      <button
                        key={category}
                        onClick={() => setActivePlayerTab(category)}
                        className={`pb-sm font-fwc text-[15px] uppercase tracking-wider relative transition-all ${activePlayerTab === category ? 'text-primary font-black' : 'text-mid-grey hover:text-fifa-black'
                          }`}
                      >
                        {category}
                        {activePlayerTab === category && (
                          <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary rounded-full"></div>
                        )}
                      </button>
                    ))}
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead className="bg-soft-grey border-b border-border-grey">
                        <tr>
                          <th className="p-md font-label-eyebrow uppercase text-mid-grey text-[11px] tracking-wider">Rank</th>
                          <th className="p-md font-label-eyebrow uppercase text-mid-grey text-[11px] tracking-wider">Player</th>
                          <th className="p-md font-label-eyebrow uppercase text-mid-grey text-[11px] tracking-wider">Team</th>
                          <th className="p-md font-label-eyebrow uppercase text-mid-grey text-[11px] tracking-wider">Goals</th>
                          <th className="p-md font-label-eyebrow uppercase text-mid-grey text-[11px] tracking-wider">Assists</th>
                          <th className="p-md font-label-eyebrow uppercase text-mid-grey text-[11px] tracking-wider">Shots</th>
                          <th className="p-md font-label-eyebrow uppercase text-mid-grey text-[11px] tracking-wider">Mins</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border-grey">
                        {topScorers.map((player, idx) => (
                          <tr key={player.name} className="hover:bg-primary/5 transition-colors group cursor-pointer">
                            <td className="p-md font-body-bold text-[14px]">#{idx + 1}</td>
                            <td className="p-md flex items-center space-x-md">
                              <img src={`https://cdn.jsdelivr.net/gh/lipis/flag-icons/flags/4x3/${player.flag}.svg`} className="w-7 h-5 object-cover rounded border border-gray-150" alt={player.team} />
                              <span className="font-body-bold group-hover:text-primary transition-colors text-[14px]">
                                {player.name}
                              </span>
                            </td>
                            <td className="p-md text-mid-grey text-[14px]">{player.team}</td>
                            <td className="p-md">
                              <div className="flex items-center gap-md">
                                <span className={`font-fwc text-[18px] w-6 ${activePlayerTab === 'Goals' ? 'font-black text-primary' : ''}`}>{player.goals}</span>
                                {activePlayerTab === 'Goals' && (
                                  <div className="w-24 bg-soft-grey h-2.5 rounded-full overflow-hidden">
                                    <div
                                      className="h-full rounded-full transition-all duration-1000"
                                      style={{
                                        width: animateBars ? `${(player.goals / 5) * 100}%` : '0%',
                                        backgroundColor: player.color
                                      }}
                                    ></div>
                                  </div>
                                )}
                              </div>
                            </td>
                            <td className={`p-md font-body-base text-[14px] ${activePlayerTab === 'Assists' ? 'font-black text-primary' : ''}`}>{player.assists}</td>
                            <td className={`p-md font-body-base text-[14px] ${activePlayerTab === 'Shots' ? 'font-black text-primary' : ''}`}>{player.shots}</td>
                            <td className={`p-md font-body-base text-[14px] ${activePlayerTab === 'Minutes' ? 'font-black text-primary' : ''}`}>{player.mins}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: TEAM STATS */}
          {activeSidebarTab === 'Team Stats' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-xl">
              {/* Left Column (2/3 width) - Goals chart */}
              <div className="lg:col-span-2 bg-white rounded-xl border border-border-grey p-xl shadow-sm space-y-lg">
                <div className="border-b border-border-grey pb-md">
                  <h3 className="font-fwc text-[32px] text-fifa-black uppercase border-l-8 border-primary pl-md">
                    Goals By Team
                  </h3>
                </div>

                <div className="space-y-lg max-h-[500px] overflow-y-auto pr-sm no-scrollbar">
                  {sortedTeamGoals.map((team) => (
                    <div key={team.code} className="flex items-center gap-md">
                      <div className="w-36 flex items-center gap-2 flex-shrink-0">
                        <img src={`https://cdn.jsdelivr.net/gh/lipis/flag-icons/flags/4x3/${team.iso2}.svg`} className="w-7 h-5 object-cover rounded border border-gray-150" alt={team.name} />
                        <span className="font-body-bold text-[13px] text-fifa-black truncate">{team.name}</span>
                      </div>
                      <div className="flex-1 bg-soft-grey h-4.5 rounded-full overflow-hidden relative">
                        <div
                          className="h-full rounded-full transition-all duration-1000"
                          style={{
                            width: PRE ? '2%' : animateBars ? `${(team.goals / 8) * 100}%` : '0%',
                            backgroundColor: team.color
                          }}
                        ></div>
                        {PRE && (
                          <span className="absolute inset-y-0 left-4 flex items-center text-[9px] font-bold text-mid-grey tracking-wider uppercase select-none">
                            Awaiting kickoff
                          </span>
                        )}
                      </div>
                      <span className="w-8 text-right font-fwc text-[15px] font-black text-fifa-black">
                        {team.goals}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column (1/3 width) - Possession Comparison */}
              <div className="bg-white rounded-xl border border-border-grey p-xl shadow-sm space-y-lg">
                <div className="border-b border-border-grey pb-md">
                  <h3 className="font-fwc text-[24px] text-fifa-black uppercase">
                    Comparison
                  </h3>
                </div>

                <div className="space-y-xl pt-md">
                  {mockPossession.map((comp) => {
                    const total = comp.val1 + comp.val2;
                    const percent1 = (comp.val1 / total) * 100;
                    const color1 = TEAM_DATA[comp.team1]?.color || '#E8192C';
                    const color2 = TEAM_DATA[comp.team2]?.color || '#0052A5';

                    return (
                      <div key={comp.label} className="space-y-sm">
                        <div className="text-center font-fwc text-[12px] tracking-wider text-mid-grey uppercase">{comp.label}</div>
                        <div className="flex justify-between items-center text-xs">
                          <div className="flex items-center gap-1.5 font-body-bold text-fifa-black">
                            <img src={`https://cdn.jsdelivr.net/gh/lipis/flag-icons/flags/4x3/${TEAM_DATA[comp.team1]?.iso2}.svg`} className="w-5.5 h-4 object-cover rounded border border-gray-150" alt={comp.team1} />
                            <span>{comp.val1}</span>
                          </div>
                          <div className="flex items-center gap-1.5 font-body-bold text-fifa-black">
                            <span>{comp.val2}</span>
                            <img src={`https://cdn.jsdelivr.net/gh/lipis/flag-icons/flags/4x3/${TEAM_DATA[comp.team2]?.iso2}.svg`} className="w-5.5 h-4 object-cover rounded border border-gray-150" alt={comp.team2} />
                          </div>
                        </div>
                        {/* Split Bar */}
                        <div className="w-full h-3 bg-soft-grey rounded-full overflow-hidden flex">
                          <div
                            className="h-full transition-all duration-1000"
                            style={{
                              width: animateBars ? `${percent1}%` : '0%',
                              backgroundColor: color1
                            }}
                          ></div>
                          <div
                            className="h-full flex-1 transition-all duration-1000"
                            style={{
                              backgroundColor: color2
                            }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: RECORDS */}
          {activeSidebarTab === 'Records' && (
            <div className="space-y-xl">
              <div>
                <h3 className="font-fwc text-[32px] text-fifa-black uppercase border-l-8 border-primary pl-md">
                  Tournament Records
                </h3>
              </div>

              {/* 2x2 Grid of CSS 3D Flip cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-lg">
                {flipCardsData.map((rec, idx) => (
                  <div key={idx} className="flip-card h-64 cursor-pointer select-none">
                    <div className="flip-card-inner h-full w-full relative">
                      {/* Front Side */}
                      <div className="flip-card-front bg-white p-xl rounded-xl border border-border-grey flex flex-col items-center justify-center text-center shadow-sm">
                        <div className="font-fwc text-[84px] text-fifa-gold leading-none font-black">{rec.value}</div>
                        <p className="font-body-bold uppercase text-[13px] tracking-wider text-fifa-black mt-2">{rec.title}</p>
                        <div className="flex items-center gap-1.5 mt-md">
                          <img src={`https://cdn.jsdelivr.net/gh/lipis/flag-icons/flags/4x3/${rec.flag}.svg`} className="w-5.5 h-4 object-cover rounded border border-gray-150" alt={rec.sub} />
                          <p className="text-mid-grey font-body text-[14px] font-semibold">{rec.sub}</p>
                        </div>
                      </div>

                      {/* Back Side */}
                      <div
                        className="flip-card-back p-xl rounded-xl text-white flex flex-col items-center justify-center text-center shadow-md"
                        style={{ backgroundColor: rec.bg }}
                      >
                        <h4 className="font-fwc text-xl mb-md tracking-wider">{rec.backTitle}</h4>
                        <p className="font-body-base text-[13px] leading-relaxed opacity-95">{rec.backDesc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* WC Winners Timeline */}
              <div className="bg-white rounded-xl border border-border-grey p-xl shadow-sm space-y-lg">
                <h4 className="font-fwc text-[28px] text-fifa-black uppercase border-b border-border-grey pb-md">
                  World Cup Winners
                </h4>

                <div className="flex items-center gap-md overflow-x-auto py-lg pr-lg no-scrollbar">
                  {WINNERS_TIMELINE.map((item, idx) => (
                    <div key={idx} className="flex items-center flex-shrink-0">
                      {/* Entry box */}
                      <div className={`p-lg rounded-xl border flex flex-col items-center justify-center text-center shadow-sm ${item.isTbd
                        ? 'bg-gradient-to-br from-[#1a1200] to-[#2d2000] border-fifa-gold animate-pulse text-white min-w-[130px] ring-2 ring-fifa-gold/45'
                        : 'bg-soft-grey/30 border-border-grey min-w-[140px]'
                        }`}>
                        <span className={`font-fwc text-[16px] px-3 py-1 rounded-full text-white font-bold leading-none ${item.isTbd ? 'bg-fifa-gold text-black' : 'bg-primary'
                          }`}>{item.year}</span>
                        <div className="flex items-center gap-1.5 mt-md">
                          {!item.isTbd && <img src={`https://cdn.jsdelivr.net/gh/lipis/flag-icons/flags/4x3/${item.flag}.svg`} className="w-5.5 h-4 object-cover rounded border border-gray-150" alt={item.country} />}
                          <span className="font-body-bold text-[14px]">{item.country}</span>
                        </div>
                        <span className={`text-[11px] font-semibold mt-1 ${item.isTbd ? 'text-fifa-gold' : 'text-mid-grey'}`}>{item.score}</span>
                      </div>

                      {/* Arrow Connector */}
                      {idx < WINNERS_TIMELINE.length - 1 && (
                        <span className="material-symbols-outlined text-mid-grey mx-sm select-none">arrow_forward</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: DISCIPLINARY */}
          {activeSidebarTab === 'Disciplinary' && (
            <div className="space-y-xl">
              <div className="flex justify-between items-center border-b border-border-grey pb-md">
                <h3 className="font-fwc text-[32px] text-fifa-black uppercase border-l-8 border-warning-orange pl-md">
                  Discipline &amp; Fair Play
                </h3>
                <div className="flex gap-2">
                  <div className="w-4.5 h-6.5 bg-[#FFD700] border border-[#DAA520] rounded-sm shadow-sm"></div>
                  <div className="w-4.5 h-6.5 bg-[#E8192C] border border-[#C0392B] rounded-sm shadow-sm"></div>
                </div>
              </div>

              {/* Cards Summary Table */}
              <div className="bg-white rounded-xl border border-border-grey shadow-sm overflow-hidden p-lg space-y-md">
                <h4 className="font-fwc text-lg text-fifa-black uppercase">Cards Summary Table</h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="bg-soft-grey border-b border-border-grey">
                      <tr>
                        <th className="p-md font-label-eyebrow uppercase text-mid-grey text-[11px] tracking-wider cursor-pointer hover:text-fifa-black" onClick={() => requestDisSort('name')}>Team</th>
                        <th className="p-md font-label-eyebrow uppercase text-mid-grey text-[11px] tracking-wider cursor-pointer hover:text-fifa-black" onClick={() => requestDisSort('yellows')}>Yellow Cards</th>
                        <th className="p-md font-label-eyebrow uppercase text-mid-grey text-[11px] tracking-wider cursor-pointer hover:text-fifa-black" onClick={() => requestDisSort('reds')}>Red Cards</th>
                        <th className="p-md font-label-eyebrow uppercase text-mid-grey text-[11px] tracking-wider cursor-pointer hover:text-fifa-black" onClick={() => requestDisSort('points')}>Total Points</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border-grey">
                      {sortedDisciplinary.map((row) => (
                        <tr key={row.code} className="hover:bg-warning-orange/5 transition-colors group">
                          <td className="p-md font-body-bold text-[14px] flex items-center gap-2">
                            <img src={`https://cdn.jsdelivr.net/gh/lipis/flag-icons/flags/4x3/${row.iso2}.svg`} className="w-7 h-5 object-cover rounded border border-gray-150" alt={row.name} />
                            <span>{row.name}</span>
                          </td>
                          <td className="p-md">
                            <div className="flex items-center gap-2">
                              <div className="w-3.5 h-5 bg-[#FFD700] border border-[#DAA520] rounded-sm shadow-sm"></div>
                              <span className="font-body-bold">{row.yellows}</span>
                            </div>
                          </td>
                          <td className="p-md">
                            <div className="flex items-center gap-2">
                              <div className="w-3.5 h-5 bg-[#E8192C] border border-[#C0392B] rounded-sm shadow-sm"></div>
                              <span className="font-body-bold">{row.reds}</span>
                            </div>
                          </td>
                          <td className="p-md font-body-bold text-[14px] text-fifa-black">{row.points}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Fair Play Standings */}
              <div className="bg-white rounded-xl border border-border-grey shadow-sm overflow-hidden p-lg space-y-md">
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-md border-b border-border-grey pb-md">
                  <h4 className="font-fwc text-lg text-fifa-black uppercase">Fair Play Ranking</h4>
                  <div className="bg-soft-grey text-mid-grey font-body-bold text-[10px] uppercase tracking-wider px-4 py-1.5 rounded-full">
                    Yellow = 1pt · Red = 3pts
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-lg pt-md">
                  {/* Green left border (Fair Play leaders) */}
                  <div className="space-y-sm">
                    <h5 className="font-body-bold text-success-green text-sm uppercase tracking-wide">Fair Play Leaders (Cleanest)</h5>
                    <div className="space-y-xs">
                      {fairPlayRanking.slice(0, 5).map((team, idx) => (
                        <div key={team.code} className="flex justify-between items-center p-md bg-white border border-border-grey rounded-lg border-l-4 border-l-success-green shadow-xs">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-mid-grey">#{idx + 1}</span>
                            <img src={`https://cdn.jsdelivr.net/gh/lipis/flag-icons/flags/4x3/${team.iso2}.svg`} className="w-6 h-4 object-cover rounded border border-gray-150" alt={team.name} />
                            <span className="font-body-bold text-[13px] text-fifa-black">{team.name}</span>
                          </div>
                          <span className="font-body-bold text-success-green text-[13px]">{team.points} pts</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Red left border (Most carded) */}
                  <div className="space-y-sm">
                    <h5 className="font-body-bold text-primary text-sm uppercase tracking-wide">Most Carded Teams</h5>
                    <div className="space-y-xs">
                      {fairPlayRanking.slice(-5).reverse().map((team, idx) => (
                        <div key={team.code} className="flex justify-between items-center p-md bg-white border border-border-grey rounded-lg border-l-4 border-l-primary shadow-xs">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-mid-grey">#{idx + 1}</span>
                            <img src={`https://cdn.jsdelivr.net/gh/lipis/flag-icons/flags/4x3/${team.iso2}.svg`} className="w-6 h-4 object-cover rounded border border-gray-150" alt={team.name} />
                            <span className="font-body-bold text-[13px] text-fifa-black">{team.name}</span>
                          </div>
                          <span className="font-body-bold text-primary text-[13px]">{team.points} pts</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
