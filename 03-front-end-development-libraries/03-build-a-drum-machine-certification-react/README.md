# 🥁 React Drum Machine

A responsive drum machine built with **React** and powered by **Howler.js** for low-latency audio playback. Styled with CSS Grid and custom properties, and includes accessibility features like screen reader-only labels and keyboard support.

## 🚀 Features

- 🎧 Low-latency audio playback using Howler.js
- 🔊 Volume control slider (accessible and screen-reader friendly)
- ⌨️ Keyboard support for triggering drum pads
- 🧠 Accessible labels for screen readers
- 💡 Power toggle to enable/disable interaction
- ⚡ Neon-inspired UI theme

## 📦 Tech Stack

- **React** (functional components + hooks)
- **Howler.js** for audio
- **CSS Grid & custom properties**
- **ARIA / screen reader enhancements**

## 🔧 Setup

1. Clone the repo:

   ```bash
   git clone https://github.com/jeffamazed/drum-machine.git
   cd drum-machine
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

## 🧪 Accessibility

- Use `Tab` / `Shift + Tab` to navigate
- Drum pads have accessible labels via `aria-label`
- Volume slider has a screen-reader-only `<label>`
- Announcements avoided for every sound to reduce screen reader noise

## 🏷️ License

MIT © [jeffamazed](https://github.com/jeffamazed)  
Audio provided by FreeCodeCamp's Drum Machine project
