import React from 'react';

export default function Navbar({ activePage, setActivePage }) {
  const links = ['Home', 'Matches', 'Groups', 'Teams', 'Stats', 'Bracket'];

  return (
    <nav className="navbar">
      <span className="nav-wordmark">FIFA World Cup 2026</span>
      <div className="nav-links md:flex">
        {links.map((link) => (
          <a
            key={link}
            href={`#${link.toLowerCase()}`}
            className={activePage === link ? 'active' : ''}
            onClick={(e) => {
              e.preventDefault();
              setActivePage(link);
            }}
          >
            {link}
          </a>
        ))}
      </div>
      <div className="nav-actions">
        <button className="btn-login">Login</button>
      </div>
    </nav>
  );
}
