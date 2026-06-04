import React, { useState, useEffect } from 'react';
import PaniniCard from './components/PaniniCard';
import { TEAM_DATA, getFlagUrl, GROUP_TEAMS } from '../../utils/matchesData';

const getConfederation = (code) => {
  const uefa = ['ENG', 'GER', 'ESP', 'POR', 'NED', 'FRA', 'BEL', 'NOR', 'SUI', 'SCO', 'UKR', 'SWE', 'CRO', 'SRB', 'AUT', 'CZE', 'BIH', 'TUR'];
  const conmebol = ['ARG', 'BRA', 'CHI', 'COL', 'ECU', 'PAR', 'URU'];
  const concacaf = ['USA', 'MEX', 'CAN', 'CRC', 'PAN', 'HON', 'GTM', 'CUW', 'HAI'];
  const caf = ['MAR', 'GHA', 'SEN', 'NGR', 'TUN', 'EGY', 'ALG', 'CIV', 'CMR', 'DRC', 'SSD', 'RSA'];
  const afc = ['KOR', 'JAP', 'QAT', 'IRN', 'IRQ', 'SAU', 'UZB', 'JOR', 'AUS'];
  if (uefa.includes(code)) return 'UEFA';
  if (conmebol.includes(code)) return 'CONMEBOL';
  if (concacaf.includes(code)) return 'CONCACAF';
  if (caf.includes(code)) return 'CAF';
  if (afc.includes(code)) return 'AFC';
  return 'OFC';
};

const getRank = (code) => {
  const ranks = {
    ARG: 1, FRA: 2, ENG: 3, BEL: 4, BRA: 5, POR: 6, NED: 7, ESP: 8, ITA: 9, CRO: 10,
    GER: 11, USA: 13, MEX: 15, SEN: 17, JAP: 18, MAR: 12, COL: 14, URU: 16, SUI: 19,
    DEN: 21, KOR: 22, AUS: 24, UKR: 22, AUT: 25, SWE: 28, ECU: 31, WAL: 29, NOR: 47,
    CAN: 49, RSA: 59, GHA: 68, CZE: 36, BIH: 74, QAT: 34, SCO: 39, PAR: 56, TUR: 40,
    CUW: 88, CIV: 38, TUN: 41, EGY: 30, IRN: 20, NZL: 104, CPV: 65, SAU: 53, IRQ: 58,
    ALG: 43, JOR: 71, DRC: 63, UZB: 64, PAN: 45, GTM: 108, HAI: 86, SSD: 120
  };
  return ranks[code] || 50;
};

const getAppearances = (code) => {
  const apps = {
    BRA: 22, GER: 20, ITA: 18, ARG: 18, MEX: 17, ESP: 16, FRA: 16, ENG: 16, BEL: 14,
    URU: 14, SWE: 12, SUI: 12, USA: 11, NED: 11, KOR: 11, CHI: 9, POR: 8, SCO: 8,
    CMR: 8, PAR: 8, COL: 6, MAR: 6, NGR: 6, TUN: 6, SAU: 6, IRN: 6, CRC: 6, AUT: 7,
    CZE: 9, AUS: 6, CRO: 6, EGY: 3, RSA: 3, GHA: 4, SEN: 3, CAN: 2, TUR: 2, ALG: 4,
    CIV: 3, NZL: 2, DRC: 1, UKR: 1, BIH: 1, UAE: 1, IRQ: 1, CPV: 0, HAI: 1, PAN: 1,
    GTM: 0, UZB: 0, JOR: 0, CUW: 0, SSD: 0, QAT: 1
  };
  return apps[code] || 1;
};

const all48Teams = [];
Object.entries(GROUP_TEAMS).forEach(([groupLetter, codes]) => {
  codes.forEach(code => {
    const data = TEAM_DATA[code];
    if (data) {
      all48Teams.push({
        name: data.name,
        code: code,
        color: data.color || '#74ACDF',
        stage: ['USA', 'MEX', 'CAN'].includes(code) ? 'Qualified (Host)' : 'Qualified',
        group: `Group ${groupLetter}`,
        rank: getRank(code),
        appearances: getAppearances(code),
        confederation: getConfederation(code)
      });
    }
  });
});

const getMapIso = (code) => {
  if (code === 'ENG') return 'gb';
  const iso = TEAM_DATA[code]?.iso2;
  if (!iso) return 'us';
  if (iso === 'gb-eng') return 'gb';
  if (iso === 'gb-sct') return 'gb';
  return iso.toLowerCase();
};

