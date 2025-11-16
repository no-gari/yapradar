import PropTypes from 'prop-types'
import { Bell, Settings, Shield, CheckCircle, MessageSquare, ChevronRight, Sparkles, Users, Trophy, Flame, HelpCircle, Inbox, Info } from 'lucide-react'
import { mockUserAnalysis } from '../data/mockUser'

function MyPage({ onSelectProject }) {
  const initials = mockUserAnalysis.handle.replace('@', '').charAt(0).toUpperCase()
  const statsCards = [
    { label: 'Followers', value: mockUserAnalysis.followers.toLocaleString(), change: '+4.2%', icon: Users },
    { label: 'Engagement', value: '3.8%', change: '+0.6%', icon: Sparkles },
    { label: 'Streak', value: '12 days', change: '이번 주 +3', icon: Flame },
    { label: 'Leaderboard', value: '#18', change: '상위 5%', icon: Trophy },
  ]
  const supportMenu = [
    {
      title: '계정 설정',
      description: '핸들, 보안, 연동 관리',
      icon: Settings,
      action: () => onSelectProject('ai-cat'),
    },
    {
      title: '공지사항',
      description: '업데이트와 신규 기능 안내',
      icon: Bell,
    },
    {
      title: '문의사항',
      description: '팀에게 바로 질문 보내기',
      icon: MessageSquare,
    },
    {
      title: '지원 센터',
      description: 'FAQ, 사용 가이드를 확인하세요',
      icon: HelpCircle,
    },
    {
      title: '수신함',
      description: '프로젝트 초대 및 알림 모아보기',
      icon: Inbox,
    },
    {
      title: '서비스 안내',
      description: '요금제, 파트너십 자료',
      icon: Info,
    },
  ]

  return (
    <div className="page mypage">
      <section className="mypage-hero layout-card">
        <div className="mypage-hero-compact">
          <div className="hero-profile">
            <div className="mypage-avatar">
              <span>{initials}</span>
            </div>
            <div className="hero-info">
              <h2>{mockUserAnalysis.handle}</h2>
              <p className="hero-meta">
                {mockUserAnalysis.followers.toLocaleString()} followers · Yapper Score {mockUserAnalysis.yapperScore}
              </p>
              <div className="mypage-badges">
                <span className="badge-tier">
                  <Shield size={12} />
                  Pro
                </span>
                <span className="badge-verified">
                  <CheckCircle size={12} />
                  Verified
                </span>
              </div>
            </div>
          </div>
          <button type="button" className="btn-ghost hero-settings">
            <Settings size={16} />
          </button>
        </div>
      </section>

      <section className="stats-grid">
        {statsCards.map((card) => {
          const Icon = card.icon
          return (
            <article key={card.label} className="stat-panel">
              <div className="stat-panel-icon">
                <Icon size={18} />
              </div>
              <div className="stat-panel-content">
                <p className="label">{card.label}</p>
                <div className="stat-panel-metric">
                  <h3>{card.value}</h3>
                  <span className="change-positive">{card.change}</span>
                </div>
              </div>
            </article>
          )
        })}
      </section>

      <section className="layout-card mypage-menu">
        <div className="section-title">
          서비스 메뉴
        </div>
        <ul className="mypage-menu-list">
          {supportMenu.map((item) => {
            const Icon = item.icon
            return (
              <li key={item.title}>
                <button
                  type="button"
                  className="mypage-menu-item"
                  onClick={() => item.action?.()}
                >
                  <div className="menu-icon">
                    <Icon size={18} />
                  </div>
                  <div className="menu-content">
                    <p>{item.title}</p>
                    <span>{item.description}</span>
                  </div>
                  <ChevronRight size={16} />
                </button>
              </li>
            )
          })}
        </ul>
      </section>
    </div>
  )
}

MyPage.propTypes = {
  onSelectProject: PropTypes.func.isRequired,
}

export default MyPage
