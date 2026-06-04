import React from 'react';

const players = [
  {
    name: 'Lionel Messi',
    nation: 'ARGENTINA',
    flag: 'ar',
    number: '10',
    gradient: 'linear-gradient(135deg, #74ACDF 0%, #FFFFFF 50%, #74ACDF 100%)',
    textColor: '#0F172A',
    statValue: 'G: 3',
    statLabel: 'GOALS SCORED',
    imageName: 'Messi.png'
  },
  {
    name: 'Kylian Mbappé',
    nation: 'FRANCE',
    flag: 'fr',
    number: '10',
    gradient: 'linear-gradient(135deg, #051440 0%, #2A3B7C 50%, #EC1920 100%)',
    textColor: '#FFFFFF',
    statValue: 'A: 2',
    statLabel: 'ASSISTS',
    imageName: 'Kylian-Mbappe.png'
  },
  {
    name: 'Vinícius Jr',
    nation: 'BRAZIL',
    flag: 'br',
    number: '7',
    gradient: 'linear-gradient(135deg, #FFDF00 0%, #009C3B 50%, #002776 100%)',
    textColor: '#0F172A',
    statValue: 'V: 35.5',
    statLabel: 'TOP SPEED KM/H',
    imageName: 'Vinícius-Jr.png'
  },
  {
    name: 'Jude Bellingham',
    nation: 'ENGLAND',
    flag: 'gb-eng',
    number: '10',
    gradient: 'linear-gradient(135deg, #FFFFFF 0%, #F1F5F9 50%, #CF081F 100%)',
    textColor: '#0F172A',
    statValue: 'P: 94%',
    statLabel: 'PASS ACCURACY',
    imageName: 'Jude-Bellingham.png'
  },
  {
    name: 'Erling Haaland',
    nation: 'NORWAY',
    flag: 'no',
    number: '9',
    gradient: 'linear-gradient(135deg, #BA0C2F 0%, #00205B 100%)',
    textColor: '#FFFFFF',
    statValue: 'G: 5',
    statLabel: 'QUALIFYING GOALS',
    imageName: 'Erling-Haaland.png'
  },
  {
    name: 'Christian Pulisic',
    nation: 'USA',
    flag: 'us',
    number: '10',
    gradient: 'linear-gradient(135deg, #0A3161 0%, #FFFFFF 50%, #B31942 100%)',
    textColor: '#FFFFFF',
    statValue: 'D: 12',
    statLabel: 'DRIBBLES COMPLETED',
    imageName: 'Christian-Pulisic.png'
  },
  {
    name: 'Achraf Hakimi',
    nation: 'MOROCCO',
    flag: 'ma',
    number: '2',
    gradient: 'linear-gradient(135deg, #C1272D 0%, #006233 100%)',
    textColor: '#FFFFFF',
    statValue: 'T: 18',
    statLabel: 'TACKLES WON',
    imageName: 'Achraf-Hakimi.png'
  },
  {
    name: 'Pedri',
    nation: 'SPAIN',
    flag: 'es',
    number: '8',
    gradient: 'linear-gradient(135deg, #C60B1E 0%, #F1BF00 50%, #C60B1E 100%)',
    textColor: '#FFFFFF',
    statValue: 'C: 45',
    statLabel: 'CHANCES CREATED',
    imageName: 'Pedri.png'
  }
];

export default function StarPlayers() {
  return (
    <section className="py-3xl reveal-up" style={{ backgroundColor: 'var(--fifa-black)', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
      <div className="container mb-xl">
        <span className="text-primary text-label-eyebrow">Star Players</span>
        <h2 className="text-heading-md uppercase" style={{ color: '#ffffff' }}>Featured Talent</h2>
      </div>

      <div className="container">
        <div className="star-players-snap-container">
          {players.map((player) => {
            const isDark = player.textColor === '#0F172A';
            return (
              <div
                key={player.name}
                className="star-player-snap-card panini-card shimmer-sweep"
                style={{
                  background: player.gradient,
                  color: player.textColor,
                  width: '300px',
                  height: '460px',
                  borderRadius: '16px',
                  padding: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  border: isDark ? '1px solid rgba(0,0,0,0.1)' : '1px solid rgba(255,255,255,0.15)',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
                  flexShrink: 0,
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                {/* Header row: Nation & Flag */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative', zIndex: 10 }}>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontSize: '11px', fontWeight: 'bold', letterSpacing: '0.1em', opacity: 0.8 }}>{player.nation}</span>
                    <span style={{ fontFamily: 'var(--font-display)', fontSize: '24px', lineHeight: 1, marginTop: '4px' }}>#{player.number}</span>
                  </div>
                  <img
                    src={`https://cdn.jsdelivr.net/gh/lipis/flag-icons/flags/4x3/${player.flag.toLowerCase()}.svg`}
                    alt={player.nation}
                    width="32"
                    height="20"
                    style={{ objectFit: 'cover', borderRadius: '2px', border: isDark ? '1px solid rgba(0,0,0,0.15)' : '1px solid rgba(255,255,255,0.2)' }}
                  />
                </div>

                {/* Player Cutout Image */}
                <img
                  src={`/${player.imageName}`}
                  alt={player.name}
                  style={{
                    position: 'absolute',
                    bottom: '0',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    height: '80%',
                    width: 'auto',
                    objectFit: 'contain',
                    pointerEvents: 'none',
                    zIndex: 2,
                    transition: 'transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)'
                  }}
                  className="player-cutout-img"
                />

                {/* Info Box */}
                <div
                  style={{
                    position: 'relative',
                    zIndex: 10,
                    background: isDark ? 'rgba(255, 255, 255, 0.85)' : 'rgba(0, 0, 0, 0.8)',
                    backdropFilter: 'blur(8px)',
                    margin: '0 -24px -24px -24px',
                    padding: '20px 24px',
                    borderBottomLeftRadius: '16px',
                    borderBottomRightRadius: '16px',
                    borderTop: isDark ? '1px solid rgba(0,0,0,0.05)' : '1px solid rgba(255,255,255,0.1)'
                  }}
                >
                  <h3 style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '28px',
                    textTransform: 'uppercase',
                    lineHeight: 1.1,
                    margin: 0,
                    color: isDark ? '#0F172A' : '#FFFFFF'
                  }}>
                    {player.name}
                  </h3>
                  <div style={{ height: '1.5px', background: isDark ? 'rgba(15,23,42,0.15)' : 'rgba(255,255,255,0.2)', margin: '8px 0 6px 0' }}></div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '11px', fontWeight: 'bold', opacity: 0.8, textTransform: 'uppercase', color: isDark ? '#555' : '#CCC' }}>{player.statLabel}</span>
                    <span style={{ fontFamily: 'var(--font-display)', fontSize: '18px', color: isDark ? '#E8192C' : 'var(--fifa-gold)' }}>{player.statValue}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
