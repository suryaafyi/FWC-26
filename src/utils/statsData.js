const WC_START = new Date('2026-06-11T19:00:00-05:00');
const now = new Date();
export const PRE = now < WC_START;

export const PLAYERS_DB = [
  { name: 'Kylian Mbappé', team: 'France', code: 'FRA', flag: 'fr', goals: 5, assists: 1, shots: 16, mins: 270, color: '#003189' },
  { name: 'Lionel Messi', team: 'Argentina', code: 'ARG', flag: 'ar', goals: 4, assists: 3, shots: 12, mins: 270, color: '#74ACDF' },
  { name: 'Vinícius Jr', team: 'Brazil', code: 'BRA', flag: 'br', goals: 3, assists: 1, shots: 11, mins: 240, color: '#009C3B' },
  { name: 'Erling Haaland', team: 'Norway', code: 'NOR', flag: 'no', goals: 3, assists: 0, shots: 14, mins: 180, color: '#EF2B2D' },
  { name: 'Hirving Lozano', team: 'Mexico', code: 'MEX', flag: 'mx', goals: 2, assists: 1, shots: 7, mins: 240, color: '#006847' },
  { name: 'Jude Bellingham', team: 'England', code: 'ENG', flag: 'gb-eng', goals: 2, assists: 2, shots: 8, mins: 260, color: '#B3CDE3' },
  { name: 'Christian Pulisic', team: 'USA', code: 'USA', flag: 'us', goals: 2, assists: 1, shots: 9, mins: 250, color: '#002868' },
  { name: 'Achraf Hakimi', team: 'Morocco', code: 'MAR', flag: 'ma', goals: 1, assists: 2, shots: 5, mins: 270, color: '#C1272D' },
  { name: 'Pedri', team: 'Spain', code: 'ESP', flag: 'es', goals: 1, assists: 3, shots: 4, mins: 230, color: '#AA151B' },
  { name: 'Percy Tau', team: 'South Africa', code: 'RSA', flag: 'za', goals: 1, assists: 0, shots: 4, mins: 180, color: '#007A4D' }
];

// PRE_TOURNAMENT: show tournament facts
// LIVE_TOURNAMENT: compute from match results

export const getTournamentStats = (matches = []) => {
  if (PRE) {
    const daysToGo = Math.ceil((WC_START - now) / (1000 * 60 * 60 * 24));
    return {
      goalsScored: 104,
      matchesPlayed: 48,
      avgGoals: 16,
      yellowCards: Math.max(0, daysToGo),
      redCards: 3,
      totalShots: 3,
      label: 'PRE_TOURNAMENT'
    };
  }
  const played = matches.filter(m => m.status === 'ft');
  const goals = played.reduce((a,m) => a+(m.score1||0)+(m.score2||0),0);
  return {
    goalsScored: goals,
    matchesPlayed: played.length,
    avgGoals: played.length ? (goals/played.length).toFixed(2) : 0,
    yellowCards: matches.reduce((a,m)=>a+(m.yellows||0),0),
    redCards: matches.reduce((a,m)=>a+(m.reds||0),0),
    totalShots: matches.reduce((a,m)=>a+(m.shots||0),0),
    label: 'LIVE_TOURNAMENT'
  };
};

// Top scorers — empty pre-tournament, populated live
export const getTopScorers = (players = [], category = 'goals') => {
  if (PRE) return [];
  const fieldMap = {
    goals: 'goals',
    assists: 'assists',
    shots: 'shots',
    minutes: 'mins'
  };
  const field = fieldMap[category] || 'goals';
  return [...players].sort((a,b) => b[field] - a[field]).slice(0,10);
};
