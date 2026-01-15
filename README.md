# BrainDaily - 전두엽 강화 훈련 서비스

전두엽을 매일 강화하는 인지 훈련 웹 애플리케이션입니다.
과학적으로 검증된 인지 훈련 게임을 통해 집중력, 기억력, 의사결정 능력을 향상시킬 수 있습니다.

🌐 **배포 주소**: https://sumzdev.github.io/brain-daily/

## 주요 기능

### 인지 훈련 게임
- **Stroop Test**: 색상 인지 능력 강화 및 주의력 향상
- **N-back Game**: 작업 기억(Working Memory) 훈련
- **Decision Making**: 즉각적 보상 vs 장기적 이익 선택 훈련
- **요약 훈련**: 복잡한 정보 처리 및 핵심 파악 능력 향상
- **감정 라벨링**: 편도체 진정 및 감정 조절 능력 강화
- **호흡 명상**: 집중력과 이완 능력 향상
- **IF-THEN 플래닝**: 계획 수립 및 실행력 강화

### 통계 및 진행 상황
- **일자별 기록**: 날짜별 게임 완료 내역 및 점수 추적
- **연속 완료 스트릭**: 연속 훈련일 수 추적으로 동기부여
- **총 세션 통계**: 전체 완료한 게임 세션 수 확인
- **점수 기록**: 각 게임별 점수 및 소요 시간 저장
- **더미 데이터 생성**: 테스트용 샘플 데이터 생성 기능

### 사용자 경험
- **다크 테마 디자인**: 눈의 피로를 줄이는 세련된 UI
- **반응형 레이아웃**: 모바일, 태블릿, 데스크톱 지원
- **로컬 데이터 저장**: localStorage를 활용한 클라이언트 사이드 데이터 관리
- **직관적인 네비게이션**: React Router를 활용한 페이지 전환

## 기술 스택

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Routing**: React Router DOM v7
- **Storage**: localStorage (클라이언트 사이드)
- **Build Tool**: React Scripts (Create React App)
- **Deployment**: GitHub Pages

## 설치 및 실행

### 로컬 개발 환경

```bash
# 의존성 설치
npm install

# 개발 서버 실행 (http://localhost:3000)
npm start

# 프로덕션 빌드
npm run build

# 테스트 실행
npm test
```

### GitHub Pages 배포

```bash
# 빌드 및 배포
npm run deploy
```

배포 후 GitHub 저장소 Settings → Pages에서 `gh-pages` 브랜치를 선택하여 활성화합니다.

## 프로젝트 구조

```
brain-daily/
├── public/                 # 정적 파일
├── src/
│   ├── components/        # 재사용 가능한 컴포넌트
│   │   ├── Dropdown.tsx   # 커스텀 드롭다운 컴포넌트
│   │   └── games/         # 게임별 컴포넌트
│   ├── pages/             # 페이지 컴포넌트
│   │   ├── Dashboard.tsx  # 메인 대시보드
│   │   ├── Statistics.tsx # 통계 페이지
│   │   ├── Pomodoro.tsx   # 뮤로도로 타이머
│   │   └── games/         # 각 게임 페이지
│   ├── types/             # TypeScript 타입 정의
│   ├── App.tsx            # 메인 App 컴포넌트
│   ├── index.tsx          # 엔트리 포인트
│   └── index.css          # 글로벌 스타일
├── package.json
└── README.md
```

## 라이선스

이 프로젝트는 개인 학습 및 포트폴리오 목적으로 제작되었습니다.
