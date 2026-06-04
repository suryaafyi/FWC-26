import React, { useEffect } from 'react';
import Hero from './components/Hero';
import Ticker from './components/Ticker';
import MatchOfTheDay from './components/MatchOfTheDay';
import MatchGrid from './components/MatchGrid';
import Pulse from './components/Pulse';
import GroupStandings from './components/GroupStandings';
import StarPlayers from './components/StarPlayers';

export default function Home({ setActivePage }) {
  useEffect(() => {
    const handleReveal = () => {
      const reveals = document.querySelectorAll('.reveal-up');
      reveals.forEach((elem) => {
        const windowHeight = window.innerHeight;
        const elementTop = elem.getBoundingClientRect().top;
        const revealThreshold = 100;

        if (elementTop < windowHeight - revealThreshold) {
          elem.classList.add('active');
        }
      });
    };

    window.addEventListener('scroll', handleReveal);
    // Initial call to reveal elements already in view
    handleReveal();

    return () => {
      window.removeEventListener('scroll', handleReveal);
    };
  }, []);

  return (
    <main style={{ paddingTop: '64px' }}>
      <Hero setActivePage={setActivePage} />
      <Ticker />
      <MatchOfTheDay />
      <MatchGrid setActivePage={setActivePage} />
      <Pulse />
      <GroupStandings setActivePage={setActivePage} />
      <StarPlayers />
    </main>
  );
}
