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
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <button
          onClick={onBack}
          className="mb-6 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
        >
          ← 돌아가기
        </button>

        <h2 className="text-2xl font-bold text-gray-800 mb-2">{getGameTitle(game.id)}</h2>

        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="p-3 bg-purple-50 rounded-lg text-center border border-purple-200">
            <p className="text-xs text-gray-600">점수</p>
            <p className="text-2xl font-bold text-purple-600">{game.score}</p>
          </div>
          <div className="p-3 bg-blue-50 rounded-lg text-center border border-blue-200">
            <p className="text-xs text-gray-600">소요시간</p>
            <p className="text-2xl font-bold text-blue-600">{game.time}초</p>
          </div>
          <div className="p-3 bg-green-50 rounded-lg text-center border border-green-200">
            <p className="text-xs text-gray-600">정답률</p>
            <p className="text-2xl font-bold text-green-600">
              {game.results ? Math.round((game.results.filter((r: any) => r.correct).length / game.results.length) * 100) : 0}%
            </p>
          </div>
        </div>

        {game.results && (
          <div>
            <h3 className="font-semibold text-gray-800 mb-4">문제별 정답 결과</h3>
            <div className="space-y-3">
              {game.results.map((result: any, idx: number) => (
                <div
                  key={idx}
                  className={`p-4 rounded-lg border-l-4 ${
                    result.correct
                      ? 'bg-green-50 border-l-green-500'
                      : 'bg-red-50 border-l-red-500'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-800">문제 {idx + 1}</span>
                    <span className={result.correct ? 'text-green-600 font-semibold' : 'text-red-600 font-semibold'}>
                      {result.correct ? '✓ 정답' : '✗ 오답'}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700">
                    {game.id === 'stroop' && `색상: ${result.details.displayColor}`}
                    {!result.correct && game.id === 'stroop' && ` → 정답: ${result.details.textColorName}`}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex gap-3 mt-8">
          <button
            onClick={() => onRetry(game.id)}
            className="flex-1 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-semibold"
          >
            🔄 다시하기
          </button>
          <button
            onClick={onBack}
            className="flex-1 px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition font-semibold"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameDetailsView;
