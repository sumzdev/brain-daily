import { useState, useEffect } from "react";

const Pomodoro = () => {
  const [workDuration] = useState(25);
  const [breakDuration] = useState(5);
  const [isRunning, setIsRunning] = useState(false);
  const [isWorkSession, setIsWorkSession] = useState(true);
  const [timeLeft, setTimeLeft] = useState(workDuration * 60);

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsWorkSession(!isWorkSession);
      setTimeLeft((!isWorkSession ? workDuration : breakDuration) * 60);
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft, isWorkSession, workDuration, breakDuration]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-12 shadow-xl border border-gray-700 text-center">
        <h2 className="text-4xl font-extrabold text-white mb-10 tracking-tight">
          포모도로 타이머
        </h2>

        <div className="mb-12 p-10 bg-black/40 rounded-2xl border border-gray-700">
          <p className="text-xl text-gray-400 mb-6 uppercase tracking-wider font-semibold">
            {isWorkSession ? "집중 시간" : "휴식 시간"}
          </p>
          <div className="text-8xl font-extrabold text-white font-mono mb-6 tracking-tight">
            {String(minutes).padStart(2, "0")}:
            {String(seconds).padStart(2, "0")}
          </div>
        </div>

        <div className="flex gap-4 justify-center mb-10">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className="px-10 py-4 bg-white text-black rounded-xl hover:bg-gray-200 transition-all duration-200 font-bold text-lg"
          >
            {isRunning ? "일시정지" : "시작"}
          </button>
          <button
            onClick={() => {
              setIsRunning(false);
              setTimeLeft(workDuration * 60);
              setIsWorkSession(true);
            }}
            className="px-10 py-4 bg-gray-700 text-white rounded-xl hover:bg-gray-600 transition-all duration-200 font-bold text-lg border border-gray-600"
          >
            리셋
          </button>
        </div>

        <p className="text-sm text-gray-400">
          💡 집중이 필요할 때마다 포모도로를 사용하세요. 25분 집중 → 5분 휴식 반복
        </p>
      </div>
    </div>
  );
};

export default Pomodoro;
