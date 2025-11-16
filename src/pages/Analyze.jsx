import { useEffect, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import {
  Search,
  Sparkles,
  MessageCircle,
  Hash,
  ArrowUpRight,
  Target,
  Activity,
  Gauge,
  Link2,
  X,
  Loader2,
} from 'lucide-react'
import { mockUserAnalysis } from '../data/mockUser'
import { mockCoins } from '../data/mockCoins'
import CoinCard from '../components/CoinCard'

function Analyze({ onSelectProject, onLaunchDraft }) {
  const [step, setStep] = useState('input')
  const [handle, setHandle] = useState('@yapper_xyz')
  const [postUrl, setPostUrl] = useState('https://x.com/...')
  const [sample, setSample] = useState('최근에 올린 대표적인 트윗을 붙여 넣어주세요.')
  const [selectedCoinId, setSelectedCoinId] = useState(mockCoins[0]?.id)
  const [activeMetric, setActiveMetric] = useState(null)

  const selectedCoin = useMemo(
    () => mockCoins.find((coin) => coin.id === selectedCoinId) ?? mockCoins[0],
    [selectedCoinId]
  )

  const recommendedCoins = useMemo(() => mockCoins.slice(0, 3), [])

  const distribution = useMemo(
    () => [
      { label: '오리지널', value: 52 },
      { label: '리포스트', value: 28 },
      { label: '리플라이', value: 20 },
    ],
    []
  )

  const metricDetails = useMemo(
    () => ({
      activity: {
        title: '활동 강도',
        highlight: `${mockUserAnalysis.frequency.postsPerDay} / day`,
        target: mockUserAnalysis.frequency.target,
        insight: mockUserAnalysis.frequency.comment,
      },
    }),
    []
  )

  const activeMetricDetail = activeMetric ? metricDetails[activeMetric] : null

  const openMetricDetail = (metricKey) => setActiveMetric(metricKey)
  const closeMetricDetail = () => setActiveMetric(null)

  const handleRunAnalysis = () => {
    if (step !== 'input') return
    setStep('loading')
  }

  useEffect(() => {
    if (step !== 'loading') return undefined
    const timer = setTimeout(() => {
      setStep('result')
    }, 1200)
    return () => clearTimeout(timer)
  }, [step])

  const handleReset = () => {
    setStep('input')
  }

  return (
    <div className={`page analyze step-${step}`}>
      {step === 'input' && (
        <section className="layout-card analyze-setup">
          <div className="analyze-setup-header">
            <div>
              <p className="label">Step 1</p>
              <h2>분석 대상 선택</h2>
              <p className="subtext">프로젝트와 계정을 연결하면 보다 정밀한 인사이트를 드립니다.</p>
            </div>
          </div>

          <div className="analyze-grid">
            <div className="analyze-panel">
              <div className="panel-head">
                <Target size={18} />
                코인 선택
              </div>
              <div className="coin-selector">
                {mockCoins.slice(0, 6).map((coin) => (
                  <button
                    type="button"
                    key={coin.id}
                    className={`coin-pill ${coin.id === selectedCoinId ? 'active' : ''}`}
                    onClick={() => setSelectedCoinId(coin.id)}
                  >
                    <span className="pill-symbol">{coin.symbol}</span>
                    <span>{coin.name}</span>
                    {coin.id === selectedCoinId && <ArrowUpRight size={14} />}
                  </button>
                ))}
              </div>
            </div>

            <div className="analyze-panel">
              <div className="panel-head">
                <MessageCircle size={18} />
                X 계정 분석하기
              </div>
              <label className="form-field">
                <span>핸들</span>
                <input value={handle} onChange={(event) => setHandle(event.target.value)} placeholder="@yapper_xyz" />
              </label>
              <label className="form-field">
                <span>최근 대표 트윗</span>
                <textarea value={sample} onChange={(event) => setSample(event.target.value)} rows={4} />
              </label>
            </div>

            <div className="analyze-panel">
              <div className="panel-head">
                <Link2 size={18} />
                게시글 분석하기
              </div>
              <label className="form-field">
                <span>X 링크</span>
                <input value={postUrl} onChange={(event) => setPostUrl(event.target.value)} placeholder="https://x.com/..." />
              </label>
              <p className="subtext">게시글 URL로 콘텐츠 성과를 추적해보세요.</p>
            </div>
          </div>

          <div className="analyze-actions analyze-setup-actions">
            <button type="button" className="btn-primary analyze-run" onClick={handleRunAnalysis}>
              <Search size={16} />
              분석 실행
            </button>
          </div>
        </section>
      )}

      {step === 'loading' && (
        <section className="layout-card analyze-loading" aria-live="polite">
          <div className="loading-visual">
            <Loader2 className="loading-spinner" size={48} />
            <h3>yap!radar가 분석 중...</h3>
            <p>최대 2초 정도 걸려요. 서두르지 않아도 괜찮아요.</p>
          </div>
        </section>
      )}

      {step === 'result' && (
        <>
          <section className="layout-card analyze-hero">
            <div className="analyze-hero-profile">
              <div className="hero-avatar">{mockUserAnalysis.avatarEmoji}</div>
              <div>
                <p className="label">분석 계정</p>
                <h3>{mockUserAnalysis.handle}</h3>
                <span>{mockUserAnalysis.followers.toLocaleString()} followers</span>
              </div>
            </div>
            <div className="analyze-hero-coin">
              <p className="label">선택한 코인</p>
              <h3>{selectedCoin.name}</h3>
              <span>{selectedCoin.symbol} · {selectedCoin.platform}</span>
            </div>
            <div className="analyze-hero-stats">
              <div>
                <p className="label">Yapper Score</p>
                <strong>{mockUserAnalysis.yapperScore}</strong>
                <small>상위 {mockUserAnalysis.rankPercentile}%</small>
              </div>
              <div>
                <p className="label">매칭 지수</p>
                <strong>82%</strong>
                <small>톤/키워드 기반</small>
              </div>
            </div>
          </section>

          <section className="metrics-grid">
            <article
              className="metric-card interactive"
              role="button"
              tabIndex={0}
              onClick={() => openMetricDetail('activity')}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault()
                  openMetricDetail('activity')
                }
              }}
            >
              <div className="metric-head">
                <Gauge size={18} />
                활동 강도
              </div>
              <div className="metric-value">
                {mockUserAnalysis.frequency.postsPerDay}
                <span>/day</span>
              </div>
              <div className="metric-bar">
                <div style={{ width: `${mockUserAnalysis.frequency.postsPerDay * 15}%` }} />
              </div>
              <p>{mockUserAnalysis.frequency.comment}</p>
            </article>
            <article className="metric-card">
              <div className="metric-head">
                <Sparkles size={18} />
                톤 밸런스
              </div>
              <ul className="tone-list">
                <li>긍정 {mockUserAnalysis.tone.positiveRatio}%</li>
                <li>중립 {mockUserAnalysis.tone.neutralRatio}%</li>
                <li>비판 {mockUserAnalysis.tone.negativeRatio}%</li>
              </ul>
              <p>{mockUserAnalysis.tone.comment}</p>
            </article>
            <article className="metric-card keyword-card">
              <div className="metric-head">
                <Hash size={18} />
                키워드
              </div>
              <div className="chip-group">
                {mockUserAnalysis.keywords.mine.map((keyword) => (
                  <span key={keyword} className="chip">#{keyword}</span>
                ))}
              </div>
              <div className="chip-group missing">
                {mockUserAnalysis.keywords.missing.map((keyword) => (
                  <span key={keyword} className="chip">+ {keyword}</span>
                ))}
              </div>
            </article>
            <article className="metric-card">
              <div className="metric-head">
                <Activity size={18} />
                콘텐츠 타입
              </div>
              <div className="distribution">
                {distribution.map((item) => (
                  <div key={item.label}>
                    <p>{item.label}</p>
                    <div className="metric-bar compact">
                      <div style={{ width: `${item.value}%` }} />
                    </div>
                    <span>{item.value}%</span>
                  </div>
                ))}
              </div>
            </article>
          </section>

          <section className="layout-card recommendation-card">
            <div className="section-title">
              <Sparkles size={24} />
              당신에게 잘 맞는 코인 추천
            </div>
            <p className="section-subtext">
              선택한 코인과 유사한 톤/키워드 매칭도를 기준으로 추천합니다.
            </p>
            <div className="coin-grid">
              {recommendedCoins.map((coin) => (
                <CoinCard
                  key={coin.id}
                  coin={coin}
                  onClick={() => onSelectProject(coin.id)}
                  footer={
                    <div className="draft-actions" style={{ marginTop: '0.5rem' }}>
                      <button
                        type="button"
                        className="btn-outline"
                        onClick={(event) => {
                          event.stopPropagation()
                          onSelectProject(coin.id)
                        }}
                      >
                        상세 보기
                      </button>
                      <button
                        type="button"
                        className="btn-primary"
                        onClick={(event) => {
                          event.stopPropagation()
                          onLaunchDraft(coin.id)
                        }}
                      >
                        이 코인으로 초안
                      </button>
                    </div>
                  }
                />
              ))}
            </div>
          </section>

          <div className="analyze-actions">
            <button type="button" className="btn-ghost" onClick={handleReset}>
              다시 분석하기
            </button>
          </div>
        </>
      )}

      {activeMetricDetail && (
        <div className="analyze-modal-overlay" role="dialog" aria-modal="true" onClick={closeMetricDetail}>
          <div
            className="analyze-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <button type="button" className="modal-close" onClick={closeMetricDetail} aria-label="닫기">
              <X size={16} />
            </button>
            <p className="label">{activeMetricDetail.title}</p>
            <h3 className="modal-title">{activeMetricDetail.highlight}</h3>
            <p className="subtext">{activeMetricDetail.target}</p>
            <div className="modal-highlight">{activeMetricDetail.insight}</div>
            <button type="button" className="btn-primary" onClick={closeMetricDetail}>
              이해했어요
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

Analyze.propTypes = {
  onSelectProject: PropTypes.func.isRequired,
  onLaunchDraft: PropTypes.func.isRequired,
}

export default Analyze
