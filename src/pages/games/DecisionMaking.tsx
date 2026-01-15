import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

interface DecisionMakingProps {
  onComplete: (score: number, time: number) => void;
}

const DecisionMaking = ({ onComplete }: DecisionMakingProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentIndex = parseInt(searchParams.get('step') || '0');
  const scenarios = [
    {
      situation: '유튜브 숏츠를 보다가 30분이 지났습니다. 지금 이 순간 당신의 선택은?',
      options: [
        { text: '\'한 개만 더\' 하고 계속 본다', value: 0 },
        { text: '앱을 끄고 원래 할 일로 돌아간다', value: 10 },
        { text: '타이머를 5분 설정하고 조금 더 본다', value: 6 },
      ],
    },
    {
      situation: '프로젝트 마감이 3일 남았습니다. 50% 완성했고, 친구가 저녁 약속을 제안합니다.',
      options: [
        { text: '약속을 잡되, 내일 두 배로 집중해서 만회한다', value: 4 },
        { text: '정중히 거절하고 작업에 집중한다', value: 10 },
        { text: '짧게 만나고 일찍 돌아온다', value: 7 },
      ],
    },
    {
      situation: '어려운 코드 문제로 2시간째 막혀있습니다. 답답함이 극에 달합니다.',
      options: [
        { text: 'SNS를 보며 기분 전환을 한다', value: 2 },
        { text: '문제를 정리하고 다른 접근법을 시도한다', value: 10 },
        { text: '일단 다른 쉬운 작업부터 처리한다', value: 6 },
      ],
    },
    {
      situation: '자정이 넘었습니다. 지금 자면 내일 피곤하고, 더하면 오늘 일이 완성됩니다.',
      options: [
        { text: '완성도를 위해 끝까지 마무리한다', value: 5 },
        { text: '지금 자고 내일 아침 일찍 일어나 마무리한다', value: 10 },
        { text: '대충 마무리하고 잔다', value: 3 },
      ],
    },
    {
      situation: '알림이 계속 옵니다. 지금 집중이 필요한 작업 중입니다.',
      options: [
        { text: '알림을 확인하면서 작업한다 (멀티태스킹)', value: 2 },
        { text: '방해금지 모드를 켜고 작업한다', value: 10 },
        { text: '중요한 알림만 확인하고 나머지는 무시한다', value: 7 },
      ],
    },
    {
      situation: '새 아이디어가 떠올랐지만, 현재 진행 중인 일이 있습니다.',
      options: [
        { text: '지금 당장 새 아이디어를 시작한다', value: 3 },
        { text: '메모만 해두고 현재 일에 집중한다', value: 10 },
        { text: '현재 일을 빨리 대충 끝내고 새 일을 시작한다', value: 4 },
      ],
    },
    {
      situation: '온라인 쇼핑 중 한정 세일 알림이 왔습니다. 30분 후 종료됩니다.',
      options: [
        { text: '놓치기 아까우니까 지금 바로 구매한다', value: 2 },
        { text: '정말 필요한지 하루 더 생각해본다', value: 10 },
        { text: '장바구니에 담아두고 세일 종료 직전에 결정한다', value: 6 },
      ],
    },
    {
      situation: '운동하려 했는데 몸이 피곤합니다. 오늘 이미 2일 연속 안 했습니다.',
      options: [
        { text: '오늘은 쉬고 내일 더 열심히 한다', value: 3 },
        { text: '10분이라도 가볍게 움직인다', value: 10 },
        { text: '스트레칭만 하고 본 운동은 패스한다', value: 7 },
      ],
    },
  ];

  const [score, setScore] = useState(0);
  const [startTime] = useState(Date.now());
  const [gameEnded, setGameEnded] = useState(false);

  useEffect(() => {
    if (!searchParams.get('step')) {
      setSearchParams({ step: '0' }, { replace: true });
    }
  }, [searchParams, setSearchParams]);

  if (gameEnded) {
    const timeTaken = Math.round((Date.now() - startTime) / 1000);
    const maxScore = 80; // 8 questions × 10 points
    const percentage = Math.round((score / maxScore) * 100);

    let feedback = '';
    if (percentage >= 90) feedback = '완벽해요! 전두엽이 강력합니다 💪';
    else if (percentage >= 75) feedback = '훌륭해요! 충동 조절이 잘 되고 있어요 👍';
    else if (percentage >= 60) feedback = '괜찮아요! 조금씩 개선하고 있어요 ✨';
    else feedback = '연습이 필요해요. 매일 훈련하면 좋아질 거예요 🌱';

    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-10 border border-gray-700 text-center">
          <h2 className="text-4xl font-extrabold text-white mb-8">Decision Making 완료</h2>
          <div className="mb-8">
            <p className="text-gray-300 mb-2">최종 점수</p>
            <p className="text-5xl font-bold text-white">{score}/{maxScore}</p>
            <p className="text-2xl text-gray-300 mt-3">{percentage}%</p>
            <p className="text-sm text-gray-300 mt-6 p-4 bg-blue-900/30 rounded-xl border border-gray-700">{feedback}</p>
          </div>
          <p className="text-gray-300 mb-8">소요 시간: {timeTaken}초</p>
          <button
            onClick={() => onComplete(percentage, timeTaken)}
            className="px-8 py-4 bg-white text-black rounded-xl hover:bg-gray-200 transition font-bold text-lg"
          >
            완료
          </button>
        </div>
      </div>
    );
  }

  const scenario = scenarios[currentIndex];

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-10 border border-gray-700">
        <h2 className="text-3xl font-extrabold text-white mb-2">Decision Making</h2>
        <p className="text-sm text-gray-300 mb-8">숏츠와 즉각적 보상에 길들여진 뇌를 훈련합니다</p>

        <div className="mb-8 p-6 bg-purple-900/30 rounded-xl border border-gray-700">
          <p className="text-sm text-gray-400 mb-3">상황 {currentIndex + 1}</p>
          <p className="text-white font-semibold text-lg leading-relaxed">{scenario.situation}</p>
        </div>

        <div className="space-y-4 mb-8">
          <p className="text-sm text-gray-300 font-medium mb-4">당신의 선택은?</p>
          {scenario.options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => {
                setScore(score + option.value);
                if (currentIndex >= scenarios.length - 1) {
                  setGameEnded(true);
                } else {
                  setSearchParams({ step: (currentIndex + 1).toString() });
                }
              }}
              className="w-full p-5 text-left bg-black/40 hover:bg-gray-700 border border-gray-600 hover:border-gray-500 rounded-xl transition-all font-medium text-white hover:shadow-lg"
            >
              <span className="text-white font-bold mr-3">{String.fromCharCode(65 + idx)}.</span>
              {option.text}
            </button>
          ))}
        </div>

        <div className="w-full bg-gray-700 rounded-full h-3">
          <div className="bg-white h-3 rounded-full transition-all" style={{ width: `${((currentIndex + 1) / scenarios.length) * 100}%` }} />
        </div>
        <p className="text-sm text-gray-400 mt-3 text-center">{currentIndex + 1}/{scenarios.length}</p>
      </div>
    </div>
  );
};

export default DecisionMaking;
