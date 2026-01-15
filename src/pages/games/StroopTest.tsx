import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { GameResult } from '../../types';

interface StroopTestProps {
  onComplete: (score: number, time: number, results: any) => void;
}

const StroopTest = ({ onComplete }: StroopTestProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const colors = ['red', 'blue', 'green', 'yellow', 'purple'];
  const colorDisplay: { [key: string]: string } = { red: '빨강', blue: '파랑', green: '초록', yellow: '노랑', purple: '보라' };

  const [score, setScore] = useState(0);
  const [startTime] = useState(Date.now());
  const [testItems] = useState(() => {
    const items = [];
    for (let i = 0; i < 10; i++) {
      const textColor = colors[Math.floor(Math.random() * colors.length)];
      const displayColor = colors[Math.floor(Math.random() * colors.length)];
      items.push({ text: colorDisplay[textColor], displayColor, textColorName: textColor, correct: textColor === displayColor });
    }
    return items;
  });
  const [results, setResults] = useState<GameResult[]>([]);

  const currentStep = parseInt(searchParams.get('step') || '0');
  const testEnded = currentStep >= testItems.length;

  useEffect(() => {
    if (!searchParams.get('step')) {
      setSearchParams({ step: '0' }, { replace: true });
    }
  }, [searchParams, setSearchParams]);

  if (testEnded) {
    const timeTaken = Math.round((Date.now() - startTime) / 1000);
    const correctCount = results.filter(r => r.correct).length;

    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-10 border border-gray-700">
          <h2 className="text-4xl font-extrabold text-white mb-8 text-center">Stroop Test 완료</h2>

          <div className="mb-8 p-8 bg-purple-900/30 rounded-xl text-center border border-gray-700">
            <p className="text-gray-300 mb-2">최종 점수</p>
            <p className="text-5xl font-bold text-white mb-2">{correctCount}/10</p>
            <p className="text-sm text-gray-400">소요 시간: {timeTaken}초</p>
          </div>

          <div className="mb-8">
            <h3 className="font-semibold text-white mb-6 text-xl">문제별 결과</h3>
            <div className="space-y-4">
              {results.map((result, idx) => (
                <div
                  key={idx}
                  className={`p-4 rounded-xl border-l-4 bg-black/40 ${
                    result.correct
                      ? 'border-l-green-500'
                      : 'border-l-red-500'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-white">문제 {idx + 1}</span>
                    <span className={result.correct ? 'text-green-400' : 'text-red-400'}>
                      {result.correct ? '✓ 정답' : '✗ 오답'}
                    </span>
                  </div>
                  <p className="text-sm mt-1 text-gray-300">
                    색상: <span style={{ color: result.details.displayColor }} className="font-bold">{result.details.displayColor}</span>
                    {!result.correct && ` → 정답: ${result.details.textColorName}`}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => onComplete(score, timeTaken, results)}
            className="w-full px-8 py-4 bg-white text-black rounded-xl hover:bg-gray-200 transition font-bold text-lg"
          >
            대시보드로 돌아가기
          </button>
        </div>
      </div>
    );
  }

  const item = testItems[currentStep];

  const handleAnswer = (color: string) => {
    const isCorrect = color === item.displayColor;
    if (isCorrect) {
      setScore(score + 1);
    }
    const newResults = [...results, {
      correct: isCorrect,
      details: {
        displayColor: item.displayColor,
        textColorName: item.textColorName,
        userAnswer: color,
      }
    }];
    setResults(newResults);

    // Move to next step
    setSearchParams({ step: (currentStep + 1).toString() });
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-10 border border-gray-700">
        <h2 className="text-3xl font-extrabold text-white mb-2">Stroop Test</h2>
        <p className="text-gray-300 mb-8">글자 색상을 선택하세요 (글자 의미와 다를 수 있습니다)</p>

        <div className="mb-8">
          <div className="text-6xl font-bold text-center mb-10" style={{ color: item.displayColor }}>
            {item.text}
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            {colors.map(color => (
              <button
                key={color}
                onClick={() => handleAnswer(color)}
                className="py-4 px-6 bg-black/40 hover:bg-gray-700 text-white rounded-xl font-bold transition border border-gray-600"
              >
                {colorDisplay[color]}
              </button>
            ))}
          </div>
        </div>

        <div className="w-full bg-gray-700 rounded-full h-3">
          <div className="bg-white h-3 rounded-full transition-all" style={{ width: `${((currentStep + 1) / testItems.length) * 100}%` }} />
        </div>
        <p className="text-sm text-gray-400 mt-3">{currentStep + 1}/{testItems.length}</p>
      </div>
    </div>
  );
};

export default StroopTest;
