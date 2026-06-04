import React, { useState, useEffect } from 'react';

// R32 Bracket match structure (all 16 slots)
const R32_MATCHES = [
  // Top Half
  { team1: 'USA', flag1: 'us', team2: 'ARG', flag2: 'ar', isWinner1: true, isLoser2: true, isSample: true },
  { team1: '1E', team2: '1G', isTbd: true },
  { team1: '1B', team2: '1D', isTbd: true },
  { team1: '1F', team2: '1H', isTbd: true },
  { team1: 'FRA', flag1: 'fr', team2: 'BRA', flag2: 'br', isWinner1: true, isLoser2: true, isSample: true },
  { team1: '1I', team2: '1J', isTbd: true },
  { team1: '1K', team2: '1L', isTbd: true },
  { team1: '3rd A/B/C/D', team2: '3rd E/F/G/H', isTbd: true },

  // Bottom Half
  { team1: 'MEX', flag1: 'mx', team2: 'MAR', flag2: 'ma', isSample: true },
  { team1: '1C', team2: '1A', isTbd: true },
  { team1: 'ENG', flag1: 'gb-eng', team2: 'GER', flag2: 'de', isSample: true },
  { team1: '1H', team2: '1F', isTbd: true },
  { team1: 'ESP', flag1: 'es', team2: 'NED', flag2: 'nl', isWinner1: true, isLoser2: true, isSample: true },
  { team1: '1K', team2: '1J', isTbd: true },
  { team1: 'POR', flag1: 'pt', team2: 'BEL', flag2: 'be', isWinner1: true, isLoser2: true, isSample: true },
  { team1: '3rd I/J/K/L', team2: '3rd Rem.', isTbd: true }
];

const R16_MATCHES = [
  { team1: 'USA', flag1: 'us', team2: 'Winner M2', isWinner1: true, isTbd2: true, isSample: true },
  { team1: 'Winner M3', team2: 'Winner M4', isTbd: true },
  { team1: 'FRA', flag1: 'fr', team2: 'Winner M6', isWinner1: true, isTbd2: true, isSample: true },
  { team1: 'Winner M7', team2: 'Winner M8', isTbd: true },
  { team1: 'Winner M9', team2: 'Winner M10', isTbd: true },
  { team1: 'Winner M11', team2: 'Winner M12', isTbd: true },
  { team1: 'ESP', flag1: 'es', team2: 'Winner M14', isWinner1: true, isTbd2: true, isSample: true },
  { team1: 'POR', flag1: 'pt', team2: 'Winner M16', isWinner1: true, isTbd2: true, isSample: true }
];

const QF_MATCHES = [
  { team1: 'USA', flag1: 'us', team2: 'Winner M18', isWinner1: true, isTbd2: true, isSample: true },
  { team1: 'FRA', flag1: 'fr', team2: 'Winner M20', isWinner1: true, isTbd2: true, isSample: true },
  { team1: 'Winner M21', team2: 'Winner M22', isTbd: true },
  { team1: 'ESP', flag1: 'es', team2: 'POR', flag2: 'pt', isTbd: false, isSample: true }
];

const SF_MATCHES = [
  { team1: 'USA', flag1: 'us', team2: 'FRA', flag2: 'fr', isSample: true },
  { team1: 'Winner M27', team2: 'Winner M28', isTbd: true }
];

const FINAL_MATCH = [
  { team1: 'Winner M29', team2: 'Winner M30', isTbd: true }
];