const argentinaSquad = {
  goalkeepers: [
    {
      name: 'E. MARTINEZ',
      photo: '/ARG/E.Martinez.png',
      rating: 87,
      position: 'GK',
      height: '1.95 m',
      dob: '02-09-1992',
      stats: { div: 87, han: 84, kic: 82, ref: 88, spd: 48, pos: 85 }
    }
  ],
  defenders: [
    {
      name: 'ROMERO',
      photo: '/ARG/Romero.png',
      rating: 85,
      position: 'CB',
      height: '1.85 m',
      dob: '27-04-1998',
      stats: { pac: 74, sho: 45, pas: 63, dri: 65, def: 86, phy: 84 }
    },
    {
      name: 'OTAMENDI',
      photo: '/ARG/Nicolás Otamendi.png',
      rating: 82,
      position: 'CB',
      height: '1.83 m',
      dob: '12-02-1988',
      stats: { pac: 55, sho: 48, pas: 62, dri: 60, def: 82, phy: 81 }
    }
  ],
  midfielders: [
    {
      name: 'DE PAUL',
      photo: '/ARG/Rodrigo De Paul.png',
      rating: 84,
      position: 'CM',
      height: '1.80 m',
      dob: '24-05-1994',
      stats: { pac: 76, sho: 77, pas: 83, dri: 82, def: 76, phy: 81 }
    },
    {
      name: 'MAC ALLISTER',
      photo: '/ARG/Mac Allister.png',
      rating: 84,
      position: 'CM',
      height: '1.76 m',
      dob: '24-12-1998',
      stats: { pac: 70, sho: 79, pas: 84, dri: 82, def: 75, phy: 74 }
    }
  ],
  forwards: [
    {
      name: 'MESSI',
      photo: '/ARG/Messi-Card.png',
      isStar: true,
      rating: 90,
      position: 'RW',
      height: '1.70 m',
      dob: '24-06-1987',
      stats: { pac: 80, sho: 87, pas: 90, dri: 92, def: 33, phy: 64 }
    },
    {
      name: 'ALVAREZ',
      photo: '/ARG/Julián Álvarez.png',
      isStar: true,
      rating: 84,
      position: 'ST',
      height: '1.70 m',
      dob: '31-01-2000',
      stats: { pac: 82, sho: 84, pas: 76, dri: 82, def: 45, phy: 76 }
    },
    {
      name: 'L. MARTINEZ',
      photo: '/ARG/Lautaro Martínez.png',
      rating: 87,
      position: 'ST',
      height: '1.74 m',
      dob: '22-08-1997',
      stats: { pac: 81, sho: 87, pas: 72, dri: 84, def: 48, phy: 83 }
    }
  ]
};

