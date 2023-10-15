import 'normalize.css';
import './App.css';
import { useState, useEffect } from 'react';

const App: React.FC = () => {
  const [settings, setSettings] = useState<{
    settingsOpen: boolean;
    time: number;
  }>({ settingsOpen: false, time: 15 });
  const [timeRemaining, setTimeRemaining] = useState<number>(settings?.time);
  const [timerRunning, setTimerRunning] = useState<boolean>(false);

  // Helper functions
  const convertToSeconds = (minutes: string, seconds: string) => {
    const minutesInt = parseInt(minutes);
    const secondsInt = parseInt(seconds);
    let time = 0;

    if (!isNaN(minutesInt)) {
      time += minutesInt * 60;
    }
    if (!isNaN(secondsInt)) {
      time += secondsInt;
    }
    return time;
  };

  const convertFromSeconds = (value: number) => {
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

  // Handler functions
  const handleModalConfirm = () => {
    setTimerRunning(false);
    setTimeRemaining(settings?.time);
  };

  const handleSettingsSave = (minutes: string, seconds: string) => {
    let time = convertToSeconds(minutes, seconds);
    setSettings({
      settingsOpen: false,
      time: time
    });
    setTimeRemaining(time);
    setTimerRunning(false);
  };

  const handleSettingsCancel = () => {
    setSettings((prevSettings) => ({ ...prevSettings, settingsOpen: false }));
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
        {settings?.settingsOpen && (
          <Settings
            minutesValue={convertFromSeconds(settings?.time)?.minutes}
            secondsValue={convertFromSeconds(settings?.time)?.seconds}
            handleSave={handleSettingsSave}
            handleCancel={handleSettingsCancel}
          />
        )}
        {!timeRemaining && (
          <Modal text="Time's Up!" handleConfirm={handleModalConfirm} />
        )}
        <div className="timer__content">
          <div className="countdown__time-remaining">
            <span id="time__mins">
              {convertFromSeconds(timeRemaining)?.minutes}
            </span>
            <span>:</span>
            <span id="time__secs">
              {convertFromSeconds(timeRemaining)?.seconds}
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
            onClick={() =>
              setSettings((prevSettings) => ({
                ...prevSettings,
                settingsOpen: true
              }))
            }
          ></button>
        </div>
        <div className="timer__face"></div>
        <svg className="timer__bezel" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="50"
            fill={timeRemaining ? '#000' : '#9d0000'}
          />
          <g transform="rotate(90, 50, 50)">
            <circle
              cx="50"
              cy="50"
              r="25"
              stroke="#09a65a"
              strokeDasharray={calculateDashArray(
                100,
                settings?.time,
                timeRemaining
              )}
              strokeWidth="50"
            />
          </g>
        </svg>
      </section>
    </main>
  );
};

const Modal: React.FC<{ text: string; handleConfirm: Function }> = ({
  text,
  handleConfirm
}) => {
  return (
    <dialog className="timer__modal">
      <p>{text}</p>
      <button onClick={() => handleConfirm()} className="modal__button-dismiss">
        Okay
      </button>
    </dialog>
  );
};

const Settings: React.FC<{
  minutesValue: string;
  secondsValue: string;
  handleSave: Function;
  handleCancel: Function;
}> = ({ minutesValue, secondsValue, handleSave, handleCancel }) => {
  const [minutes, setMinutes] = useState<string>(minutesValue);
  const [seconds, setSeconds] = useState<string>(secondsValue);

  const handleInputChange = (event: any) => {
    if (event?.target?.id?.includes('minutes')) {
      setMinutes(event?.target?.value);
    }
    if (event?.target?.id?.includes('seconds')) {
      setSeconds(event?.target?.value);
    }
  };

  return (
    <dialog className="timer__modal timer__settings">
      <input
        id="settings__minutes"
        type="number"
        min="0"
        max="60"
        step="1"
        value={minutes?.toString()?.padStart(2, '0')}
        onChange={(event) => handleInputChange(event)}
      />
      <input
        id="settings__seconds"
        type="number"
        min="0"
        max="59"
        step="1"
        value={seconds?.toString()?.padStart(2, '0')}
        onChange={(event) => handleInputChange(event)}
      />
      <button onClick={() => handleSave(minutes, seconds)}>Save</button>
      <button onClick={() => handleCancel()}>Cancel</button>
    </dialog>
  );
};

export default App;
