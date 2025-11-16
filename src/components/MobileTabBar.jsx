import React from 'react';

const tabs = [
  { id: 'home', label: 'Home', emoji: '🏠' },
  { id: 'analyze', label: 'Analyze', emoji: '🧠' },
  { id: 'draft', label: 'Draft', emoji: '✍️' },
  { id: 'mypage', label: 'My', emoji: '👤' },
];

function MobileTabBar({ activeTab, onChangeTab }) {
  return (
    <nav className="mobile-tab-bar">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`mobile-tab ${activeTab === tab.id ? 'active' : ''}`}
          onClick={() => onChangeTab(tab.id)}
        >
          <span className="mobile-tab-emoji">{tab.emoji}</span>
          <span className="mobile-tab-label">{tab.label}</span>
        </button>
      ))}
    </nav>
  );
}

export default MobileTabBar;
