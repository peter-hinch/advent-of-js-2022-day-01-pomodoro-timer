import 'normalize.css';
import './App.css';
import { useState, useEffect } from 'react';

const App = () => {
  const [timeRemaining, setTimeRemaining] = useState({
    minutes: 15,
    seconds: 0
  });
  const [timerRunning, setTimerRunning] = useState<boolean>(false);

  const padTimeValue = (val: number) => val.toString().padStart(2, '0');

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
            <span id="time__mins">{padTimeValue(timeRemaining?.minutes)}</span>
            <span>:</span>
            <span id="time__secs">{padTimeValue(timeRemaining?.seconds)}</span>
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
