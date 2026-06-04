import React, { useState, useEffect } from 'react';
import { getFlagUrl, getMatchStatus } from '../../../utils/matchesData';
import { CAPTAINS } from '../../../utils/captains';
import { TEAM_DATA } from '../../../utils/matchesData';

export default function FeaturedMatchCard({ match, onSelect }) {
  const [isHovered, setIsHovered] = useState(false);

  const status = getMatchStatus(match);
  
  const team1Code = match.team1.code;
  const team2Code = match.team2.code;

  const t1Data = TEAM_DATA[team1Code] || { color: '#555', iso2: 'us', name: team1Code };
  const t2Data = TEAM_DATA[team2Code] || { color: '#777', iso2: 'us', name: team2Code };

  const captain1 = CAPTAINS[team1Code];
  const captain2 = CAPTAINS[team2Code];

  // Formatting date for display in the bottom strip
  const matchDate = new Date(match.date);
  const formattedDate = matchDate.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <div
      className="featured-match-card-container"
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: '400px',
        height: '520px',
        borderRadius: '16px',
        overflow: 'hidden',
        border: '1px solid rgba(255, 255, 255, 0.15)',
        boxShadow: isHovered 
          ? '0 20px 40px rgba(0, 0, 0, 0.45), 0 1px 3px rgba(0,0,0,0.2)' 
          : '0 8px 24px rgba(0, 0, 0, 0.25)',
        cursor: 'pointer',
        transform: isHovered ? 'translateY(-8px) scale(1.02)' : 'translateY(0) scale(1)',
        transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease',
        backgroundColor: '#000'
      }}
      onClick={() => onSelect && onSelect(match)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 1. BACKGROUND LAYERS (DIAGONAL SPLIT) */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          display: 'flex',
          width: '100%',
          height: '100%'
        }}
      >
        {/* Left half */}
        <div
          className="left-half-bg"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            backgroundColor: t1Data.color,
            clipPath: 'polygon(0 0, 65% 0, 35% 100%, 0 100%)',
            transition: 'filter 0.3s ease'
          }}
        >
          {/* Fallback pattern / gradient if no photo */}
          {!captain1?.img && (
            <div 
              style={{
                width: '100%',
                height: '100%',
                background: `linear-gradient(135deg, ${t1Data.color} 30%, rgba(0,0,0,0.4) 100%)`,
                position: 'relative'
              }}
            >
              <div 
                style={{
                  position: 'absolute',
                  top: '40%',
                  left: '20%',
                  transform: 'translate(-50%, -50%)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <img 
                  src={getFlagUrl(t1Data.iso2, 160)} 
                  alt={t1Data.name} 
                  style={{
                    width: '90px',
                    height: '60px',
                    objectFit: 'cover',
                    border: '3px solid #ffffff',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.35)',
                    borderRadius: '2px'
                  }}
                />
                <span 
                  className="font-display" 
                  style={{ 
                    fontSize: '48px', 
                    color: '#ffffff', 
                    opacity: 0.3, 
                    fontWeight: 900,
                    fontFamily: "'Anton', sans-serif" 
                  }}
                >
                  #{captain1?.number || '10'}
                </span>
              </div>
            </div>
          )}

          {captain1?.img && (
            <img
              src={captain1.img}
              alt={captain1.name}
              style={{
                position: 'absolute',
                left: 0,
                bottom: '80px',
                width: '55%',
                height: '80%',
                objectFit: 'cover',
                objectPosition: 'top center',
                zIndex: 1,
                filter: 'drop-shadow(4px 0 12px rgba(0,0,0,0.4))',
                transform: isHovered ? 'scale(1.06)' : 'scale(1)',
                transition: 'transform 0.4s ease-out',
                pointerEvents: 'none'
              }}
            />
          )}
        </div>

        {/* Right half */}
        <div
          className="right-half-bg"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            backgroundColor: t2Data.color,
            clipPath: 'polygon(65% 0, 100% 0, 100% 100%, 35% 100%)',
            transition: 'filter 0.3s ease'
          }}
        >
          {/* Fallback pattern / gradient if no photo */}
          {!captain2?.img && (
            <div 
              style={{
                width: '100%',
                height: '100%',
                background: `linear-gradient(135deg, ${t2Data.color} 30%, rgba(0,0,0,0.4) 100%)`,
                position: 'relative'
              }}
            >
              <div 
                style={{
                  position: 'absolute',
                  top: '40%',
                  left: '80%',
                  transform: 'translate(-50%, -50%)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <img 
                  src={getFlagUrl(t2Data.iso2, 160)} 
                  alt={t2Data.name} 
                  style={{
                    width: '90px',
                    height: '60px',
                    objectFit: 'cover',
                    border: '3px solid #ffffff',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.35)',
                    borderRadius: '2px'
                  }}
                />
                <span 
                  className="font-display" 
                  style={{ 
                    fontSize: '48px', 
                    color: '#ffffff', 
                    opacity: 0.3, 
                    fontWeight: 900,
                    fontFamily: "'Anton', sans-serif" 
                  }}
                >
                  #{captain2?.number || '10'}
                </span>
              </div>
            </div>
          )}

          {captain2?.img && (
            <img
              src={captain2.img}
              alt={captain2.name}
              style={{
                position: 'absolute',
                right: 0,
                bottom: '80px',
                width: '55%',
                height: '80%',
                objectFit: 'cover',
                objectPosition: 'top center',
                zIndex: 1,
                filter: 'drop-shadow(-4px 0 12px rgba(0,0,0,0.4))',
                transform: isHovered ? 'scale(1.06) scaleX(-1)' : 'scale(1) scaleX(-1)',
                transition: 'transform 0.4s ease-out',
                pointerEvents: 'none'
              }}
            />
          )}
        </div>
      </div>

      {/* 3. CENTER SPINE OVERLAY */}
      <div
        className="center-spine"
        style={{
          position: 'absolute',
          top: '30px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '12px',
          zIndex: 10,
          pointerEvents: 'none',
          transformOrigin: 'center top',
          transition: 'transform 0.4s ease'
        }}
      >
        {/* Team 1 flag + code */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
          <img
            src={getFlagUrl(t1Data.iso2, 80)}
            alt={t1Data.name}
            style={{
              width: '48px',
              height: '32px',
              objectFit: 'cover',
              border: '2px solid rgba(255,255,255,0.4)',
              borderRadius: '2px'
            }}
          />
          <span
            className="font-fwc"
            style={{
              fontSize: '32px',
              color: '#ffffff',
              lineHeight: 1,
              fontFamily: "'Anton', sans-serif",
              fontWeight: 900
            }}
          >
            {team1Code}
          </span>
        </div>

        {/* Score box / VS box */}
          {status !== 'upcoming' && (
            <div
              style={{
                background: 'rgba(0, 0, 0, 0.75)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '12px',
                padding: '16px 24px',
                textAlign: 'center',
                minWidth: '110px'
              }}
            >
              {status === 'live' ? (
                <>
                  <div
                    className="font-fwc"
                    style={{
                      fontSize: '48px',
                      color: '#ffffff',
                      lineHeight: 1,
                      fontFamily: "'Anton', sans-serif"
                    }}
                  >
                    {match.score1 || 0} - {match.score2 || 0}
                  </div>
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      fontSize: '11px',
                      color: '#E8192C',
                      fontWeight: 'bold',
                      marginTop: '4px'
                    }}
                  >
                    <div className="w-1.5 h-1.5 bg-[#E8192C] rounded-full animate-pulse"></div>
                    <span>LIVE {match.minute || "1'"}</span>
                  </div>
                </>
              ) : (
                // Full Time
                <>
                  <div
                    className="font-fwc"
                    style={{
                      fontSize: '48px',
                      color: '#ffffff',
                      lineHeight: 1,
                      fontFamily: "'Anton', sans-serif"
                    }}
                  >
                    {match.score1} - {match.score2}
                  </div>
                  <div style={{ fontSize: '11px', color: '#FFD700', fontWeight: 'bold', marginTop: '4px' }}>
                    FULL TIME
                  </div>
                </>
              )}
            </div>
          )}

        {/* Team 2 flag + code */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
          <span
            className="font-fwc"
            style={{
              fontSize: '32px',
              color: '#ffffff',
              lineHeight: 1,
              fontFamily: "'Anton', sans-serif",
              fontWeight: 900
            }}
          >
            {team2Code}
          </span>
          <img
            src={getFlagUrl(t2Data.iso2, 80)}
            alt={t2Data.name}
            style={{
              width: '48px',
              height: '32px',
              objectFit: 'cover',
              border: '2px solid rgba(255,255,255,0.4)',
              borderRadius: '2px'
            }}
          />
        </div>
      </div>

      {/* 4. BOTTOM INFO STRIP */}
      <div
        className="bottom-info-strip"
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: '100px',
          background: 'linear-gradient(to top, rgba(0, 0, 0, 0.95) 0%, rgba(0, 0, 0, 0.85) 60%, transparent 100%)',
          zIndex: 5,
          padding: '16px 20px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          pointerEvents: 'none'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2px' }}>
          {/* Row 1: date gold FWC2026 12px · phase badge */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span
              style={{
                fontSize: '11px',
                color: '#FFD700',
                fontWeight: 900,
                fontFamily: "'Anton', sans-serif",
                textTransform: 'uppercase'
              }}
            >
              {formattedDate}
            </span>
            <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '10px' }}>·</span>
            <span
              style={{
                fontSize: '10px',
                color: '#ffffff',
                background: 'rgba(255, 255, 255, 0.15)',
                padding: '2px 8px',
                borderRadius: '4px',
                fontWeight: 'bold',
                textTransform: 'uppercase'
              }}
            >
              {match.phase === 'group' ? `Group ${match.group}` : match.phase}
            </span>
          </div>

          {/* Row 4 right side status pills */}
          {status === 'live' ? (
            <span style={{ background: '#E8192C', color: '#fff', fontSize: '9px', fontWeight: 'black', padding: '3px 8px', borderRadius: '4px', letterSpacing: '0.05em' }}>● LIVE</span>
          ) : status === 'ft' ? (
            <span style={{ background: '#2E7D32', color: '#fff', fontSize: '9px', fontWeight: 'black', padding: '3px 8px', borderRadius: '4px', letterSpacing: '0.05em' }}>FT</span>
          ) : (
            <span style={{ background: '#0052A5', color: '#fff', fontSize: '9px', fontWeight: 'black', padding: '3px 8px', borderRadius: '4px', letterSpacing: '0.05em' }}>
              {matchDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          )}
        </div>

        {/* Row 2: "TEAM1 vs TEAM2" white FWC2026 22px */}
        <h3
          className="font-fwc"
          style={{
            fontSize: '22px',
            color: '#ffffff',
            lineHeight: 1.1,
            margin: '2px 0',
            fontFamily: "'Anton', sans-serif",
            textTransform: 'uppercase',
            fontWeight: 900
          }}
        >
          {t1Data.name} vs {t2Data.name}
        </h3>

        {/* Row 3: venue name grey Noto Sans 12px */}
        <p
          style={{
            fontSize: '12px',
            color: 'rgba(255, 255, 255, 0.5)',
            margin: 0,
            fontFamily: "'Noto Sans', sans-serif",
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }}
        >
          {match.venue} · {match.city} · {matchDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }).toLowerCase()}
        </p>
      </div>

      {/* Hover view Match Center pill */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.15)',
          opacity: isHovered ? 1 : 0,
          transition: 'opacity 0.3s ease',
          zIndex: 12,
          pointerEvents: 'none'
        }}
      >
        <div
          style={{
            backgroundColor: '#ffffff',
            color: '#000000',
            padding: '12px 24px',
            borderRadius: '999px',
            fontWeight: 900,
            fontSize: '13px',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
            transform: isHovered ? 'scale(1)' : 'scale(0.9)',
            transition: 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
          }}
        >
          View Match Center →
        </div>
      </div>
    </div>
  );
}
