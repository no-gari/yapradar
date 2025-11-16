import React from 'react';
import CoinCard from '../components/CoinCard.jsx';

function MyPage({ userAnalysis, coins, onSelectCoin }) {
  return (
    <div className="page my-page">
      <section className="profile-card full">
        <div className="avatar large">{userAnalysis.avatarEmoji}</div>
        <div>
          <h2>{userAnalysis.handle}</h2>
          <p className="muted">팔로워 {userAnalysis.followers.toLocaleString()}명</p>
          <p className="score">Yapper Score {userAnalysis.yapperScore} · 상위 {userAnalysis.rankPercentile}%</p>
        </div>
      </section>

      <section className="section">
        <h3>점수 추이</h3>
        <div className="chart-placeholder">
          <span>※ 실제 서비스에서는 여기에서 점수 추이 그래프가 표시됩니다.</span>
        </div>
      </section>

      <section className="section">
        <div className="section-header">
          <h3>즐겨찾기 코인</h3>
          <p className="muted">내가 북마크한 코인들의 리스트입니다.</p>
        </div>
        <div className="coin-grid">
          {coins.map((coin) => (
            <CoinCard key={coin.id} coin={coin} onSelect={onSelectCoin} compact />
          ))}
        </div>
      </section>
    </div>
  );
}

export default MyPage;
