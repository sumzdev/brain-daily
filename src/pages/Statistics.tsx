import { useState } from "react";
import { DailyHistory, GameType } from "../types";

interface StatisticsProps {
  userStats: any;
}

const Statistics = ({ userStats }: StatisticsProps) => {
  const [selectedDate, setSelectedDate] = useState<string>("");

  const getGameName = (id: GameType) => {
    const names: Record<GameType, string> = {
      stroop: "Stroop Test",
      nback: "N-back Game",
      decision: "Decision Making",
      summarization: "요약 훈련",
      emotion: "감정 라벨링",
      breathing: "호흡 명상",
      ifThen: "IF-THEN 플래닝",
    };
    return names[id] || id;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getMonth() + 1}월 ${date.getDate()}일`;
  };

  const sortedHistory = [...(userStats.history || [])].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const filteredHistory = selectedDate
    ? sortedHistory.filter((h) => h.date === selectedDate)
    : sortedHistory.slice(0, 7); // 최근 7일

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 shadow-xl border border-gray-700">
        <h2 className="text-4xl font-extrabold text-white mb-10 tracking-tight">
          통계
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <div className="p-8 bg-gradient-to-br from-red-900/30 to-orange-900/30 rounded-xl border border-red-500/30">
            <p className="text-sm text-gray-400 uppercase tracking-wide mb-3">
              🔥 현재 연속 완료
            </p>
            <p className="text-6xl font-extrabold text-white mb-2">
              {userStats.streak}
            </p>
            <p className="text-xs text-gray-500 uppercase tracking-wider">일</p>
          </div>
          <div className="p-8 bg-gradient-to-br from-blue-900/30 to-cyan-900/30 rounded-xl border border-blue-500/30">
            <p className="text-sm text-gray-400 uppercase tracking-wide mb-3">
              ✅ 총 완료 세션
            </p>
            <p className="text-6xl font-extrabold text-white mb-2">
              {userStats.totalSessionsCompleted}
            </p>
            <p className="text-xs text-gray-500 uppercase tracking-wider">
              세션
            </p>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8">
          <h3 className="text-2xl font-bold text-white mb-6">일자별 기록</h3>

          {sortedHistory.length > 0 && (
            <div className="mb-6">
              <label className="text-sm text-gray-400 mb-2 block">
                날짜 선택
              </label>
              <select
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full md:w-auto md:min-w-[240px] px-4 py-3 bg-black/40 border border-gray-600 rounded-xl text-white font-medium focus:outline-none focus:border-gray-500"
              >
                <option value="">최근 7일</option>
                {sortedHistory.map((history) => (
                  <option key={history.date} value={history.date}>
                    {formatDate(history.date)} ({history.games.length}개 게임)
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="space-y-6">
            {filteredHistory.length === 0 ? (
              <div className="text-center py-10 text-gray-400">
                <p>아직 기록이 없습니다.</p>
                <p className="text-sm mt-2">첫 게임을 시작해보세요!</p>
              </div>
            ) : (
              filteredHistory.map((dayHistory: DailyHistory) => (
                <div
                  key={dayHistory.date}
                  className="bg-black/40 p-6 rounded-xl border border-gray-700"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-bold text-white">
                      {formatDate(dayHistory.date)}
                    </h4>
                    <span className="text-sm text-gray-400">
                      {dayHistory.games.length}개 게임 완료
                    </span>
                  </div>

                  <div className="space-y-3">
                    {dayHistory.games.map((game, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-4 bg-gray-900/50 rounded-lg border border-gray-700/50"
                      >
                        <div className="flex-1">
                          <p className="font-semibold text-white mb-1">
                            {getGameName(game.id)}
                          </p>
                          <p className="text-xs text-gray-400">
                            {new Date(game.completedAt).toLocaleTimeString(
                              "ko-KR",
                              {
                                hour: "2-digit",
                                minute: "2-digit",
                              }
                            )}
                          </p>
                        </div>
                        <div className="flex gap-3 items-center">
                          <div className="text-right">
                            <p className="text-sm text-gray-400">점수</p>
                            <p className="text-lg font-bold text-purple-400">
                              {game.score}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-gray-400">시간</p>
                            <p className="text-lg font-bold text-blue-400">
                              {game.time}초
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 shadow-xl border border-gray-700">
        <h3 className="text-2xl font-bold text-white mb-6">💡 팁</h3>
        <ul className="space-y-4 text-base text-gray-300">
          <li className="flex items-start gap-3">
            <span className="text-purple-500 font-bold">•</span>
            <span>매일 같은 시간에 훈련을 하면 효과가 좋습니다</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-purple-500 font-bold">•</span>
            <span>연속 완료를 통해 동기부여를 유지하세요</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-purple-500 font-bold">•</span>
            <span>각 게임의 점수가 올라갈수록 전두엽이 강화되고 있습니다</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-purple-500 font-bold">•</span>
            <span>숏츠 시청 시간을 줄이고 이 훈련으로 대체해보세요</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Statistics;
