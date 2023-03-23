import { useEffect, useState } from "react";
import "./App.css";
import Timer from "./components/timer";
import Session from "./components/session";
import Break from "./components/break";
import beep from './assets/beep-01a.mp3'

const alarm = new Audio(beep)

function App() {
  const [breakTime, setBreak] = useState(300); //break period amount
  const [sessionTime, setSession] = useState(1500); //session period amount
  const [timer, setTimer] = useState(1500); //count down timer
  const [timerType, setType] = useState("session"); //what type of period is the current state of the count down
  const [running, setRunning] = useState(false); //is the count down running

  const handleIncrease = (typee) => {
    //if the periods are less than an hour, add
    if (typee === "break" && breakTime < 3600) {
      setBreak((prev) => prev + 60);
    }
    if (typee === "session" && sessionTime < 3600) {
      setSession((prev) => prev + 60);
    }
  };

  const handleDecrease = (typee) => {
    //if the periods are not less than a minute, subtract
    if (typee === "break" && breakTime >= 120) {
      setBreak((prev) => prev - 60);
    }
    if (typee === "session" && sessionTime >= 120) {
      setSession((prev) => prev - 60);
    }
  };

  const handlePlay = () => {
    //if timer is running, do not do anything.
    if (running) return;

    //after play is initiated set 'the count down is running'
    setRunning(true);

    let delta = 0
    const countdownId = setInterval(() => {
      // setinterval lags a bit, to reduce the lag, we create a delta variable and set the delay
      // delta,(delta has to be small enough (10ms - 100ms)) then set the timer when delta adds up to a 1000ms
      // note however, that when the window loses focus, the timer pauses
       if (delta < 1000) {
        delta += 10
       } else {
         setTimer((prev) => prev - 1);
         delta = 0
       }
    }, 10);

    //set countdown id to local storage
    localStorage.setItem("countdownId", countdownId);
  };

  const handlePause = () => {
    //get countdown id from local storage
    const id = localStorage.getItem("countdownId");

    clearInterval(id);

    //set 'is the count down running' to false
    setRunning(false);
  };

  const handleReset = () => {
    //set everything to its default state
    setBreak(300);
    setSession(1500);
    setTimer(1500);
    setType("session");
    if (running) {
      handlePause()
    }
  };

  useEffect(() => {
    //when timer hits zero, switch from break to session, vice versa
    if (timer < 0 && timerType === "session") {
      alarm.play()
      setType("break");
    }
    if (timer < 0 && timerType === "break") {
      alarm.play()
      setType("session");
    }
  }, [timer]);

  useEffect(() => {
    if (timerType === "session") {
      setTimer(sessionTime);
    }

    if (timerType === "break") {
      setTimer(breakTime);
    }
  }, [timerType]);

  useEffect(() => {
    if (timerType === "session" && running === false) {
      setTimer(sessionTime);
    }

    if (timerType === "break" && running === false) {
      setTimer(breakTime);
    }
  }, [sessionTime, breakTime]);

  return (
    <div className="app_container">
      <div className="app">
      <Break period={breakTime} inc={handleIncrease} dec={handleDecrease} />
      <Session period={sessionTime} inc={handleIncrease} dec={handleDecrease} />
      <Timer
        period={timer}
        periodType={timerType}
        play={handlePlay}
        pause={handlePause}
        reset={handleReset}
      />
      </div>
    </div>
  );
}

export default App;
