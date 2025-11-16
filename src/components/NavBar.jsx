import React from 'react';

const tabs = [
  { id: 'home', label: 'Home', emoji: '🏠' },
  { id: 'analyze', label: 'Analyze', emoji: '🧠' },
  { id: 'draft', label: 'Draft', emoji: '✍️' },
  { id: 'mypage', label: 'My Page', emoji: '👤' },
];

function NavBar({ activeTab, onChangeTab }) {
  return (
    <header className="navbar">
      <div className="logo">📡 YapRadar</div>
      <nav className="nav-tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`nav-tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => onChangeTab(tab.id)}
          >
            <span className="nav-emoji">{tab.emoji}</span>
            {tab.label}
          </button>
        ))}
      </nav>
    </header>
  );
}

export default NavBar;
