// 브라우저 콘솔에서 이 스크립트를 실행하면 더미 데이터가 생성됩니다
// 사용법: 브라우저에서 개발자 도구(F12) 열기 → Console 탭 → 아래 코드 복사/붙여넣기 → Enter

const generateDummyData = () => {
  const gameTypes = ['stroop', 'nback', 'decision', 'summarization', 'emotion', 'breathing', 'ifThen'];

  const getRandomScore = () => Math.floor(Math.random() * 50) + 50; // 50-100
  const getRandomTime = () => Math.floor(Math.random() * 100) + 20; // 20-120초

  const history = [];

  // 최근 10일간의 데이터 생성
  for (let i = 0; i < 10; i++) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const dateString = date.toISOString().split('T')[0];

    // 각 날짜마다 2-5개의 게임 랜덤 생성
    const numGames = Math.floor(Math.random() * 4) + 2;
    const games = [];

    for (let j = 0; j < numGames; j++) {
      const gameType = gameTypes[Math.floor(Math.random() * gameTypes.length)];
      const completedAt = new Date(date);
      completedAt.setHours(9 + j * 2, Math.floor(Math.random() * 60), 0);

      games.push({
        id: gameType,
        score: getRandomScore(),
        time: getRandomTime(),
        completedAt: completedAt.toISOString()
      });
    }

    history.push({
      date: dateString,
      games: games
    });
  }

  // 점수 히스토리 생성
  const scores = {};
  gameTypes.forEach(type => {
    scores[type] = Array.from({ length: 10 }, () => Math.floor(Math.random() * 50) + 50);
  });

  const dummyStats = {
    streak: 5,
    totalSessionsCompleted: history.reduce((sum, day) => sum + day.games.length, 0),
    lastCompletedDate: new Date().toDateString(),
    scores: scores,
    history: history
  };

  localStorage.setItem('brainDaily_stats', JSON.stringify(dummyStats));

  console.log('✅ 더미 데이터가 성공적으로 생성되었습니다!');
  console.log('📊 생성된 데이터:', dummyStats);
  console.log('🔄 페이지를 새로고침하여 확인하세요.');

  return dummyStats;
};

// 실행
generateDummyData();
