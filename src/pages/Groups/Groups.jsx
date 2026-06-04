import React, { useState, useEffect } from 'react';
import { TEAM_DATA, getFlagUrl, matchesData } from '../../utils/matchesData';

const groupData = [
  { id: 'A', color: '#00BCD4', teams: ['MEX', 'RSA', 'KOR', 'CZE'] },
  { id: 'B', color: '#4CAF50', teams: ['CAN', 'BIH', 'QAT', 'SUI'] },
  { id: 'C', color: '#FF5722', teams: ['BRA', 'MAR', 'HAI', 'SCO'] },
  { id: 'D', color: '#3F51B5', teams: ['USA', 'PAR', 'AUS', 'TUR'] },
  { id: 'E', color: '#FF9800', teams: ['GER', 'CUW', 'CIV', 'ECU'] },
  { id: 'F', color: '#9C27B0', teams: ['NED', 'JAP', 'SWE', 'TUN'] },
  { id: 'G', color: '#F44336', teams: ['BEL', 'EGY', 'IRN', 'NZL'] },
  { id: 'H', color: '#009688', teams: ['ESP', 'CPV', 'SAU', 'URU'] },
  { id: 'I', color: '#E91E63', teams: ['FRA', 'SEN', 'IRQ', 'NOR'] },
  { id: 'J', color: '#FF9800', teams: ['ARG', 'ALG', 'AUT', 'JOR'] },
  { id: 'K', color: '#673AB7', teams: ['POR', 'DRC', 'UZB', 'COL'] },
  { id: 'L', color: '#2196F3', teams: ['ENG', 'CRO', 'GHA', 'PAN'] }
];

