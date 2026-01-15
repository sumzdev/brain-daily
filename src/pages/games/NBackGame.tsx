import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';

interface NBackGameProps {
  onComplete: (score: number, time: number) => void;
}

const NBackGame = ({ onComplete }: NBackGameProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentRound = parseInt(searchParams.get('step') || '0');
  const [sequence, setSequence] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  const [startTime] = useState(Date.now());
  const [gameEnded, setGameEnded] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [feedback, setFeedback] = useState<{ correct: boolean; message: string } | null>(null);

  const generateSequence = useCallback(() => {
    const newSeq = [];
    for (let i = 0; i < 15; i++) {
      newSeq.push(Math.floor(Math.random() * 9)); // 0-8: 3x3 grid positions
    }
    return newSeq;
  }, []);

  useEffect(() => {
    if (!searchParams.get('step')) {
      setSearchParams({ step: '0' }, { replace: true });
    }
  }, [searchParams, setSearchParams]);

  useEffect(() => {
    if (sequence.length === 0) {
      setSequence(generateSequence());
    }
  }, []);

  useEffect(() => {
    if (isAutoPlaying && currentRound < 2) {
      const timer = setTimeout(() => {
        setSearchParams({ step: (currentRound + 1).toString() });
      }, 1500);
      return () => clearTimeout(timer);
    } else if (isAutoPlaying && currentRound >= 2) {
      setIsAutoPlaying(false);
    }
    return undefined;
  }, [isAutoPlaying, currentRound, setSearchParams]);

  const handleAnswer = useCallback((isMatch: boolean) => {
    const isCorrect = (sequence[currentRound] === sequence[currentRound - 2]) === isMatch;

    if (isCorrect) {
      setScore(prev => prev + 1);
      setFeedback({ correct: true, message: '✓ 정답!' });
    } else {
      const expected = sequence[currentRound] === sequence[currentRound - 2] ? '일치' : '불일치';
      setFeedback({ correct: false, message: `✗ 오답! 정답: ${expected}` });
    }

    setTimeout(() => {
      if (currentRound >= 14) {
        setGameEnded(true);
      } else {
        setSearchParams({ step: (currentRound + 1).toString() });
        setFeedback(null);
      }
    }, 1200);
  }, [currentRound, sequence, setSearchParams]);

  if (gameEnded) {
    const timeTaken = Math.round((Date.now() - startTime) / 1000);
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-10 border border-gray-700 text-center">
          <h2 className="text-4xl font-extrabold text-white mb-8">N-back Game 완료</h2>
          <div className="mb-8">
            <p className="text-gray-300 mb-2">최종 점수</p>
            <p className="text-5xl font-bold text-white">{score}/13</p>
            <p className="text-sm text-gray-400 mt-2">정확도: {Math.round((score / 13) * 100)}%</p>
          </div>
          <p className="text-gray-300 mb-8">소요 시간: {timeTaken}초</p>
          <button
            onClick={() => onComplete(Math.round((score / 13) * 100), timeTaken)}
            className="px-8 py-4 bg-white text-black rounded-xl hover:bg-gray-200 transition font-bold text-lg"
          >
            완료
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-10 border border-gray-700">
        <h2 className="text-3xl font-extrabold text-white mb-2">N-back Game (2-back)</h2>
        <p className="text-gray-300 mb-8">현재 위치가 2칸 전 위치와 같으면 "일치"를 누르세요</p>

        <div className="mb-8 text-center">
          {!isAutoPlaying && currentRound < 2 && (
            <button
              onClick={() => setIsAutoPlaying(true)}
              className="px-8 py-4 bg-white text-black text-lg font-bold rounded-xl hover:bg-gray-200 transition mb-6"
            >
              시작하기
            </button>
          )}

          {(isAutoPlaying || currentRound >= 2) && currentRound < 15 && (
            <div className="mb-6">
              <div className="mb-8">
                <p className="text-sm text-gray-300 mb-6">🎯 위치를 기억하세요</p>

                {/* 3x3 Grid */}
                <div className="grid grid-cols-3 gap-4 max-w-xs mx-auto mb-6">
                  {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((position) => (
                    <div
                      key={position}
                      className={`aspect-square rounded-xl transition-all duration-300 ${
                        sequence[currentRound] === position
                          ? 'bg-white shadow-lg scale-105'
                          : 'bg-black/40 border border-gray-700'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {isAutoPlaying && currentRound < 2 && (
                <div className="mb-6 p-4 bg-blue-900/30 text-blue-300 border border-gray-700 rounded-xl font-semibold text-center">
                  ℹ️ 위치를 기억하세요 ({currentRound + 1}/2)
                </div>
              )}

              {currentRound >= 2 && !feedback && (
                <div className="mb-6 p-4 bg-purple-900/30 text-purple-300 border border-gray-700 rounded-xl font-semibold text-center">
                  ❓ 현재 위치가 2칸 전 위치와 같나요?
                </div>
              )}

              {feedback && (
                <div className={`mb-6 p-4 rounded-xl font-semibold text-center border ${
                  feedback.correct
                    ? 'bg-green-900/30 text-green-300 border-gray-700'
                    : 'bg-red-900/30 text-red-300 border-gray-700'
                }`}>
                  {feedback.message}
                </div>
              )}

              {currentRound >= 2 && (
                <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto">
                  <button
                    onClick={() => handleAnswer(true)}
                    disabled={feedback !== null}
                    className="py-4 bg-green-600 text-white text-lg rounded-xl hover:bg-green-700 disabled:bg-gray-700 disabled:text-gray-500 font-bold transition"
                  >
                    일치 ✓
                  </button>
                  <button
                    onClick={() => handleAnswer(false)}
                    disabled={feedback !== null}
                    className="py-4 bg-red-600 text-white text-lg rounded-xl hover:bg-red-700 disabled:bg-gray-700 disabled:text-gray-500 font-bold transition"
                  >
                    불일치 ✗
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="w-full bg-gray-700 rounded-full h-3">
          <div className="bg-white h-3 rounded-full transition-all" style={{ width: `${((currentRound + 1) / 15) * 100}%` }} />
        </div>
        <p className="text-sm text-gray-400 mt-3 text-center">
          진행률: {Math.min(currentRound + 1, 15)}/15 | 점수: {score}
        </p>
      </div>
    </div>
  );
};

export default NBackGame;
