import React, { useState } from 'react';
import { IndiaMapBoard } from '../components/IndiaMapBoard';
import { LOCATIONS_DATA, SPECIAL_BLOCK_CONFIG } from '../data/locations';
import { SpecialBlockBadge } from '../components/SpecialBlockBadge';
import { SpecialBlockType, LocationData } from '../types/game';
import { Search, Filter, MapPin, Sparkles, Navigation } from 'lucide-react';

export const IndiaMapPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<string>('ALL');
  const [inspectedLocation, setInspectedLocation] = useState<LocationData | null>(null);

  const specialTypes: SpecialBlockType[] = [
    'Golden Heritage',
    'Heritage Hunt',
    'Culture Challenge',
    'Heritage Challenge',
    'Festival Challenge',
    'Knowledge Ladder',
    'Myth/Misinformation Trap'
  ];

  const filteredLocations = LOCATIONS_DATA.filter((loc) => {
    const matchesSearch =
      loc.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      loc.heritageSite.toLowerCase().includes(searchTerm.toLowerCase()) ||
      loc.state.toLowerCase().includes(searchTerm.toLowerCase()) ||
      loc.id.toString() === searchTerm.trim();

    if (selectedFilter === 'ALL') return matchesSearch;
    return matchesSearch && loc.specialBlock === selectedFilter;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white border border-amber-200/90 rounded-2xl p-6 shadow-xs">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider mb-2">
            <Navigation className="w-3.5 h-3.5" />
            <span>Interactive Subcontinent Route</span>
          </div>
          <h2 className="font-serif-heritage text-2xl sm:text-3xl font-black text-slate-900">
            80 Indian Heritage Milestones
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm mt-1">
            Explore the connected journey: Kanyakumari (1) to Ladakh (80).
          </p>
        </div>

        {/* Search & Filter Controls */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              id="map-search-input"
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search city, site, or stop #..."
              className="pl-9 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-300 text-xs font-semibold text-slate-800 focus:outline-none focus:border-amber-500 w-full sm:w-60"
            />
          </div>

          <select
            id="map-filter-select"
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value)}
            className="px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-xs font-semibold text-slate-700 focus:outline-none focus:border-amber-500"
          >
            <option value="ALL">All Milestones (80)</option>
            {specialTypes.map((st) => (
              <option key={st} value={st}>
                {st}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Stylized Board */}
      <IndiaMapBoard interactive={true} />

      {/* Filtered Milestones Grid Directory */}
      <div className="bg-white border border-amber-200/90 rounded-2xl p-6 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-serif-heritage text-lg font-bold text-slate-900">
            Milestone Directory ({filteredLocations.length} locations)
          </h3>
          <span className="text-xs text-slate-500">
            Click any milestone card to inspect details
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {filteredLocations.map((loc) => {
            return (
              <div
                key={loc.id}
                onClick={() => setInspectedLocation(loc)}
                className={`p-3.5 rounded-xl border text-left transition cursor-pointer hover:shadow-md ${
                  inspectedLocation?.id === loc.id
                    ? 'border-amber-500 bg-amber-50/80'
                    : 'border-slate-200 bg-slate-50/70 hover:bg-white'
                }`}
              >
                <div className="flex items-start justify-between gap-1 mb-1.5">
                  <span className="font-mono font-bold text-xs px-2 py-0.5 rounded bg-slate-900 text-amber-400">
                    #{loc.id}
                  </span>
                  <SpecialBlockBadge type={loc.specialBlock} size="sm" />
                </div>
                <h4 className="font-bold text-slate-900 text-xs sm:text-sm truncate">
                  {loc.city}, {loc.state}
                </h4>
                <p className="font-serif-heritage text-xs font-semibold text-amber-800 truncate mt-0.5">
                  {loc.heritageSite}
                </p>
                <p className="text-[11px] text-slate-500 line-clamp-2 mt-1 leading-snug">
                  {loc.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal / Inspector Drawer if a location is selected from directory */}
      {inspectedLocation && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-amber-300 rounded-3xl p-6 max-w-lg w-full shadow-2xl animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-4">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-xl bg-amber-500 text-white font-bold flex items-center justify-center text-xs">
                  #{inspectedLocation.id}
                </span>
                <div>
                  <h3 className="font-serif-heritage text-lg font-bold text-slate-900">
                    {inspectedLocation.city}
                  </h3>
                  <p className="text-xs text-slate-500">{inspectedLocation.state}</p>
                </div>
              </div>
              <button
                onClick={() => setInspectedLocation(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs sm:text-sm">
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-700">Heritage Site:</span>
                <span className="font-serif-heritage text-amber-800 font-bold">
                  {inspectedLocation.heritageSite}
                </span>
              </div>

              <div>
                <span className="font-bold text-slate-700 block mb-1">Description:</span>
                <p className="text-slate-600 bg-amber-50/50 p-3 rounded-xl border border-amber-200/50 leading-relaxed">
                  {inspectedLocation.description}
                </p>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                <span className="font-bold text-slate-700">Special Block Type:</span>
                <SpecialBlockBadge type={inspectedLocation.specialBlock} size="md" showDescription={true} />
              </div>

              <div className="flex items-center justify-between pt-1">
                <span className="font-bold text-slate-700">Quiz Category:</span>
                <span className="px-2 py-0.5 rounded bg-slate-100 font-semibold text-slate-800 text-xs">
                  {inspectedLocation.questionCategory}
                </span>
              </div>
            </div>

            <button
              onClick={() => setInspectedLocation(null)}
              className="mt-5 w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition"
            >
              Close Inspector
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
