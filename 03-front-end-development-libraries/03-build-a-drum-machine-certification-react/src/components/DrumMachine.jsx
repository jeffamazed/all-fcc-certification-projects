import { useState, useRef, useEffect } from "react";
import DrumPad from "./DrumPad";
import audioFiles from "../data/audio.js";
import mylogo from "../assets/img/my-logo.png";

function DrumMachine() {
  const keyMapRef = useRef({});
  const [isOn, setIsOn] = useState(true);
  const [display, setDisplay] = useState("Rock On 🎸");
  const [volume, setVolume] = useState(0.5);
  const isOnRef = useRef(isOn);

  // for handling isOn so that it doesn't cause adding or removing event listener's every time it's toggled
  useEffect(() => {
    isOnRef.current = isOn;
  }, [isOn]);

  const registerPad = (key, playFn) => {
    keyMapRef.current[key] = playFn;
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      const key = e.key.toUpperCase();
      if (keyMapRef.current[key] && isOnRef.current) {
        keyMapRef.current[key]();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handlePowerBtn = () => {
    setIsOn((prev) => {
      const newState = !prev;
      setDisplay(newState ? "Rock On 🎸" : "Sleep 💤");
      return newState;
    });
  };

  const handleVolume = (e) => {
    const newVolume = Number(e.currentTarget.value);
    setVolume(newVolume);
    const volumeDisplay = `Volume: ${Math.round(newVolume * 100)}`;
    setDisplay(volumeDisplay);
  };

  return (
    <main>
      <div className="app-container" id="drum-machine">
        <div className="pad-container">
          {audioFiles.map(({ id, name, text, sound }) => {
            return (
              <DrumPad
                key={id}
                id={id}
                name={name}
                text={text}
                sound={sound}
                ariaLabel={name}
                register={registerPad}
                isOn={isOn}
                onPlay={() => setDisplay(name)}
                volume={volume}
              />
            );
          })}
        </div>

        <div className="controls-container">
          {/* logo */}

          <a
            href="https://github.com/jeffamazed"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="My logo and github"
          >
            <img src={mylogo} alt="jeffamazed logo" className="logo" />
          </a>
          <div className="power-controls-container">
            <span>Power</span>
            <button
              type="button"
              className="power"
              onClick={handlePowerBtn}
              aria-pressed={isOn}
              aria-label={
                isOn ? "Turn off drum machine" : "Turn on drum machine"
              }
            >
              {isOn ? (
                <i className="fas fa-toggle-on"></i>
              ) : (
                <i className="fas fa-toggle-off"></i>
              )}
            </button>
          </div>
          <div id="display">{display}</div>

          <label htmlFor="volume" className="sr-only">
            Set Volume
          </label>
          <input
            type="range"
            id="volume"
            className="volume"
            min="0"
            max="1.0"
            step="0.01"
            value={volume}
            onChange={handleVolume}
            disabled={isOn ? false : true}
            aria-valuenow={volume}
            aria-valuetext={`Volume ${Math.round(volume * 100)} percent`}
          />
        </div>
      </div>
    </main>
  );
}

export default DrumMachine;
