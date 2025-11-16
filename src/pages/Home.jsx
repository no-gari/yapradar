import React from 'react';
import CoinCard from '../components/CoinCard.jsx';

function Home({ coins, onSelectCoin, onAnalyzeCTA }) {
  return (
    <div className="page home-page">
      <section className="hero-card">
        <span className="hero-badge">세상의 모든 야퍼들을 위한 AI Assistant</span>
        <h1>
          당신의 한 줄 야핑이
          <br />
          브랜드가 되는 순간, YapRadar가 함께 합니다.
        </h1>
        <p className="hero-subtext">
          X 계정과 글 패턴을 분석해, 지금 야핑하기 좋은 코인과 문장을 추천해 드립니다.
        </p>
        <div className="hero-actions">
          <button className="btn primary" onClick={onAnalyzeCTA}>
            내 X 계정 분석하기
          </button>
          <button className="btn ghost">서비스 소개 보기</button>
        </div>
      </section>

      <section className="section">
        <div className="section-header">
          <h2>🔥 지금 야핑하기 좋은 프로젝트</h2>
          <p>실시간 상위 10개 중 엄선된 리스트입니다.</p>
        </div>
        <div className="coin-grid">
          {coins.map((coin) => (
            <CoinCard key={coin.id} coin={coin} onSelect={onSelectCoin} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;
