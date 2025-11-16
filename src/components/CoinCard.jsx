import PropTypes from 'prop-types'
import { Coins } from 'lucide-react'

function CoinCard({ coin, onClick, footer, showTrend = true }) {
  return (
    <article
      role={onClick ? 'button' : 'article'}
      tabIndex={onClick ? 0 : undefined}
      className="coin-card"
      style={{ cursor: onClick ? 'pointer' : 'default' }}
      onClick={onClick}
      onKeyDown={(event) => {
        if (onClick && (event.key === 'Enter' || event.key === ' ')) {
          event.preventDefault()
          onClick()
        }
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div className="coin-icon" style={{ 
          width: '48px', 
          height: '48px', 
          borderRadius: 'var(--radius-md)', 
          background: 'var(--primary-light)', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          color: 'var(--primary)'
        }}>
          <Coins size={24} />
        </div>
        {showTrend && <small>{coin.trend}</small>}
      </div>
      <h3 style={{ marginTop: '0.7rem' }}>
        {coin.name} · {coin.symbol}
      </h3>
      <small>{coin.platform}</small>
      <p style={{ marginTop: '0.6rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{coin.description}</p>
      <div className="score-row">
        <div className="score-pill">
          <span>Attemptability</span>
          <strong>{coin.attemptability}/100</strong>
        </div>
        <div className="score-pill">
          <span>Saturation</span>
          <strong>{coin.saturation}/100</strong>
        </div>
      </div>
      {footer}
    </article>
  )
}

CoinCard.propTypes = {
  coin: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    symbol: PropTypes.string.isRequired,
    platform: PropTypes.string.isRequired,
    attemptability: PropTypes.number.isRequired,
    saturation: PropTypes.number.isRequired,
    trend: PropTypes.string,
    description: PropTypes.string.isRequired,
  }).isRequired,
  onClick: PropTypes.func,
  footer: PropTypes.node,
  showTrend: PropTypes.bool,
}

export default CoinCard