const HOST_CITIES = [
  { city: 'New York/NJ', stadium: 'MetLife Stadium', cap: '82,500', flag: 'us' },
  { city: 'Los Angeles', stadium: 'SoFi Stadium', cap: '70,240', flag: 'us' },
  { city: 'Dallas', stadium: 'AT&T Stadium', cap: '80,000', flag: 'us' },
  { city: 'Miami', stadium: 'Hard Rock Stadium', cap: '65,326', flag: 'us' },
  { city: 'Houston', stadium: 'NRG Stadium', cap: '72,220', flag: 'us' },
  { city: 'Atlanta', stadium: 'Mercedes-Benz Stadium', cap: '71,000', flag: 'us' },
  { city: 'Boston', stadium: 'Gillette Stadium', cap: '65,878', flag: 'us' },
  { city: 'San Francisco', stadium: 'Levi\'s Stadium', cap: '68,500', flag: 'us' },
  { city: 'Los Angeles', stadium: 'Rose Bowl', cap: '92,542', flag: 'us' },
  { city: 'Seattle', stadium: 'Lumen Field', cap: '68,740', flag: 'us' },
  { city: 'Philadelphia', stadium: 'Lincoln Financial Field', cap: '69,796', flag: 'us' },
  { city: 'Kansas City', stadium: 'Arrowhead Stadium', cap: '76,416', flag: 'us' },
  { city: 'Toronto', stadium: 'BMO Field', cap: '45,736', flag: 'ca' },
  { city: 'Vancouver', stadium: 'BC Place', cap: '54,500', flag: 'ca' },
  { city: 'Mexico City', stadium: 'Estadio Azteca', cap: '87,523', flag: 'mx' },
  { city: 'Guadalajara', stadium: 'Estadio Akron', cap: '49,850', flag: 'mx' }
];

const PHASES_DATA = [
  {
    num: 1,
    name: 'GROUP STAGE',
    date: 'Jun 11 – Jun 26 · 72 Matches',
    color: '#E8192C',
    venues: ['Estadio Azteca', 'SoFi Stadium', 'MetLife', 'AT&T', 'Hard Rock', 'NRG', 'Gillette', 'Levi\'s', 'Rose Bowl', 'BMO Field', 'BC Place', 'Lumen Field']
  },
  {
    num: 2,
    name: 'ROUND OF 32',
    date: 'Jun 28 – Jul 3 · 16 Matches',
    color: '#FF6B35',
    venues: ['MetLife', 'Rose Bowl', 'SoFi', 'AT&T', 'Hard Rock', 'NRG', 'Gillette', 'Levi\'s']
  },
  {
    num: 3,
    name: 'ROUND OF 16',
    date: 'Jul 5 – Jul 8 · 8 Matches',
    color: '#FFD700',
    venues: ['MetLife', 'Rose Bowl', 'SoFi', 'AT&T', 'Hard Rock', 'NRG']
  },
  {
    num: 4,
    name: 'QUARTER-FINALS',
    date: 'Jul 10 – Jul 11 · 4 Matches',
    color: '#9C27B0',
    venues: ['MetLife', 'Rose Bowl', 'SoFi', 'AT&T']
  },
  {
    num: 5,
    name: 'SEMI-FINALS',
    date: 'Jul 14 – Jul 15 · 2 Matches',
    color: '#0052A5',
    venues: ['MetLife Stadium, NJ', 'Rose Bowl, CA']
  },
  {
    num: 6,
    name: 'THE FINAL 🏆',
    date: 'Jul 19, 2026 · 1 Match · 18:00 ET',
    color: '#FFD700',
    venues: ['MetLife Stadium', 'East Rutherford, NJ'],
    isFinal: true
  }
];

// Dimensional spacing constants
const BASE = 148;
function getMatchTop(round, index) {
  const multiplier = Math.pow(2, round);
  const offset = (multiplier - 1) * BASE / 2;
  return index * BASE * multiplier + offset;
}

