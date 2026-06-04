import React, { useState, useEffect, useRef } from 'react';

function PulseCounter({ target, label }) {
  const [count, setCount] = useState(0);
  const elementRef = useRef(null);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setHasStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (elementRef.current) {
      observer.observe(elementRef.current);
    }
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!hasStarted) return;

    const duration = 1500; // 1.5 seconds
    const startTime = performance.now();

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Quadratic ease-out progress
      const easeProgress = progress * (2 - progress);
      const currentCount = Math.floor(easeProgress * target);

      setCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(target);
      }
    };

    requestAnimationFrame(animate);
  }, [hasStarted, target]);

  return (
    <div ref={elementRef} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <span className="stat-number" style={{ lineHeight: '1', display: 'block' }}>{count}</span>
      <span className="stat-label" style={{ marginTop: '12px', display: 'block', textAlign: 'center' }}>{label}</span>
    </div>
  );
}

export default function Pulse() {
  return (
    <section className="pulse-section py-3xl px-gutter reveal-up">
      <div className="container flex flex-col md:flex-row justify-between items-center gap-xl">
        <div className="pulse-header mb-xl md:mb-0">
          <span className="text-fifa-gold text-label-eyebrow" style={{ display: 'block', marginBottom: '12px' }}>REAL-TIME DATA</span>
          <h2 className="text-white text-display-lg" style={{ lineHeight: '1.05', margin: '16px 0', fontSize: '72px' }}>
            THE PULSE OF<br />26
          </h2>
          <div className="pulse-red-line" style={{ marginTop: '24px' }}></div>
        </div>
        <div className="pulse-stats-grid">
          <PulseCounter target={48} label="TEAMS" />
          <PulseCounter target={104} label="MATCHES" />
          <PulseCounter target={16} label="CITIES" />
          <PulseCounter target={3} label="NATIONS" />
        </div>
      </div>
    </section>
  );
}
