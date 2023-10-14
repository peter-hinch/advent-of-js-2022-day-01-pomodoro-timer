import 'normalize.css';
import './App.css';
import { useState, useEffect } from 'react';

const App = () => {
  const [settings, setSettings] = useState<number>(900);
  const [timeRemaining, setTimeRemaining] = useState<number>(settings);
  const [timerRunning, setTimerRunning] = useState<boolean>(false);

  // Helper functions
  const convertSeconds = (value: number) => {
    const minutes = Math.floor(value / 60)
      ?.toString()
      .padStart(2, '0');
    const seconds = Math.round(value % 60)
      ?.toString()
      .padStart(2, '0');

    return { minutes, seconds };
  };

  // The coloured portion of the timer bezel is drawn with svg
  // and uses the dash array property to draw a pie-chart style
  // section
  // Reference: https://sparkbox.com/foundry/how_to_code_an_SVG_pie_chart
  const calculateDashArray = (
    diameter: number,
    total: number,
    remaining: number
  ) => {
    // Note: stroke is only 50% of face diameter
    let perimeter = (Math.PI * diameter) / 2;
    let portion = (remaining / total) * perimeter;
    return `${portion?.toString()} ${perimeter?.toString()}`;
  };

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (timerRunning && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerRunning, timeRemaining]);

  return (
    <main>
      <section id="timer">
        <svg
          className="timer__bezel"
          width="518"
          height="518"
          viewBox="0 0 100 100"
        >
          <circle
            cx="50%"
            cy="50%"
            r="50%"
            fill={timeRemaining ? '#000' : '#9d0000'}
          />
          <g transform="rotate(90, 50, 50)">
            <circle
              cx="50"
              cy="50"
              r="25"
              stroke="#09a65a"
              strokeDasharray={calculateDashArray(100, settings, timeRemaining)}
              strokeWidth="50"
            />
          </g>
        </svg>
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
