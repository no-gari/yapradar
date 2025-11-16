import { useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import { Pencil, Copy, RefreshCw } from 'lucide-react'
import { mockCoins } from '../data/mockCoins'

const toneOptions = [
  { id: 'balance', label: '밸런스' },
  { id: 'hype', label: '하이프' },
  { id: 'info', label: '정보형' },
]

const lengthOptions = [
  { id: 'short', label: '짧게' },
  { id: 'medium', label: '보통' },
  { id: 'thread', label: '스레드' },
]

function generateDraftCopy(coin, tone, length) {
  const toneSnippets = {
    balance: `${coin.name} 포지션을 담담하게 체크하면서도 기회 포인트를 강조`,
    hype: `${coin.name} 타이밍 놓치면 늦는다는 밈 텐션`,
    info: `${coin.platform}에서 진행 중인 빌더/데이터를 콕 집어주는 정보형`,
  }

  const lengthSnippets = {
    short: `${coin.signal}. 지금 컷 ${coin.attemptability}점, 포화도 ${coin.saturation}%라서 아직 틈 있어 보이죠?`,
    medium: `${coin.signal}. ${coin.timingNotes}. ${coin.formatTips} 포맷으로 한 번에 상위권 노려봅니다.`,
    thread:
      `1/ ${coin.signal}.\n2/ ${coin.timingNotes}.\n3/ ${coin.keywordFocus
        .slice(0, 3)
        .map((key) => `#${key}`)
        .join(' ')} 의 톤으로 ${coin.formatTips}로 마무리.`,
  }

  const base = `#${coin.symbol} · ${toneSnippets[tone]} - 지금 야핑하기 좋은 포인트 정리`
  const body = lengthSnippets[length]
  const hashtags = ['#InfoFi', `#${coin.symbol}`, '#YapRadar', '#early', '#alpha']

  return `${base}\n\n${body}\n\n${hashtags.join(' ')}`
}

function Draft({ selectedCoinId, onSelectCoin }) {
  const [tone, setTone] = useState('balance')
  const [length, setLength] = useState('short')
  const selectedCoin = useMemo(() => mockCoins.find((coin) => coin.id === selectedCoinId) ?? mockCoins[0], [selectedCoinId])
  const [version, setVersion] = useState(0)
  const [hasGenerated, setHasGenerated] = useState(false)
  const draftText = useMemo(() => {
    if (!selectedCoin) return ''
    const variants = ['\n\n(레이더 핑 완료)', '\n\n(컷 갱신, 아직 널널)', '\n\n(커뮤니티 옵저버 모드 off)']
    const suffix = variants[version % variants.length]
    return `${generateDraftCopy(selectedCoin, tone, length)}${suffix}`
  }, [selectedCoin, tone, length, version])

  const handleGenerate = () => {
    setHasGenerated(true)
    setVersion((prev) => prev + 1)
  }

  const regenerate = () => setVersion((prev) => prev + 1)

  const copyDraft = async () => {
    if (!draftText || !navigator?.clipboard) return
    try {
      await navigator.clipboard.writeText(draftText)
    } catch (error) {
      console.error('Clipboard copy failed', error)
    }
  }

  if (!selectedCoin) return null

  return (
    <div className="page draft">
      <section className="layout-card" style={{ marginBottom: '1.5rem' }}>
        <div className="section-title" style={{ marginBottom: '1rem' }}>
          <Pencil size={24} />
          코인별 글 초안 생성
        </div>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>
          추천 코인들에 대해 바로 X에 붙여 넣을 수 있는 글을 만들어 드립니다.
        </p>

        <div style={{ marginBottom: '1.25rem' }}>
          <small style={{ display: 'block', marginBottom: '0.4rem', color: 'var(--text-secondary)' }}>코인 선택</small>
          <div className="draft-pills">
            {mockCoins.map((coin) => (
              <button
                key={coin.id}
                type="button"
                className={`pill ${coin.id === selectedCoin.id ? 'active' : ''}`}
                onClick={() => onSelectCoin(coin.id)}
              >
                {coin.name}
              </button>
            ))}
          </div>
        </div>

        <div className="draft-options" style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
          <div>
            <small style={{ display: 'block', marginBottom: '0.3rem', color: 'var(--text-secondary)' }}>Tone</small>
            <div className="draft-pills">
              {toneOptions.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  className={`pill ${tone === option.id ? 'active' : ''}`}
                  onClick={() => setTone(option.id)}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
          <div>
            <small style={{ display: 'block', marginBottom: '0.3rem', color: 'var(--text-secondary)' }}>Length</small>
            <div className="draft-pills">
              {lengthOptions.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  className={`pill ${length === option.id ? 'active' : ''}`}
                  onClick={() => setLength(option.id)}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <article className="layout-card" style={{ marginTop: '1.5rem' }}>
          <h3>
            {selectedCoin.name} · {selectedCoin.symbol}
          </h3>
          <small>{selectedCoin.platform}</small>
          <div className="score-row">
            <div className="score-pill">
              <span>Attemptability</span>
              <strong>{selectedCoin.attemptability}</strong>
            </div>
            <div className="score-pill">
              <span>Saturation</span>
              <strong>{selectedCoin.saturation}</strong>
            </div>
          </div>
          <p style={{ color: 'var(--text-secondary)' }}>{selectedCoin.description}</p>
        </article>
        <div className="draft-generate">
          <button type="button" className="btn-primary draft-generate-btn" onClick={handleGenerate}>
            <Pencil size={18} />
            초안 생성하기
          </button>
        </div>

        {hasGenerated && (
          <>
            <div className="draft-output">{draftText}</div>
            <div className="draft-actions">
              <button type="button" className="btn-outline" onClick={regenerate}>
                <RefreshCw size={18} />
                다시 생성하기
              </button>
              <button type="button" className="btn-secondary-crypto" onClick={copyDraft}>
                <Copy size={18} />
                복사하기
              </button>
            </div>
          </>
        )}
      </section>
    </div>
  )
}

Draft.propTypes = {
  selectedCoinId: PropTypes.string,
  onSelectCoin: PropTypes.func.isRequired,
}

export default Draft
