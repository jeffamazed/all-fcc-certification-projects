import ToolBar from "./ToolBar.jsx";
import { useState, useEffect } from "react";
import placeholder from "../data/placeholder.js";
import { marked } from "marked";
import Prism from "prismjs";
import "prismjs/themes/prism.css";
import "../styles.css";

// Marked options
marked.setOptions({
  breaks: true,
  langPrefix: "language-",
});

function MarkdownPreviewer() {
  const [markdown, setMarkdown] = useState(placeholder);
  const [isEditorMax, setIsEditorMax] = useState(false);
  const [isPreviewerMax, setIsPreviewerMax] = useState(false);

  const handleChange = (e) => {
    setMarkdown(e.currentTarget.value);
  };

  useEffect(() => {
    Prism.highlightAll();
  }, [markdown, isPreviewerMax, isEditorMax]);

  const handleEditorMax = () => {
    setIsEditorMax((prev) => !prev);
    setIsPreviewerMax(false);
  };

  const handlePreviewerMax = () => {
    setIsPreviewerMax((prev) => !prev);
    setIsEditorMax(false);
  };

  const hiddenStyles = {
    height: "0",
    border: "1px solid transparent",
    boxShadow: "none",
    overflow: "hidden",
    opacity: "0",
  };

  return (
    <main style={{ gap: isEditorMax || isPreviewerMax ? 0 : "15px" }}>
      <div
        className={`editor-container ${isEditorMax ? "maximize" : ""}`}
        style={isPreviewerMax ? hiddenStyles : null}
        aria-hidden={isPreviewerMax ? "true" : "false"}
      >
        <ToolBar
          name="✏️&nbsp;&nbsp;Editor"
          setMax={handleEditorMax}
          isMax={isEditorMax}
        />
        <textarea
          id="editor"
          value={markdown}
          onChange={handleChange}
        ></textarea>
      </div>

      <div
        className={`previewer-container ${isPreviewerMax ? "maximize" : ""}`}
        style={isEditorMax ? hiddenStyles : null}
        aria-hidden={isEditorMax ? "true" : "false"}
      >
        <ToolBar
          name="📄&nbsp;&nbsp;Previewer"
          setMax={handlePreviewerMax}
          isMax={isPreviewerMax}
        />
        <div
          id="preview"
          dangerouslySetInnerHTML={{
            __html: marked.parse(markdown),
          }}
        ></div>
      </div>
    </main>
  );
}

export default MarkdownPreviewer;
