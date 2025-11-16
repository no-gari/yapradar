import { Check, Zap, Crown, Sparkles } from 'lucide-react'

function Membership() {
  const plans = [
    {
      name: 'Free',
      price: '0',
      icon: Sparkles,
      description: '야핑을 시작하는 당신을 위한 기본 플랜',
      features: [
        '월 10회 계정 분석',
        '기본 초안 생성 (월 20회)',
        '인기 프로젝트 TOP 10 확인',
        '커뮤니티 접근',
      ],
      limitations: [
        '고급 분석 기능 제한',
        '즐겨찾기 프로젝트 3개 제한',
      ],
      cta: '무료로 시작하기',
      highlight: false,
    },
    {
      name: 'Pro',
      price: '29,000',
      icon: Zap,
      description: '진지한 야퍼를 위한 프로 플랜',
      features: [
        '무제한 계정 분석',
        '무제한 AI 초안 생성',
        '전체 프로젝트 리더보드',
        '고급 패턴 분석',
        '실시간 트렌드 알림',
        '즐겨찾기 프로젝트 무제한',
        '프리미엄 템플릿 라이브러리',
        '우선 고객 지원',
      ],
      limitations: [],
      cta: '7일 무료 체험',
      highlight: true,
    },
    {
      name: 'Team',
      price: '99,000',
      icon: Crown,
      description: '팀과 함께 성장하는 엔터프라이즈 플랜',
      features: [
        'Pro 플랜의 모든 기능',
        '최대 5명 팀 멤버',
        '팀 분석 대시보드',
        '공유 템플릿 라이브러리',
        '팀 성과 리포트',
        'API 접근 권한',
        '전담 계정 매니저',
        '커스텀 통합 지원',
      ],
      limitations: [],
      cta: '팀으로 시작하기',
      highlight: false,
    },
  ]

  return (
    <div className="page membership">
      <section className="membership-header">
        <h1>전세계의 야퍼들이 이미 사용하고 있습니다.</h1>
        <p className="membership-subtitle">
          플랜은 언제든지 변경 가능합니다.
        </p>
      </section>

      <div className="pricing-grid">
        {plans.map((plan) => {
          const IconComponent = plan.icon
          return (
            <article
              key={plan.name}
              className={`pricing-card ${plan.highlight ? 'pricing-card-highlight' : ''}`}
            >
              {plan.highlight && <div className="pricing-badge">Most Popular</div>}
              
              <div className="pricing-header">
                <div className="pricing-icon">
                  <IconComponent size={32} strokeWidth={2} />
                </div>
                <h2>{plan.name}</h2>
                <p className="pricing-description">{plan.description}</p>
              </div>

              <div className="pricing-price">
                <span className="price-amount">₩{plan.price}</span>
                <span className="price-period">/월</span>
              </div>

              <button className={plan.highlight ? 'btn-primary' : 'btn-outline'}>
                {plan.cta}
              </button>

              <div className="pricing-features">
                <h4>포함된 기능</h4>
                <ul>
                  {plan.features.map((feature, idx) => (
                    <li key={idx}>
                      <Check size={18} className="feature-check" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                {plan.limitations.length > 0 && (
                  <>
                    <h4 className="limitations-title">제한 사항</h4>
                    <ul className="limitations-list">
                      {plan.limitations.map((limitation, idx) => (
                        <li key={idx}>
                          <span>{limitation}</span>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            </article>
          )
        })}
      </div>

      <section className="membership-faq">
        <h2>자주 묻는 질문</h2>
        <div className="faq-grid">
          <div className="faq-item">
            <h3>환불 정책은 어떻게 되나요?</h3>
            <p>구독 후 7일 이내 전액 환불이 가능합니다. 그 이후에는 남은 기간에 대해 일할 계산된 금액이 환불됩니다.</p>
          </div>
          <div className="faq-item">
            <h3>플랜 변경은 언제든 가능한가요?</h3>
            <p>네, 언제든지 플랜을 업그레이드하거나 다운그레이드할 수 있습니다. 변경 시 차액은 다음 결제에 반영됩니다.</p>
          </div>
          <div className="faq-item">
            <h3>Team 플랜은 어떻게 관리하나요?</h3>
            <p>팀 관리자가 대시보드에서 멤버를 초대하고 권한을 관리할 수 있습니다.</p>
          </div>
          <div className="faq-item">
            <h3>결제 수단은 무엇이 있나요?</h3>
            <p>신용카드, 체크카드, 계좌이체, 그리고 주요 간편결제 서비스를 지원합니다.</p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Membership
