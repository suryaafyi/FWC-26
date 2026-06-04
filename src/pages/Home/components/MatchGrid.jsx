import React, { useState, useEffect } from 'react';
import { getTournamentState } from '../../../utils/tournamentState';

const preTournamentMatches = [
  {
    id: 1,
    phase: 'Group A • June 11',
    time: '19:00 LOCAL',
    isLive: false,
    stadium: 'Estadio Azteca, Mexico City',
    team1: { name: 'Mexico', code: 'MEX', flag: 'mx' },
    team2: { name: 'South Africa', code: 'RSA', flag: 'za' },
    status: 'TICKETS AVAILABLE',
    isPlaying: false
  },
  {
    id: 2,
    phase: 'Group B • June 12',
    time: '18:00 LOCAL',
    isLive: false,
    stadium: 'SoFi Stadium, Los Angeles',
    team1: { name: 'USA', code: 'USA', flag: 'us' },
    team2: { name: 'Canada', code: 'CAN', flag: 'ca' },
    status: 'TICKETS AVAILABLE',
    isPlaying: false
  },
  {
    id: 3,
    phase: 'Group C • June 12',
    time: '17:00 LOCAL',
    isLive: false,
    stadium: 'BC Place, Vancouver',
    team1: { name: 'Canada', code: 'CAN', flag: 'ca' },
    team2: { name: 'Morocco', code: 'MAR', flag: 'ma' },
    status: 'TICKETS AVAILABLE',
    isPlaying: false
  },
  {
    id: 4,
    phase: 'Group D • June 12',
    time: '19:30 LOCAL',
    isLive: false,
    stadium: 'MetLife Stadium, NY/NJ',
    team1: { name: 'Argentina', code: 'ARG', flag: 'ar' },
    team2: { name: 'Saudi Arabia', code: 'KSA', flag: 'sa' },
    status: 'TICKETS AVAILABLE',
    isPlaying: false
  },
  {
    id: 5,
    phase: 'Group E • June 13',
    time: '15:00 LOCAL',
    isLive: false,
    stadium: 'Hard Rock Stadium, Miami',
    team1: { name: 'England', code: 'ENG', flag: 'gb-eng' },
    team2: { name: 'Italy', code: 'ITA', flag: 'it' },
    status: 'TICKETS AVAILABLE',
    isPlaying: false
  },
  {
    id: 6,
    phase: 'Group F • June 13',
    time: '20:00 LOCAL',
    isLive: false,
    stadium: 'NRG Stadium, Houston',
    team1: { name: 'Brazil', code: 'BRA', flag: 'br' },
    team2: { name: 'Germany', code: 'GER', flag: 'de' },
    status: 'TICKETS AVAILABLE',
    isPlaying: false
  }
];

const liveMatches = [
  {
    id: 1,
    phase: 'Group A • June 15',
    time: '14:00 LOCAL',
    isLive: false,
    stadium: 'Hard Rock Stadium, Miami',
    team1: { name: 'Italy', code: 'ITA', flag: 'it', score: 0 },
    team2: { name: 'Ecuador', code: 'ECU', flag: 'ec', score: 0 },
    status: 'TICKETS AVAILABLE',
    isPlaying: false
  },
  {
    id: 2,
    phase: 'Group C • June 15',
    time: 'LIVE',
    isLive: true,
    stadium: 'SoFi Stadium, Los Angeles',
    team1: { name: 'Brazil', code: 'BRA', flag: 'br', score: 2 },
    team2: { name: 'Denmark', code: 'DEN', flag: 'dk', score: 1 },
    status: "72' PLAYING",
    isPlaying: true
  },
  {
    id: 3,
    phase: 'Group B • June 15',
    time: '19:30 LOCAL',
    isLive: false,
    stadium: 'MetLife Stadium, NY/NJ',
    team1: { name: 'Ghana', code: 'GHA', flag: 'gh', score: 0 },
    team2: { name: 'England', code: 'ENG', flag: 'gb-eng', score: 0 },
    status: 'TICKETS AVAILABLE',
    isPlaying: false
  }
];

