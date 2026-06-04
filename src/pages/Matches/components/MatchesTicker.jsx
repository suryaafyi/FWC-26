import React from 'react';
import { matchesData, getMatchStatus, WC_START } from '../../../utils/matchesData';

export default function MatchesTicker() {
  const now = new Date();
  const isPreTournament = now < WC_START;

  let tickerItems = [];

  if (isPreTournament) {
    const diffTime = WC_START - now;
    const daysUntil = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    tickerItems = [
      { type: 'announcement', text: 'TOURNAMENT BEGINS JUNE 11 · ESTADIO AZTECA' },
      { type: 'countdown', text: `${daysUntil} DAYS TO KICKOFF` },
      { type: 'upcoming', text: 'OPENING MATCH: MEX vs RSA · JUN 11 · 19:00 CT' },
      { type: 'upcoming', text: 'BRA vs MAR · JUN 13 · METLIFE STADIUM' },
      { type: 'upcoming', text: 'FRA vs SEN · JUN 15 · METLIFE STADIUM' },
      { type: 'upcoming', text: 'ARG vs CHI · JUN 15 · METLIFE STADIUM' },
      { type: 'info', text: '48 NATIONS · 104 MATCHES · 16 HOST CITIES' },
      { type: 'info', text: 'FINAL: JULY 19 · METLIFE STADIUM · NJ' }
    ];
  } else {
    // LIVE_TOURNAMENT
    // Derive from matchesData
    const todayStr = now.toDateString();
    
    matchesData.forEach(m => {
      const status = getMatchStatus(m);
      const mDate = new Date(m.date);
      const isToday = mDate.toDateString() === todayStr;
      const hoursDiff = (mDate - now) / (1000 * 60 * 60);

      if (status === 'live') {
        tickerItems.push({
          type: 'live',
          text: `LIVE: ${m.team1.code} ${m.score1 || 0}-${m.score2 || 0} ${m.minute || "1'"}`
        });
      } else if (status === 'upcoming' && hoursDiff >= 0 && hoursDiff <= 24) {
        const timeStr = mDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        tickerItems.push({
          type: 'upcoming_live',
          text: `UPCOMING: ${m.team1.code} vs ${m.team2.code} · ${timeStr}`
        });
      } else if (status === 'ft' && isToday) {
        tickerItems.push({
          type: 'ft',
          text: `FT: ${m.team1.code} ${m.score1 || 0}-${m.score2 || 0}`
        });
      }
    });

    // Fallback if no live/upcoming matches today to avoid empty ticker
    if (tickerItems.length === 0) {
      tickerItems = [
        { type: 'announcement', text: 'TOURNAMENT IS ACTIVE · VISIT MATCH CENTER FOR LATEST' },
        { type: 'info', text: '48 NATIONS · 104 MATCHES · 16 HOST CITIES' },
        { type: 'info', text: 'FINAL: JULY 19 · METLIFE STADIUM · NJ' }
      ];
    }
  }

  // Duplicate items for continuous marquee scroll
  const displayItems = [...tickerItems, ...tickerItems, ...tickerItems, ...tickerItems];

  const getColor = (type) => {
    switch (type) {
      case 'announcement':
        return '#FFD700'; // gold
      case 'countdown':
      case 'live':
        return '#E8192C'; // red
      case 'upcoming_live':
        return '#0052A5'; // blue
      case 'upcoming':
        return 'rgba(255, 255, 255, 0.7)'; // white
      case 'info':
        return 'rgba(255, 255, 255, 0.45)'; // grey
      case 'ft':
        return '#FFD700'; // gold
      default:
        return 'rgba(255, 255, 255, 0.7)';
    }
  };

  const getLabel = (type) => {
    switch (type) {
      case 'announcement':
        return 'ANNOUNCEMENT · ';
      case 'countdown':
        return 'COUNTDOWN · ';
      case 'live':
        return '● LIVE · ';
      case 'upcoming_live':
        return 'UPCOMING · ';
      case 'upcoming':
        return 'MATCH · ';
      case 'info':
        return 'INFO · ';
      case 'ft':
        return 'FT · ';
      default:
        return '';
    }
  };

  return (
    <div className="h-[40px] bg-black text-white flex items-center overflow-hidden z-50 relative uppercase text-[12px] font-bold tracking-wider">
      <div className="ticker-scroll whitespace-nowrap flex gap-12 px-6">
        {displayItems.map((item, index) => (
          <span key={index} style={{ display: 'inline-flex', alignItems: 'center' }}>
            <span style={{ color: getColor(item.type), marginRight: '6px' }}>
              {getLabel(item.type)}
            </span>
            <span>{item.text}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
