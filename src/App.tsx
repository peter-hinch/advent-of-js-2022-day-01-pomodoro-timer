import 'normalize.css';
import './App.css';
import { useState, useEffect } from 'react';

const App = () => {
  const [settings, setSettings] = useState<number>(900);
  const [timeRemaining, setTimeRemaining] = useState<number>(900);
  const [timerRunning, setTimerRunning] = useState<boolean>(false);

  // Helper functions
  const convertSeconds = (value: number) => {
    const minutes = (value / 60).toString().padStart(2, '0');
    const seconds = (value % 60).toString().padStart(2, '0');

    return { minutes, seconds };
  };

  const calculateDegrees = (total: number, remaining: number) =>
    (total / remaining) * 360;

  useEffect(() => {
    console.log('timerRunning:', timerRunning);
  }, [timerRunning]);

  return (
    <main>
      <section id="timer">
        <div className="timer__bezel"></div>
        <div className="timer__face"></div>
        <div className="timer__content">
          <span className="countdown__time-remaining">
            <span id="time__mins">
              {convertSeconds(timeRemaining)?.minutes}
            </span>
            <span>:</span>
            <span id="time__secs">
              {convertSeconds(timeRemaining)?.seconds}
            </span>
          </span>
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
