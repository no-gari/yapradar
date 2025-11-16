import PropTypes from 'prop-types'
import { useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { Trophy, ExternalLink, Pencil, TrendingUp, Users, Hash, MessageSquare, Target, BarChart3, Activity, Zap, ArrowUpRight, Flame } from 'lucide-react'
import { mockCoins } from '../data/mockCoins'
import { mockTopYappers } from '../data/mockTopYappers'

function ProjectDetail({ onDraftWithCoin }) {
  const { projectId } = useParams()
  const coin = mockCoins.find((item) => item.id === projectId)
  const topYappers = mockTopYappers[projectId] ?? []

  // Mock data for charts
  const weeklyActivityData = useMemo(() => [
    { day: 'Mon', posts: 45, engagement: 320 },
    { day: 'Tue', posts: 52, engagement: 380 },
    { day: 'Wed', posts: 38, engagement: 290 },
    { day: 'Thu', posts: 65, engagement: 450 },
    { day: 'Fri', posts: 58, engagement: 410 },
    { day: 'Sat', posts: 72, engagement: 520 },
    { day: 'Sun', posts: 48, engagement: 340 },
  ], [])

  const scoreHistoryData = useMemo(() => [
    { week: 'W1', attemptability: 45, saturation: 35 },
    { week: 'W2', attemptability: 52, saturation: 42 },
    { week: 'W3', attemptability: 58, saturation: 48 },
    { week: 'W4', attemptability: 65, saturation: 55 },
    { week: 'W5', attemptability: coin.attemptability, saturation: coin.saturation },
  ], [coin])

  const patternHighlights = useMemo(() => {
    if (!coin) return []
    return [
      { title: '공통 키워드', details: coin.keywordFocus.map((keyword) => `#${keyword}`).join(' · '), icon: Hash },
      { title: '톤 요약', details: coin.toneSummary, icon: MessageSquare },
      { title: '포맷', details: coin.formatTips, icon: Target },
    ]
  }, [coin])

  if (!coin) {
    return (
      <div className="page project-detail">
        <p style={{ color: 'var(--text-secondary)' }}>요청하신 프로젝트를 찾을 수 없습니다.</p>
      </div>
    )
  }

  return (
    <div className="page project-detail crypto-style">
      {/* Compact Hero */}
      <section className="crypto-hero">
        <div className="hero-main">
          <div className="coin-badge">
            <Trophy size={20} strokeWidth={2} />
          </div>
          <div className="hero-text">
            <h1>{coin.name}</h1>
            <div className="hero-meta">
              <span className="symbol">{coin.symbol}</span>
              <span className="divider">·</span>
              <span className="platform">{coin.platform}</span>
            </div>
          </div>
          <div className="hero-trend">
            <span className="trend-badge positive">
              <ArrowUpRight size={14} strokeWidth={2.5} />
              {coin.trend}
            </span>
          </div>
        </div>
        <p className="hero-description">{coin.description}</p>
      </section>

      {/* Compact Stats Grid */}
      <section className="crypto-stats">
        <div className="stat-card glow-green">
          <div className="stat-header">
            <span className="stat-label">Attemptability</span>
            <Zap size={14} />
          </div>
          <div className="stat-value">{coin.attemptability}<span className="stat-max">/100</span></div>
          <div className="stat-bar">
            <div className="stat-fill green" style={{ width: `${coin.attemptability}%` }} />
          </div>
        </div>

        <div className="stat-card glow-orange">
          <div className="stat-header">
            <span className="stat-label">Saturation</span>
            <Flame size={14} />
          </div>
          <div className="stat-value">{coin.saturation}<span className="stat-max">/100</span></div>
          <div className="stat-bar">
            <div className="stat-fill orange" style={{ width: `${coin.saturation}%` }} />
          </div>
        </div>

        <div className="stat-card glow-blue">
          <div className="stat-header">
            <span className="stat-label">Active Yappers</span>
            <Users size={14} />
          </div>
          <div className="stat-value">{topYappers.length}<span className="stat-max"> users</span></div>
          <div className="stat-bar">
            <div className="stat-fill blue" style={{ width: '85%' }} />
          </div>
        </div>

        <div className="stat-card glow-purple">
          <div className="stat-header">
            <span className="stat-label">Momentum</span>
            <TrendingUp size={14} />
          </div>
          <div className="stat-value trend-large">{coin.trend}</div>
          <div className="stat-sublabel">7d growth</div>
        </div>
      </section>

      {/* Charts - Crypto Style */}
      <div className="crypto-charts-grid">
        {/* Activity Chart */}
        <div className="crypto-chart">
          <div className="chart-head">
            <Activity size={16} />
            <span>Weekly Activity</span>
          </div>
          <div className="crypto-bar-chart">
            {weeklyActivityData.map((data) => {
              const maxPosts = Math.max(...weeklyActivityData.map(d => d.posts))
              const postHeight = (data.posts / maxPosts) * 100
              
              return (
                <div key={data.day} className="crypto-bar-col">
                  <div 
                    className="crypto-bar" 
                    style={{ height: `${postHeight}%` }}
                  >
                    <span className="bar-tooltip">{data.posts}</span>
                  </div>
                  <span className="bar-day">{data.day.slice(0, 1)}</span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Score History */}
        <div className="crypto-chart">
          <div className="chart-head">
            <BarChart3 size={16} />
            <span>Score Trend</span>
          </div>
          <div className="crypto-line-chart">
            <svg viewBox="0 0 300 120" preserveAspectRatio="none">
              <defs>
                <linearGradient id="gradGreen" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#10b981" stopOpacity="0.3"/>
                  <stop offset="100%" stopColor="#10b981" stopOpacity="0"/>
                </linearGradient>
                <linearGradient id="gradOrange" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.3"/>
                  <stop offset="100%" stopColor="#f59e0b" stopOpacity="0"/>
                </linearGradient>
              </defs>
              
              {/* Area fills */}
              <polygon
                points={`0,120 ${scoreHistoryData.map((d, i) => 
                  `${(i / (scoreHistoryData.length - 1)) * 300},${120 - (d.attemptability / 100) * 120}`
                ).join(' ')} 300,120`}
                fill="url(#gradGreen)"
              />
              
              {/* Lines */}
              <polyline
                points={scoreHistoryData.map((d, i) => 
                  `${(i / (scoreHistoryData.length - 1)) * 300},${120 - (d.attemptability / 100) * 120}`
                ).join(' ')}
                fill="none"
                stroke="#10b981"
                strokeWidth="2"
              />
              <polyline
                points={scoreHistoryData.map((d, i) => 
                  `${(i / (scoreHistoryData.length - 1)) * 300},${120 - (d.saturation / 100) * 120}`
                ).join(' ')}
                fill="none"
                stroke="#f59e0b"
                strokeWidth="2"
                strokeDasharray="4,4"
              />
            </svg>
          </div>
          <div className="chart-mini-legend">
            <span className="legend-line green">Attemptability</span>
            <span className="legend-line orange">Saturation</span>
          </div>
        </div>
      </div>

      {/* Top Yappers - Compact */}
      <section className="crypto-leaderboard">
        <div className="section-head">
          <Trophy size={16} />
          <span>Top 20 Yappers</span>
        </div>
        <div className="leaderboard-grid">
          {topYappers.slice(0, 10).map((yapper) => (
            <div key={yapper.rank} className="leaderboard-item">
              <span className={`rank ${yapper.rank <= 3 ? 'top' : ''}`}>#{yapper.rank}</span>
              <span className="handle">{yapper.handle}</span>
              <span className="score">{yapper.score}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Patterns - Compact */}
      <section className="crypto-patterns">
        <div className="section-head">
          <Target size={16} />
          <span>Success Patterns</span>
        </div>
        <div className="pattern-list">
          {patternHighlights.map((block) => {
            const IconComponent = block.icon
            return (
              <div key={block.title} className="pattern-item">
                <IconComponent size={16} />
                <div className="pattern-text">
                  <h4>{block.title}</h4>
                  <p>{block.details}</p>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* CTA */}
      <div className="crypto-actions">
        <button type="button" className="btn-secondary-crypto">
          <ExternalLink size={16} />
          View on Platform
        </button>
        <button type="button" className="btn-primary-crypto" onClick={() => onDraftWithCoin(coin.id)}>
          <Pencil size={16} />
          Start Draft
        </button>
      </div>
    </div>
  )
}

ProjectDetail.propTypes = {
  onDraftWithCoin: PropTypes.func.isRequired,
}

export default ProjectDetail
