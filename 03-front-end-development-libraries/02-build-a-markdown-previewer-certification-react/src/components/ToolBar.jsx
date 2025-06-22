function ToolBar({ name, setMax, isMax }) {
  return (
    <div className="toolbar">
      <span>{name}</span>
      <button
        type="button"
        className="toggle-max-min-btn"
        onClick={setMax}
        aria-label={isMax ? "Minimize" : "Maximize"}
      >
        <i className={`fas ${isMax ? "fa-compress" : "fa-expand"}`}></i>
      </button>
    </div>
  );
}
export default ToolBar;
