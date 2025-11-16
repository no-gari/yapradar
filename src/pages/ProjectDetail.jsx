import React from 'react';

function ProjectDetail({ coin, topYappers, onBack, onDraft }) {
  if (!coin) return null;

  return (
    <div className="page project-detail">
      <button className="btn ghost back-btn" onClick={onBack}>
        ← 목록으로 돌아가기
      </button>
      <section className="detail-hero">
        <div className="detail-title">
          <span className="coin-emoji large">{coin.emoji}</span>
          <div>
            <h1>
              {coin.name} · {coin.symbol}
            </h1>
            <p className="muted">{coin.platform}</p>
          </div>
        </div>
        <p className="detail-description">{coin.description}</p>
      </section>

      <section className="score-grid">
        <div className="score-card">
          <p className="label">Attemptability Score</p>
          <p className="value">{coin.attemptability}/100</p>
          <p className="comment">지금 진입하기 좋은 편입니다.</p>
        </div>
        <div className="score-card">
          <p className="label">Saturation Score</p>
          <p className="value">{coin.saturation}/100</p>
          <p className="comment">아직 포화도가 낮아 상위 진입 여지가 있습니다.</p>
        </div>
        <div className="score-card">
          <p className="label">Trend Momentum</p>
          <p className="value">{coin.trend}</p>
          <p className="comment">커뮤니티 온도가 빠르게 올라오고 있어요.</p>
        </div>
      </section>

      <section className="section">
        <div className="section-header">
          <h3>현재 상위 야퍼 Top 20</h3>
          <p className="muted">최근 7일 간 활동량 기준 상위 5명을 보여줍니다.</p>
        </div>
        <div className="yapper-table">
          <div className="yapper-row header">
            <span>순위</span>
            <span>핸들</span>
            <span>점수</span>
            <span>7일 포스팅</span>
          </div>
          {topYappers.map((yapper) => (
            <div key={yapper.rank} className="yapper-row">
              <span>{yapper.rank}</span>
              <span>{yapper.handle}</span>
              <span>{yapper.score}</span>
              <span>{yapper.posts7d}회</span>
            </div>
          ))}
        </div>
      </section>

      <section className="section pattern-section">
        <h3>상위 야퍼 글 패턴</h3>
        <div className="pattern-grid">
          <div className="pattern-card">
            <p className="label">공통 키워드</p>
            <div className="chip-row">
              {['agent', 'alpha', 'gm energy', 'cat vibes'].map((tag) => (
                <span key={tag} className="chip">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="pattern-card">
            <p className="label">톤 요약</p>
            <p className="comment">밈 + 긍정/기대감 높은 톤, 이모지 2~3개 사용.</p>
          </div>
          <div className="pattern-card">
            <p className="label">포맷</p>
            <p className="comment">짧은 문장 2줄 + 해시태그 3~4개, 마지막에 CTA.</p>
          </div>
        </div>
      </section>

      <section className="section timing-section">
        <h3>지금 들어가면 어떨까요?</h3>
        <p className="comment">
          시작 후 5일 경과, 상위 100위 점수는 아직 낮은 편입니다. 신규 참가자 수가 서서히 증가 중이지만, 아직
          과열 구간은 아닙니다.
        </p>
        <p className="comment">→ Early-Late 중간 구간. 지금 진입하면 상위권 진입 가능성이 있습니다.</p>
      </section>

      <section className="cta-row">
        <button className="btn ghost">이 코인 야핑하러 가기</button>
        <button className="btn primary" onClick={onDraft}>
          이 코인으로 초안 작성하기
        </button>
      </section>
    </div>
  );
}

export default ProjectDetail;
