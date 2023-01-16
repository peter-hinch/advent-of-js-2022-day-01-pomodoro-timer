import './App.css';
import { useState, useEffect } from 'react';

const App = () => {
  const [timeRemaining, setTimeRemaining] = useState({
    minutes: 15,
    seconds: 0
  });

  const padTimeValue = (val: number) => val.toString().padStart(2, '0');

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
          <button className="countdown__button-start-stop">Start</button>
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
