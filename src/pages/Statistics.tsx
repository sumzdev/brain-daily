interface StatisticsProps {
  userStats: any;
}

const Statistics = ({ userStats }: StatisticsProps) => {
  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 shadow-xl border border-gray-700">
        <h2 className="text-4xl font-extrabold text-white mb-10 tracking-tight">통계</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <div className="p-8 bg-gradient-to-br from-red-900/30 to-orange-900/30 rounded-xl border border-red-500/30">
            <p className="text-sm text-gray-400 uppercase tracking-wide mb-3">🔥 현재 연속 완료</p>
            <p className="text-6xl font-extrabold text-white mb-2">
              {userStats.streak}
            </p>
            <p className="text-xs text-gray-500 uppercase tracking-wider">일</p>
          </div>
          <div className="p-8 bg-gradient-to-br from-blue-900/30 to-cyan-900/30 rounded-xl border border-blue-500/30">
            <p className="text-sm text-gray-400 uppercase tracking-wide mb-3">✅ 총 완료 세션</p>
            <p className="text-6xl font-extrabold text-white mb-2">
              {userStats.totalSessionsCompleted}
            </p>
            <p className="text-xs text-gray-500 uppercase tracking-wider">세션</p>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8">
          <h3 className="text-2xl font-bold text-white mb-6">
            각 게임별 최근 점수
          </h3>
          <div className="space-y-5">
            {Object.entries(userStats.scores).map(
              ([game, scores]: [string, any]) => (
                <div key={game} className="bg-black/40 p-5 rounded-xl border border-gray-700">
                  <p className="text-base font-semibold text-gray-300 mb-3">
                    {game === "stroop"
                      ? "Stroop Test"
                      : game === "nback"
                      ? "N-back Game"
                      : game === "decision"
                      ? "Decision Making"
                      : game === "summarization"
                      ? "요약 훈련"
                      : game === "emotion"
                      ? "감정 라벨링"
                      : game === "breathing"
                      ? "호흡 명상"
                      : "IF-THEN 플래닝"}
                  </p>
                  <div className="flex gap-3 flex-wrap">
                    {scores.slice(-5).map((score: number, idx: number) => (
                      <div
                        key={idx}
                        className="px-4 py-2 bg-purple-500/20 text-purple-300 text-sm rounded-lg font-bold border border-purple-500/30"
                      >
                        {score}
                      </div>
                    ))}
                  </div>
                </div>
              )
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