function GroupDetailModal({ groupId, onClose }) {
  const group = groupData.find(g => g.id === groupId);
  if (!group) return null;

  // Filter actual group matches from matchesData
  const groupMatches = matchesData.filter(
    (m) => m.phase === 'group' && m.group === groupId
  );

  return (
    <div 
      className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div 
        className="bg-[#111] border border-white/10 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col max-h-[85vh] animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div 
          className="p-6 text-white flex justify-between items-center relative"
          style={{ backgroundColor: group.color }}
        >
          {/* Subtle gradient pattern overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40 pointer-events-none"></div>
          
          <div className="relative z-10">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/70">World Cup 2026</span>
            <h3 className="font-fwc text-3xl uppercase leading-none mt-1">GROUP {group.id} STANDINGS & SCHEDULE</h3>
          </div>
          <button 
            onClick={onClose}
            className="relative z-10 w-8 h-8 rounded-full bg-black/30 flex items-center justify-center hover:bg-black/50 transition-colors"
          >
            <span className="material-symbols-outlined text-white text-lg">close</span>
          </button>
        </div>

        {/* Modal Body (Scrollable) */}
        <div className="overflow-y-auto p-6 space-y-8 style-scrollbar">
          {/* Section 1: Standings */}
          <div>
            <h4 className="font-fwc text-2xl mb-4 text-white flex items-center gap-2">
              <span className="w-1.5 h-6 rounded-full" style={{ backgroundColor: group.color }}></span>
              Standings
            </h4>
            <div className="overflow-x-auto rounded-xl border border-white/5 bg-white/5 p-2">
              <table className="w-full text-left text-sm text-gray-300">
                <thead>
                  <tr className="text-gray-400 font-bold border-b border-white/10">
                    <th className="py-3 px-3">POS</th>
                    <th className="py-3">TEAM</th>
                    <th className="py-3 text-center">P</th>
                    <th className="py-3 text-center">W</th>
                    <th className="py-3 text-center">D</th>
                    <th className="py-3 text-center">L</th>
                    <th className="py-3 text-center">GD</th>
                    <th className="py-3 pr-3 text-right">PTS</th>
                  </tr>
                </thead>
                <tbody>
                  {group.teams.map((code, idx) => {
                    const team = TEAM_DATA[code] || { name: code, iso2: 'us' };
                    return (
                      <tr key={code} className="border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors">
                        <td className="py-3 px-3 font-bold">{idx + 1}</td>
                        <td className="py-3 font-semibold flex items-center gap-2 text-white">
                          <img 
                            src={getFlagUrl(team.iso2, 40)} 
                            alt={team.name}
                            className="w-6 h-4 object-cover rounded-sm border border-white/10"
                          />
                          <span className="font-fwc text-[13px] uppercase tracking-wider min-w-[36px] flex-shrink-0">{code}</span>
                          <span className="text-[13px] font-medium text-gray-300 ml-2">{team.name}</span>
                        </td>
                        <td className="py-3 text-center">0</td>
                        <td className="py-3 text-center">0</td>
                        <td className="py-3 text-center">0</td>
                        <td className="py-3 text-center">0</td>
                        <td className="py-3 text-center">0</td>
                        <td className="py-3 pr-3 text-right font-bold text-[#FFD700]">0</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Section 2: Real Fixtures */}
          <div>
            <h4 className="font-fwc text-2xl mb-4 text-white flex items-center gap-2">
              <span className="w-1.5 h-6 rounded-full" style={{ backgroundColor: group.color }}></span>
              Group Fixtures
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {groupMatches.map((m) => {
                const date = new Date(m.date);
                const formattedDate = date.toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric'
                });
                const formattedTime = date.toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit'
                }).toLowerCase();

                return (
                  <div 
                    key={m.id} 
                    className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col justify-between hover:bg-white/10 transition-colors relative overflow-hidden group"
                  >
                    <div 
                      className="absolute top-0 left-0 bottom-0 w-1" 
                      style={{ backgroundColor: group.color }}
                    ></div>
                    
                    <div className="flex justify-between items-center text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-2 pl-1">
                      <span>MATCH {m.matchNumber}</span>
                      <span>{formattedDate} · {formattedTime}</span>
                    </div>

                    <div className="flex items-center justify-between font-bold text-white py-1 pl-1">
                      <div className="flex items-center gap-2">
                        <img 
                          src={getFlagUrl(m.team1.iso2, 40)} 
                          alt={m.team1.name} 
                          className="w-6 h-4 object-cover rounded-sm border border-white/10"
                        />
                        <span className="font-fwc text-[13px] uppercase tracking-wider">{m.team1.code}</span>
                      </div>
                      
                      <div className="text-[11px] font-fwc text-gray-400 bg-white/10 px-2 py-0.5 rounded">VS</div>

                      <div className="flex items-center gap-2">
                        <span className="font-fwc text-[13px] uppercase tracking-wider">{m.team2.code}</span>
                        <img 
                          src={getFlagUrl(m.team2.iso2, 40)} 
                          alt={m.team2.name} 
                          className="w-6 h-4 object-cover rounded-sm border border-white/10"
                        />
                      </div>
                    </div>

                    <div className="text-[10px] text-gray-500 font-medium pl-1 mt-2 border-t border-white/5 pt-2">
                      {m.venue} · {m.city}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Groups() {
  const [activeGroupId, setActiveGroupId] = useState(null);
  const [revealActive, setRevealActive] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setRevealActive(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`groups-page-wrapper ${revealActive ? 'reveal-active' : ''}`} style={{ paddingTop: '80px', minHeight: '100vh', backgroundColor: 'var(--background)' }}>
      {/* Header Section */}
      <section className="w-full max-w-max-width mx-auto px-lg py-2xl flex flex-col md:flex-row justify-between items-end gap-lg">
        <div>
          <h1 className="font-fwc text-[80px] leading-[0.9] tracking-tighter" style={{ color: 'var(--fifa-black)' }}>
            GROUPS
          </h1>
          <p className="text-subheading-sm mt-sm" style={{ color: 'var(--on-surface-variant)' }}>
            12 Groups · 48 Teams · The Road to MetLife Stadium
          </p>
        </div>
        <div className="flex items-center gap-md">
          <div className="text-right hidden sm:block">
            <p className="text-label-eyebrow text-primary">OFFICIAL DRAW</p>
            <p className="font-body-bold" style={{ color: 'var(--fifa-black)' }}>JUNE 2026</p>
          </div>
          <div className="w-32 h-32 relative">
            <img
              alt="FIFA Logo"
              className="w-full h-full object-contain"
              src="/fifa-logo.png"
            />
          </div>
        </div>
      </section>

      {/* Hero Section */}
      <section className="amplify-pattern relative overflow-hidden py-3xl px-lg">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#1b5db1] to-transparent"></div>
        </div>
        <div className="max-w-max-width mx-auto relative z-10 text-center text-white">
          <h2 className="font-fwc text-[72px] md:text-[128px] leading-[1.1] mb-sm">WE ARE 26</h2>
          <p className="font-subheading-sm text-[20px] md:text-[24px] mb-2xl opacity-90">
            12 Groups. 48 Nations. One Dream.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-md max-w-4xl mx-auto">
            <div className="glass-card p-md rounded-xl flex flex-col items-center">
              <span className="font-fwc text-[32px] text-fifa-gold">12</span>
              <span className="text-label-eyebrow text-white">GROUPS</span>
            </div>
            <div className="glass-card p-md rounded-xl flex flex-col items-center">
              <span className="font-fwc text-[32px] text-fifa-gold">48</span>
              <span className="text-label-eyebrow text-white">TEAMS</span>
            </div>
            <div className="glass-card p-md rounded-xl flex flex-col items-center">
              <span className="font-fwc text-[32px] text-fifa-gold">72</span>
              <span className="text-label-eyebrow text-white">MATCHES</span>
            </div>
            <div className="glass-card p-md rounded-xl flex flex-col items-center">
              <span className="font-fwc text-[32px] text-fifa-gold">3</span>
              <span className="text-label-eyebrow text-white">HOST NATIONS</span>
            </div>
          </div>
        </div>
      </section>

      {/* Groups Grid */}
      <main className="w-full max-w-max-width mx-auto px-lg py-3xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-lg">
          {groupData.map((group, index) => {
            return (
              <div
                key={group.id}
                onClick={() => setActiveGroupId(group.id)}
                className="group group-card-entrance overflow-hidden cursor-pointer relative rounded-[20px] shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl active:scale-[0.98]"
                style={{
                  backgroundColor: group.color,
                  transitionDelay: `${index * 80}ms`
                }}
              >
                <div className="p-lg h-full flex flex-col justify-between min-h-[220px]">
                  <div className="flex justify-between items-start">
                    <span className="font-fwc text-[64px] text-white leading-none transition-transform duration-300 group-hover:scale-[1.15] origin-top-left">
                      {group.id}
                    </span>
                    <span className="material-symbols-outlined text-white opacity-60">
                      open_in_new
                    </span>
                  </div>
                  <div className="space-y-sm mt-md">
                    {group.teams.map((code) => {
                      const team = TEAM_DATA[code] || { name: code, iso2: 'us' };
                      return (
                        <div key={code} className="flex items-center gap-sm text-white font-body-bold">
                          <img
                            src={getFlagUrl(team.iso2, 40)}
                            alt={team.name}
                            className="w-6 h-4 object-cover rounded-sm border border-white/20 flex-shrink-0"
                          />
                          <span className="font-fwc text-[13px] uppercase tracking-wider min-w-[36px] flex-shrink-0">{code}</span>
                          <span className="ml-2 truncate" style={{ fontSize: '13px', opacity: 0.9 }} title={team.name}>{team.name}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {activeGroupId && (
        <GroupDetailModal 
          groupId={activeGroupId} 
          onClose={() => setActiveGroupId(null)} 
        />
      )}

      {/* CSS Animation Keyframes */}
      <style>{`
        @keyframes fade-in-row {
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .style-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .style-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 99px;
        }
        .style-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 99px;
        }
        .style-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.3);
        }
      `}</style>
    </div>
  );
}
