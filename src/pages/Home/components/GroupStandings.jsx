import React, { useState, useEffect } from 'react';
import { getTournamentState } from '../../../utils/tournamentState';

const groupsData = [
  { letter: 'A', name: 'GROUP A', teams: [ { name: 'Mexico', flag: 'mx' }, { name: 'South Africa', flag: 'za' }, { name: 'Ecuador', flag: 'ec' }, { name: 'Qatar', flag: 'qa' } ] },
  { letter: 'B', name: 'GROUP B', teams: [ { name: 'England', flag: 'gb-eng' }, { name: 'USA', flag: 'us' }, { name: 'Iran', flag: 'ir' }, { name: 'Wales', flag: 'gb-wls' } ] },
  { letter: 'C', name: 'GROUP C', teams: [ { name: 'Argentina', flag: 'ar' }, { name: 'Saudi Arabia', flag: 'sa' }, { name: 'Poland', flag: 'pl' }, { name: 'Sweden', flag: 'se' } ] },
  { letter: 'D', name: 'GROUP D', teams: [ { name: 'France', flag: 'fr' }, { name: 'Australia', flag: 'au' }, { name: 'Denmark', flag: 'dk' }, { name: 'Tunisia', flag: 'tn' } ] },
  { letter: 'E', name: 'GROUP E', teams: [ { name: 'Spain', flag: 'es' }, { name: 'Costa Rica', flag: 'cr' }, { name: 'Germany', flag: 'de' }, { name: 'Japan', flag: 'jp' } ] },
  { letter: 'F', name: 'GROUP F', teams: [ { name: 'Belgium', flag: 'be' }, { name: 'Canada', flag: 'ca' }, { name: 'Morocco', flag: 'ma' }, { name: 'Croatia', flag: 'hr' } ] },
  { letter: 'G', name: 'GROUP G', teams: [ { name: 'Brazil', flag: 'br' }, { name: 'Serbia', flag: 'rs' }, { name: 'Switzerland', flag: 'ch' }, { name: 'Cameroon', flag: 'cm' } ] },
  { letter: 'H', name: 'GROUP H', teams: [ { name: 'Portugal', flag: 'pt' }, { name: 'Ghana', flag: 'gh' }, { name: 'Uruguay', flag: 'uy' }, { name: 'South Korea', flag: 'kr' } ] },
  { letter: 'I', name: 'GROUP I', teams: [ { name: 'Italy', flag: 'it' }, { name: 'Colombia', flag: 'co' }, { name: 'Algeria', flag: 'dz' }, { name: 'Turkey', flag: 'tr' } ] },
  { letter: 'J', name: 'GROUP J', teams: [ { name: 'Netherlands', flag: 'nl' }, { name: 'Nigeria', flag: 'ng' }, { name: 'Peru', flag: 'pe' }, { name: 'Jamaica', flag: 'jm' } ] },
  { letter: 'K', name: 'GROUP K', teams: [ { name: 'Norway', flag: 'no' }, { name: 'Ukraine', flag: 'ua' }, { name: 'Austria', flag: 'at' }, { name: 'Mali', flag: 'ml' } ] },
  { letter: 'L', name: 'GROUP L', teams: [ { name: 'Czechia', flag: 'cz' }, { name: 'Egypt', flag: 'eg' }, { name: 'Scotland', flag: 'gb-sct' }, { name: 'Panama', flag: 'pa' } ] }
];

const getTeamStats = (isPreTournament, index) => {
  if (isPreTournament) {
    return { gp: 0, w: 0, d: 0, l: 0, gd: 0, pts: 0 };
  }
  if (index === 0) {
    return { gp: 2, w: 2, d: 0, l: 0, gd: 3, pts: 6 };
  } else if (index === 1) {
    return { gp: 2, w: 1, d: 1, l: 0, gd: 1, pts: 4 };
  } else if (index === 2) {
    return { gp: 2, w: 0, d: 1, l: 1, gd: -1, pts: 1 };
  } else {
    return { gp: 2, w: 0, d: 0, l: 2, gd: -3, pts: 0 };
  }
};

