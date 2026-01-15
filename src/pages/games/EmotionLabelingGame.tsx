import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

interface EmotionLabelingGameProps {
  onComplete: (score: number, time: number, results?: any) => void;
}

const EmotionLabelingGame = ({ onComplete }: EmotionLabelingGameProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentIndex = parseInt(searchParams.get('step') || '0');
  const scenarios = [
    {
      situation: '새 프로젝트를 시작했는데, 갑자기 담당자가 바뀌었다',
      emotions: ['불안', '혼란', '답답함'],
      correct: ['불안', '혼란'],
    },
    {
      situation: '진짜 하고 싶던 일을 결국 하게 되었다',
      emotions: ['기쁨', '자신감', '희망'],
      correct: ['기쁨', '자신감'],
    },
    {
      situation: '중요한 회의에서 실수를 했고, 모두가 봤다',
      emotions: ['부끄러움', '자책', '두려움'],
      correct: ['부끄러움', '자책'],
    },
    {
      situation: '친구가 약속을 깨뜨렸다',
      emotions: ['분노', '배신감', '외로움'],
      correct: ['분노', '배신감'],
    },
    {
      situation: '어려운 상황을 혼자 헤쳐나갔다',
      emotions: ['성취감', '자부심', '피로'],
      correct: ['성취감', '자부심'],
    },
  ];

  const [score, setScore] = useState(0);
  const [startTime] = useState(Date.now());
  const [selectedEmotions, setSelectedEmotions] = useState<string[]>([]);
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
          <h2 className="text-4xl font-extrabold text-white mb-8">감정 라벨링 완료</h2>
          <div className="mb-8">
            <p className="text-gray-300 mb-2">최종 점수</p>
            <p className="text-5xl font-bold text-white">{score}/{scenarios.length}</p>
          </div>
          <p className="text-gray-300 mb-8">소요 시간: {timeTaken}초</p>
          <button
            onClick={() => onComplete(Math.round((score / scenarios.length) * 100), timeTaken, results)}
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
        <h2 className="text-3xl font-extrabold text-white mb-2">감정 라벨링</h2>
        <p className="text-gray-300 mb-8">상황에서 느껴질 수 있는 감정들을 모두 선택하세요 (복수 선택 가능)</p>

        <div className="mb-8 p-6 bg-purple-900/30 rounded-xl border border-gray-700">
          <p className="text-white font-semibold text-lg">{scenario.situation}</p>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-8">
          {scenario.emotions.map((emotion, idx) => (
            <button
              key={idx}
              onClick={() => {
                if (selectedEmotions.includes(emotion)) {
                  setSelectedEmotions(selectedEmotions.filter(e => e !== emotion));
                } else {
                  setSelectedEmotions([...selectedEmotions, emotion]);
                }
              }}
              className={`p-5 rounded-lg font-bold transition-all duration-200 btn-glow-white ${
                selectedEmotions.includes(emotion)
                  ? 'bg-white text-black border-4 border-purple-500'
                  : 'bg-white text-black hover:bg-gray-200 border-4 border-transparent'
              }`}
            >
              {emotion}
            </button>
          ))}
        </div>

        <button
          onClick={() => {
            const isCorrect =
              selectedEmotions.length === scenario.correct.length &&
              selectedEmotions.every(e => scenario.correct.includes(e));

            if (isCorrect) {
              setScore(score + 1);
            }

            setResults(prev => [...prev, {
              correct: isCorrect,
              details: {
                situation: scenario.situation,
                userEmotions: selectedEmotions.join(', '),
                correctEmotions: scenario.correct.join(', '),
              }
            }]);

            if (currentIndex >= scenarios.length - 1) {
              setTestEnded(true);
            } else {
              setSearchParams({ step: (currentIndex + 1).toString() });
              setSelectedEmotions([]);
            }
          }}
          disabled={selectedEmotions.length === 0}
          className="w-full px-8 py-4 bg-white text-black rounded-xl hover:bg-gray-200 disabled:bg-gray-700 disabled:text-gray-500 transition font-bold text-lg btn-glow-white"
        >
          확인
        </button>

        <div className="w-full bg-gray-700 rounded-full h-3 mt-8">
          <div className="bg-white h-3 rounded-full" style={{ width: `${((currentIndex + 1) / scenarios.length) * 100}%` }} />
        </div>
        <p className="text-sm text-gray-400 mt-3">{currentIndex + 1}/{scenarios.length}</p>
      </div>
    </div>
  );
};

export default EmotionLabelingGame;
