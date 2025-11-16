import React, { useMemo, useState } from 'react';
import NavBar from './components/NavBar.jsx';
import MobileTabBar from './components/MobileTabBar.jsx';
import Home from './pages/Home.jsx';
import Analyze from './pages/Analyze.jsx';
import Draft from './pages/Draft.jsx';
import MyPage from './pages/MyPage.jsx';
import ProjectDetail from './pages/ProjectDetail.jsx';
import { mockCoins } from './data/mockCoins.js';
import { mockUserAnalysis } from './data/mockUser.js';
import { mockTopYappers } from './data/mockTopYappers.js';

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [activeProjectId, setActiveProjectId] = useState(null);
  const [selectedDraftCoinId, setSelectedDraftCoinId] = useState(mockCoins[0]?.id || null);

  const activeProject = useMemo(
    () => mockCoins.find((coin) => coin.id === activeProjectId) || null,
    [activeProjectId]
  );

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setActiveProjectId(null);
  };

  const handleSelectProject = (coinId) => {
    setActiveProjectId(coinId);
  };

  const handleDraftFromDetail = (coinId) => {
    setSelectedDraftCoinId(coinId);
    setActiveTab('draft');
    setActiveProjectId(null);
  };

  const handleAnalyzeCTA = () => {
    handleTabChange('analyze');
  };

  const renderContent = () => {
    if (activeProject) {
      return (
        <ProjectDetail
          coin={activeProject}
          topYappers={mockTopYappers[activeProject.id] || []}
          onBack={() => setActiveProjectId(null)}
          onDraft={() => handleDraftFromDetail(activeProject.id)}
        />
      );
    }

    switch (activeTab) {
      case 'analyze':
        return (
          <Analyze
            userAnalysis={mockUserAnalysis}
            coins={mockCoins}
            onSelectCoin={handleSelectProject}
          />
        );
      case 'draft':
        return (
          <Draft
            coins={mockCoins}
            selectedCoinId={selectedDraftCoinId}
            onSelectCoin={(coinId) => setSelectedDraftCoinId(coinId)}
          />
        );
      case 'mypage':
        return <MyPage userAnalysis={mockUserAnalysis} coins={mockCoins} onSelectCoin={handleSelectProject} />;
      case 'home':
      default:
        return <Home coins={mockCoins} onSelectCoin={handleSelectProject} onAnalyzeCTA={handleAnalyzeCTA} />;
    }
  };

  return (
    <div className="app-shell">
      <NavBar activeTab={activeTab} onChangeTab={handleTabChange} />
      <main className="main-content">{renderContent()}</main>
      <MobileTabBar activeTab={activeTab} onChangeTab={handleTabChange} />
    </div>
  );
}

export default App;
