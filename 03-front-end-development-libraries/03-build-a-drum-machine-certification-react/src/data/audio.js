// audio.js
import { Howl } from "howler";

const audioFiles = [
  {
    id: "heater-1",
    name: "Heater 1",
    text: "Q",
    sound: new Howl({
      src: [
        "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-1.mp3",
      ],
      preload: true,
    }),
  },
  {
    id: "heater-2",
    name: "Heater 2",
    text: "W",
    sound: new Howl({
      src: [
        "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-2.mp3",
      ],
      preload: true,
    }),
  },
  {
    id: "heater-3",
    name: "Heater 3",
    text: "E",
    sound: new Howl({
      src: [
        "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-3.mp3",
      ],
      preload: true,
    }),
  },
  {
    id: "heater-4",
    name: "Heater 4",
    text: "A",
    sound: new Howl({
      src: [
        "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-4_1.mp3",
      ],
      preload: true,
    }),
  },
  {
    id: "clap",
    name: "Clap",
    text: "S",
    sound: new Howl({
      src: [
        "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-6.mp3",
      ],
      preload: true,
    }),
  },
  {
    id: "open-hh",
    name: "Open HH",
    text: "D",
    sound: new Howl({
      src: [
        "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Dsc_Oh.mp3",
      ],
      preload: true,
    }),
  },
  {
    id: "kick-n-hat",
    name: "Kick-n'-Hat",
    text: "Z",
    sound: new Howl({
      src: [
        "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Kick_n_Hat.mp3",
      ],
      preload: true,
    }),
  },
  {
    id: "kick",
    name: "Kick",
    text: "X",
    sound: new Howl({
      src: [
        "https://cdn.freecodecamp.org/testable-projects-fcc/audio/RP4_KICK_1.mp3",
      ],
      preload: true,
    }),
  },
  {
    id: "closed-hh",
    name: "Closed HH",
    text: "C",
    sound: new Howl({
      src: [
        "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Cev_H2.mp3",
      ],
      preload: true,
    }),
  },
];

export default audioFiles;