const MatchSlot = ({ teamCode, teamName, flag, isWinner, isLoser, isTbd, isSample }) => {
  if (isTbd) {
    return (
      <div className="w-[160px] h-[48px] bg-[#F8F8F8] border border-dashed border-[#D0D0D0] rounded-lg flex items-center justify-center text-[#9E9E9E] font-body text-[12px] italic select-none">
        {teamName || 'TBD'}
      </div>
    );
  }

  const borderClass = isWinner
    ? (isSample ? 'border-l-[3px] border-l-fifa-gold' : 'border-l-[3px] border-l-primary')
    : 'border-l-[3px] border-l-transparent';

  const bgClass = isWinner
    ? (isSample ? 'bg-[#FFFDF5]' : 'bg-[#FFF5F5]')
    : (isLoser ? 'bg-[#F5F5F5] opacity-45' : 'bg-white');

  const textWeightClass = isWinner ? 'font-black' : 'font-bold';

  return (
    <div className={`w-[160px] h-[48px] border border-[#E0E0E0] rounded-lg flex items-center px-3 gap-2 shadow-xs transition-all ${borderClass} ${bgClass} match-slot`}>
      <img
        src={`https://cdn.jsdelivr.net/gh/lipis/flag-icons/flags/4x3/${flag}.svg`}
        className="w-[28px] h-[18px] object-cover rounded border border-gray-150"
        alt={teamName}
      />
      <span className={`text-[13px] text-fifa-black truncate ${textWeightClass}`}>
        {teamCode}
      </span>
    </div>
  );
};

const MatchPair = ({ round, index, match }) => {
  const top = getMatchTop(round, index);
  const left = round * 240;

  return (
    <div
      className={`absolute flex flex-col gap-[4px] match-pair bracket-round-${round}`}
      style={{
        left: `${left}px`,
        top: `${top}px`,
        width: '160px',
        height: '100px',
        '--slot-index': index
      }}
    >
      <MatchSlot
        teamCode={match.team1}
        teamName={match.team1}
        flag={match.flag1}
        isWinner={match.isWinner1}
        isLoser={match.isLoser1}
        isTbd={match.isTbd || match.isTbd1}
        isSample={match.isSample}
      />
      <MatchSlot
        teamCode={match.team2}
        teamName={match.team2}
        flag={match.flag2}
        isWinner={match.isWinner2}
        isLoser={match.isLoser2}
        isTbd={match.isTbd || match.isTbd2}
        isSample={match.isSample}
      />
    </div>
  );
};

function BracketConnector({ round, index, topMatchTop, bottomMatchTop, isResolved }) {
  const MATCH_HEIGHT = 100;
  const y1 = topMatchTop + MATCH_HEIGHT / 2;
  const y2 = bottomMatchTop + MATCH_HEIGHT / 2;
  const yMin = Math.min(y1, y2);
  const yMax = Math.max(y1, y2);
  const height = yMax - yMin;

  const midX = 40; // Midpoint in the 80px gap
  const strokeColor = isResolved ? '#E8192C' : '#D0D0D0';
  const strokeDash = isResolved ? 'none' : '6,4';

  const pathY1 = y1 - yMin;
  const pathY2 = y2 - yMin;
  const pathYMid = (pathY1 + pathY2) / 2;

  return (
    <svg
      style={{
        position: 'absolute',
        left: round * 240 + 160,
        top: yMin,
        width: 80,
        height: height === 0 ? 2 : height,
        overflow: 'visible',
        pointerEvents: 'none',
        zIndex: 5
      }}
    >
      <path
        d={`M 0 ${pathY1} H ${midX} V ${pathY2} H 0 M ${midX} ${pathYMid} H 80`}
        fill="none"
        stroke={strokeColor}
        strokeWidth="2"
        strokeDasharray={strokeDash}
      />
    </svg>
  );
}

