import React, { useState } from 'react';
import CoinCard from '../components/CoinCard.jsx';

function Analyze({ userAnalysis, coins, onSelectCoin }) {
  const [handleInput, setHandleInput] = useState('');
  const [tweetSample, setTweetSample] = useState('');
  const [step, setStep] = useState('input');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!handleInput || !tweetSample) return;
    setStep('result');
  };

  return (
    <div className="page analyze-page">
      {step === 'input' && (
        <form className="analyze-form" onSubmit={handleSubmit}>
          <h2>내 X 계정 분석하기</h2>
          <p className="muted">
            야핑 빈도, 톤, 키워드를 기반으로 당신의 스타일을 분석하고 더 잘 쓸 수 있는 방법을 제안합니다.
          </p>
          <label className="form-label">
            X 핸들
            <input
              type="text"
              placeholder="@yapper_xyz"
              value={handleInput}
              onChange={(e) => setHandleInput(e.target.value)}
            />
          </label>
          <label className="form-label">
            최근에 올린 대표적인 트윗 내용을 붙여 넣어주세요.
            <textarea
              rows="5"
              value={tweetSample}
              onChange={(e) => setTweetSample(e.target.value)}
              placeholder="ex) 이번 주에 열리는 프로젝트/느낀 점 등을 적어주세요"
            />
          </label>
          <button type="submit" className="btn primary" disabled={!handleInput || !tweetSample}>
            분석하기
          </button>
        </form>
      )}

      {step === 'result' && (
        <div className="analysis-result">
          <div className="profile-card">
            <div className="avatar">{userAnalysis.avatarEmoji}</div>
            <div>
              <h3>{userAnalysis.handle}</h3>
              <p className="muted">팔로워 {userAnalysis.followers.toLocaleString()}명</p>
              <p className="score">
                Yapper Score {userAnalysis.yapperScore}/100 · 상위 {userAnalysis.rankPercentile}%
              </p>
            </div>
          </div>

          <div className="analysis-grid">
            <div className="analysis-card">
              <h4>활동 빈도</h4>
              <p className="value">{userAnalysis.frequency.postsPerDay}회 / day</p>
              <p className="muted">{userAnalysis.frequency.target}</p>
              <p className="comment">{userAnalysis.frequency.comment}</p>
            </div>
            <div className="analysis-card">
              <h4>톤 & 감성</h4>
              <div className="tone-bars">
                <div>긍정 {userAnalysis.tone.positiveRatio}%</div>
                <div>중립 {userAnalysis.tone.neutralRatio}%</div>
                <div>부정 {userAnalysis.tone.negativeRatio}%</div>
              </div>
              <p className="comment">{userAnalysis.tone.comment}</p>
            </div>
            <div className="analysis-card">
              <h4>키워드</h4>
              <p className="muted">자주 쓰는 키워드</p>
              <div className="chip-row">
                {userAnalysis.keywords.mine.map((keyword) => (
                  <span key={keyword} className="chip">
                    {keyword}
                  </span>
                ))}
              </div>
              <p className="muted">부족한 키워드</p>
              <div className="chip-row">
                {userAnalysis.keywords.missing.map((keyword) => (
                  <span key={keyword} className="chip ghost">
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
            <div className="analysis-card">
              <h4>추천 문장 & 해시태그</h4>
              <p className="comment">{userAnalysis.exampleDraft}</p>
              <div className="chip-row">
                {userAnalysis.hashtags.map((tag) => (
                  <span key={tag} className="chip">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <section className="section">
            <div className="section-header">
              <h3>당신에게 잘 맞는 코인 추천</h3>
              <p className="muted">현재 톤/키워드/활동 패턴을 기반으로 매칭된 코인입니다.</p>
            </div>
            <div className="coin-grid">
              {coins.slice(0, 3).map((coin) => (
                <CoinCard key={coin.id} coin={coin} onSelect={onSelectCoin} />
              ))}
            </div>
          </section>
        </div>
      )}
    </div>
  );
}

export default Analyze;
