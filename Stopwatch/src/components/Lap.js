import { useState, useEffect } from "react";
import "./Lap.css";

function Lap() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState([]);

  useEffect(() => {
    let timer;
    if (isRunning) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [isRunning]);

  const formatTime = (time) => {
    const milliseconds = (`0${(time % 1000) / 10}`).slice(-2);
    const seconds = (`0${Math.floor((time / 1000) % 60)}`).slice(-2);
    const minutes = (`0${Math.floor((time / 60000) % 60)}`).slice(-2);
    return `${minutes}:${seconds}:${milliseconds}`;
  };

  const handleLap = () => {
    setLaps([...laps, formatTime(time)]);
  };

  const handleReset = () => {
    setTime(0);
    setLaps([]);
    setIsRunning(false);
  };

  return (
    <>
      <div className="lapBox">
        <div className="timer d-flex justify-content-center align-items-center">
          {formatTime(time)}
        </div>
        <div className="laps">
          {laps.map((lap, index) => (
            <div key={index} className="lap">Lap {index + 1}: {lap}</div>
          ))}
        </div>
        <div className="buttons mt-3 d-flex justify-content-between">
          <button
            className="btn btn-outline-primary lapButton"
            onClick={() => setIsRunning(!isRunning)}
          >
            {isRunning ? "Pause" : "Start"}
          </button>
          <button
            className="btn btn-outline-danger lapButton"
            onClick={handleLap}
            disabled={!isRunning}
          >
            Lap
          </button>
          <button
            className="btn btn-outline-secondary lapButton"
            onClick={handleReset}
          >
            Reset
          </button>
        </div>
      </div>
    </>
  );
}

export default Lap;