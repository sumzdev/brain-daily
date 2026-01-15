import { GameType } from '../types';

interface GameDetailsViewProps {
  game: any;
  onBack: () => void;
  onRetry: (gameId: string) => void;
}

const GameDetailsView = ({ game, onBack, onRetry }: GameDetailsViewProps) => {
  const getGameTitle = (id: GameType) => {
    switch(id) {
      case 'stroop': return 'Stroop Test';
      case 'nback': return 'N-back Game';
      case 'decision': return 'Decision Making';
      case 'summarization': return '요약 훈련';
      case 'emotion': return '감정 라벨링';
      case 'breathing': return '호흡 명상';
      case 'ifThen': return 'IF-THEN 플래닝';
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-10 shadow-xl border border-gray-700">
        <button
          onClick={onBack}
          className="mb-8 px-6 py-3 bg-gray-700 text-white rounded-xl hover:bg-gray-600 transition-all duration-200 font-semibold border border-gray-600"
        >
          ← 돌아가기
        </button>

        <h2 className="text-3xl font-extrabold text-white mb-8 tracking-tight">{getGameTitle(game.id)}</h2>

        <div className="grid grid-cols-3 gap-6 mb-10">
          <div className="p-6 bg-purple-900/30 rounded-xl text-center border border-purple-500/30">
            <p className="text-xs text-gray-400 uppercase tracking-wide mb-2">점수</p>
            <p className="text-3xl font-extrabold text-white">{game.score}</p>
          </div>
          <div className="p-6 bg-blue-900/30 rounded-xl text-center border border-blue-500/30">
            <p className="text-xs text-gray-400 uppercase tracking-wide mb-2">소요시간</p>
            <p className="text-3xl font-extrabold text-white">{game.time}초</p>
          </div>
          <div className="p-6 bg-green-900/30 rounded-xl text-center border border-green-500/30">
            <p className="text-xs text-gray-400 uppercase tracking-wide mb-2">정답률</p>
            <p className="text-3xl font-extrabold text-white">
              {game.results ? Math.round((game.results.filter((r: any) => r.correct).length / game.results.length) * 100) : 0}%
            </p>
          </div>
        </div>

        {game.results && (
          <div>
            <h3 className="text-xl font-bold text-white mb-6">문제별 정답 결과</h3>
            <div className="space-y-4">
              {game.results.map((result: any, idx: number) => (
                <div
                  key={idx}
                  className={`p-5 rounded-xl border-l-4 ${
                    result.correct
                      ? 'bg-green-900/30 border-l-green-500'
                      : 'bg-red-900/30 border-l-red-500'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-bold text-white text-lg">문제 {idx + 1}</span>
                    <span className={result.correct ? 'text-green-400 font-bold' : 'text-red-400 font-bold'}>
                      {result.correct ? '✓ 정답' : '✗ 오답'}
                    </span>
                  </div>
                  <p className="text-sm text-gray-300">
                    {game.id === 'stroop' && (
                      <>
                        색상: {result.details.displayColor}
                        {!result.correct && ` → 정답: ${result.details.textColorName}`}
                      </>
                    )}
                    {game.id === 'nback' && (
                      <>
                        라운드 {result.details.round}: {result.details.userAnswer}
                        {!result.correct && ` → 정답: ${result.details.correctAnswer}`}
                      </>
                    )}
                    {game.id === 'decision' && (
                      <>
                        선택: {result.details.userChoice} (점수: {result.details.scoreEarned}/10)
                      </>
                    )}
                    {game.id === 'summarization' && (
                      <>
                        요약: {result.details.userSummary?.substring(0, 50)}
                        {result.details.userSummary?.length > 50 && '...'}
                      </>
                    )}
                    {game.id === 'emotion' && (
                      <>
                        선택: {result.details.userEmotions}
                        {!result.correct && ` → 정답: ${result.details.correctEmotions}`}
                      </>
                    )}
                    {game.id === 'ifThen' && (
                      <>
                        선택: {result.details.userChoice} (점수: {result.details.scoreEarned}/10)
                      </>
                    )}
                    {game.id === 'breathing' && (
                      <>
                        호흡 사이클: {result.details.cycles}회 완료
                      </>
                    )}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex gap-4 mt-10">
          <button
            onClick={() => onRetry(game.id)}
            className="flex-1 px-8 py-4 bg-white text-black rounded-xl hover:bg-gray-200 transition-all duration-200 font-bold text-lg btn-glow-white"
          >
            🔄 다시하기
          </button>
          <button
            onClick={onBack}
            className="flex-1 px-8 py-4 bg-gray-700 text-white rounded-xl hover:bg-gray-600 transition-all duration-200 font-bold text-lg border border-gray-600"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameDetailsView;
