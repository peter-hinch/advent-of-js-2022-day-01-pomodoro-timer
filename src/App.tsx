import 'normalize.css';
import './App.css';
import { useState, useEffect } from 'react';

const App = () => {
  const [settings, setSettings] = useState<number>(900);
  const [timeRemaining, setTimeRemaining] = useState<number>(900);
  const [timerRunning, setTimerRunning] = useState<boolean>(false);

  // Helper functions
  const convertSeconds = (value: number) => {
    const minutes = Math.round(value / 60)
      ?.toString()
      .padStart(2, '0');
    const seconds = Math.round(value % 60)
      ?.toString()
      .padStart(2, '0');

    return { minutes, seconds };
  };

  const calculateDegrees = (total: number, remaining: number) =>
    (total / remaining) * 360;

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (timerRunning) {
      interval = setInterval(() => {
        setTimeRemaining((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerRunning]);

  return (
    <main>
      <section id="timer">
        <div className="timer__bezel"></div>
        <div className="timer__face"></div>
        <div className="timer__content">
          <div className="countdown__time-remaining">
            <span id="time__mins">
              {convertSeconds(timeRemaining)?.minutes}
            </span>
            <span>:</span>
            <span id="time__secs">
              {convertSeconds(timeRemaining)?.seconds}
            </span>
          </div>
          <button
            className="countdown__button-start-stop"
            onClick={() => setTimerRunning(!timerRunning)}
          >
            {!timerRunning ? 'Start' : 'Stop'}
          </button>
          <button
            className="countdown__button-settings"
            aria-label="settings"
          ></button>
        </div>
      </section>
    </main>
  );
};

export default App;
