import React from 'react';
import { getTournamentState } from '../../../utils/tournamentState';

const liveItems = [
  { status: 'LIVE', teams: 'ARG 2-2 FRA', info: "88'", type: 'live' },
  { status: 'UPCOMING', teams: 'BRA vs MAR', info: '21:00', type: 'upcoming' },
  { status: 'FT', teams: 'GER 0-1 JPN', info: 'Group E', type: 'ft' }
];

const preItems = [
  { status: '🗓 INFO', teams: 'TOURNAMENT BEGINS JUNE 11 · MEXICO CITY · ESTADIO AZTECA', info: '', type: 'upcoming' },
  { status: '⏳ COUNTDOWN', teams: '8 DAYS TO KICKOFF · 48 NATIONS · 104 MATCHES', info: '', type: 'upcoming' },
  { status: '📍 VENUE', teams: 'NEXT: Opening Ceremony · Jun 11 · Estadio Azteca · Mexico City', info: '', type: 'upcoming' },
  { status: '🏟 STADIUM', teams: 'FINAL: MetLife Stadium, NJ · July 19, 2026', info: '', type: 'upcoming' }
];

export default function Ticker() {
  const state = getTournamentState();
  const initialItems = state === 'PRE_TOURNAMENT' ? preItems : liveItems;
  const items = [...initialItems, ...initialItems, ...initialItems];

  return (
    <section className="ticker-section">
      <div className="ticker-marquee">
        {state === 'PRE_TOURNAMENT' && (
          /* PRE_TOURNAMENT */
          items.map((item, index) => (
            <div key={`pre-${index}`} className="ticker-item">
              <span className={`ticker-badge ${item.type}`}>
                {item.status}
              </span>
              <span className="ticker-match-text">{item.teams}</span>
              {item.info && <span className="ticker-time-text">{item.info}</span>}
            </div>
          ))
        )}
        {state !== 'PRE_TOURNAMENT' && (
          /* LIVE_TOURNAMENT */
          items.map((item, index) => (
            <div key={`live-${index}`} className="ticker-item">
              <span className={`ticker-badge ${item.type}`}>
                {item.status}
              </span>
              <span className="ticker-match-text">{item.teams}</span>
              <span className="ticker-time-text">{item.info}</span>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
