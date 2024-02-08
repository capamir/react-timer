/* eslint-disable */

import React, { useState, useEffect } from "react";
import "./App.css";

function Clock({ time }) {
  const format = (time) => {
    let hours = Math.floor(time / 3600);
    let minutes = Math.floor((time % 3600) / 60);
    let seconds = time % 60;

    hours = hours.toString().padStart(2, "0");
    minutes = minutes.toString().padStart(2, "0");
    seconds = seconds.toString().padStart(2, "0");

    return `${hours}:${minutes}:${seconds}`;
  };

  return (
    <div className="displayedTime">
      <h1>{format(time)}</h1>
    </div>
  );
}

function Input({ onSetCount }) {
  return (
    <input
      type="submit"
      className="start"
      value="Start"
      onClick={() => onSetCount(true)}
    />
  );
}

function Button({ label, onClickHandler }) {
  return <button onClick={onClickHandler}>{label}</button>;
}

function App() {
  const [count, setCount] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (running) {
      const timer = setInterval(() => {
        setCount((perv) => perv + 1);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [running]);

  const handleCount = () => {
    setCount(0);
    setRunning(true);
  };

  const handleStop = () => {
    setRunning(false);
  };

  const handleReset = () => {
    handleStop();
    setCount(0);
  };

  return (
    <div className="container">
      <Clock time={count} />
      <Input onSetCount={handleCount} />
      <Button label="stop" onClickHandler={handleStop} />
      <Button label="reset" onClickHandler={handleReset} />
    </div>
  );
}

export default App;
