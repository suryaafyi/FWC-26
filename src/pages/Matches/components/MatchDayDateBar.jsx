import React, { useEffect, useState } from 'react';

export default function MatchDayDateBar({ dates, activeDate, onChange }) {
  const [mounted, setMounted] = useState(false);
  const today = new Date();

  useEffect(() => {
    // Stagger animation trigger
    const timer = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(timer);
  }, []);

  const getDayName = (date) => {
    return date.toLocaleDateString('en-US', { weekday: 'short', timeZone: 'America/Chicago' }).toUpperCase();
  };

  const getMonthName = (date) => {
    return date.toLocaleDateString('en-US', { month: 'short', timeZone: 'America/Chicago' }).toUpperCase();
  };

  const isSameDay = (d1, d2) => {
    if (!d1 || !d2) return false;
    const s1 = d1.toLocaleDateString('en-CA', { timeZone: 'America/Chicago' });
    const s2 = d2.toLocaleDateString('en-CA', { timeZone: 'America/Chicago' });
    return s1 === s2;
  };

  return (
    <div
      style={{
        width: '100%',
        backgroundColor: '#ffffff',
        borderBottom: '1px solid #E0E0E0',
        padding: '12px 0',
        overflow: 'hidden'
      }}
    >
      <div
        style={{
          display: 'flex',
          gap: '8px',
          overflowX: 'auto',
          padding: '4px 0',
          scrollbarWidth: 'none', // Hide scrollbar in Firefox
          msOverflowStyle: 'none', // Hide scrollbar in IE/Edge
          WebkitOverflowScrolling: 'touch'
        }}
        className="no-scrollbar" // Hide scrollbar in Webkit browsers
      >
        {dates.map((dateObj, index) => {
          const isActive = isSameDay(dateObj, activeDate);
          const isToday = isSameDay(dateObj, today);
          
          const dayName = getDayName(dateObj);
          const monthName = getMonthName(dateObj);
          const dateNum = new Intl.DateTimeFormat('en-US', { day: 'numeric', timeZone: 'America/Chicago' }).format(dateObj);

          return (
            <div
              key={index}
              onClick={() => onChange && onChange(dateObj)}
              style={{
                width: '80px',
                minWidth: '80px',
                height: '72px',
                borderRadius: '12px',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                transition: 'background-color 200ms ease, border-color 200ms ease, transform 150ms ease, box-shadow 200ms ease',
                backgroundColor: isActive ? '#E8192C' : '#F5F5F5',
                border: isActive ? '1px solid #E8192C' : '1px solid #E0E0E0',
                boxShadow: isActive ? '0 4px 12px rgba(232,25,44,0.3)' : 'none',
                opacity: mounted ? 1 : 0,
                transform: mounted 
                  ? (isActive ? 'scale(1)' : 'translateY(0)') 
                  : 'translateX(-20px)',
                transitionDelay: mounted ? '0ms' : `${index * 40}ms`
              }}
              className="date-pill-hover"
            >
              {/* Day name */}
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  color: isActive ? '#ffffff' : '#9E9E9E',
                  lineHeight: 1,
                  fontFamily: "'Noto Sans', sans-serif"
                }}
              >
                {dayName}
              </span>

              {/* Date number */}
              <span
                style={{
                  fontSize: isActive ? '32px' : '28px',
                  fontFamily: "'Anton', sans-serif",
                  fontWeight: 900,
                  color: isActive ? '#ffffff' : '#000000',
                  lineHeight: 1.1,
                  marginTop: '2px',
                  marginBottom: '2px',
                  transition: 'font-size 150ms ease'
                }}
              >
                {dateNum}
              </span>

              {/* Month */}
              <span
                style={{
                  fontSize: '10px',
                  color: isActive ? '#ffffff' : '#9E9E9E',
                  lineHeight: 1,
                  fontFamily: "'Noto Sans', sans-serif",
                  fontWeight: 500
                }}
              >
                {monthName}
              </span>

              {/* TODAY indicator (gold dot) */}
              {isToday && (
                <div
                  style={{
                    position: 'absolute',
                    bottom: '4px',
                    width: '4px',
                    height: '4px',
                    backgroundColor: '#FFD700',
                    borderRadius: '50%'
                  }}
                />
              )}

              {/* HAS MATCHES indicator (grey/white dot) */}
              {/* We show a simple small dot, white if active, grey otherwise */}
              <div
                style={{
                  position: 'absolute',
                  top: '4px',
                  width: '4px',
                  height: '4px',
                  backgroundColor: isActive ? '#ffffff' : '#9E9E9E',
                  borderRadius: '50%'
                }}
              />
            </div>
          );
        })}
      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none !important;
        }
        .date-pill-hover:hover {
          background-color: #EBEBEB !important;
          transform: translateY(-2px) !important;
        }
        .date-pill-hover:active {
          transform: scale(0.95) !important;
        }
      `}</style>
    </div>
  );
}
