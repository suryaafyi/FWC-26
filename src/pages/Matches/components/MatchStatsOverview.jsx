import React from 'react';
import { matchesData, getMatchStatus, WC_START } from '../../../utils/matchesData';

export default function MatchStatsOverview() {
  const now = new Date();
  const isPreTournament = now < WC_START;

  let stats = [];

  if (isPreTournament) {
    stats = [
      { label: 'Total Matches', value: '104' },
      { label: 'Host Nations', value: '3' },
      { label: 'Host Cities', value: '16' },
      { label: 'Teams', value: '48' }
    ];
  } else {
    // LIVE_TOURNAMENT
    const playedMatches = matchesData.filter(m => getMatchStatus(m) === 'ft');
    const liveCount = matchesData.filter(m => getMatchStatus(m) === 'live').length;
    
    const played = playedMatches.length;
    const totalGoals = playedMatches.reduce((acc, m) => acc + (m.score1 || 0) + (m.score2 || 0), 0);
    const avgGoals = played > 0 ? (totalGoals / played).toFixed(1) : '—';

    stats = [
      { label: 'Total Matches', value: '104' },
      { label: 'Goals Scored', value: String(totalGoals) },
      { label: 'Avg Goals/Match', value: String(avgGoals) },
      { label: 'Live Now', value: String(liveCount) }
    ];
  }

  return (
    <section className="matches-stats-grid reveal-up">
      {stats.map((stat, idx) => (
        <div key={idx} className="matches-stat-card">
          <span className="matches-stat-number">{stat.value}</span>
          <span className="matches-stat-label">{stat.label}</span>
        </div>
      ))}
    </section>
  );
}
