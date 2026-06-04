import React, { useState, useEffect } from 'react';
import FeaturedMatchCard from './FeaturedMatchCard';
import MatchDayDateBar from './MatchDayDateBar';
import { getFlagUrl, getMatchStatus, GROUP_DATES, WC_START } from '../../../utils/matchesData';

const TEAM_DATA = {
  MEX: { color: '#006847', iso2: 'mx', name: 'Mexico' },
  RSA: { color: '#007A4D', iso2: 'za', name: 'S. Africa' },
  KOR: { color: '#CD2E3A', iso2: 'kr', name: 'S. Korea' },
  CZE: { color: '#11457E', iso2: 'cz', name: 'Czechia' },
  CAN: { color: '#FF0000', iso2: 'ca', name: 'Canada' },
  BIH: { color: '#0033A0', iso2: 'ba', name: 'Bosnia' },
  USA: { color: '#002868', iso2: 'us', name: 'USA' },
  PAR: { color: '#D21034', iso2: 'py', name: 'Paraguay' },
  GHA: { color: '#FCD116', iso2: 'gh', name: 'Ghana' },
  ENG: { color: '#002040', iso2: 'gb-eng', name: 'England' },
  BRA: { color: '#009B3A', iso2: 'br', name: 'Brazil' },
  MAR: { color: '#C1272D', iso2: 'ma', name: 'Morocco' },
  CHI: { color: '#D52B1E', iso2: 'cl', name: 'Chile' },
  SEN: { color: '#00853F', iso2: 'sn', name: 'Senegal' },
  FRA: { color: '#003189', iso2: 'fr', name: 'France' },
  ARG: { color: '#74ACDF', iso2: 'ar', name: 'Argentina' },
  AUS: { color: '#00843D', iso2: 'au', name: 'Australia' },
  TUR: { color: '#E30A17', iso2: 'tr', name: 'Türkiye' },
  GER: { color: '#000000', iso2: 'de', name: 'Germany' },
  JAP: { color: '#BC002D', iso2: 'jp', name: 'Japan' },
  ESP: { color: '#AA151B', iso2: 'es', name: 'Spain' },
  POR: { color: '#006600', iso2: 'pt', name: 'Portugal' },
  NED: { color: '#FF6600', iso2: 'nl', name: 'Netherlands' },
  BEL: { color: '#8B0000', iso2: 'be', name: 'Belgium' },
  NOR: { color: '#EF2B2D', iso2: 'no', name: 'Norway' },
  URU: { color: '#5EB6E4', iso2: 'uy', name: 'Uruguay' },
  QAT: { color: '#8D1B3D', iso2: 'qa', name: 'Qatar' },
  SUI: { color: '#FF0000', iso2: 'ch', name: 'Switzerland' },
  SCO: { color: '#003380', iso2: 'gb-sct', name: 'Scotland' },
  HAI: { color: '#00209F', iso2: 'ht', name: 'Haiti' },
  NGR: { color: '#008751', iso2: 'ng', name: 'Nigeria' },
  UKR: { color: '#005BBB', iso2: 'ua', name: 'Ukraine' },
  IRN: { color: '#239F40', iso2: 'ir', name: 'Iran' },
  IRQ: { color: '#007A3D', iso2: 'iq', name: 'Iraq' },
  CPV: { color: '#003893', iso2: 'cv', name: 'Cabo Verde' },
  SAU: { color: '#006C35', iso2: 'sa', name: 'Saudi Arabia' },
  ECU: { color: '#FFCC00', iso2: 'ec', name: 'Ecuador' },
  COL: { color: '#FCD116', iso2: 'co', name: 'Colombia' },
  NZL: { color: '#00247D', iso2: 'nz', name: 'New Zealand' },
  SWE: { color: '#006AA7', iso2: 'se', name: 'Sweden' },
  TUN: { color: '#E70013', iso2: 'tn', name: 'Tunisia' },
  EGY: { color: '#CE1126', iso2: 'eg', name: 'Egypt' },
  CRC: { color: '#002B7F', iso2: 'cr', name: 'Costa Rica' },
  CRO: { color: '#FF0000', iso2: 'hr', name: 'Croatia' },
  PAN: { color: '#DA121A', iso2: 'pa', name: 'Panama' },
  ALG: { color: '#006233', iso2: 'dz', name: 'Algeria' },
  SRB: { color: '#C6363C', iso2: 'rs', name: 'Serbia' },
  HON: { color: '#0073CF', iso2: 'hn', name: 'Honduras' },
  DRC: { color: '#007FFF', iso2: 'cd', name: 'DR Congo' },
  UZB: { color: '#1EB53A', iso2: 'uz', name: 'Uzbekistan' },
  AUT: { color: '#ED2939', iso2: 'at', name: 'Austria' },
  JOR: { color: '#007A3D', iso2: 'jo', name: 'Jordan' },
  CUW: { color: '#002B7F', iso2: 'cw', name: 'Curaçao' },
  CIV: { color: '#F77F00', iso2: 'ci', name: 'Ivory Coast' },
  SSD: { color: '#078930', iso2: 'ss', name: 'S. Sudan' },
  CMR: { color: '#007A5E', iso2: 'cm', name: 'Cameroon' },
  GTM: { color: '#4997D0', iso2: 'gt', name: 'Guatemala' }
};

