import React from 'react';

function CoinCard({ coin, onSelect, compact = false }) {
  return (
    <button className={`coin-card ${compact ? 'compact' : ''}`} onClick={() => onSelect?.(coin.id)}>
      <div className="coin-card-header">
        <span className="coin-emoji">{coin.emoji}</span>
        <div>
          <p className="coin-name">
            {coin.name} · {coin.symbol}
          </p>
          <p className="coin-platform">{coin.platform}</p>
        </div>
      </div>
      <p className="coin-description">{coin.description}</p>
      <div className="coin-scores">
        <div className="score-chip">
          Attemptability <strong>{coin.attemptability}</strong>
        </div>
        <div className="score-chip">
          Saturation <strong>{coin.saturation}</strong>
        </div>
      </div>
      {!compact && <p className="coin-trend">{coin.trend}</p>}
    </button>
  );
}

export default CoinCard;
