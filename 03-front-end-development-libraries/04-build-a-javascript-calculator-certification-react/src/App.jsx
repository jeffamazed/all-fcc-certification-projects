import Calculator from "./components/Calculator";
import myLogo from "./assets/my-logo.png";

const App = () => {
  return (
    <main role="application">
      <Calculator />
      <a
        href="https://github.com/jeffamazed"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="My logo and github"
      >
        <img src={myLogo} alt="jeffamazed logo" className="logo" />
      </a>
    </main>
  );
};

export default App;
