import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { GameResult } from '../../types';

interface SummarizationGameProps {
  onComplete: (score: number, time: number, results?: any) => void;
}

const SummarizationGame = ({ onComplete }: SummarizationGameProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentIndex = parseInt(searchParams.get('step') || '0');
  const texts = [
    {
      text: "인터넷은 1960년대 군사 네트워크인 ARPANET에서 시작되었습니다. 초기에는 대학과 연구기관을 연결하는 목적으로 개발되었으며, 1980년대 개인용 컴퓨터의 보급과 함께 상업화되기 시작했습니다. 1990년대 월드 와이드 웹의 등장으로 인터넷은 급속도로 확산되었고, 오늘날 전 세계 수십억 명이 매일 인터넷을 사용하고 있습니다.",
      keywords: ['인터넷', '역사', '발전'],
    },
    {
      text: "숙면은 우리 건강의 필수 요소입니다. 잠 동안 뇌는 하루 동안 습득한 정보를 정리하고, 신체는 손상된 세포를 복구합니다. 충분한 수면을 취하지 못하면 면역력이 저하되고, 집중력과 기억력이 감소하며, 심리적 스트레스가 증가합니다. 전문가들은 하루 7-9시간의 규칙적인 수면을 권장합니다.",
      keywords: ['수면', '건강', '중요성'],
    },
    {
      text: "식물은 광합성을 통해 태양의 에너지를 화학 에너지로 변환합니다. 이 과정에서 물과 이산화탄소를 이용하여 포도당을 만들고 산소를 배출합니다. 이렇게 생산된 산소는 지구의 모든 생명체가 호흡하는 데 필수적이며, 포도당은 식물이 자라는 데 필요한 에너지원입니다. 따라서 식물은 지구 생태계의 기초를 이루고 있습니다.",
      keywords: ['식물', '광합성', '생태'],
    },
  ];

  const [score, setScore] = useState(0);
  const [startTime] = useState(Date.now());
  const [userSummary, setUserSummary] = useState('');
  const [testEnded, setTestEnded] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [results, setResults] = useState<GameResult[]>([]);

  useEffect(() => {
    if (!searchParams.get('step')) {
      setSearchParams({ step: '0' }, { replace: true });
    }
  }, [searchParams, setSearchParams]);

  if (testEnded) {
    const timeTaken = Math.round((Date.now() - startTime) / 1000);

    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-10 border border-gray-700">
          <h2 className="text-4xl font-extrabold text-white mb-8 text-center">요약 훈련 완료</h2>

          <div className="mb-8 p-8 bg-blue-900/30 rounded-xl text-center border border-gray-700">
            <p className="text-gray-300 mb-2">최종 점수</p>
            <p className="text-5xl font-bold text-white">{score}/{texts.length}</p>
            <p className="text-sm text-gray-400 mt-3">소요 시간: {timeTaken}초</p>
          </div>

          <button
            onClick={() => onComplete(Math.round((score / texts.length) * 100), timeTaken, results)}
            className="w-full px-8 py-4 bg-white text-black rounded-xl hover:bg-gray-200 transition font-bold text-lg btn-glow-white"
          >
            대시보드로 돌아가기
          </button>
        </div>
      </div>
    );
  }

  const currentText = texts[currentIndex];

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-10 border border-gray-700">
        <h2 className="text-3xl font-extrabold text-white mb-2">요약 훈련</h2>
        <p className="text-gray-300 mb-8">주어진 텍스트를 읽고 핵심을 한 문장(50자 이내)으로 요약하세요</p>

        <div className="mb-8 p-6 bg-blue-900/30 rounded-xl border border-gray-700">
          <p className="text-white mb-6 leading-relaxed">{currentText.text}</p>
          <div className="flex gap-2 flex-wrap">
            {currentText.keywords.map((keyword, idx) => (
              <span key={idx} className="px-3 py-1 bg-black/40 text-blue-300 rounded-lg text-sm font-medium border border-gray-700">
                #{keyword}
              </span>
            ))}
          </div>
        </div>

        <textarea
          value={userSummary}
          onChange={(e) => {
            if (e.target.value.length <= 50) {
              setUserSummary(e.target.value);
            }
          }}
          placeholder="여기에 요약을 입력하세요..."
          className="w-full h-24 p-4 bg-black/40 border border-gray-600 rounded-xl font-medium text-white placeholder-gray-500 focus:outline-none focus:border-gray-500 resize-none"
        />
        <p className="text-sm text-gray-400 mt-3">{userSummary.length}/50자</p>

        {feedback && (
          <div className={`mt-6 p-4 rounded-xl font-semibold border ${
            feedback.includes('좋습니다') ? 'bg-green-900/30 text-green-300 border-gray-700' : 'bg-blue-900/30 text-blue-300 border-gray-700'
          }`}>
            {feedback}
          </div>
        )}

        <div className="flex gap-3 md:gap-4 mt-8">
          <button
            onClick={() => {
              if (userSummary.length < 10) {
                setFeedback('최소 10자 이상 작성해주세요');
                return;
              }
              const isGood = userSummary.length > 20 && currentText.keywords.some(k => userSummary.includes(k));
              if (isGood) {
                setScore(score + 1);
              }
              setResults([...results, {
                correct: isGood,
                details: { text: currentText.text, userSummary, isGood },
              }]);

              if (currentIndex >= texts.length - 1) {
                setTestEnded(true);
              } else {
                setSearchParams({ step: (currentIndex + 1).toString() });
                setUserSummary('');
                setFeedback(null);
              }
            }}
            className="flex-1 px-6 py-3 md:px-8 md:py-4 text-base md:text-lg bg-white text-black rounded-xl hover:bg-gray-200 transition font-bold btn-glow-white"
          >
            다음
          </button>
        </div>

        <div className="w-full bg-gray-700 rounded-full h-3 mt-8">
          <div className="bg-white h-3 rounded-full" style={{ width: `${((currentIndex + 1) / texts.length) * 100}%` }} />
        </div>
        <p className="text-sm text-gray-400 mt-3">{currentIndex + 1}/{texts.length}</p>
      </div>
    </div>
  );
};

export default SummarizationGame;
