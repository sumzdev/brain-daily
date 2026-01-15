import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

interface BreathingMeditationProps {
  onComplete: (score: number, time: number) => void;
}

const BreathingMeditation = ({ onComplete }: BreathingMeditationProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentStep = parseInt(searchParams.get('step') || '0');
  const [timeLeft, setTimeLeft] = useState(60);
  const [isRunning, setIsRunning] = useState(false);
  const [phase, setPhase] = useState<'ready' | 'inhale' | 'hold' | 'exhale'>('ready');
  const [cycles, setCycles] = useState(0);

  useEffect(() => {
    if (!searchParams.get('step')) {
      setSearchParams({ step: '0' }, { replace: true });
    }
  }, [searchParams, setSearchParams]);

  useEffect(() => {
    if (!isRunning || currentStep !== 0) return;

    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 0) {
          setIsRunning(false);
          setSearchParams({ step: '1' });
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, currentStep, setSearchParams]);

  useEffect(() => {
    if (!isRunning || phase === 'ready' || currentStep !== 0) return;

    let timer: NodeJS.Timeout;
    if (phase === 'inhale') {
      timer = setTimeout(() => setPhase('hold'), 4000);
    } else if (phase === 'hold') {
      timer = setTimeout(() => setPhase('exhale'), 4000);
    } else if (phase === 'exhale') {
      timer = setTimeout(() => {
        setCycles(cycles + 1);
        setPhase('inhale');
      }, 4000);
    }

    return () => clearTimeout(timer);
  }, [isRunning, phase, cycles, currentStep]);

  if (currentStep === 1) {
    const timeTaken = 60;
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-10 border border-gray-700 text-center">
          <h2 className="text-4xl font-extrabold text-white mb-8">호흡 명상 완료</h2>
          <div className="mb-8">
            <p className="text-gray-300 mb-3">완료한 호흡 사이클</p>
            <p className="text-5xl font-bold text-white">{cycles}</p>
          </div>
          <p className="text-gray-300 mb-8">축하합니다! 전두엽의 '주의 제어력'을 훈련했습니다 🧘</p>
          <button
            onClick={() => onComplete(cycles * 20, timeTaken)}
            className="px-8 py-4 bg-white text-black rounded-xl hover:bg-gray-200 transition font-bold text-lg"
          >
            대시보드로 돌아가기
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-10 border border-gray-700 text-center">
        <h2 className="text-3xl font-extrabold text-white mb-2">호흡 명상</h2>
        <p className="text-gray-300 mb-10">4-4-4 호흡법: 들숨(4초) → 멈춤(4초) → 날숨(4초)</p>

        <div className="mb-10 p-10 bg-green-900/30 rounded-xl border border-gray-700 min-h-96 flex flex-col items-center justify-center">
          {!isRunning && phase === 'ready' && (
            <div>
              <p className="text-lg text-gray-300 mb-6">편안한 자세로 앉으세요</p>
              <p className="text-5xl font-bold mb-8">🧘</p>
            </div>
          )}

          {isRunning && (
            <>
              <div className="text-6xl font-bold text-white mb-10">
                {phase === 'inhale' && '들숨'}
                {phase === 'hold' && '멈춤'}
                {phase === 'exhale' && '날숨'}
              </div>
              <div className="w-32 h-32 rounded-full border-4 border-white flex items-center justify-center mb-10 animate-pulse">
                <span className="text-4xl font-bold text-white">✓</span>
              </div>
            </>
          )}

          <div className="text-sm text-gray-400 mt-auto pt-8">
            사이클: {cycles} / 남은 시간: {timeLeft}초
          </div>
        </div>

        <button
          onClick={() => {
            if (!isRunning && phase === 'ready') {
              setPhase('inhale');
            }
            setIsRunning(!isRunning);
          }}
          className={`px-8 py-4 text-lg font-bold rounded-xl transition ${
            isRunning
              ? 'bg-red-600 text-white hover:bg-red-700'
              : 'bg-white text-black hover:bg-gray-200'
          }`}
        >
          {isRunning ? '일시정지' : phase === 'ready' ? '시작' : '재개'}
        </button>
      </div>
    </div>
  );
};

export default BreathingMeditation;
