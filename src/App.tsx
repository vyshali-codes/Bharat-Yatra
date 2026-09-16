import React from 'react';
import { GameProvider, useGame } from './context/GameContext';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { BadgeToast } from './components/BadgeToast';
import { SpecialBlockModal } from './components/SpecialBlockModal';

// Pages
import { HomePage } from './pages/HomePage';
import { GameSetupPage } from './pages/GameSetupPage';
import { GameDashboardPage } from './pages/GameDashboardPage';
import { IndiaMapPage } from './pages/IndiaMapPage';
import { HeritageHuntPage } from './pages/HeritageHuntPage';
import { MonumentsPage } from './pages/MonumentsPage';
import { ScoreboardPage } from './pages/ScoreboardPage';
import { BadgesPage } from './pages/BadgesPage';
import { HistoryPage } from './pages/HistoryPage';
import { ESP32SimulatorPage } from './pages/ESP32SimulatorPage';
import { SettingsPage } from './pages/SettingsPage';
import { PresentationModePage } from './pages/PresentationModePage';
import { AboutPage } from './pages/AboutPage';

const GameRouter: React.FC = () => {
  const {
    activeScreen,
    specialBlockModal,
    startSpecialChallenge,
    closeSpecialBlockModal
  } = useGame();

  // Special full-screen presentation mode
  if (activeScreen === 'PRESENTATION') {
    return (
      <>
        <PresentationModePage />
        <BadgeToast />
        {specialBlockModal && (
          <SpecialBlockModal
            isOpen={specialBlockModal.isOpen}
            blockType={specialBlockModal.blockType}
            city={specialBlockModal.city}
            state={specialBlockModal.state}
            difficulty={specialBlockModal.difficulty}
            onStart={startSpecialChallenge}
            onClose={closeSpecialBlockModal}
          />
        )}
      </>
    );
  }

  const renderActiveScreen = () => {
    switch (activeScreen) {
      case 'HOME':
        return <HomePage />;
      case 'GAME_SETUP':
        return <GameSetupPage />;
      case 'GAME_DASHBOARD':
        return <GameDashboardPage />;
      case 'INDIA_MAP':
        return <IndiaMapPage />;
      case 'HERITAGE_HUNT':
        return <HeritageHuntPage />;
      case 'MONUMENTS':
        return <MonumentsPage />;
      case 'SCOREBOARD':
        return <ScoreboardPage />;
      case 'BADGES':
        return <BadgesPage />;
      case 'HISTORY':
        return <HistoryPage />;
      case 'ESP32_SIMULATOR':
        return <ESP32SimulatorPage />;
      case 'SETTINGS':
        return <SettingsPage />;
      case 'ABOUT':
        return <AboutPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF6EE] text-slate-900 font-sans selection:bg-amber-500 selection:text-white">
      <Navigation />
      <main className="flex-1">
        {renderActiveScreen()}
      </main>
      <Footer />
      <BadgeToast />
      {specialBlockModal && (
        <SpecialBlockModal
          isOpen={specialBlockModal.isOpen}
          blockType={specialBlockModal.blockType}
          city={specialBlockModal.city}
          state={specialBlockModal.state}
          difficulty={specialBlockModal.difficulty}
          onStart={startSpecialChallenge}
          onClose={closeSpecialBlockModal}
        />
      )}
    </div>
  );
};

export default function App() {
  return (
    <GameProvider>
      <GameRouter />
    </GameProvider>
  );
}
