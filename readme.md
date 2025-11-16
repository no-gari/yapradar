## YapRadar — AI 야핑 어시스턴트 UI

React + Vite 기반의 SPA로, X(Twitter)에서 야핑하는 유저를 돕는 AI Assistant 콘셉트의 클릭 가능한 UI 프로토타입입니다. 이 단계에서는 모든 데이터가 mock 객체로 구성되어 있으며 추후 실제 API를 연결할 수 있도록 페이지/컴포넌트 구조를 분리했습니다.

### 주요 기능
- **Home:** 히어로 카피와 "지금 야핑하기 좋은 프로젝트" 리더보드.
- **Analyze:** X 계정 분석 플로우(입력 → 결과 카드)와 맞춤형 코인 추천.
- **Draft:** 코인/톤/길이를 선택하면 곧바로 초안을 생성하고 복사.
- **My Page:** 프로필 요약, 점수 추이 placeholder, 즐겨찾기 코인 리스트.
- **Project Detail:** Attemptability·Saturation·Trend 카드, 상위 야퍼 테이블, 패턴/타이밍 인사이트, Draft 탭 연동 CTA.

### 기술 스택
- React 19 + Vite 7
- React Router DOM
- CSS 기반 다크 테마 스타일링
- Mock 데이터 모듈 (`src/data/*.js`)

### 빠른 시작
아래 명령으로 의존성을 설치하고 개발 서버를 띄울 수 있습니다.

```bash
npm install
npm run dev
```

기본 개발 주소는 `http://localhost:5173`입니다.

### 주요 스크립트
```bash
npm run dev      # 개발 서버
npm run build    # 프로덕션 번들
npm run preview  # 빌드 결과 로컬 미리보기
```

### 폴더 구조
```
src/
├── App.jsx
├── main.jsx
├── styles.css
├── components/
│   ├── CoinCard.jsx
│   ├── MobileTabBar.jsx
│   └── NavBar.jsx
├── data/
│   ├── mockCoins.js
│   ├── mockTopYappers.js
│   └── mockUser.js
└── pages/
	├── Analyze.jsx
	├── Draft.jsx
	├── Home.jsx
	├── MyPage.jsx
	└── ProjectDetail.jsx
```

Mock 데이터를 교체하거나 API 연동 로직을 추가하면 즉시 실서비스 개발로 확장할 수 있습니다.