export default function GroupStandings({ setActivePage }) {
  const [gameState, setGameState] = useState('PRE_TOURNAMENT');

  useEffect(() => {
    setGameState(getTournamentState());
  }, []);

  const isPreTournament = gameState === 'PRE_TOURNAMENT';

  return (
    <section className="py-3xl overflow-hidden reveal-up" style={{ backgroundColor: '#ffffff', borderTop: '1px solid var(--border-grey)' }}>
      <div className="container mb-xl">
        <div className="flex justify-between items-end mb-xl">
          <div>
            <h2 className="text-heading-md uppercase" style={{ margin: 0 }}>
              {isPreTournament ? 'Group Stage Draw' : 'Group Standings'}
            </h2>
          </div>
          <a 
            className="btn-view-fixtures mb-sm" 
            href="#groups" 
            onClick={(e) => { 
              e.preventDefault(); 
              if (setActivePage) setActivePage('Groups'); 
            }}
          >
            VIEW ALL GROUPS <span className="fixtures-arrow">→</span>
          </a>
        </div>
      </div>

      <div className="container">
        {/* PRE_TOURNAMENT / LIVE_TOURNAMENT Container layout */}
        {/* <!-- PRE_TOURNAMENT --> */}
        {/* <!-- LIVE_TOURNAMENT --> */}
        <div className={isPreTournament ? "group-stage-draw-grid" : "group-standings-scroll"}>
          {groupsData.slice(0, 3).map((group) => (
            <div key={group.letter} className="group-card" style={{ background: '#fcfcfc', border: '1px solid var(--border-grey)', borderRadius: '8px' }}>
              <span className="group-bg-letter" style={{ fontSize: '150px' }}>{group.letter}</span>
              <div className="group-card-content" style={{ padding: '20px' }}>
                <div className="group-card-header" style={{ marginBottom: '16px', borderBottom: '1px solid var(--border-grey)', paddingBottom: '10px' }}>
                  <span className="text-heading-md uppercase" style={{ fontSize: '20px', letterSpacing: '0.05em' }}>{group.name}</span>
                  <span className="material-symbols-outlined text-primary">
                    arrow_forward
                  </span>
                </div>
                
                <div className="group-table-header" style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--mid-grey)', fontFamily: 'var(--font-mono)', borderBottom: '1px solid var(--border-grey)', paddingBottom: '4px', marginBottom: '8px' }}>
                  <span>TEAM</span>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <span style={{ width: '20px', textAlign: 'center' }}>GP</span>
                    <span style={{ width: '20px', textAlign: 'center' }}>W</span>
                    <span style={{ width: '20px', textAlign: 'center' }}>D</span>
                    <span style={{ width: '20px', textAlign: 'center' }}>L</span>
                    <span style={{ width: '20px', textAlign: 'center' }}>GD</span>
                    <span style={{ width: '30px', textAlign: 'center' }}>PTS</span>
                  </div>
                </div>

                <div className="group-table">
                  {group.teams.map((team, idx) => {
                    const stats = getTeamStats(isPreTournament, idx);
                    const pos = idx + 1;
                    return (
                      <div 
                        key={team.name} 
                        className="group-row" 
                        style={{ 
                          display: 'flex', 
                          justifyContent: 'space-between', 
                          alignItems: 'center', 
                          padding: '6px 0', 
                          borderBottom: '1px solid rgba(0,0,0,0.05)',
                          ...(pos <= 2 ? { borderLeft: '3px solid var(--success-green)', paddingLeft: '8px', marginLeft: '-8px' } : {}) 
                        }}
                      >
                        <div className="group-team-details" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span className="group-pos" style={{ width: '16px', fontWeight: 'bold', fontSize: '13px' }}>{pos}</span>
                          <img 
                            src={`https://cdn.jsdelivr.net/gh/lipis/flag-icons/flags/4x3/${team.flag.toLowerCase()}.svg`} 
                            alt={team.name} 
                            width="20" 
                            height="12" 
                            style={{ objectFit: 'cover', borderRadius: '1px', border: '1px solid rgba(0,0,0,0.1)' }} 
                          />
                          <span className="group-team-name" style={{ fontWeight: 500, fontSize: '13px', color: 'var(--on-background)' }}>{team.name}</span>
                        </div>
                        
                        <div style={{ display: 'flex', gap: '8px', fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--on-background)' }}>
                          <span style={{ width: '20px', textAlign: 'center' }}>{stats.gp}</span>
                          <span style={{ width: '20px', textAlign: 'center' }}>{stats.w}</span>
                          <span style={{ width: '20px', textAlign: 'center' }}>{stats.d}</span>
                          <span style={{ width: '20px', textAlign: 'center' }}>{stats.l}</span>
                          <span style={{ width: '20px', textAlign: 'center' }}>{stats.gd}</span>
                          <span style={{ width: '30px', textAlign: 'center', fontWeight: 'bold', color: isPreTournament ? 'var(--on-background)' : 'var(--primary)' }}>{stats.pts}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