export default function MatchesList({ matches, onSelectMatch, viewMode }) {
  const [activeDates, setActiveDates] = useState({});

  const featuredMatches = matches.filter((m) => m.isFeatured);
  const standardMatches = matches.filter((m) => !m.isFeatured);

  const now = new Date();
  const isPre = now < WC_START;

  // Stagger animation for flags & cards
  const [animateCards, setAnimateCards] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimateCards(true), 100);
    return () => clearTimeout(timer);
  }, [matches]);

  // Initializing active dates for each group in group stage
  useEffect(() => {
    const initialDates = {};
    const groups = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'];
    groups.forEach((g) => {
      const dates = GROUP_DATES[g].map((d) => new Date(`${d}T12:00:00-05:00`));
      if (isPre) {
        initialDates[`Group ${g}`] = dates[0];
      } else {
        // Find closest
        let closest = dates[0];
        let minDiff = Math.abs(now - dates[0]);
        dates.forEach((d) => {
          const diff = Math.abs(now - d);
          if (diff < minDiff) {
            minDiff = diff;
            closest = d;
          }
        });
        initialDates[`Group ${g}`] = closest;
      }
    });
    setActiveDates(initialDates);
  }, []);

  // Helper to group standard matches by Group
  const groupedGroups = standardMatches.reduce((acc, match) => {
    // Determine group name: group is A-L. If knockout, no group.
    const groupName = match.group ? `Group ${match.group}` : null;
    if (!groupName) {
      // Knockout stages grouped by phase
      const phaseName = match.phase === 'r32' ? 'Round of 32'
        : match.phase === 'r16' ? 'Round of 16'
          : match.phase === 'qf' ? 'Quarter-Finals'
            : match.phase === 'sf' ? 'Semi-Finals'
              : 'Finals';
      if (!acc[phaseName]) acc[phaseName] = [];
      acc[phaseName].push(match);
    } else {
      if (!acc[groupName]) acc[groupName] = [];
      acc[groupName].push(match);
    }
    return acc;
  }, {});

  const handleDateChange = (groupName, newDate) => {
    setActiveDates((prev) => ({
      ...prev,
      [groupName]: newDate
    }));
  };

  return (
    <div className="max-w-[1440px] mx-auto py-12">
      {/* TIER 1: FEATURED HIGHLIGHTS */}
      {featuredMatches.length > 0 && (
        <div className="mb-20">
          <div className="flex items-center gap-4 mb-10">
            <h2 className="font-fwc text-4xl uppercase">Featured Highlights</h2>
            <div className="h-px flex-1 bg-[#E0E0E0]"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredMatches.map((match, idx) => (
              <div
                key={match.id}
                style={{
                  opacity: animateCards ? 1 : 0,
                  transform: animateCards ? 'translateX(0)' : 'translateX(20px)',
                  animation: animateCards ? 'featured-card-enter 0.5s ease-out forwards' : 'none',
                  animationDelay: `${idx * 80}ms`
                }}
              >
                <FeaturedMatchCard
                  match={match}
                  onSelect={onSelectMatch}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TIER 2: STANDARD MATCHES / GROUPS */}
      {Object.keys(groupedGroups).map((groupName) => {
        const isGroupStage = groupName.startsWith('Group');
        const groupLetter = isGroupStage ? groupName.replace('Group ', '') : null;
        const groupDates = isGroupStage ? GROUP_DATES[groupLetter].map((d) => new Date(`${d}T12:00:00-05:00`)) : [];
        const activeDate = activeDates[groupName];

        const matchesInGroup = groupedGroups[groupName];

        return (
          <section key={groupName} className="mb-16">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 border-b border-[#E0E0E0] pb-2">
              <h3 className="font-fwc text-3xl uppercase tracking-tighter flex items-center gap-3">
                <span className="w-1.5 h-8 bg-[#E8192C]"></span> {groupName}
              </h3>
              {isGroupStage && (
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mt-2 md:mt-0">
                  Group Stage Fixtures
                </span>
              )}
            </div>

            {/* Render Date Picker Strip for Group Stage only */}
            {isGroupStage && activeDate && (
              <div className="mb-6">
                <MatchDayDateBar
                  dates={groupDates}
                  activeDate={activeDate}
                  onChange={(d) => handleDateChange(groupName, d)}
                />
              </div>
            )}

            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {matchesInGroup.map((match, idx) => {
                  let isMatchingDate = true;
                  if (isGroupStage && activeDate) {
                    const matchD = new Date(match.date);
                    isMatchingDate = matchD.toDateString() === activeDate.toDateString();
                  }

                  const kickoff = new Date(match.date);
                  const isLive = match.status === 'live';
                  const isFinished = match.status === 'ft';

                  return (
                    <div
                      key={match.id}
                      className={`group relative h-[280px] rounded-[16px] overflow-hidden border border-[#E0E0E0] shadow-sm hover:-translate-y-1 hover:shadow-xl transition-all duration-300 cursor-pointer ${isLive ? 'pulse-red-glow' : ''
                        }`}
                      style={{
                        opacity: isMatchingDate ? 1 : 0.3,
                        transform: isMatchingDate ? 'scale(1)' : 'scale(0.97)',
                        pointerEvents: isMatchingDate ? 'auto' : 'none',
                        transition: 'opacity 200ms ease-out, transform 200ms ease-out',
                        animation: animateCards ? 'flag-fade-in 300ms ease-out forwards' : 'none',
                        animationDelay: `${idx * 40}ms`
                      }}
                      onClick={() => onSelectMatch(match)}
                    >
                      <div className="h-full flex relative shimmer-sweep">
                        {/* Left side color flag */}
                        <div
                          className="w-full diagonal-split flex flex-col items-center justify-center p-4 text-center"
                          style={{ backgroundColor: match.team1.kitColor }}
                        >
                          <div className="flex flex-col items-center group-hover:scale-110 transition-transform duration-500 -translate-x-[70%]">
                            <img
                              src={getFlagUrl(match.team1.iso2, 80)}
                              alt={match.team1.name}
                              width="64"
                              height="43"
                              style={{
                                objectFit: 'cover',
                                borderRadius: '6px',
                                border: '2px solid rgba(255,255,255,0.3)',
                                boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
                                marginBottom: '8px'
                              }}
                            />
                            <span className="font-fwc text-white text-sm uppercase tracking-wider text-center max-w-[120px] truncate" title={match.team1.name}>
                              {match.team1.name}
                            </span>
                          </div>
                        </div>

                        {/* Right side color flag */}
                        <div
                          className="absolute inset-0 diagonal-split-reverse flex flex-col items-center justify-center p-4 text-center"
                          style={{ backgroundColor: match.team2.kitColor }}
                        >
                          <div className="flex flex-col items-center group-hover:scale-110 transition-transform duration-500 translate-x-[70%]">
                            <img
                              src={getFlagUrl(match.team2.iso2, 80)}
                              alt={match.team2.name}
                              width="64"
                              height="43"
                              style={{
                                objectFit: 'cover',
                                borderRadius: '6px',
                                border: '2px solid rgba(255,255,255,0.3)',
                                boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
                                marginBottom: '8px'
                              }}
                            />
                            <span className="font-fwc text-white text-sm uppercase tracking-wider text-center max-w-[120px] truncate" title={match.team2.name}>
                              {match.team2.name}
                            </span>
                          </div>
                        </div>

                        {/* Central Scoreboard Spine */}
                        {(isLive || isFinished) && (
                          <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                            <div className="bg-black text-white px-5 py-3 rounded-xl border border-white/20 shadow-2xl score-pulse">
                              <div className="text-4xl font-fwc tracking-tight">
                                {match.score1} - {match.score2}
                              </div>
                              <div className="flex items-center gap-1.5 justify-center mt-0.5">
                                {isLive ? (
                                  <>
                                    <div className="w-1.5 h-1.5 bg-[#E8192C] rounded-full animate-pulse"></div>
                                    <span className="text-[9px] font-black uppercase text-[#E8192C] tracking-widest">
                                      Live {match.minute}
                                    </span>
                                  </>
                                ) : (
                                  <span className="text-[9px] font-black uppercase text-[#FFD700] tracking-widest">
                                    Full Time
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Card Bottom bar overlay */}
                      <div className="absolute bottom-0 inset-x-0 bg-black/82 backdrop-blur-sm p-4 border-t border-white/10">
                        <div className="flex justify-between items-center text-white">
                          <div>
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                              {match.venue} · {kickoff.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }).toLowerCase()}
                            </p>
                            <p className="text-xs font-bold">{match.city}</p>
                          </div>
                          <span
                            className={`text-white px-2 py-1 text-[9px] font-black rounded-sm uppercase ${isLive
                              ? 'bg-[#E8192C]'
                              : isFinished
                                ? 'bg-emerald-600'
                                : 'bg-[#0052A5]'
                              }`}
                          >
                            {isLive ? 'Live' : isFinished ? 'Final' : 'Upcoming'}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              /* List View Layout */
              <div className="flex flex-col gap-4">
                {matchesInGroup.map((match) => {
                  let isMatchingDate = true;
                  if (isGroupStage && activeDate) {
                    const matchD = new Date(match.date);
                    isMatchingDate = matchD.toDateString() === activeDate.toDateString();
                  }

                  const isLive = match.status === 'live';
                  const isFinished = match.status === 'ft';
                  const kickoff = new Date(match.date);

                  return (
                    <div
                      key={match.id}
                      className="bg-white border border-[#E0E0E0] rounded-xl p-4 flex items-center justify-between shadow-sm hover:shadow-md transition-all cursor-pointer"
                      style={{
                        opacity: isMatchingDate ? 1 : 0.3,
                        transform: isMatchingDate ? 'scale(1)' : 'scale(0.97)',
                        pointerEvents: isMatchingDate ? 'auto' : 'none',
                        transition: 'opacity 200ms ease-out, transform 200ms ease-out'
                      }}
                      onClick={() => onSelectMatch(match)}
                    >
                      <div className="flex items-center gap-6">
                        <div className="flex items-center gap-3 w-36">
                          <img
                            src={getFlagUrl(match.team1.iso2, 80)}
                            alt={match.team1.name}
                            width="40"
                            height="27"
                            style={{
                              objectFit: 'cover',
                              borderRadius: '4px',
                              border: '1px solid rgba(0,0,0,0.1)'
                            }}
                          />
                          <span className="font-fwc text-lg uppercase">{match.team1.code}</span>
                        </div>
                        <span className="text-gray-400 font-bold">vs</span>
                        <div className="flex items-center gap-3 w-36">
                          <img
                            src={getFlagUrl(match.team2.iso2, 80)}
                            alt={match.team2.name}
                            width="40"
                            height="27"
                            style={{
                              objectFit: 'cover',
                              borderRadius: '4px',
                              border: '1px solid rgba(0,0,0,0.1)'
                            }}
                          />
                          <span className="font-fwc text-lg uppercase">{match.team2.code}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-8">
                        <div className="text-right">
                          <div className="text-xs font-bold text-gray-600">{match.venue}</div>
                          <div className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">{match.city}</div>
                        </div>
                        <div
                          className="px-6 py-2 rounded-lg font-fwc text-xl text-center text-white"
                          style={{
                            backgroundColor: isLive ? '#E8192C' : '#000',
                            minWidth: '100px'
                          }}
                        >
                          {isLive || isFinished
                            ? `${match.score1} - ${match.score2}`
                            : kickoff.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        );
      })}

      <style>{`
        @keyframes featured-card-enter {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes flag-fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
