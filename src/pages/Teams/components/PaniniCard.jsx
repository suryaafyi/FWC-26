import React, { useState } from 'react';
import { TEAM_DATA } from '../../../utils/matchesData';

export default function PaniniCard({ player, delay }) {
  const [transformStyle, setTransformStyle] = useState({});

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 8;
    const rotateY = (centerX - x) / 8;

    setTransformStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`
    });
  };

  const handleMouseLeave = () => {
    setTransformStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)'
    });
  };

  const rating = player.rating || 80;
  const teamCode = player.teamCode || 'ARG';
  const teamColor = TEAM_DATA[teamCode]?.color || '#74ACDF';

  const isGK = player.position === 'GK';
  const statsList = isGK ? [
    { value: player.stats?.div || 80, label: 'DIV' },
    { value: player.stats?.han || 80, label: 'HAN' },
    { value: player.stats?.kic || 78, label: 'KIC' },
    { value: player.stats?.ref || 82, label: 'REF' },
    { value: player.stats?.spd || 45, label: 'SPD' },
    { value: player.stats?.pos || 80, label: 'POS' }
  ] : [
    { value: player.stats?.pac || 75, label: 'PAC' },
    { value: player.stats?.sho || 70, label: 'SHO' },
    { value: player.stats?.pas || 72, label: 'PAS' },
    { value: player.stats?.dri || 75, label: 'DRI' },
    { value: player.stats?.def || 60, label: 'DEF' },
    { value: player.stats?.phy || 70, label: 'PHY' }
  ];

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="fut-card-container fade-up-stagger select-none w-full aspect-[1/1.4] bg-white rounded-xl shadow-lg border-[6px] border-white relative overflow-hidden flex flex-col"
      style={{
        ...transformStyle,
        animationDelay: delay
      }}
    >
      {/* Sticker Background */}
      <div
        className="w-full h-full relative flex flex-col overflow-hidden"
        style={{ backgroundColor: teamColor }}
      >
        {/* Giant White Watermark 26 in the background */}
        <div className="absolute inset-0 flex items-center justify-center font-fwc text-[160px] text-white/20 select-none pointer-events-none z-0">
          26
        </div>

        {/* Top-Left FIFA rounded badge */}
        <div className="absolute left-2.5 top-2.5 px-1.5 py-1 flex flex-col items-center justify-center z-20">
          <img src="/fifa-logo.png" className="w-16 h-16 object-contain" alt="FIFA" />
        </div>

        {/* Top-Right Flag & Code badge */}
        <div className="absolute right-2.5 top-2.5 px-2 py-1 flex items-center gap-1.5 z-20 h-10">
          <img
            src={player.flagUrl}
            alt={teamCode}
            className="w-6 h-6 object-cover rounded-full border border-gray-150 shadow-sm"
          />
          <div className="flex flex-col leading-none">
            <span className="text-[10px] font-black text-gray-900">{teamCode}</span>
            <span className="text-[8px] font-bold text-black-400">2026</span>
          </div>
        </div>

        {/* Main Player Portrait - fills background from the bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-[86%] w-full z-10 flex items-end justify-center overflow-hidden">
          {teamCode === 'ARG' ? (
            <img
              alt={player.name}
              className="w-full h-full object-cover object-top select-none pointer-events-none"
              src={player.photo}
            />
          ) : (
            <div className="w-full h-full flex items-end justify-center pt-8 pb-10">
              <svg
                viewBox="0 0 100 100"
                className="w-3/4 h-[85%] text-white/50 drop-shadow-md select-none pointer-events-none"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Head */}
                <circle cx="50" cy="25" r="14" />
                {/* Neck */}
                <path d="M46 37 h8 v8 h-8 z" />
                {/* Torso / Shoulders */}
                <path d="M15 78 c0 -18, 12 -24, 35 -24 s35 6, 35 24 v12 h-70 z" />
              </svg>
            </div>
          )}
          {/* Subtle bottom fade overlay behind name banner to blend solid image edges */}
          <div
            className="absolute inset-x-0 bottom-0 h-12 pointer-events-none"
            style={{ background: `linear-gradient(to top, ${teamColor} 20%, transparent 100%)` }}
          ></div>
        </div>

        {/* Bottom Banner (Capsule Name banner + details + stats) */}
        <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-xl p-3 z-20 shadow-[0_-3px_10px_rgba(0,0,0,0.08)] flex flex-col">
          {/* Player Name */}
          <div className="pr-12 text-left">
            <h4 className="font-fwc font-black uppercase text-[15px] tracking-wide text-gray-900 leading-none truncate">
              {player.name}
            </h4>
          </div>

          {/* Details Row (Position, Height, DOB) */}
          <div className="flex items-center gap-2 bg-[#E3F2FD] text-[#0D47A1] text-[9.5px] font-sans font-black px-2 py-[3px] rounded mt-1.5 w-fit uppercase leading-none">
            <span>{player.position} {player.height || '1.80 m'}</span>
            <span className="w-[3px] h-[3px] bg-[#0D47A1]/30 rounded-full"></span>
            <span>{player.dob || '01-01-1995'}</span>
          </div>

          {/* Horizontal Stats Grid */}
          <div className="flex justify-between items-center text-[10px] font-sans font-bold text-gray-700 mt-2.5 pt-2 border-t border-gray-100 leading-none">
            {statsList.map((stat, i) => (
              <div key={i} className="flex flex-col items-center">
                <span className="text-[7.5px] text-gray-400 font-black uppercase leading-none">{stat.label}</span>
                <span className="text-[11px] font-black text-gray-900 mt-[3px] leading-none">{stat.value}</span>
              </div>
            ))}
          </div>

          {/* Green Rating Badge (Top Right inside white banner) */}
          <div className="absolute right-3 top-2.5 flex flex-col items-center bg-[#4CAF50] text-white rounded px-2 py-0.5 font-fwc text-[12px] leading-none shadow-sm">
            <span className="text-[7px] font-bold opacity-80 leading-none">RATING</span>
            <span className="font-black mt-0.5 leading-none">{rating}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

