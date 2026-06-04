import React from 'react';
import { matchesData } from '../../../utils/matchesData';

export default function MatchFilterBar({
  searchQuery,
  setSearchQuery,
  selectedGroup,
  setSelectedGroup,
  selectedDate,
  setSelectedDate,
  selectedCity,
  setSelectedCity,
  viewMode,
  setViewMode
}) {
  // 1. Generate Groups dynamically (A - L)
  const groupsList = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'];

  // 2. Generate unique dates dynamically from matchesData, sorted chronologically
  const uniqueDates = Array.from(
    new Set(
      matchesData.map((m) => {
        const d = new Date(m.date);
        return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      })
    )
  ).sort((a, b) => new Date(`${a}, 2026`) - new Date(`${b}, 2026`));

  // 3. Generate unique cities dynamically from matchesData, sorted alphabetically
  const uniqueCities = Array.from(
    new Set(matchesData.map((m) => m.city))
  ).sort();

  return (
    <div className="sticky top-[64px] bg-white z-30 border-b border-[#E0E0E0] shadow-sm">
      <div className="max-w-[1440px] mx-auto px-6 py-4 flex flex-wrap items-center justify-between gap-4">
        {/* Dropdowns */}
        <div className="flex gap-3">
          {/* Groups dropdown */}
          <select
            className="border-[#E0E0E0] rounded-lg text-sm font-bold pr-10 focus:ring-[#E8192C]"
            value={selectedGroup}
            onChange={(e) => setSelectedGroup(e.target.value)}
          >
            <option value="all">All Groups</option>
            {groupsList.map((g) => (
              <option key={g} value={g}>
                Group {g}
              </option>
            ))}
          </select>

          {/* Dates dropdown */}
          <select
            className="border-[#E0E0E0] rounded-lg text-sm font-bold pr-10 focus:ring-[#E8192C]"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          >
            <option value="all">All Dates</option>
            {uniqueDates.map((dateStr) => (
              <option key={dateStr} value={dateStr}>
                {dateStr}
              </option>
            ))}
          </select>

          {/* Cities dropdown */}
          <select
            className="border-[#E0E0E0] rounded-lg text-sm font-bold pr-10 focus:ring-[#E8192C]"
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
          >
            <option value="all">All Cities</option>
            {uniqueCities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>

        {/* Search & Layout Toggles */}
        <div className="flex items-center gap-4">
          <div className="relative group">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              search
            </span>
            <input
              className="pl-10 pr-4 py-2 border-[#E0E0E0] rounded-lg text-sm w-48 focus:w-80 transition-all focus:ring-[#E8192C] outline-none"
              placeholder="Search teams..."
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex border border-[#E0E0E0] rounded-lg overflow-hidden">
            <button
              className={`p-2 transition-colors ${
                viewMode === 'grid' ? 'bg-[#F5F5F5] text-[#E8192C]' : 'hover:bg-[#F5F5F5] text-gray-500'
              }`}
              style={{ borderRight: '1px solid #E0E0E0', display: 'flex', alignItems: 'center' }}
              onClick={() => setViewMode('grid')}
            >
              <span className="material-symbols-outlined">grid_view</span>
            </button>
            <button
              className={`p-2 transition-colors ${
                viewMode === 'list' ? 'bg-[#F5F5F5] text-[#E8192C]' : 'hover:bg-[#F5F5F5] text-gray-500'
              }`}
              style={{ display: 'flex', alignItems: 'center' }}
              onClick={() => setViewMode('list')}
            >
              <span className="material-symbols-outlined">list</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
