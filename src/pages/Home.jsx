import PropTypes from 'prop-types'
import { Search, Pencil, TrendingUp, ChevronRight, HelpCircle } from 'lucide-react'
import { mockCoins } from '../data/mockCoins'

function Home({ onViewAnalyze, onViewDraft, onSelectProject }) {
  const features = [
    {
      icon: Search,
      title: 'Yap! Analyze',
      description: '내 X 계정 분석하기',
      detail: 'AI가 당신의 트윗 패턴과 영향력을 분석하고 개선점을 제안합니다',
      action: onViewAnalyze,
    },
    {
      icon: Pencil,
      title: 'Yap! Draft',
      description: '나만을 위한 AI 초안 작성',
      detail: '프로젝트와 톤을 선택하면 최적화된 트윗 초안을 자동 생성합니다',
      action: onViewDraft,
    },
  ]

  const faqs = [
    {
      question: 'YapRadar는 어떻게 작동하나요?',
      answer: 'X(Twitter) 계정을 연결하면 AI가 트윗 패턴, 반응률, 영향력을 분석하여 최적의 야핑 전략을 제안합니다.',
    },
    {
      question: '어떤 프로젝트를 야핑해야 하나요?',
      answer: '리더보드에서 Attemptability(진입 용이성)와 Saturation(포화도)을 확인하세요. 높은 점수일수록 지금 시작하기 좋은 프로젝트입니다.',
    },
    {
      question: '초안은 어떻게 활용하나요?',
      answer: 'AI가 생성한 초안을 그대로 사용하거나, 자신의 스타일에 맞게 편집하여 트윗하세요. 복사 버튼으로 간편하게 사용할 수 있습니다.',
    },
    {
      question: '무료로 사용할 수 있나요?',
      answer: 'Free 플랜으로 월 10회 분석과 20회 초안 생성이 가능합니다. 더 많은 기능이 필요하면 Pro 플랜을 이용하세요.',
    },
  ]

  return (
    <div className="page home">
      {/* Feature Cards */}
      <section className="features-section">
        <h1 className="page-title">당신만의 야핑 AI Assistant</h1>
        <div className="feature-cards">
          {features.map((feature) => {
            const IconComponent = feature.icon
            return (
              <article key={feature.title} className="feature-card" onClick={feature.action}>
                <div className="feature-icon">
                  <IconComponent size={28} strokeWidth={2} />
                </div>
                <div className="feature-content">
                  <h2>{feature.title}</h2>
                  <p className="feature-desc">{feature.description}</p>
                  <p className="feature-detail">{feature.detail}</p>
                </div>
                <ChevronRight className="feature-arrow" size={20} />
              </article>
            )
          })}
        </div>
      </section>

      {/* Project Leaderboard - List Style */}
      <section className="leaderboard-section">
        <div className="section-header">
          <div>
            <h2 className="section-title">
              <TrendingUp size={24} />
              지금 야핑하기 좋은 프로젝트
            </h2>
            <p className="section-subtitle">실시간으로 업데이트되는 프로젝트 순위</p>
          </div>
        </div>

        <div className="leaderboard-list">
          {mockCoins.map((coin, index) => {
            const gradientPalette = [
              'linear-gradient(135deg, rgba(88, 101, 242, 0.9), rgba(14, 165, 233, 0.9))',
              'linear-gradient(135deg, rgba(56, 189, 248, 0.9), rgba(13, 148, 136, 0.9))',
              'linear-gradient(135deg, rgba(245, 158, 11, 0.9), rgba(249, 115, 22, 0.9))',
              'linear-gradient(135deg, rgba(168, 85, 247, 0.9), rgba(244, 114, 182, 0.9))',
            ]
            const palette = gradientPalette[index % gradientPalette.length]
            const initials = coin.symbol.slice(0, 2).toUpperCase()

            return (
            <article
              key={coin.id}
              className="leaderboard-item"
              onClick={() => onSelectProject(coin.id)}
            >
              <div className="leaderboard-rank">
                <span className={`rank-number ${index < 3 ? 'rank-top' : ''}`}>
                  {index + 1}
                </span>
              </div>
                <div className="leaderboard-icon" style={{ backgroundImage: palette }}>
                  <span>{initials}</span>
                </div>
              
              <div className="leaderboard-info">
                <div className="leaderboard-main">
                  <h3>{coin.name}</h3>
                  <span className="coin-symbol">{coin.symbol}</span>
                  <span className="coin-platform">{coin.platform}</span>
                </div>
                <p className="leaderboard-desc">{coin.description}</p>
              </div>

              <div className="leaderboard-scores">
                <div className="score-badge">
                  <span className="score-label">진입성</span>
                  <span className="score-value">{coin.attemptability}</span>
                </div>
                <div className="score-badge">
                  <span className="score-label">포화도</span>
                  <span className="score-value saturation">{coin.saturation}</span>
                </div>
              </div>

              <div className="leaderboard-trend">
                <span className={coin.trend.includes('↑') ? 'trend-up' : 'trend-down'}>
                  {coin.trend}
                </span>
              </div>

              <ChevronRight className="leaderboard-arrow" size={20} />
            </article>
            )
          })}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section">
        <div className="section-header">
          <h2 className="section-title">
            <HelpCircle size={24} />
            처음이신가요? 여기서 시작하세요
          </h2>
        </div>
        
        <div className="faq-list">
          {faqs.map((faq, index) => (
            <details key={index} className="faq-item">
              <summary className="faq-question">
                <span>{faq.question}</span>
                <ChevronRight className="faq-icon" size={18} />
              </summary>
              <div className="faq-answer">
                <p>{faq.answer}</p>
              </div>
            </details>
          ))}
        </div>
      </section>
    </div>
  )
}

Home.propTypes = {
  onViewAnalyze: PropTypes.func.isRequired,
  onViewDraft: PropTypes.func.isRequired,
  onSelectProject: PropTypes.func.isRequired,
}

export default Home
