import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Brain } from 'lucide-react';
import { GameType, DailyProgram, UserStats, GameResult } from './types';
import {
  StroopTest,
  NBackGame,
  DecisionMaking,
  SummarizationGame,
  EmotionLabelingGame,
  BreathingMeditation,
  IfThenPlanning
} from './pages/games';
import Dashboard from './pages/Dashboard';
import Statistics from './pages/Statistics';
import Pomodoro from './pages/Pomodoro';

const App = () => {
  const navigate = useNavigate();
  const [dailyProgram, setDailyProgram] = useState<DailyProgram[]>([
    { id: 'stroop', name: 'Stroop Test', description: '색상 인지 능력 강화', status: 'pending' },
    { id: 'nback', name: 'N-back Game', description: '작업 기억 훈련', status: 'pending' },
    { id: 'decision', name: 'Decision Making', description: '즉각적 보상 vs 장기적 이익', status: 'pending' },
    { id: 'summarization', name: '요약 훈련', description: '복잡한 정보 처리 능력', status: 'pending' },
    { id: 'emotion', name: '감정 라벨링', description: '편도체 진정 및 감정 조절', status: 'pending' },
  ]);
  const [userStats, setUserStats] = useState<UserStats>(() => {
    const saved = localStorage.getItem('brainDaily_stats');
    return saved ? JSON.parse(saved) : {
      streak: 0,
      totalSessionsCompleted: 0,
      lastCompletedDate: '',
      scores: {},
      history: [],
    };
  });

  useEffect(() => {
    localStorage.setItem('brainDaily_stats', JSON.stringify(userStats));
  }, [userStats]);

  useEffect(() => {
    const today = new Date().toDateString();
    if (userStats.lastCompletedDate !== today) {
      const allCompleted = dailyProgram.every(p => p.status === 'completed');
      if (allCompleted) {
        setUserStats(prev => ({
          ...prev,
          streak: prev.lastCompletedDate === new Date(Date.now() - 86400000).toDateString() ? prev.streak + 1 : 1,
          lastCompletedDate: today,
        }));
      }
    }
  }, [dailyProgram, userStats.lastCompletedDate]);

  const handleGameComplete = (id: GameType, score: number, time: number, results?: GameResult[]) => {
    setDailyProgram(prev => prev.map(p =>
      p.id === id ? { ...p, status: 'completed', score, time, results } : p
    ));

    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
    const now = new Date().toISOString();

    setUserStats(prev => {
      const history = [...prev.history];
      const todayIndex = history.findIndex(h => h.date === today);

      if (todayIndex >= 0) {
        // 오늘 날짜가 이미 있으면 게임 추가
        history[todayIndex].games.push({
          id,
          score,
          time,
          completedAt: now,
        });
      } else {
        // 오늘 날짜가 없으면 새로 생성
        history.push({
          date: today,
          games: [{
            id,
            score,
            time,
            completedAt: now,
          }],
        });
      }

      return {
        ...prev,
        totalSessionsCompleted: prev.totalSessionsCompleted + 1,
        scores: {
          ...prev.scores,
          [id]: [...(prev.scores[id] || []), score].slice(-10),
        },
        history: history.slice(-30), // 최근 30일만 저장
      };
    });

    navigate('/');
  };

  const generateDummyData = () => {
    const gameTypes: GameType[] = ['stroop', 'nback', 'decision', 'summarization', 'emotion'];
    const getRandomScore = () => Math.floor(Math.random() * 50) + 50;
    const getRandomTime = () => Math.floor(Math.random() * 100) + 20;

    const history = [];

    // 최근 10일간의 데이터 생성
    for (let i = 0; i < 10; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateString = date.toISOString().split('T')[0];

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
    const scores: Record<string, number[]> = {};
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

    setUserStats(dummyStats);
    alert('✅ 더미 데이터가 생성되었습니다!');
  };

  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-6 py-12 max-w-7xl">
        {/* Header */}
        <div className="mb-16">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition group"
            >
              <Brain className="w-10 h-10 text-purple-500 group-hover:text-purple-400 transition" />
              <h1 className="text-4xl font-extrabold text-white tracking-tight">BrainDaily</h1>
            </button>
            <p className="text-sm text-gray-400 uppercase tracking-wider font-medium">전두엽 강화 훈련</p>
          </div>
        </div>

        {/* Routes */}
        <Routes>
          <Route
            path="/"
            element={
              <Dashboard
                dailyProgram={dailyProgram}
                userStats={userStats}
                onStartGame={(gameId) => navigate(`/games/${gameId}?step=0`)}
                onNavigate={(view) => navigate(`/${view}`)}
                onRetry={(gameId) => navigate(`/games/${gameId}?step=0`)}
                onGenerateDummyData={generateDummyData}
              />
            }
          />
          <Route path="/stats" element={<Statistics userStats={userStats} />} />
          <Route path="/pomodoro" element={<Pomodoro />} />

          {/* Game Routes */}
          <Route
            path="/games/stroop"
            element={<StroopTest onComplete={(score, time, results) => handleGameComplete('stroop', score, time, results)} />}
          />
          <Route
            path="/games/nback"
            element={<NBackGame onComplete={(score, time, results) => handleGameComplete('nback', score, time, results)} />}
          />
          <Route
            path="/games/decision"
            element={<DecisionMaking onComplete={(score, time, results) => handleGameComplete('decision', score, time, results)} />}
          />
          <Route
            path="/games/summarization"
            element={<SummarizationGame onComplete={(score, time, results) => handleGameComplete('summarization', score, time, results)} />}
          />
          <Route
            path="/games/emotion"
            element={<EmotionLabelingGame onComplete={(score, time, results) => handleGameComplete('emotion', score, time, results)} />}
          />
          <Route
            path="/games/breathing"
            element={<BreathingMeditation onComplete={(score, time, results) => handleGameComplete('breathing', score, time, results)} />}
          />
          <Route
            path="/games/ifthen"
            element={<IfThenPlanning onComplete={(score, time, results) => handleGameComplete('ifThen', score, time, results)} />}
          />
        </Routes>
      </div>
    </div>
  );
};

export default App;
