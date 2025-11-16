import React, { useEffect, useMemo, useState } from 'react';

const toneOptions = [
  { id: 'balance', label: '밸런스' },
  { id: 'hype', label: '하이프' },
  { id: 'info', label: '정보형' },
];

const lengthOptions = [
  { id: 'short', label: '짧게' },
  { id: 'medium', label: '보통' },
  { id: 'thread', label: '스레드' },
];

const tonePhrases = {
  balance: '밸런스 있게 장점과 리스크를 짚으면서',
  hype: '완전 하이프 모드로',
  info: '디테일한 데이터 요약과 함께',
};

const lengthPhrases = {
  short: '한 줄로 요약하면',
  medium: '2~3줄 느낌으로 정리하면',
  thread: '스레드 오프닝으로 던지면',
};

const endingTags = {
  short: ['#alpha', '#early'],
  medium: ['#YapRadar', '#signal'],
  thread: ['#thread', '#deepdive'],
};

function buildDraft(coin, tone, length) {
  if (!coin) return '';
  const base = `${coin.emoji} ${coin.name} (${coin.symbol}) · ${coin.platform}`;
  const intro = `${lengthPhrases[length]} ${tonePhrases[tone]} ${coin.description.toLowerCase()}.`;
  const signal = `Attemptability ${coin.attemptability}/100, Saturation ${coin.saturation}/100라서 ${coin.trend.replace(
    /·/g,
    '-'
  )}.`;
  const call =
    tone === 'hype'
      ? '지금 미리 자리 잡고 야핑하면 상위권 진입각!'
      : tone === 'info'
      ? '데이터 따라가며 차분히 기록 남기면 신뢰도 UP.'
      : '커뮤니티 vibe 살피면서 한두 줄씩 던지기 좋은 타이밍.';
  const tags = ['#InfoFi', `#${coin.symbol}`, ...endingTags[length]];
  return `${base}\n${intro}\n${signal}\n${call}\n${tags.join(' ')}`;
}

function Draft({ coins, selectedCoinId, onSelectCoin }) {
  const [tone, setTone] = useState('balance');
  const [length, setLength] = useState('short');
  const selectedCoin = useMemo(() => coins.find((coin) => coin.id === selectedCoinId) || coins[0], [
    coins,
    selectedCoinId,
  ]);
  const [draftText, setDraftText] = useState(() => buildDraft(selectedCoin, tone, length));

  useEffect(() => {
    setDraftText(buildDraft(selectedCoin, tone, length));
  }, [selectedCoin, tone, length]);

  const regenerate = () => {
    setDraftText(buildDraft(selectedCoin, tone, length));
  };

  const copyDraft = async () => {
    try {
      await navigator.clipboard.writeText(draftText);
      alert('클립보드에 복사되었습니다!');
    } catch (error) {
      alert('복사에 실패했어요.');
    }
  };

  return (
    <div className="page draft-page">
      <section className="section">
        <div className="section-header">
          <h2>코인 선택</h2>
          <p className="muted">추천 코인들 중 바로 초안을 생성해 보세요.</p>
        </div>
        <div className="pill-row">
          {coins.map((coin) => (
            <button
              key={coin.id}
              className={`pill ${selectedCoin.id === coin.id ? 'active' : ''}`}
              onClick={() => onSelectCoin(coin.id)}
            >
              {coin.emoji} {coin.name}
            </button>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-header">
          <h3>톤 & 길이 선택</h3>
        </div>
        <div className="option-group">
          <div>
            <p className="muted">Tone</p>
            <div className="pill-row">
              {toneOptions.map((option) => (
                <button
                  key={option.id}
                  className={`pill ${tone === option.id ? 'active' : ''}`}
                  onClick={() => setTone(option.id)}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="muted">Length</p>
            <div className="pill-row">
              {lengthOptions.map((option) => (
                <button
                  key={option.id}
                  className={`pill ${length === option.id ? 'active' : ''}`}
                  onClick={() => setLength(option.id)}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="selected-coin-card">
          <div>
            <h3>
              {selectedCoin.emoji} {selectedCoin.name} · {selectedCoin.symbol}
            </h3>
            <p className="muted">{selectedCoin.platform}</p>
          </div>
          <div className="score-inline">
            <span>Attemptability {selectedCoin.attemptability}</span>
            <span>Saturation {selectedCoin.saturation}</span>
          </div>
          <p className="muted">{selectedCoin.description}</p>
        </div>
      </section>

      <section className="section">
        <div className="draft-box">
          <pre>{draftText}</pre>
        </div>
        <div className="draft-actions">
          <button className="btn ghost" onClick={regenerate}>
            새로 생성하기
          </button>
          <button className="btn primary" onClick={copyDraft}>
            복사하기
          </button>
        </div>
      </section>
    </div>
  );
}

export default Draft;