export default function MatchGrid({ setActivePage }) {
  const [gameState, setGameState] = useState('PRE_TOURNAMENT');

  useEffect(() => {
    setGameState(getTournamentState());
  }, []);

  const isPreTournament = gameState === 'PRE_TOURNAMENT';
  const matches = isPreTournament ? preTournamentMatches : liveMatches;

  return (
    <section className="py-2xl px-gutter bg-soft-grey reveal-up">
      <div className="container">
        <div className="flex justify-between items-end mb-xl">
          <div>
            <span className="text-primary text-label-eyebrow">Match Schedule</span>
            <h2 className="text-heading-md uppercase">
              {isPreTournament ? 'Upcoming Group Stage • First Matches' : 'Upcoming Group Stage'}
            </h2>
          </div>
          <a 
            className="btn-view-fixtures mb-sm" 
            href="#matches" 
            onClick={(e) => { 
              e.preventDefault(); 
              if (setActivePage) setActivePage('Matches'); 
            }}
          >
            VIEW ALL FIXTURES <span className="fixtures-arrow">→</span>
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-lg">
          {matches.map((match) => (
            <div key={match.id} className="match-card">
              <div className="match-card-header">
                <span className="match-card-phase">{match.phase}</span>
                <span className={`match-card-time ${match.isLive ? 'live' : ''}`}>
                  {match.time}
                </span>
              </div>

              <div className="match-card-teams">
                {/* Team 1 Row */}
                <div className="match-team-row">
                  <div className="match-team-logo-name">
                    <img 
                      src={`https://cdn.jsdelivr.net/gh/lipis/flag-icons/flags/4x3/${match.team1.flag.toLowerCase()}.svg`} 
                      alt={match.team1.name} 
                      width="40" 
                      height="24" 
                      style={{ objectFit: 'cover', borderRadius: '2px', border: '1px solid rgba(0,0,0,0.1)' }} 
                    />
                    <span className="match-team-code">{match.team1.code}</span>
                  </div>
                  {/* PRE_TOURNAMENT: No Score */}
                  {/* <!-- PRE_TOURNAMENT --> */}
                  {isPreTournament && (
                    <span className="match-team-score pre-score">-</span>
                  )}
                  {/* <!-- /PRE_TOURNAMENT --> */}
                  {/* LIVE_TOURNAMENT: Score */}
                  {/* <!-- LIVE_TOURNAMENT --> */}
                  {!isPreTournament && (
                    <span className={`match-team-score ${match.isLive ? 'live' : ''}`}>
                      {match.team1.score}
                    </span>
                  )}
                  {/* <!-- /LIVE_TOURNAMENT --> */}
                </div>

                {/* Team 2 Row */}
                <div className="match-team-row">
                  <div className="match-team-logo-name">
                    <img 
                      src={`https://cdn.jsdelivr.net/gh/lipis/flag-icons/flags/4x3/${match.team2.flag.toLowerCase()}.svg`} 
                      alt={match.team2.name} 
                      width="40" 
                      height="24" 
                      style={{ objectFit: 'cover', borderRadius: '2px', border: '1px solid rgba(0,0,0,0.1)' }} 
                    />
                    <span className="match-team-code">{match.team2.code}</span>
                  </div>
                  {/* PRE_TOURNAMENT: No Score */}
                  {/* <!-- PRE_TOURNAMENT --> */}
                  {isPreTournament && (
                    <span className="match-team-score pre-score">-</span>
                  )}
                  {/* <!-- /PRE_TOURNAMENT --> */}
                  {/* LIVE_TOURNAMENT: Score */}
                  {/* <!-- LIVE_TOURNAMENT --> */}
                  {!isPreTournament && (
                    <span className={`match-team-score ${match.isLive ? 'live' : ''}`}>
                      {match.team2.score}
                    </span>
                  )}
                  {/* <!-- /LIVE_TOURNAMENT --> */}
                </div>
              </div>

              <div className="match-card-footer">
                <span className="match-card-stadium">{match.stadium}</span>
                {match.isPlaying ? (
                  <span className="match-card-status-info playing">
                    {match.status}
                  </span>
                ) : (
                  <span
                    className="material-symbols-outlined text-mid-grey hover:text-primary cursor-pointer"
                    style={{ fontSize: '20px' }}
                    title="Tickets"
                  >
                    confirmation_number
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
