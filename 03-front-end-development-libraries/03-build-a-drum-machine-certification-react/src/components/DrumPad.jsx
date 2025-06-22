import { useRef, useState, useEffect } from "react";

function DrumPad({
  id,
  text,
  ariaLabel,
  sound,
  register,
  isOn,
  onPlay,
  volume,
}) {
  const [isPressed, setIsPressed] = useState(false);
  const cdIdRef = useRef(null);

  const handlePlay = () => {
    sound.play();

    onPlay();
    setIsPressed(true);
    clearTimeout(cdIdRef.current);
    cdIdRef.current = setTimeout(() => {
      setIsPressed(false);
    }, 100);
  };

  // handle volume
  useEffect(() => {
    sound.volume(volume);
  }, [volume, sound]);

  // adding to the keymap for each button
  useEffect(() => {
    if (register && typeof register === "function") {
      register(text, handlePlay);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <button
      type="button"
      className={`drum-pad ${isPressed ? "active" : ""}`}
      id={id}
      aria-label={ariaLabel}
      onClick={handlePlay}
      disabled={isOn ? false : true}
    >
      {text}
    </button>
  );
}

export default DrumPad;
