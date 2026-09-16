import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { SavedGameHistory } from '../types/game';
import { History, Trophy, Trash2, Eye, Calendar, Users, Award, MapPin } from 'lucide-react';

export const HistoryPage: React.FC = () => {
  const { gameHistory, clearAllHistory } = useGame();
  const [selectedRecord, setSelectedRecord] = useState<SavedGameHistory | null>(null);

  const formatDate = (iso: string) => {
    try {
      return new Date(iso).toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return iso;
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-amber-200/90 rounded-2xl p-6 shadow-xs">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider mb-2">
            <History className="w-3.5 h-3.5 text-amber-700" />
            <span>Persistent Game Archive</span>
          </div>
          <h2 className="font-serif-heritage text-2xl sm:text-3xl font-black text-slate-900">
            Game History & Records
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm mt-1">
            Recorded voyages and scores stored locally in browser storage.
          </p>
        </div>

        {gameHistory.length > 0 && (
          <button
            id="clear-history-btn"
            onClick={clearAllHistory}
            className="px-4 py-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 text-xs font-bold flex items-center gap-1.5 transition cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear History</span>
          </button>
        )}
      </div>

      {/* History List */}
      {gameHistory.length === 0 ? (
        <div className="bg-white border border-dashed border-amber-300 rounded-3xl p-12 text-center shadow-xs">
          <History className="w-12 h-12 text-amber-400 mx-auto mb-3" />
          <h3 className="font-serif-heritage text-lg font-bold text-slate-800">
            No Past Voyages Recorded Yet
          </h3>
          <p className="text-slate-500 text-xs sm:text-sm max-w-md mx-auto mt-1">
            Start a new game of Bharat Yatra, answer heritage quizzes, or trigger monument scans to create permanent session records!
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {gameHistory.map((record) => (
            <div
              key={record.gameId}
              className="p-5 rounded-2xl bg-white border border-amber-200/80 shadow-xs hover:shadow-md transition flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-slate-900 text-amber-400">
                    ID: {record.gameId.slice(0, 10)}
                  </span>
                  <span className="text-xs text-slate-500 flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-slate-400" />
                    {formatDate(record.date)}
                  </span>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <Trophy className="w-4 h-4 text-amber-600" />
                  <span className="font-serif-heritage font-bold text-slate-900 text-sm sm:text-base">
                    Winner: {record.winner?.name || 'Traveler'}
                  </span>
                  <span className="font-bold text-amber-800 text-xs">
                    ({record.winner?.score || 0} pts)
                  </span>
                </div>

                <div className="flex items-center gap-4 text-xs text-slate-600 pt-1 flex-wrap">
                  <span className="flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-slate-400" />
                    {record.players.length} Travelers
                  </span>
                  <span>{record.totalQuestionsAnswered} Questions</span>
                  <span>{record.totalHeritageHunts} Hunts</span>
                </div>
              </div>

              <button
                onClick={() => setSelectedRecord(record)}
                className="px-4 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-900 text-xs font-bold flex items-center gap-1.5 transition cursor-pointer self-start sm:self-center"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>View Details</span>
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Record Details Modal */}
      {selectedRecord && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-amber-300 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl animate-in zoom-in-95 duration-150">
            <div className="flex items-start justify-between pb-3 border-b border-slate-200 mb-4">
              <div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-800 uppercase">
                  Session Detail
                </span>
                <h3 className="font-serif-heritage text-xl font-bold text-slate-900 mt-1">
                  Voyage on {formatDate(selectedRecord.date)}
                </h3>
              </div>
              <button
                onClick={() => setSelectedRecord(null)}
                className="p-1 text-slate-400 hover:text-slate-700 font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs sm:text-sm">
              <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-between">
                <span className="font-bold text-slate-700">Winner:</span>
                <span className="font-serif-heritage font-black text-amber-900 text-base">
                  {selectedRecord.winner?.name} ({selectedRecord.winner?.score} pts)
                </span>
              </div>

              <div>
                <h4 className="font-bold text-slate-800 mb-2">Final Player Standings:</h4>
                <div className="space-y-2">
                  {selectedRecord.players.map((p) => (
                    <div
                      key={p.id}
                      className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-200"
                    >
                      <div className="flex items-center gap-2">
                        <span>{p.tokenSymbol}</span>
                        <span className="font-semibold text-slate-800">{p.name}</span>
                        <span className="text-slate-500 text-xs">(Stop #{p.position})</span>
                      </div>
                      <span className="font-mono font-bold text-slate-900">{p.score} pts</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2 text-center text-xs">
                <div className="p-2 rounded-lg bg-slate-100">
                  <span className="text-slate-500 block text-[10px]">Questions Answered</span>
                  <strong className="text-slate-900">{selectedRecord.totalQuestionsAnswered}</strong>
                </div>
                <div className="p-2 rounded-lg bg-slate-100">
                  <span className="text-slate-500 block text-[10px]">Heritage Hunts</span>
                  <strong className="text-slate-900">{selectedRecord.totalHeritageHunts}</strong>
                </div>
              </div>
            </div>

            <button
              onClick={() => setSelectedRecord(null)}
              className="mt-6 w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
