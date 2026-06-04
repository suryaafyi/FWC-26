import React, { useState, useEffect } from 'react';
import { getTournamentState, WC_START } from '../../../utils/tournamentState';

function FlipDigit({ value }) {
  const [currentVal, setCurrentVal] = useState(value);
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    if (value !== currentVal) {
      setIsFlipped(true);
      const timer = setTimeout(() => {
        setCurrentVal(value);
        setIsFlipped(false);
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [value, currentVal]);

  return (
    <span className={`digit ${isFlipped ? 'flip' : ''}`}>
      {currentVal}
    </span>
  );
}

export default function Hero({ setActivePage }) {
  const [gameState, setGameState] = useState('PRE_TOURNAMENT');
  const [timeLeft, setTimeLeft] = useState({ days: '00', hours: '00', minutes: '00', seconds: '00' });

  useEffect(() => {
    // Determine initial state
    setGameState(getTournamentState());

    const updateTimer = () => {
      const now = new Date();
      const difference = +WC_START - +now;

      if (difference > 0) {
        const d = Math.floor(difference / (1000 * 60 * 60 * 24));
        const h = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const m = Math.floor((difference / 1000 / 60) % 60);
        const s = Math.floor((difference / 1000) % 60);

        setTimeLeft({
          days: d.toString().padStart(2, '0'),
          hours: h.toString().padStart(2, '0'),
          minutes: m.toString().padStart(2, '0'),
          seconds: s.toString().padStart(2, '0')
        });
      } else {
        setTimeLeft({ days: '00', hours: '00', minutes: '00', seconds: '00' });
        setGameState(getTournamentState());
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, []);

  const isPreTournament = gameState === 'PRE_TOURNAMENT';

  return (
    <header className="hero">
      {/* Video Background Container */}
      <div className="hero-video-bg">
        <div className="video-foreground">
          <video
            src="/hero-bg.mp4"
            autoPlay
            loop
            muted
            playsInline
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
        {/* Overlays */}
        <div className="hero-overlay-gradient"></div>
        <div className="hero-overlay-radial"></div>
      </div>

      {/* Hero Content */}
      <div className="hero-content">
        <div className="flex flex-col items-start">

          {/* PRE_TOURNAMENT Pill */}
          {/* <!-- PRE_TOURNAMENT --> */}
          {isPreTournament && (
            <div className="live-pill pre-live-pill" style={{ borderColor: 'var(--fifa-gold)' }}>
              <span className="live-dot" style={{ backgroundColor: 'var(--fifa-gold)' }}></span>
              <span className="live-text" style={{ color: '#ffffff' }}>COUNTDOWN TO KICKOFF</span>
            </div>
          )}
          {/* <!-- /PRE_TOURNAMENT --> */}

          {/* LIVE_TOURNAMENT Pill */}
          {/* <!-- LIVE_TOURNAMENT --> */}
          {!isPreTournament && (
            <div className="live-pill">
              <span className="live-dot"></span>
              <span className="live-text">● LIVE NOW AT ESTADIO AZTECA</span>
            </div>
          )}
          {/* <!-- /LIVE_TOURNAMENT --> */}

          {/* Score Row / Countdown Clock */}
          {/* PRE_TOURNAMENT Countdown */}
          {/* <!-- PRE_TOURNAMENT --> */}
          {isPreTournament && (
            <div className="countdown-timer-wrapper" style={{ marginBottom: '48px' }}>
              <div className="countdown-timer">
                <div className="countdown-segment">
                  <FlipDigit value={timeLeft.days} />
                  <span className="countdown-label">DAYS</span>
                </div>
                <div className="countdown-divider">:</div>
                <div className="countdown-segment">
                  <FlipDigit value={timeLeft.hours} />
                  <span className="countdown-label">HRS</span>
                </div>
                <div className="countdown-divider">:</div>
                <div className="countdown-segment">
                  <FlipDigit value={timeLeft.minutes} />
                  <span className="countdown-label">MINS</span>
                </div>
                <div className="countdown-divider">:</div>
                <div className="countdown-segment">
                  <FlipDigit value={timeLeft.seconds} />
                  <span className="countdown-label">SECS</span>
                </div>
              </div>
            </div>
          )}
          {/* <!-- /PRE_TOURNAMENT --> */}

          {/* LIVE_TOURNAMENT Score */}
          {/* <!-- LIVE_TOURNAMENT --> */}
          {!isPreTournament && (
            <div className="hero-score-row">
              <span className="hero-team-code">MEX</span>
              <div className="hero-score-box">
                <span className="hero-score">1 - 0</span>
              </div>
              <span className="hero-team-code">RSA</span>
            </div>
          )}
          {/* <!-- /LIVE_TOURNAMENT --> */}

          {/* Headline Stacked */}
          <div className="hero-headline">
            <h1 className="hero-title-stack">
              <span className="we-are">WE ARE</span>
              <span className="year">26</span>
            </h1>
          </div>

          {/* Body Copy */}
          <div className="hero-description">
            {isPreTournament ? (
              /* PRE_TOURNAMENT description */
              /* <!-- PRE_TOURNAMENT --> */
              <p>
                The countdown is on. 48 nations, 16 iconic host cities, one ultimate prize. Join us in North America on June 11, 2026 for the greatest show on Earth.
              </p>
              /* <!-- /PRE_TOURNAMENT --> */
            ) : (
              /* LIVE_TOURNAMENT description */
              /* <!-- LIVE_TOURNAMENT --> */
              <p>
                Experience the largest World Cup in history. Three nations, 16 host cities, and one ultimate dream. Welcome to North America.
              </p>
              /* <!-- /LIVE_TOURNAMENT --> */
            )}
          </div>

          {/* CTAs */}
          <div className="hero-ctas">
            {isPreTournament ? (
              /* PRE_TOURNAMENT CTAs */
              /* <!-- PRE_TOURNAMENT --> */
              <>
                <button className="btn-hero btn-solid"
                  onClick={() => window.open('https://www.fifa.com/en/tickets', '_blank')}
                >GET TICKETS</button>
                <button className="btn-hero btn-outline" onClick={() => setActivePage && setActivePage('Groups')}>EXPLORE GROUPS</button>
              </>
              /* <!-- /PRE_TOURNAMENT --> */
            ) : (
              /* LIVE_TOURNAMENT CTAs */
              /* <!-- LIVE_TOURNAMENT --> */
              <>
                <button className="btn-hero btn-solid">Watch Highlights</button>
                <button className="btn-hero btn-outline" onClick={() => setActivePage && setActivePage('Matches')}>Match Center</button>
              </>
              /* <!-- /LIVE_TOURNAMENT --> */
            )}
          </div>
        </div>
      </div>

      {/* Next Match Card / Opening Match Card */}
      <div className="hero-next-match">
        {isPreTournament ? (
          /* PRE_TOURNAMENT Opening Match Details */
          /* <!-- PRE_TOURNAMENT --> */
          <>
            <div className="next-match-header">
              <span className="title">OPENING MATCH • JUNE 11</span>
              <span className="group-tag" style={{ color: 'var(--fifa-gold)' }}>GROUP A</span>
            </div>
            <div className="next-match-teams">
              <div className="next-team-item">
                <img
                  src="https://cdn.jsdelivr.net/gh/lipis/flag-icons/flags/4x3/mx.svg"
                  alt="Mexico"
                  width="40"
                  height="24"
                  className="flag-img"
                  style={{ border: '1px solid rgba(255,255,255,0.1)', objectFit: 'cover' }}
                />
                <span className="next-team-name">MEX</span>
              </div>
              <span className="next-vs">VS</span>
              <div className="next-team-item">
                <span className="next-team-name">RSA</span>
                <img
                  src="https://cdn.jsdelivr.net/gh/lipis/flag-icons/flags/4x3/za.svg"
                  alt="South Africa"
                  width="40"
                  height="24"
                  className="flag-img"
                  style={{ border: '1px solid rgba(255,255,255,0.1)', objectFit: 'cover' }}
                />
              </div>
            </div>
            <div style={{ marginTop: '12px', fontSize: '11px', color: 'var(--mid-grey)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Estadio Azteca, Mexico City • 19:00 LOCAL
            </div>
          </>
          /* <!-- /PRE_TOURNAMENT --> */
        ) : (
          /* LIVE_TOURNAMENT Next Match Details */
          /* <!-- LIVE_TOURNAMENT --> */
          <>
            <div className="next-match-header">
              <span className="title">NEXT MATCH @ 18:00</span>
              <span className="group-tag">GROUP B</span>
            </div>
            <div className="next-match-teams">
              <div className="next-team-item">
                <img
                  src="https://cdn.jsdelivr.net/gh/lipis/flag-icons/flags/4x3/us.svg"
                  alt="USA"
                  width="40"
                  height="24"
                  className="flag-img"
                  style={{ border: '1px solid rgba(255,255,255,0.1)', objectFit: 'cover' }}
                />
                <span className="next-team-name">USA</span>
              </div>
              <span className="next-vs">VS</span>
              <div className="next-team-item">
                <span className="next-team-name">CAN</span>
                <img
                  src="https://cdn.jsdelivr.net/gh/lipis/flag-icons/flags/4x3/ca.svg"
                  alt="Canada"
                  width="40"
                  height="24"
                  className="flag-img"
                  style={{ border: '1px solid rgba(255,255,255,0.1)', objectFit: 'cover' }}
                />
              </div>
            </div>
          </>
          /* <!-- /LIVE_TOURNAMENT --> */
        )}
      </div>
    </header>
  );
}