const CityCard = ({ city, stadium, cap, flag, idx }) => {
  const [active, setActive] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setActive(true), idx * 60);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`bg-white border border-[#E0E0E0] rounded-2xl p-lg flex flex-col justify-between shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-md ${
      active ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
    }`}>
      <div className="flex items-center justify-between mb-sm">
        <h4 className="font-fwc text-[20px] text-fifa-black uppercase leading-tight">{city}</h4>
        <img
          src={`https://cdn.jsdelivr.net/gh/lipis/flag-icons/flags/4x3/${flag}.svg`}
          className="w-10 h-6.5 rounded border border-gray-150 shadow-xs"
          alt={flag}
        />
      </div>
      <div>
        <p className="text-mid-grey font-sans text-sm font-semibold mb-3">{stadium}</p>
        <span className="inline-block bg-[#E3F2FD] text-[#0D47A1] font-body-bold text-[10px] px-2.5 py-1 rounded-full uppercase tracking-wider">
          CAP: {cap}
        </span>
      </div>
    </div>
  );
};

const PhaseCard = ({ num, name, date, color, venues, isFinal }) => {
  const [active, setActive] = useState(false);
  const [selectedVenue, setSelectedVenue] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => setActive(true), num * 150);
    return () => clearTimeout(timer);
  }, []);

  if (isFinal) {
    return (
      <div className={`w-full bg-[#000000] text-white rounded-2xl shadow-xl border border-white/10 overflow-hidden flex relative transition-all duration-500 hover:shadow-2xl ${
        active ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
      }`} style={{ minHeight: '160px' }}>
        <div className="absolute inset-0 flex items-center justify-center font-fwc text-[90px] md:text-[120px] text-white/5 select-none pointer-events-none z-0">
          WE ARE 26
        </div>
        <div className="absolute top-0 left-0 right-0 h-2 bg-[#FFD700]"></div>
        <div className="flex-1 p-lg pt-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-lg relative z-10">
          <div className="space-y-sm">
            <div className="flex items-center gap-3">
              <span className="font-fwc text-3xl text-fifa-gold font-black">0{num}</span>
              <h4 className="font-fwc text-[28px] md:text-[36px] text-fifa-gold uppercase leading-none font-black">{name}</h4>
            </div>
            <p className="text-gray-300 font-sans text-sm md:text-md font-semibold">{date}</p>
            <span className="inline-block bg-white/15 text-fifa-gold border border-fifa-gold/30 font-body-bold text-[11px] px-3 py-1 rounded-full uppercase tracking-wider">
              1 Match · 18:00 ET
            </span>
          </div>

          <div className="max-w-md flex flex-wrap gap-2">
            {venues.map((venue) => (
              <span key={venue} className="text-[11px] font-sans font-bold px-3 py-1.5 rounded-full border bg-white/10 text-white border-white/20">
                {venue}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`w-full bg-white rounded-2xl shadow-sm border border-border-grey overflow-hidden flex transition-all duration-500 hover:shadow-md ${
      active ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
    }`} style={{ minHeight: '160px' }}>
      <div
        className="w-2.5 transition-all duration-500"
        style={{
          backgroundColor: color,
          transform: active ? 'scaleY(1)' : 'scaleY(0)',
          transformOrigin: 'top'
        }}
      ></div>

      <div className="flex-1 p-lg flex flex-col md:flex-row justify-between items-start md:items-center gap-lg">
        <div className="space-y-sm">
          <div className="flex items-center gap-3">
            <span className="font-fwc text-3xl text-gray-300 font-black">0{num}</span>
            <h4 className="font-fwc text-[28px] md:text-[36px] text-fifa-black uppercase leading-none font-black">{name}</h4>
          </div>
          <p className="text-mid-grey font-sans text-sm md:text-md font-semibold">{date}</p>
          <span className="inline-block bg-soft-grey text-fifa-black font-body-bold text-[11px] px-3 py-1 rounded-full uppercase tracking-wider">
            {num === 1 ? '72 MATCHES' : num === 2 ? '16 MATCHES' : num === 3 ? '8 MATCHES' : num === 4 ? '4 MATCHES' : '2 MATCHES'}
          </span>
        </div>

        <div className="max-w-md flex flex-wrap gap-2">
          {venues.map((venue) => (
            <button
              key={venue}
              onClick={() => setSelectedVenue(selectedVenue === venue ? null : venue)}
              className={`text-[11px] font-sans font-bold px-3 py-1.5 rounded-full border transition-all ${
                selectedVenue === venue
                  ? 'bg-fifa-black text-white border-fifa-black'
                  : 'bg-white text-mid-grey border-border-grey hover:bg-soft-grey/30'
              }`}
            >
              {venue}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default function Bracket() {
  return (
    <div style={{ paddingTop: '64px', minHeight: '100vh', backgroundColor: 'var(--background)' }}>
      <style>{`
        /* Staggered load animation round columns */
        @keyframes bracketSlotIn {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .bracket-round-0 {
          animation: bracketSlotIn 400ms ease-out both;
          animation-delay: calc(var(--slot-index) * 20ms);
        }
        .bracket-round-1 { animation: bracketSlotIn 400ms ease-out both; animation-delay: 200ms; }
        .bracket-round-2 { animation: bracketSlotIn 400ms ease-out both; animation-delay: 400ms; }
        .bracket-round-3 { animation: bracketSlotIn 400ms ease-out both; animation-delay: 600ms; }
        .bracket-round-4 { animation: bracketSlotIn 400ms ease-out both; animation-delay: 800ms; }
        .bracket-round-5 { animation: bracketSlotIn 400ms ease-out both; animation-delay: 1000ms; }

        @keyframes goldPulse {
          0%, 100% { box-shadow: 0 0 16px rgba(255,215,0,0.25); }
          50% { box-shadow: 0 0 36px rgba(255,215,0,0.6); }
        }

        /* Scrollbar styles for horizontal bracket scroll */
        .bracket-scroll-container::-webkit-scrollbar {
          height: 8px;
        }
        .bracket-scroll-container::-webkit-scrollbar-track {
          background: #F5F5F5;
        }
        .bracket-scroll-container::-webkit-scrollbar-thumb {
          background: #E8192C;
          border-radius: 4px;
        }
        .bracket-scroll-container::-webkit-scrollbar-thumb:hover {
          background: #c0001d;
        }

        @media (min-width: 768px) {
          .mobile-scroll-hint {
            display: none;
          }
        }
      `}</style>

      {/* Hero Section */}
      <section className="py-xl px-lg max-w-max-width mx-auto flex justify-between items-center relative z-10">
        <div>
          <h1 className="font-fwc text-[64px] md:text-[80px] leading-none text-primary uppercase tracking-tighter mb-sm">BRACKET</h1>
          <p className="text-subheading-sm mt-sm" style={{ color: 'var(--on-surface-variant)' }}>
            The Road to MetLife Stadium · July 19, 2026
          </p>
        </div>

        {/* Gold Locks pill */}
        <div className="bg-[#FFFDF5] text-fifa-gold font-body-bold text-[11px] tracking-wider uppercase px-4 py-2 border border-fifa-gold/30 rounded-full shadow-sm animate-pulse whitespace-nowrap">
          🔒 Bracket Locks June 26
        </div>
      </section>

      {/* BRACKET PURE CSS TREE - MATHEMATICALLY ALIGNED */}
      <section className="bg-white py-xl mb-2xl border-y border-border-grey shadow-sm overflow-hidden">
        <div className="bracket-scroll-container overflow-x-auto pb-xl" style={{ scrollSnapType: 'x mandatory' }}>
          <div className="flex px-2xl py-lg justify-start items-stretch gap-0 select-none w-max mx-auto" style={{ minWidth: '1440px', position: 'relative', flexDirection: 'column' }}>
            
            {/* PINNED COLUMN HEADERS */}
            <div className="sticky top-[64px] bg-white border-b border-border-grey flex z-20" style={{ height: '48px', alignItems: 'center' }}>
              <div className="w-[240px] text-center font-body-bold text-[11px] text-mid-grey tracking-wider uppercase">ROUND OF 32</div>
              <div className="w-[240px] text-center font-body-bold text-[11px] text-mid-grey tracking-wider uppercase">ROUND OF 16</div>
              <div className="w-[240px] text-center font-body-bold text-[11px] text-mid-grey tracking-wider uppercase">QUARTER-FINALS</div>
              <div className="w-[240px] text-center font-body-bold text-[11px] text-mid-grey tracking-wider uppercase">SEMI-FINALS</div>
              <div className="w-[240px] text-center font-body-bold text-[11px] text-mid-grey tracking-wider uppercase">FINAL</div>
              <div className="w-[240px] text-center font-body-bold text-[11px] text-[#FFD700] tracking-wider uppercase">WORLD CHAMPION 🏆</div>
            </div>

            {/* BRACKET ABSOLUTE CONTAINER */}
            <div className="relative" style={{ height: '2368px', width: '1340px' }}>
              
              {/* ROUND OF 32 (16 matches) */}
              {R32_MATCHES.map((match, i) => (
                <MatchPair key={`r32-${i}`} round={0} index={i} match={match} />
              ))}

              {/* ROUND OF 16 (8 matches) */}
              {R16_MATCHES.map((match, i) => (
                <MatchPair key={`r16-${i}`} round={1} index={i} match={match} />
              ))}

              {/* QUARTER FINALS (4 matches) */}
              {QF_MATCHES.map((match, i) => (
                <MatchPair key={`qf-${i}`} round={2} index={i} match={match} />
              ))}

              {/* SEMI FINALS (2 matches) */}
              {SF_MATCHES.map((match, i) => (
                <MatchPair key={`sf-${i}`} round={3} index={i} match={match} />
              ))}

              {/* FINAL (1 match) */}
              {FINAL_MATCH.map((match, i) => (
                <MatchPair key={`final-${i}`} round={4} index={i} match={match} />
              ))}

              {/* R32 -> R16 Connectors (8) */}
              {Array.from({ length: 8 }).map((_, i) => (
                <BracketConnector
                  key={`c0-${i}`}
                  round={0}
                  index={i}
                  topMatchTop={getMatchTop(0, i * 2)}
                  bottomMatchTop={getMatchTop(0, i * 2 + 1)}
                  isResolved={false}
                />
              ))}

              {/* R16 -> QF Connectors (4) */}
              {Array.from({ length: 4 }).map((_, i) => (
                <BracketConnector
                  key={`c1-${i}`}
                  round={1}
                  index={i}
                  topMatchTop={getMatchTop(1, i * 2)}
                  bottomMatchTop={getMatchTop(1, i * 2 + 1)}
                  isResolved={false}
                />
              ))}

              {/* QF -> SF Connectors (2) */}
              {Array.from({ length: 2 }).map((_, i) => (
                <BracketConnector
                  key={`c2-${i}`}
                  round={2}
                  index={i}
                  topMatchTop={getMatchTop(2, i * 2)}
                  bottomMatchTop={getMatchTop(2, i * 2 + 1)}
                  isResolved={false}
                />
              ))}

              {/* SF -> Final Connector (1) */}
              <BracketConnector
                round={3}
                index={0}
                topMatchTop={getMatchTop(3, 0)}
                bottomMatchTop={getMatchTop(3, 1)}
                isResolved={false}
              />

              {/* Final -> Champion Connector (straight line, width 40px, Y center 1160px) */}
              <svg
                style={{
                  position: 'absolute',
                  left: 4 * 240 + 160, // 1120px
                  top: 1160,
                  width: 40,
                  height: 2,
                  overflow: 'visible',
                  pointerEvents: 'none',
                  zIndex: 5
                }}
              >
                <line
                  x1="0"
                  y1="0"
                  x2="40"
                  y2="0"
                  stroke="#D0D0D0"
                  strokeWidth="2"
                  strokeDasharray="6,4"
                />
              </svg>

              {/* WORLD CHAMPION SLOT */}
              <div
                className="absolute flex flex-col justify-center items-center bracket-round-5 animate-pulse"
                style={{
                  left: '1160px',
                  top: '1100px', // center Y is 1160px, card height is 120px, so top is 1100px
                  width: '180px',
                  height: '120px',
                  '--slot-index': 0
                }}
              >
                <div
                  className="w-[180px] h-[120px] border-2 border-[#FFD700] rounded-2xl flex flex-col items-center justify-center p-3 text-center relative overflow-hidden transition-all duration-300 hover:scale-105"
                  style={{
                    background: 'linear-gradient(135deg, #1a1200 0%, #2d2000 100%)',
                    boxShadow: '0 0 16px rgba(255,215,0,0.25)',
                    animation: 'goldPulse 2s ease-in-out infinite'
                  }}
                >
                  <span className="text-4xl leading-none mb-1 select-none animate-bounce">🏆</span>
                  <h4 className="font-fwc text-[13px] text-fifa-gold uppercase font-black tracking-wide leading-none">World Cup Final</h4>
                  <p className="text-[11px] font-sans font-bold text-white mt-1 leading-none">July 19, 2026</p>
                  <p className="text-[9px] font-sans font-semibold text-gray-400 mt-1 uppercase tracking-wide">MetLife Stadium, NJ</p>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* MOBILE SCROLL HINT */}
        <div className="mobile-scroll-hint text-center font-sans text-[12px] text-mid-grey py-md">
          ← Scroll to see full bracket →
        </div>
      </section>

      {/* HOST CITIES SECTION */}
      <section className="py-2xl max-w-max-width mx-auto px-lg">
        <h2 className="font-fwc text-[40px] uppercase text-fifa-black border-l-8 border-primary pl-md mb-xl">
          16 Host Cities
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-lg">
          {HOST_CITIES.map((city, idx) => (
            <CityCard
              key={city.city}
              city={city.city}
              stadium={city.stadium}
              cap={city.cap}
              flag={city.flag}
              idx={idx}
            />
          ))}
        </div>
      </section>

      {/* TOURNAMENT PHASES TIMELINE */}
      <section className="py-2xl max-w-max-width mx-auto px-lg space-y-xl">
        <h2 className="font-fwc text-[40px] uppercase text-fifa-black border-l-8 border-primary pl-md">
          Tournament Timeline
        </h2>
        <div className="space-y-lg">
          {PHASES_DATA.map((phase) => (
            <PhaseCard
              key={phase.num}
              num={phase.num}
              name={phase.name}
              date={phase.date}
              color={phase.color}
              venues={phase.venues}
              isFinal={phase.isFinal}
            />
          ))}
        </div>
      </section>

      {/* FOOTER INFO STRIP */}
      <section className="w-full bg-fifa-black py-xl mt-3xl">
        <div className="max-w-max-width mx-auto px-lg flex flex-col md:flex-row justify-between items-center gap-xl">
          <div className="flex items-center gap-lg">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white">
              <span className="material-symbols-outlined text-[40px]">stadium</span>
            </div>
            <div>
              <h3 className="text-fifa-gold font-fwc text-[24px] leading-none mb-xs uppercase">WE ARE 26</h3>
              <p className="text-surface-variant font-label-caption uppercase tracking-[0.2em] text-[12px] text-gray-400">
                16 Host Cities · 3 Nations · 1 World Cup
              </p>
            </div>
          </div>
          <div className="flex gap-md">
            <button className="bg-primary hover:brightness-110 active:scale-95 text-white font-body-bold px-xl py-md rounded-lg shadow-lg text-[15px] transition-all">
              TICKETS &amp; HOSPITALITY
            </button>
            <button className="bg-transparent border-2 border-white hover:bg-white hover:text-black text-white font-body-bold px-xl py-md rounded-lg text-[15px] transition-all">
              STADIUM GUIDE
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