export default function Teams() {
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGroup, setSelectedGroup] = useState('All Groups');
  const [selectedConf, setSelectedConf] = useState('Confederation');
  const [revealCards, setRevealCards] = useState(false);

  useEffect(() => {
    setRevealCards(false);
    const timer = setTimeout(() => {
      setRevealCards(true);
    }, 100);
    return () => clearTimeout(timer);
  }, [selectedTeam, searchQuery, selectedGroup, selectedConf]);

  const handleBackToTeams = () => {
    setSelectedTeam(null);
  };

  const getSquadForTeam = (team) => {
    const iso2 = TEAM_DATA[team.code]?.iso2 || 'us';
    const flagUrl = getFlagUrl(iso2, 40);

    const enrichList = (list, defaultPos) => {
      return list.map(player => {
        let defaultRating = 80;
        let defaultStats = { pac: 75, sho: 60, pas: 72, dri: 75, def: 65, phy: 70 };
        let defaultHeight = '1.80 m';
        let defaultDob = '15-05-1995';
        if (defaultPos === 'GK') {
          defaultRating = 81;
          defaultHeight = '1.90 m';
          defaultDob = '10-09-1992';
          defaultStats = { div: 81, han: 78, kic: 76, ref: 83, spd: 45, pos: 79 };
        } else if (defaultPos === 'CB') {
          defaultRating = 79;
          defaultHeight = '1.86 m';
          defaultDob = '24-03-1996';
          defaultStats = { pac: 68, sho: 40, pas: 58, dri: 60, def: 80, phy: 78 };
        } else if (defaultPos === 'CM') {
          defaultRating = 81;
          defaultHeight = '1.78 m';
          defaultDob = '12-11-1997';
          defaultStats = { pac: 73, sho: 71, pas: 80, dri: 79, def: 72, phy: 74 };
        } else if (defaultPos === 'ST') {
          defaultRating = 82;
          defaultHeight = '1.82 m';
          defaultDob = '20-08-1998';
          defaultStats = { pac: 83, sho: 81, pas: 70, dri: 79, def: 35, phy: 72 };
        }

        return {
          ...player,
          flagUrl,
          teamCode: team.code,
          rating: player.rating || defaultRating,
          position: player.position || defaultPos,
          stats: player.stats || defaultStats,
          height: player.height || defaultHeight,
          dob: player.dob || defaultDob
        };
      });
    };

    if (team.name === 'Argentina') {
      return {
        goalkeepers: enrichList(argentinaSquad.goalkeepers, 'GK'),
        defenders: enrichList(argentinaSquad.defenders, 'CB'),
        midfielders: enrichList(argentinaSquad.midfielders, 'CM'),
        forwards: enrichList(argentinaSquad.forwards, 'ST')
      };
    }

    const rawFallbackSquad = {
      goalkeepers: [
        { name: 'GK 1', photo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDMGWcsRBzMJ0d4olKeo3ew5kfKpqNftv9iOv6ih6Gw37jvkZUVGCipWutVlJbZbICMbA8lu1F0MlC5rEOEW-DaCzg0T-KwFMzEXwtgxLp8di0LcN03EJjyEQ2s-Y7b2vTz_x_1uMMUo_TTPWY57WT4iTzw2rSdxIlsBwrCoEWAmGr-gvKyh9xPIC-SjG932IdRP98kIxn5ZpRw5volMdG1IaViITCCWNJOpP1FLuewpJIrnUJA3J3RrQKIPUQAWsyMIihGZXbbrls' }
      ],
      defenders: [
        { name: 'DEF 1', photo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD-sSqjkt7X7pxpVYYiidGqT8ESfgxZ6GKNYSoaxe1RsTEr7GHCiwZif-1RQQek-3vzCXmfZseaZ_Lj5O5sN4QOJ3m7yE8tV-E8xpWdGSjdiND1C2NZhT-qeB5ca3VUXoH6rKb1NJZFrhilZg7AhhNC4Ve8YfcKQMO31kjqDeXG3D3eCyiHP0T4cB0yq-YHdrgfzqQYIFYY2CT6jvJuFxfuBTHbQb7mDEuxmrmQ17CDgKq0B7kjxwIr9eWLLmsLBdV3eVdzck0l_E0' },
        { name: 'DEF 2', photo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAdLQYnKFH2uIjAT2Nl_hZRGi_JtHifKQDNjmeGnpVcZgs4pHQrxUszRAiY0pyb8W_lUmuRkQYxTrAd8CmV3WDlLPS99_JQmGqIhl8OtsbRzn4T-TbkjLCfkUTQs4iJRAvqJ7N_OsHdWgcx9FswITY_5ufZum_Pb1RU4VrICBA9o8llD5bHn0ag9xsb3Nlg46870DjylFqo2O4KmMQRqrq97WWeulGvCTtrNW9wSqVvWXcKjYXCOWVLx8yCVnjkdG-aekp-_F3Mq5Y' }
      ],
      midfielders: [
        { name: 'MID 1', photo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCK9MwPGPt9ECW02cR3k54nqtZe7NBB78iIOdl5EpeWumSfXNYnaGnxOcG0oqG14QKJ1inEgsnREXi8Eyl5XNjdzFlVZWbKASlIo_F73hTmTZhJxZUeGJhLT6rfG3B4DdEJNIEm--L846sM8RGC0aLuq52ZiaMSQItwuNA2lR0sZ9dV9c-yY6STADDqj_RE1ffKad5VKXGsCOFKkskd6LFHO5JDNBomvx8L2B2Fac_jbjXxNyPJAILCaM5XSZY0edfaJ5QO5ePH_JM' },
        { name: 'MID 2', photo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDwwEd1Ceg0GjmvChFT4wyXfuk84-KzjbUYqOe8pwTNZ0FUZaeUTlnRn4lZE-wqWRrt2JepHlIkc5J2lJ3V6j51n5CmgCm56BE1WtFoE2unQolAqDbqOt2Vh0vE4k3FN1i7Q3gdXwXN8InGXg2uRXtVltj9eHBt_yr8PN1OhzxYxCScvZ-y1XEDeguJ5FXyrIiF6QIdU9P1ArP2u2TnTgjhPxhvWS2oUl1oZbXVp7iI-yQqEaxdgazFoerAwaNta0lpgp6s_HRUYVc' }
      ],
      forwards: [
        { name: 'STAR 1', photo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA2cBFs6OYOaJxzR23mhgTi18TZtmz85FOOz493J2jiGOXCRO6DlAN4bzyGEe4mD3qY-pewvy38kuklfBEWaMpU2O9hE1uXll4KCB89wsoMfGlPShTbruC8hXdO5pfyIgqxlzKfeZjAbpxgb_owqgQzP3ntOfWvlBXnQX55igcZkAI8OBqBxXVJhJ5MMuRXjNjmIHC6w3uV7nmhYPiVt0UJJ_1C5p0kdhnnpyAmmsubnTkoCY-Oyl5Ip4Bln0r7Lmwdej4-4Ha0MZw', isStar: true },
        { name: 'FWD 1', photo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBIAugW9Fv9MpcT17YkR6BqYeGKLGD2EZIZSkWW0xDCXouq_bxmN3soEXiuOMJpLhAdqVeu8ak0VD6V8yXDz5Gnu1va6vFjbONx_KiP-CELZ8MJQJp82p1JpicpjtAn_H5oROuDNFOKEImiX3jIF0HZnzp_TzaZQ-_tjibOwq0Mdw1E-QxIeU0H1_SNuhyyjlYp2WSyuLxyo-H4x6-AqvFiwhH35QZqwHAsLDPxirsMeLqlZIYNqf-07kqF83MHR0Uqbthmxf2PYN4' }
      ]
    };

    return {
      goalkeepers: enrichList(rawFallbackSquad.goalkeepers, 'GK'),
      defenders: enrichList(rawFallbackSquad.defenders, 'CB'),
      midfielders: enrichList(rawFallbackSquad.midfielders, 'CM'),
      forwards: enrichList(rawFallbackSquad.forwards, 'ST')
    };
  };

  const filteredTeams = all48Teams.filter((team) => {
    const matchesSearch = team.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      team.code.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGroup = selectedGroup === 'All Groups' || team.group === selectedGroup;
    const matchesConf = selectedConf === 'Confederation' || team.confederation === selectedConf;
    return matchesSearch && matchesGroup && matchesConf;
  }).sort((a, b) => a.rank - b.rank);

  return (
    <div style={{ paddingTop: selectedTeam ? '0px' : '64px', minHeight: '100vh', backgroundColor: 'var(--background)' }}>
      {/* Broadcast Ticker Strip for Teams Page */}
      {!selectedTeam && (
        <div className="w-full bg-fifa-black h-12 flex items-center overflow-hidden whitespace-nowrap border-b border-primary/20">
          <div className="flex animate-[marquee_30s_linear_infinite]" style={{ display: 'flex', width: 'max-content' }}>
            <span className="flex items-center px-lg text-white font-body-bold text-label-caption uppercase tracking-widest">
              <span className="w-2 h-2 bg-primary rounded-full mr-2 animate-pulse"></span> LIVE: QUALIFIERS CONCLUDED
            </span>
            <span className="flex items-center px-lg text-white font-body-bold text-label-caption uppercase tracking-widest">
              <span className="w-2 h-2 bg-secondary rounded-full mr-2"></span> DRAW CEREMONY: JUNE 2026
            </span>
            <span className="flex items-center px-lg text-white font-body-bold text-label-caption uppercase tracking-widest">
              <span className="w-2 h-2 bg-primary rounded-full mr-2 animate-pulse"></span> WORLD CUP 2026: 48 TEAMS READY
            </span>
            {/* Duplicate for infinite loop */}
            <span className="flex items-center px-lg text-white font-body-bold text-label-caption uppercase tracking-widest">
              <span className="w-2 h-2 bg-primary rounded-full mr-2 animate-pulse"></span> LIVE: QUALIFIERS CONCLUDED
            </span>
            <span className="flex items-center px-lg text-white font-body-bold text-label-caption uppercase tracking-widest">
              <span className="w-2 h-2 bg-secondary rounded-full mr-2"></span> DRAW CEREMONY: JUNE 2026
            </span>
            <span className="flex items-center px-lg text-white font-body-bold text-label-caption uppercase tracking-widest">
              <span className="w-2 h-2 bg-primary rounded-full mr-2 animate-pulse"></span> WORLD CUP 2026: 48 TEAMS READY
            </span>
          </div>
        </div>
      )}

      {!selectedTeam ? (
        // ALL TEAMS DIRECTORY VIEW
        <main className="max-w-max-width mx-auto px-lg py-xl unify-pattern">
          {/* Page Header */}
          <section className="mb-2xl">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-lg mb-xl">
              <div>
                <h2 className="font-fwc text-[80px] leading-none text-fifa-black uppercase m-0">TEAMS</h2>
                <p className="font-subheading-sm text-mid-grey mt-2">48 Nations · 736 Players · 1 Dream</p>
              </div>
              <div className="flex flex-wrap gap-md items-center">
                <div className="relative group">
                  <select
                    value={selectedGroup}
                    onChange={(e) => setSelectedGroup(e.target.value)}
                    className="appearance-none bg-white border border-border-grey rounded-lg px-lg py-md pr-10 font-body-bold text-body-base focus:ring-2 focus:ring-primary focus:border-primary cursor-pointer outline-none"
                  >
                    <option>All Groups</option>
                    <option>Group A</option>
                    <option>Group B</option>
                    <option>Group C</option>
                    <option>Group D</option>
                    <option>Group E</option>
                    <option>Group F</option>
                    <option>Group G</option>
                    <option>Group H</option>
                    <option>Group I</option>
                    <option>Group J</option>
                    <option>Group K</option>
                    <option>Group L</option>
                  </select>
                  <span className="material-symbols top-1/2 -translate-y-1/2 pointer-events-none text-mid-grey" />
                </div>
                <div className="relative group">
                  <select
                    value={selectedConf}
                    onChange={(e) => setSelectedConf(e.target.value)}
                    className="appearance-none bg-white border border-border-grey rounded-lg px-lg py-md pr-10 font-body-bold text-body-base focus:ring-2 focus:ring-primary focus:border-primary cursor-pointer outline-none"
                  >
                    <option>Confederation</option>
                    <option>UEFA</option>
                    <option>CONMEBOL</option>
                    <option>CONCACAF</option>
                    <option>CAF</option>
                  </select>
                  <span className="material-symbols top-1/2 -translate-y-1/2 pointer-events-none text-mid-grey" />
                </div>
                <div className="relative">
                  <input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-white border border-border-grey rounded-lg pl-12 pr-lg py-md font-body-base text-body-base focus:ring-2 focus:ring-primary focus:border-primary outline-none w-full md:w-64"
                    placeholder="Search Teams..."
                    type="text"
                  />
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-mid-grey">
                    search
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* Team Grid */}
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-lg">
            {filteredTeams.map((team, idx) => (
              <div
                key={team.name}
                onClick={() => setSelectedTeam(team)}
                className={`reveal-card group cursor-pointer bg-white border border-border-grey rounded-lg overflow-hidden transition-all duration-300 hover:-translate-y-[6px] hover:scale-[1.02] hover:shadow-2xl ${revealCards ? 'visible' : ''
                  }`}
                style={{
                  transitionDelay: `${idx * 60}ms`
                }}
              >
                <div className="h-32 flex items-center justify-center relative transition-colors duration-300 overflow-hidden" style={{ backgroundColor: team.color }}>
                  {/* Outline Country Map - Full Width Background */}
                  <img
                    src={`https://cdn.jsdelivr.net/gh/djaiss/mapsicon@master/all/${getMapIso(team.code)}/vector.svg`}
                    alt={`${team.name} Map`}
                    className="absolute inset-0 w-full h-full object-contain p-2 pointer-events-none opacity-20 transition-transform duration-500 group-hover:scale-110"
                    style={{ filter: 'brightness(0) invert(1)' }}
                  />
                  {/* Flag Image */}
                  <img
                    src={getFlagUrl(TEAM_DATA[team.code]?.iso2 || 'us', 120)}
                    alt={team.name}
                    className="w-24 h-16 object-cover rounded shadow-md border border-white/20 z-10 transition-transform duration-500 group-hover:scale-110"
                  />
                  <span className="absolute bottom-3 right-4 font-fwc text-[14px] text-white opacity-80 uppercase z-10">{team.code}</span>
                </div>
                <div className="p-lg">
                  <h3 className="font-body-bold text-[18px] text-fifa-black mb-md">{team.name}</h3>
                  <div className="space-y-sm text-mid-grey text-label-caption uppercase tracking-wider">
                    <div className="flex justify-between border-b border-soft-grey pb-xs">
                      <span>Stage</span>
                      <span className="text-fifa-black font-body-bold">{team.stage}</span>
                    </div>
                    <div className="flex justify-between border-b border-soft-grey pb-xs">
                      <span>Group</span>
                      <span className="text-fifa-black font-body-bold">{team.group}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>World Ranking</span>
                      <span className="text-fifa-black font-body-bold">#{team.rank}</span>
                    </div>
                  </div>
                </div>
                <div className="h-1 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
              </div>
            ))}
          </section>
        </main>
      ) : (
        // TEAM SQUAD DETAIL VIEW (ARGENTINA / fallbacks)
        <main className="pt-16 relative">
          {/* Hero Section */}
          <section className="relative w-full h-[500px] flex items-center overflow-hidden" style={{ backgroundColor: selectedTeam.color }}>
            {/* Floating Back Button - Sleek Glassmorphism Pill */}
            <button
              onClick={handleBackToTeams}
              className="absolute top-6 left-6 z-30 flex items-center gap-2 bg-black/30 hover:bg-black/50 backdrop-blur-md text-white border border-white/10 px-5 py-2.5 rounded-full font-body-bold text-[13px] tracking-wide uppercase transition-all duration-300 shadow-lg hover:shadow-2xl hover:scale-105 group"
            >
              <span className="material-symbols-outlined text-[18px] transition-transform group-hover:-translate-x-1">arrow_back</span>
              Back to Teams
            </button>

            <div className="absolute inset-0 amplify-pattern opacity-10 pointer-events-none"></div>
            <div className="max-w-max-width mx-auto w-full px-lg relative z-10 flex flex-col items-center md:items-start text-white">
              <h1 className="font-fwc text-[64px] md:text-[96px] leading-none drop-shadow-lg flex flex-col md:flex-row md:items-center gap-4">
                <img
                  src={getFlagUrl(TEAM_DATA[selectedTeam.code]?.iso2 || 'us', 160)}
                  alt={selectedTeam.name}
                  className="w-28 h-20 object-cover rounded-md shadow-lg border-2 border-white/30"
                />
                <span>{selectedTeam.name}</span>
              </h1>
              <div className="flex flex-wrap gap-4 mt-8">
                <div className="bg-white/20 backdrop-blur-md px-6 py-2 rounded-full border border-white/30 text-white font-body-bold">
                  {selectedTeam.group.toUpperCase()}
                </div>
                <div className="bg-white/20 backdrop-blur-md px-6 py-2 rounded-full border border-white/30 text-white font-body-bold">
                  FIFA RANK #{selectedTeam.rank}
                </div>
                <div className="bg-white/20 backdrop-blur-md px-6 py-2 rounded-full border border-white/30 text-white font-body-bold">
                  APPEARANCES: {selectedTeam.appearances}
                </div>
              </div>
            </div>
            <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-white/5 skew-x-12 translate-x-20"></div>
            <div className="absolute right-10 top-20 text-white/10 font-fwc text-[240px] rotate-12 select-none pointer-events-none uppercase">
              {selectedTeam.code}
            </div>
          </section>

          {/* Squad Section */}
          <section className="py-2xl max-w-max-width mx-auto px-lg">
            <div className="flex items-baseline gap-4 mb-xl border-b-4 border-primary w-fit pb-2">
              <h2 className="font-fwc text-[64px] uppercase text-fifa-black">SQUAD</h2>
              <p className="text-label-eyebrow text-primary tracking-widest uppercase">
                {selectedTeam.name === 'Argentina' ? 'ALBICELESTE' : selectedTeam.name.toUpperCase()} 2026
              </p>
            </div>

            {/* Goalkeepers */}
            <div className="mb-xl">
              <h3 className="font-fwc text-[24px] text-tertiary mb-lg flex items-center gap-3">
                <span className="w-8 h-1 bg-tertiary"></span> GOALKEEPERS
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-gutter">
                {getSquadForTeam(selectedTeam).goalkeepers.map((player, idx) => (
                  <PaniniCard key={player.name} player={player} delay={`${0.1 + idx * 0.1}s`} />
                ))}
              </div>
            </div>

            {/* Defenders */}
            <div className="mb-xl">
              <h3 className="font-fwc text-[24px] text-tertiary mb-lg flex items-center gap-3">
                <span className="w-8 h-1 bg-tertiary"></span> DEFENDERS
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-gutter">
                {getSquadForTeam(selectedTeam).defenders.map((player, idx) => (
                  <PaniniCard key={player.name} player={player} delay={`${0.2 + idx * 0.1}s`} />
                ))}
              </div>
            </div>

            {/* Midfielders */}
            <div className="mb-xl">
              <h3 className="font-fwc text-[24px] text-tertiary mb-lg flex items-center gap-3">
                <span className="w-8 h-1 bg-tertiary"></span> MIDFIELDERS
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-gutter">
                {getSquadForTeam(selectedTeam).midfielders.map((player, idx) => (
                  <PaniniCard key={player.name} player={player} delay={`${0.4 + idx * 0.1}s`} />
                ))}
              </div>
            </div>

            {/* Forwards */}
            <div className="mb-xl">
              <h3 className="font-fwc text-[24px] text-tertiary mb-lg flex items-center gap-3">
                <span className="w-8 h-1 bg-tertiary"></span> FORWARDS
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-gutter">
                {getSquadForTeam(selectedTeam).forwards.map((player, idx) => (
                  <PaniniCard key={player.name} player={player} delay={`${0.6 + idx * 0.1}s`} />
                ))}
              </div>
            </div>
          </section>

          {/* Stats Counter Section (Atmospheric) */}
          <section className="bg-fifa-black text-white py-3xl overflow-hidden relative">
            <div className="absolute inset-0 amplify-pattern opacity-5"></div>
            <div className="max-w-max-width mx-auto px-lg relative z-10 grid grid-cols-1 md:grid-cols-3 gap-xl text-center">
              <div className="flex flex-col items-center">
                <span className="font-fwc text-[120px] text-white leading-none">
                  {selectedTeam.name === 'Argentina' ? '3' : selectedTeam.name === 'Brazil' ? '5' : '1'}
                </span>
                <p className="text-label-eyebrow text-fifa-gold tracking-[0.2em] uppercase">World Cup Titles</p>
              </div>
              <div className="flex flex-col items-center">
                <span className="font-fwc text-[120px] text-white leading-none">
                  {selectedTeam.name === 'Argentina' ? '16' : selectedTeam.name === 'France' ? '2' : '9'}
                </span>
                <p className="text-label-eyebrow text-fifa-gold tracking-[0.2em] uppercase">Continental Wins</p>
              </div>
              <div className="flex flex-col items-center">
                <span className="font-fwc text-[120px] text-white leading-none">
                  #{selectedTeam.rank}
                </span>
                <p className="text-label-eyebrow text-fifa-gold tracking-[0.2em] uppercase">FIFA Ranking</p>
              </div>
            </div>
          </section>

          {/* Live Ticker Strip */}
          <div className="bg-primary text-white py-3 overflow-hidden whitespace-nowrap border-y border-white/10">
            <div className="inline-block animate-marquee" style={{ display: 'inline-block', width: 'max-content', animation: 'marquee 30s linear infinite' }}>
              <span className="mx-8 font-body-bold">{selectedTeam.name.toUpperCase()} VS MEXICO - JUNE 12, 2026</span>
              <span className="mx-8 font-body-bold">TICKETS SELLING FAST</span>
              <span className="mx-8 font-body-bold">{selectedTeam.group.toUpperCase()} PREVIEW: {selectedTeam.name.toUpperCase()} READY FOR THE KICKOFF</span>
              {/* Duplicate for infinite scroll */}
              <span className="mx-8 font-body-bold">{selectedTeam.name.toUpperCase()} VS MEXICO - JUNE 12, 2026</span>
              <span className="mx-8 font-body-bold">TICKETS SELLING FAST</span>
              <span className="mx-8 font-body-bold">{selectedTeam.group.toUpperCase()} PREVIEW: {selectedTeam.name.toUpperCase()} READY FOR THE KICKOFF</span>
            </div>
          </div>
        </main>
      )}
    </div>
  );
}
