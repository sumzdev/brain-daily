import { useState } from 'react';
import { Brain, BarChart3, Flame, Clock, CheckCircle2, Play } from 'lucide-react';
import { DailyProgram } from '../types';
import GameDetailsView from '../components/GameDetailsView';

interface DashboardProps {
  dailyProgram: DailyProgram[];
  userStats: any;
  onStartGame: (id: string) => void;
  onNavigate: (view: string) => void;
  onRetry: (id: string) => void;
}

const Dashboard = ({ dailyProgram, userStats, onStartGame, onNavigate, onRetry }: DashboardProps) => {
  const completedToday = dailyProgram.filter((p: any) => p.status === 'completed').length;
  const allCompleted = completedToday === dailyProgram.length;
  const [selectedGameDetails, setSelectedGameDetails] = useState<DailyProgram | null>(null);

  if (selectedGameDetails) {
    return <GameDetailsView game={selectedGameDetails} onBack={() => setSelectedGameDetails(null)} onRetry={onRetry} />;
  }

  return (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 shadow-xl border border-gray-700 hover:border-red-500/50 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400 uppercase tracking-wide mb-2">연속 완료</p>
              <p className="text-5xl font-extrabold text-white">{userStats.streak}</p>
              <p className="text-xs text-gray-500 mt-1">일</p>
            </div>
            <Flame className="w-12 h-12 text-red-500" />
          </div>
        </div>
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 shadow-xl border border-gray-700 hover:border-blue-500/50 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400 uppercase tracking-wide mb-2">총 완료 세션</p>
              <p className="text-5xl font-extrabold text-white">{userStats.totalSessionsCompleted}</p>
              <p className="text-xs text-gray-500 mt-1">세션</p>
            </div>
            <CheckCircle2 className="w-12 h-12 text-blue-500" />
          </div>
        </div>
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 shadow-xl border border-gray-700 hover:border-purple-500/50 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400 uppercase tracking-wide mb-2">오늘 진행</p>
              <p className="text-5xl font-extrabold text-white">{completedToday}/5</p>
              <p className="text-xs text-gray-500 mt-1">게임</p>
            </div>
            <Brain className="w-12 h-12 text-purple-500" />
          </div>
        </div>
      </div>

      {/* Daily Program */}
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 shadow-xl border border-gray-700">
        <h2 className="text-3xl font-extrabold text-white mb-8 tracking-tight">오늘의 인지 훈련</h2>
        <div className="space-y-4">
          {dailyProgram.map((game: any) => (
            <div
              key={game.id}
              className="flex items-center justify-between p-6 bg-black/40 rounded-xl border border-gray-700 hover:border-purple-500/50 transition-all duration-300 group"
            >
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-1 group-hover:text-purple-400 transition">{game.name}</h3>
                <p className="text-sm text-gray-400">{game.description}</p>
                {game.score !== undefined && (
                  <p className="text-sm text-green-400 font-semibold mt-2">점수: {game.score}</p>
                )}
              </div>
              <div className="flex gap-3">
                {game.status === 'pending' ? (
                  <button
                    onClick={() => onStartGame(game.id)}
                    className="px-6 py-3 bg-white text-black rounded-lg hover:bg-gray-200 transition-all duration-200 flex items-center gap-2 font-bold btn-glow-white"
                  >
                    <Play className="w-4 h-4" />
                    시작
                  </button>
                ) : (
                  <>
                    <div className="px-6 py-3 text-green-400 font-bold flex items-center gap-2 border border-green-500/30 rounded-lg">
                      <CheckCircle2 className="w-5 h-5" />
                      완료
                    </div>
                    {game.results && (
                      <button
                        onClick={() => setSelectedGameDetails(game)}
                        className="px-4 py-3 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition font-semibold text-sm border border-gray-700"
                      >
                        상세보기
                      </button>
                    )}
                  </>
                )}
              </div>
            </div>
          ))}
        </div>

        {allCompleted && (
          <div className="mt-8 p-6 bg-gradient-to-r from-green-900/50 to-emerald-900/50 border border-green-500/30 rounded-xl text-center">
            <p className="text-white font-bold text-lg">🎉 오늘의 훈련을 모두 완료했습니다!</p>
            <p className="text-sm text-gray-300 mt-2">내일도 함께 전두엽을 강화해보세요.</p>
          </div>
        )}
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-2 gap-6">
        <button
          onClick={() => onNavigate('pomodoro')}
          className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 shadow-xl border border-gray-700 hover:border-blue-500/50 transition-all duration-300 text-center group"
        >
          <Clock className="w-10 h-10 text-blue-500 mx-auto mb-4 group-hover:scale-110 transition" />
          <p className="font-bold text-white text-lg mb-1">포모도로</p>
          <p className="text-xs text-gray-400 uppercase tracking-wide">집중 시간 관리</p>
        </button>
        <button
          onClick={() => onNavigate('stats')}
          className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 shadow-xl border border-gray-700 hover:border-purple-500/50 transition-all duration-300 text-center group"
        >
          <BarChart3 className="w-10 h-10 text-purple-500 mx-auto mb-4 group-hover:scale-110 transition" />
          <p className="font-bold text-white text-lg mb-1">통계</p>
          <p className="text-xs text-gray-400 uppercase tracking-wide">진행도 확인</p>
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
