import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

interface IfThenPlanningProps {
  onComplete: (score: number, time: number, results?: any) => void;
}

const IfThenPlanning = ({ onComplete }: IfThenPlanningProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentIndex = parseInt(searchParams.get('step') || '0');
  const scenarios = [
    {
      trigger: '화가 날 때',
      options: [
        { text: '심호흡을 3번 한다', score: 10 },
        { text: '바로 말한다', score: 1 },
        { text: '큰 소리를 낸다', score: 0 },
      ],
    },
    {
      trigger: '집중력이 떨어질 때',
      options: [
        { text: '핸드폰을 확인한다', score: 0 },
        { text: '다시 작업에 집중한다', score: 10 },
        { text: '아무것도 하지 않는다', score: 1 },
      ],
    },
    {
      trigger: '어려운 결정을 해야 할 때',
      options: [
        { text: '시간을 가지고 생각한다', score: 10 },
        { text: '급하게 결정한다', score: 1 },
        { text: '누군가의 의견만 따른다', score: 2 },
      ],
    },
    {
      trigger: '스트레스를 받을 때',
      options: [
        { text: '운동하거나 산책한다', score: 10 },
        { text: '폭식한다', score: 1 },
        { text: '누군가에게 화풀이한다', score: 0 },
      ],
    },
    {
      trigger: '실수를 했을 때',
      options: [
        { text: '이유를 분석하고 개선한다', score: 10 },
        { text: '자신을 책망한다', score: 3 },
        { text: '무시하고 넘어간다', score: 1 },
      ],
    },
  ];

  const [score, setScore] = useState(0);
  const [startTime] = useState(Date.now());
  const [testEnded, setTestEnded] = useState(false);
  const [results, setResults] = useState<any[]>([]);

  useEffect(() => {
    if (!searchParams.get('step')) {
      setSearchParams({ step: '0' }, { replace: true });
    }
  }, [searchParams, setSearchParams]);

  if (testEnded) {
    const timeTaken = Math.round((Date.now() - startTime) / 1000);
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-10 border border-gray-700 text-center">
          <h2 className="text-4xl font-extrabold text-white mb-8">IF-THEN 플래닝 완료</h2>
          <div className="mb-8">
            <p className="text-gray-300 mb-2">최종 점수</p>
            <p className="text-5xl font-bold text-white">{score}/50</p>
          </div>
          <p className="text-gray-300 mb-6">소요 시간: {timeTaken}초</p>
          <p className="text-sm text-gray-300 mb-8 p-4 bg-orange-900/30 rounded-xl border border-gray-700">💡 감정이 폭발하기 전 전두엽이 개입할 시간을 벌어주는 훈련입니다</p>
          <button
            onClick={() => onComplete(Math.round((score / 50) * 100), timeTaken, results)}
            className="px-8 py-4 bg-white text-black rounded-xl hover:bg-gray-200 transition font-bold text-lg btn-glow-white"
          >
            대시보드로 돌아가기
          </button>
        </div>
      </div>
    );
  }

  const scenario = scenarios[currentIndex];

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-10 border border-gray-700">
        <h2 className="text-3xl font-extrabold text-white mb-2">IF-THEN 플래닝</h2>
        <p className="text-gray-300 mb-8">상황에서 '전두엽'이 좋아할 행동을 선택하세요</p>

        <div className="mb-8 p-6 bg-orange-900/30 rounded-xl border border-gray-700">
          <p className="text-gray-400 text-sm mb-3">상황</p>
          <p className="text-white font-bold text-lg">{scenario.trigger}</p>
        </div>

        <div className="space-y-4 mb-8">
          {scenario.options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => {
                const newScore = score + option.score;
                setScore(newScore);
                setResults(prev => [...prev, {
                  correct: option.score === 10,
                  details: {
                    trigger: scenario.trigger,
                    userChoice: option.text,
                    scoreEarned: option.score,
                  }
                }]);
                if (currentIndex >= scenarios.length - 1) {
                  setTestEnded(true);
                } else {
                  setSearchParams({ step: (currentIndex + 1).toString() });
                }
              }}
              className="w-full p-5 text-left bg-white text-black rounded-lg hover:bg-gray-200 transition-all duration-200 font-bold btn-glow-white"
            >
              THEN {option.text}
            </button>
          ))}
        </div>

        <div className="w-full bg-gray-700 rounded-full h-3">
          <div className="bg-white h-3 rounded-full" style={{ width: `${((currentIndex + 1) / scenarios.length) * 100}%` }} />
        </div>
        <p className="text-sm text-gray-400 mt-3">{currentIndex + 1}/{scenarios.length}</p>
      </div>
    </div>
  );
};

export default IfThenPlanning;
