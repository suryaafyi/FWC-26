import React, { useState, useEffect } from 'react';
import MatchesTicker from './components/MatchesTicker';
import MatchFilterBar from './components/MatchFilterBar';
import MatchesList from './components/MatchesList';
import MatchDetailModal from './components/MatchDetailModal';
import MatchStatsOverview from './components/MatchStatsOverview';
import { matchesData, WC_START } from '../../utils/matchesData';

const phaseTabs = [
  { label: 'Group Stage · 72', id: 'group' },
  { label: 'Round of 32 · 16', id: 'r32' },
  { label: 'Round of 16 · 8', id: 'r16' },
  { label: 'Quarter-Finals · 4', id: 'qf' },
  { label: 'Semi-Finals · 2', id: 'sf' },
  { label: 'Final · 2', id: 'f' } // Final + 3rd place play-off
];

export default function Matches() {
  const [activePhase, setActivePhase] = useState('group');
  const [selectedGroup, setSelectedGroup] = useState('all');
  const [selectedDate, setSelectedDate] = useState('all');
  const [selectedCity, setSelectedCity] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [selectedMatch, setSelectedMatch] = useState(null);

  useEffect(() => {
    // Scroll reveal observer animation
    const reveals = document.querySelectorAll('.stagger-fade-up');
    reveals.forEach((elem) => {
      elem.classList.add('visible');
    });
  }, []);

  // Reset filters when changing phases
  useEffect(() => {
    setSelectedGroup('all');
    setSelectedDate('all');
    setSelectedCity('all');
  }, [activePhase]);

  // Matches list filtering based on active selection inputs
  const filteredMatches = matchesData.filter((match) => {
    // 1. Phase Filter
    const matchesPhase = match.phase === activePhase || (activePhase === 'f' && match.phase === 'final');
    if (!matchesPhase) return false;

    // 2. Search Query
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      match.team1.name.toLowerCase().includes(query) ||
      match.team1.code.toLowerCase().includes(query) ||
      match.team2.name.toLowerCase().includes(query) ||
      match.team2.code.toLowerCase().includes(query) ||
      match.venue.toLowerCase().includes(query) ||
      match.city.toLowerCase().includes(query);

    // 3. Group Filter
    let matchesGroup = true;
    if (selectedGroup !== 'all') {
      matchesGroup = match.group === selectedGroup;
    }

    // 4. Date Filter
    let matchesDate = true;
    if (selectedDate !== 'all') {
      const d = new Date(match.date);
      const dateStr = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      matchesDate = dateStr === selectedDate;
    }

    // 5. City Filter
    let matchesCity = true;
    if (selectedCity !== 'all') {
      matchesCity = match.city === selectedCity;
    }

    return matchesSearch && matchesGroup && matchesDate && matchesCity;
  });

  const now = new Date();
  const isPreTournament = now < WC_START;

  return (
    <div className="bg-white min-h-screen text-[#1a1c1c]" style={{ fontFamily: "'Noto Sans', sans-serif" }}>
      {/* Ticker on top */}
      <MatchesTicker />

      {/* Page Header */}
      <header className="max-w-[1440px] mx-auto px-6 py-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="stagger-fade-up">
          <span className="bg-[#E8192C] text-white px-3 py-1 text-[11px] font-black rounded-sm mb-4 inline-block tracking-widest uppercase">
            {isPreTournament ? 'Pre-Tournament Draw' : 'Tournament Live'}
          </span>
          <h1 className="font-fwc text-[80px] leading-[0.9] text-black mb-2 uppercase">
            Matches
          </h1>
          <p className="text-xl text-gray-500 font-medium">104 Matches · 16 Cities · 48 Nations</p>
        </div>

        {/* Current status alert box */}
        <div className="bg-[#FFD700] p-6 border-l-8 border-black stagger-fade-up">
          <span className="text-[11px] font-black uppercase tracking-widest block mb-1">
            Current Status
          </span>
          <p className="text-lg font-black uppercase leading-tight">
            {isPreTournament ? (
              <>
                Tournament Begins:<br />
                June 11, 2026
              </>
            ) : (
              <>
                Tournament Active:<br />
                LIVE Matches Streaming Now
              </>
            )}
          </p>
        </div>
      </header>

      {/* Stats Dashboard Overview */}
      <div className="max-w-[1440px] mx-auto px-6 mb-4 stagger-fade-up">
        <MatchStatsOverview />
      </div>

      {/* Phase Tabs switcher */}
      <div className="border-b border-[#E0E0E0] mb-8">
        <div className="max-w-[1440px] mx-auto px-6">
          <div className="flex gap-10 overflow-x-auto no-scrollbar py-4 font-bold text-sm uppercase tracking-wide">
            {phaseTabs.map((tab) => (
              <button
                key={tab.id}
                className={`whitespace-nowrap pb-4 transition-colors ${
                  activePhase === tab.id
                    ? 'text-black border-b-4 border-[#E8192C]'
                    : 'text-gray-400 hover:text-black'
                }`}
                onClick={() => setActivePhase(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Filter Options bar */}
      <MatchFilterBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedGroup={selectedGroup}
        setSelectedGroup={setSelectedGroup}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        selectedCity={selectedCity}
        setSelectedCity={setSelectedCity}
        viewMode={viewMode}
        setViewMode={setViewMode}
      />

      {/* Matches grids */}
      <main className="max-w-[1440px] mx-auto px-6 py-8">
        {filteredMatches.length > 0 ? (
          <MatchesList
            matches={filteredMatches}
            onSelectMatch={setSelectedMatch}
            viewMode={viewMode}
          />
        ) : (
          <div className="py-20 text-center border-t border-[#E0E0E0] opacity-65">
            <span className="material-symbols-outlined text-6xl mb-4 text-[#E8192C]">info</span>
            <h4 className="font-fwc text-2xl uppercase">No Matches Found</h4>
            <p className="text-sm font-bold uppercase tracking-widest text-gray-400 mt-2">
              Try adjusting your filter options or search query
            </p>
          </div>
        )}

        {activePhase === 'group' && filteredMatches.length > 0 && (
          <div className="py-20 text-center border-t border-[#E0E0E0] opacity-40">
            <span className="material-symbols-outlined text-6xl mb-4">sports_soccer</span>
            <h4 className="font-fwc text-2xl uppercase">All Group Stage Matches Loaded</h4>
            <p className="text-sm font-bold uppercase tracking-widest text-gray-500">72 matches total</p>
          </div>
        )}
      </main>

      {/* Detailed Match center modal */}
      {selectedMatch && (
        <MatchDetailModal match={selectedMatch} onClose={() => setSelectedMatch(null)} />
      )}
    </div>
  );
}
