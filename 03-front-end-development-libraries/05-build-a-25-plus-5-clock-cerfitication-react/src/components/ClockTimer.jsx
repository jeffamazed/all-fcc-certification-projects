import { useState, useEffect, useRef } from "react";
import {
  FaRegArrowAltCircleUp,
  FaRegArrowAltCircleDown,
  FaRegPlayCircle,
  FaRegPauseCircle,
} from "react-icons/fa";
import { LuTimerReset } from "react-icons/lu";
import beepSound from "../assets/beep.mp3";
import myLogo from "../assets/my-logo.png";

const ClockTimer = () => {
  const [sessionLength, setSessionLength] = useState(25);
  const [breakLength, setBreakLength] = useState(5);

  const [isTimerRunning, setIsTimerRunning] = useState(false);

  const [labelText, setLabelText] = useState("Session");
  const [isEndingSoon, setIsEndingSoon] = useState(false);
  const [_, setTick] = useState(0);

  const remainingTimeRef = useRef(null);
  const futureRef = useRef(null);
  const timerRefId = useRef(null);
  const audioRef = useRef(null);
  const modeRef = useRef("session");
  const timeoutRef = useRef(null);

  const formatTime = (item) => {
    return String(item).padStart(2, "0");
  };

  const handleSetupBtn = (btn, type) => {
    if (isTimerRunning) return;

    const min = 1;
    const max = 60;

    // Clear any existing time so getTimeLeft uses updated session/break length
    remainingTimeRef.current = null;
    futureRef.current = null;

    if (btn === "break") {
      if (type === "decrement" && breakLength > min) {
        setBreakLength((prev) => prev - 1);
      }
      if (type === "increment" && breakLength < max) {
        setBreakLength((prev) => prev + 1);
      }
    }

    if (btn === "session") {
      if (type === "decrement" && sessionLength > min) {
        setSessionLength((prev) => prev - 1);
      }
      if (type === "increment" && sessionLength < max) {
        setSessionLength((prev) => prev + 1);
      }
    }
  };

  const toggleSession = () => {
    if (!isTimerRunning) {
      const duration =
        remainingTimeRef.current ??
        (modeRef.current === "session" ? sessionLength : breakLength) *
          60 *
          1000;

      futureRef.current = Date.now() + duration;
      setIsTimerRunning(true);
      //prevent using stale values
      remainingTimeRef.current = null;
    } else {
      clearInterval(timerRefId.current);
      clearTimeout(timeoutRef.current);
      remainingTimeRef.current = futureRef.current - Date.now();
      setIsTimerRunning(false);
    }
  };

  useEffect(() => {
    if (isTimerRunning) {
      // call for immediate update
      update();
      timerRefId.current = setInterval(() => {
        update();
      }, 1000);
    }

    return () => clearInterval(timerRefId.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isTimerRunning]);

  const getRemainingTime = (futureTime) => {
    const now = Date.now();
    const remaining = futureTime - now;
    const totalSeconds = Math.max(0, Math.floor(remaining / 1000));

    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return {
      remaining,
      minutes,
      seconds,
      formatted: `${formatTime(minutes)}:${formatTime(seconds)}`,
    };
  };

  const startNewPhase = (nextMode) => {
    modeRef.current = nextMode;
    setLabelText(nextMode === "session" ? "Session" : "Break");

    const nextDuration = nextMode === "session" ? sessionLength : breakLength;
    const futureTime = Date.now() + nextDuration * 60 * 1000;
    futureRef.current = futureTime;

    update();
    // start a new interval
    timerRefId.current = setInterval(() => {
      update();
    }, 1000);
  };

  const update = () => {
    const { remaining } = getRemainingTime(futureRef.current);
    // check for warning red font color
    setIsEndingSoon(remaining / 1000 < 60);

    if (remaining <= 0) {
      // show 00:00 for one tick
      setTick((prev) => prev + 1);

      audioRef.current.play();

      // clear interval to avoid overlapping
      clearInterval(timerRefId.current);

      // delay phase switch by 1 second
      timeoutRef.current = setTimeout(() => {
        const nextMode = modeRef.current === "session" ? "break" : "session";
        startNewPhase(nextMode);
      }, 1000);

      return;
    }

    // force re-render to update display
    setTick((prev) => prev + 1);
  };

  const resetSession = () => {
    clearInterval(timerRefId.current);
    remainingTimeRef.current = null;
    futureRef.current = null;
    timerRefId.current = null;

    setIsTimerRunning(false);
    setSessionLength(25);
    setBreakLength(5);
    setLabelText("Session");
    setIsEndingSoon(false); //  reset warning state
    modeRef.current = "session"; //  reset mode to session

    // stop audio
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    // trigger re-render to update display
    setTick((prev) => prev + 1);
  };

  const getTimeLeft = () => {
    if (isTimerRunning || remainingTimeRef.current !== null) {
      const { formatted } = getRemainingTime(futureRef.current);
      return formatted;
    }

    // If paused and no future time, show current setup length
    const minutes = modeRef.current === "session" ? sessionLength : breakLength;
    return `${formatTime(minutes)}:00`;
  };

  return (
    <main>
      <audio id="beep" src={beepSound} ref={audioRef} />

      <div className="page-wrapper">
        {" "}
        <h1>25 + 5 Clock</h1>
        <div className="setup-container">
          <div className="break-container">
            <p id="break-label">Break Length</p>
            <fieldset className="break-setup-container">
              <legend className="sr-only">Break Length Controls</legend>
              <button
                type="button"
                className="btn decrement-btn"
                aria-label="Decrease break length"
                id="break-decrement"
                onClick={() => handleSetupBtn("break", "decrement")}
              >
                <FaRegArrowAltCircleDown />
              </button>
              <span id="break-length" aria-live="polite" role="status">
                {breakLength}
              </span>
              <button
                type="button"
                className="btn increment-btn"
                aria-label="Increase break length"
                id="break-increment"
                onClick={() => handleSetupBtn("break", "increment")}
              >
                <FaRegArrowAltCircleUp />
              </button>
            </fieldset>
          </div>
          <div className="session-container">
            <p id="session-label">Session Length</p>
            <fieldset className="session-setup-container">
              <legend className="sr-only">Session Length Controls</legend>
              <button
                type="button"
                className="btn decrement-btn"
                aria-label="Decrease session length"
                id="session-decrement"
                onClick={() => handleSetupBtn("session", "decrement")}
              >
                <FaRegArrowAltCircleDown />
              </button>
              <span id="session-length" aria-live="polite" role="status">
                {sessionLength}
              </span>
              <button
                type="button"
                className="btn increment-btn"
                aria-label="Increase session length"
                id="session-increment"
                onClick={() => handleSetupBtn("session", "increment")}
              >
                <FaRegArrowAltCircleUp />
              </button>
            </fieldset>
          </div>
        </div>
        <div className="clock-container">
          <div
            className={`main-clock-container ${isEndingSoon ? "warning" : ""}`}
          >
            <h2 id="timer-label" aria-live="polite" aria-atomic="true">
              {labelText}
            </h2>

            <hr />
            <p id="time-left">{getTimeLeft()}</p>
          </div>
          <fieldset className="controls-container">
            <legend className="sr-only">Timer Controls</legend>
            <button
              type="button"
              id="start_stop"
              className="btn start-stop-btn"
              onClick={toggleSession}
              aria-label={isTimerRunning ? "Stop clock" : "Start clock"}
            >
              {isTimerRunning ? <FaRegPauseCircle /> : <FaRegPlayCircle />}
            </button>

            <button
              type="button"
              id="reset"
              className="btn reset-btn"
              onClick={resetSession}
              aria-label="Reset Session"
            >
              <LuTimerReset />
            </button>
          </fieldset>
        </div>
      </div>
      <a
        href="https://github.com/jeffamazed"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src={myLogo} alt="jeffamazed Logo" className="logo" />
      </a>
    </main>
  );
};

export default ClockTimer;
