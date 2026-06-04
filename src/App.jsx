import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home/Home';
import Matches from './pages/Matches/Matches';
import Groups from './pages/Groups/Groups';
import Teams from './pages/Teams/Teams';
import Stats from './pages/Stats/Stats';
import Bracket from './pages/Bracket/Bracket';

export default function App() {
  const [activePage, setActivePage] = useState('Home');

  const renderContent = () => {
    switch (activePage) {
      case 'Home':
        return <Home setActivePage={setActivePage} />;
      case 'Matches':
        return <Matches />;
      case 'Groups':
        return <Groups />;
      case 'Teams':
        return <Teams />;
      case 'Stats':
        return <Stats />;
      case 'Bracket':
        return <Bracket />;

      default:
        return (
          <main
            style={{
              paddingTop: '120px',
              paddingBottom: '80px',
              minHeight: '60vh',
              textAlign: 'center',
              fontFamily: 'var(--font-body)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '16px'
            }}
          >
            <h1 className="text-heading-md" style={{ color: 'var(--fifa-red)' }}>
              {activePage} Section
            </h1>
            <p style={{ color: 'var(--mid-grey)', fontSize: '18px' }}>
              We are working hard to bring you the latest stats and details. Stay tuned!
            </p>
          </main>
        );
    }
  };

  return (
    <>
      <Navbar activePage={activePage} setActivePage={setActivePage} />
      {renderContent()}
      {activePage !== 'Stats' && <Footer />}
    </>
  );
}
