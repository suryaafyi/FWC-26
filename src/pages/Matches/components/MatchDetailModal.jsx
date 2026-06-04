import React, { useState } from 'react';
import { getFlagUrl } from '../../../utils/matchesData';
import { CAPTAINS } from '../../../utils/captains';

export default function MatchDetailModal({ match, onClose }) {
  const [activeTab, setActiveTab] = useState('Stats');

  if (!match) return null;

  const isLive = match.status === 'live';
  const isFinished = match.status === 'ft';

  const captain1 = CAPTAINS[match.team1.code];
  const captain2 = CAPTAINS[match.team2.code];

  // Render stats tab content
  const renderStats = () => {
    // Generate deterministic stats based on match ID for realism
    const hash = (match.matchNumber * 17) % 5;
    const statsData = match.statsDetails || [
      { name: 'Possession %', leftVal: 50 + hash * 3, rightVal: 50 - hash * 3 },
      { name: 'Shots (On Target)', leftVal: 8 + hash, rightVal: 6 + (hash % 3) },
      { name: 'Fouls Committed', leftVal: 10 + (hash % 4), rightVal: 12 - (hash % 3) },
      { name: 'Corners Taken', leftVal: 5 + (hash % 3), rightVal: 4 + (hash % 2) },
      { name: 'Pass Accuracy %', leftVal: 84 + hash, rightVal: 81 + (hash % 3) }
    ];

    return (
      <div className="stats-comparison-rows">
        {statsData.map((stat, index) => {
          const total = stat.leftVal + stat.rightVal || 1;
          const leftPct = (stat.leftVal / total) * 100;
          const rightPct = (stat.rightVal / total) * 100;

          return (
            <div key={index} className="stat-comparison-row">
              <div className="stat-labels-flex">
                <span>{stat.leftVal}</span>
                <span className="stat-label-title">{stat.name}</span>
                <span>{stat.rightVal}</span>
              </div>
              <div className="stat-bars-container">
                <div className="stat-bar-left" style={{ width: `${leftPct}%` }}></div>
                <div className="stat-bar-right" style={{ width: `${rightPct}%` }}></div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  // Render lineups tab content
  const renderLineups = () => {
    const lineups = match.lineups || {
      team1: [
        { number: 1, name: 'A. Becker', position: 'GK' },
        { number: 4, name: 'M. de Ligt', position: 'DF' },
        { number: 6, name: 'J. Stones', position: 'DF' },
        { number: 8, name: 'L. Modric', position: 'MF' },
        { number: captain1?.number || 10, name: captain1?.name || 'K. Mbappe', position: 'FW' }
      ],
      team2: [
        { number: 1, name: 'J. Pickford', position: 'GK' },
        { number: 3, name: 'W. Saliba', position: 'DF' },
        { number: 5, name: 'J. Gvardiol', position: 'DF' },
        { number: 21, name: 'F. de Jong', position: 'MF' },
        { number: captain2?.number || 10, name: captain2?.name || 'S. Mane', position: 'FW' }
      ]
    };

    return (
      <div className="lineups-split-grid">
        <div>
          <h4 className="lineup-team-title left">{match.team1.code} Lineup</h4>
          <div className="lineup-player-list">
            {lineups.team1.map((player) => (
              <div key={player.number} className="lineup-player-item">
                <span className="lineup-player-number">#{player.number}</span>
                <span className="lineup-player-name">{player.name}</span>
                <span className="lineup-player-position">{player.position}</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h4 className="lineup-team-title right">{match.team2.code} Lineup</h4>
          <div className="lineup-player-list">
            {lineups.team2.map((player) => (
              <div key={player.number} className="lineup-player-item">
                <span className="lineup-player-number">#{player.number}</span>
                <span className="lineup-player-name">{player.name}</span>
                <span className="lineup-player-position">{player.position}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // Render events tab content
  const renderEvents = () => {
    // Generate events based on live status or scores
    const events = [];
    if (isLive || isFinished) {
      events.push({ minute: "0'", player: 'Match Started', desc: 'Kick Off', team: 'system' });
      if (match.score1 > 0) {
        events.push({ 
          minute: "24'", 
          player: `${captain1?.name || 'Player 1'} (${match.team1.code})`, 
          desc: 'GOAL! Header into bottom corner', 
          team: 'left' 
        });
      }
      if (match.score2 > 0) {
        events.push({ 
          minute: "56'", 
          player: `${captain2?.name || 'Player 2'} (${match.team2.code})`, 
          desc: 'GOAL! Assist by midfielder', 
          team: 'right' 
        });
      }
      if (match.score1 > 1) {
        events.push({ 
          minute: "72'", 
          player: `Striker (${match.team1.code})`, 
          desc: 'GOAL! Penalty Kick converted', 
          team: 'left' 
        });
      }
      if (isFinished) {
        events.push({ minute: "90+5'", player: 'Match Finished', desc: 'Full Time whistle blown', team: 'system' });
      }
    } else {
      events.push({ minute: "0'", player: 'Pre-Match Info', desc: 'No events logged yet. Match is upcoming.', team: 'system' });
    }

    return (
      <div className="timeline-vertical">
        {events.map((event, idx) => (
          <div
            key={idx}
            className={`timeline-event-item ${
              event.team === 'left' ? 'left-team' : event.team === 'right' ? 'right-team' : ''
            }`}
          >
            <div className="timeline-event-badge">
              {event.minute}
            </div>
            <div className="timeline-event-card">
              <div className="timeline-event-player">{event.player}</div>
              <div className="timeline-event-desc">{event.desc}</div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const tabs = ['Stats', 'Lineups', 'Timeline'];

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header-actions">
          <span className="material-symbols-outlined modal-close-btn" onClick={onClose}>
            close
          </span>
        </div>

        {/* Scoreboard display */}
        <div className="modal-scoreboard-section">
          <span className="modal-round-tag">{match.phase === 'group' ? `Group Stage • Group ${match.group}` : match.phase}</span>
          <div className="modal-teams-display">
            <div className="modal-team-block">
              <div className="modal-team-flag-lg">
                <img src={getFlagUrl(match.team1.iso2, 160)} alt={match.team1.name} />
              </div>
              <span className="modal-team-name-lg">{match.team1.code}</span>
              <span className="modal-team-full-lg">{match.team1.name}</span>
            </div>

            <div className="modal-score-box">
              <span className="modal-score-text">
                {isLive || isFinished ? `${match.score1} - ${match.score2}` : 'VS'}
              </span>
            </div>

            <div className="modal-team-block">
              <div className="modal-team-flag-lg">
                <img src={getFlagUrl(match.team2.iso2, 160)} alt={match.team2.name} />
              </div>
              <span className="modal-team-name-lg">{match.team2.code}</span>
              <span className="modal-team-full-lg">{match.team2.name}</span>
            </div>
          </div>

          {isLive && <div className="modal-live-ticker-info">LIVE {match.minute}</div>}
          <div className="modal-stadium-info">{match.venue} · {match.city}</div>
        </div>

        {/* Modal Tab Navigator */}
        <div className="modal-tabs-nav">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`modal-tab-btn ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Modal Scroll Content Pane */}
        <div className="modal-scroll-body">
          {activeTab === 'Stats' && renderStats()}
          {activeTab === 'Lineups' && renderLineups()}
          {activeTab === 'Timeline' && renderEvents()}
        </div>
      </div>
    </div>
  );
}
