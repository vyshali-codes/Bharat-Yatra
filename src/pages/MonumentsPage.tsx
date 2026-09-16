import React, { useState } from 'react';
import { MONUMENTS_DATA } from '../data/monuments';
import { Monument } from '../types/game';
import { useGame } from '../context/GameContext';
import { BookOpen, Search, MapPin, Camera, Sparkles } from 'lucide-react';

export const MonumentsPage: React.FC = () => {
  const { setActiveScreen } = useGame();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMonument, setSelectedMonument] = useState<Monument | null>(null);

  const filteredMonuments = MONUMENTS_DATA.filter((m) =>
    m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.state.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white border border-amber-200/90 rounded-2xl p-6 shadow-xs">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider mb-2">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Architectural Archive</span>
          </div>
          <h2 className="font-serif-heritage text-2xl sm:text-3xl font-black text-slate-900">
            15 National Heritage Monuments
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm mt-1">
            Historical context and architectural marvels featured in the Bharat Yatra Heritage Hunt.
          </p>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            id="monument-search-input"
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search monument or city..."
            className="pl-9 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-300 text-xs font-semibold text-slate-800 focus:outline-none focus:border-amber-500 w-full sm:w-64"
          />
        </div>
      </div>

      {/* Monuments Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredMonuments.map((m, idx) => (
          <div
            key={m.id}
            id={`monument-card-${m.id}`}
            onClick={() => setSelectedMonument(m)}
            className="p-5 rounded-2xl bg-white border border-amber-200/80 shadow-xs hover:shadow-md transition flex flex-col justify-between cursor-pointer group"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-rose-50 text-rose-700 border border-rose-200">
                  Landmark #{idx + 1}
                </span>
                <span className="text-xs text-slate-500 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-amber-600" />
                  {m.location}, {m.state}
                </span>
              </div>

              <h3 className="font-serif-heritage text-lg font-bold text-slate-900 group-hover:text-amber-800 transition">
                {m.name}
              </h3>

              <p className="text-xs text-slate-600 mt-2 line-clamp-3 leading-relaxed">
                {m.description}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-amber-700 font-semibold flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                View 3 Facts
              </span>
              <span className="text-[11px] text-slate-400">Click to read &rarr;</span>
            </div>
          </div>
        ))}
      </div>

      {/* Monument Detail Modal */}
      {selectedMonument && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-amber-300 rounded-3xl p-6 sm:p-8 max-w-xl w-full shadow-2xl animate-in zoom-in-95 duration-150 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between pb-3 border-b border-slate-200 mb-4">
              <div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-800 uppercase">
                  Indian Heritage Monument
                </span>
                <h3 className="font-serif-heritage text-2xl font-black text-slate-900 mt-1">
                  {selectedMonument.name}
                </h3>
                <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-amber-600" />
                  {selectedMonument.location}, {selectedMonument.state}
                </p>
              </div>

              <button
                onClick={() => setSelectedMonument(null)}
                className="p-1 text-slate-400 hover:text-slate-700 font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs sm:text-sm">
              <div>
                <h4 className="font-serif-heritage font-bold text-slate-900 mb-1">
                  Overview:
                </h4>
                <p className="text-slate-600 leading-relaxed bg-amber-50/50 p-3.5 rounded-xl border border-amber-200/60">
                  {selectedMonument.description}
                </p>
              </div>

              <div>
                <h4 className="font-serif-heritage font-bold text-slate-900 mb-2">
                  Historical & Architectural Facts:
                </h4>
                <ul className="space-y-2 text-slate-700">
                  {selectedMonument.historicalFacts.map((fact, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-2 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                      <span className="text-amber-600 font-bold">•</span>
                      <span>{fact}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-serif-heritage font-bold text-slate-900 mb-1">
                  Cultural Significance:
                </h4>
                <p className="text-slate-600 text-xs">
                  {selectedMonument.heritageImportance}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between gap-3 mt-6 pt-4 border-t border-slate-100">
              <button
                onClick={() => {
                  setSelectedMonument(null);
                  setActiveScreen('HERITAGE_HUNT');
                }}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs flex items-center gap-1.5 transition cursor-pointer"
              >
                <Camera className="w-3.5 h-3.5" />
                <span>Scan in Heritage Hunt</span>
              </button>

              <button
                onClick={() => setSelectedMonument(null)}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
