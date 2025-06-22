import { useState, useRef, useEffect } from "react";
import { quoteList } from "./js/quote-list";
import { quoteUrlGenerator, generateRandQuote } from "./js/utils";

function RandomQuoteMachine() {
  // state
  const [randomQuote, setRandomQuote] = useState(() =>
    generateRandQuote(quoteList)
  );
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [hasReset, setHasReset] = useState(false);

  // ref
  const newQuoteBtnRef = useRef(null);

  useEffect(() => {
    if (newQuoteBtnRef.current) {
      newQuoteBtnRef.current.focus();
    }
  }, []);

  // click
  function handleButtonClick() {
    setHasReset(false);
    setIsTransitioning(true);
    setTimeout(() => {
      setRandomQuote(generateRandQuote(quoteList));
    }, 750);

    setTimeout(() => {
      setIsTransitioning(false);
      setHasReset(true);
    }, 800);
  }

  return (
    <main style={{ backgroundColor: randomQuote.color }}>
      <div
        className="quote-box"
        id="quote-box"
        style={{
          color: randomQuote.color,
          boxShadow: `0 0 5px 2px #333333`,
        }}
        role="region"
        aria-labelledby="text"
      >
        <figure
          className={isTransitioning ? "fade-out" : hasReset ? "fade-in" : ""}
          key={randomQuote.id}
          aria-live="polite"
        >
          <blockquote id="text">
            <span>&ldquo;</span>&nbsp;{randomQuote.quote}&nbsp;
            <span>&rdquo;</span>
          </blockquote>
          <figcaption id="author">{randomQuote.author}</figcaption>
        </figure>
        <div className="btn-links-container">
          <div className="links-container">
            <a
              id="tweet-quote"
              href={quoteUrlGenerator(
                randomQuote.quote,
                randomQuote.author,
                "twitter"
              )}
              target="_blank"
              style={{ backgroundColor: randomQuote.color }}
              rel="noopener noreferrer"
              aria-label={`Share this quote by ${randomQuote.author} on Twitter`}
            >
              <i className="fa-brands fa-twitter"></i>
            </a>
            <a
              href={quoteUrlGenerator(
                randomQuote.quote,
                randomQuote.author,
                "tumblr"
              )}
              target="_blank"
              style={{ backgroundColor: randomQuote.color }}
              rel="noopener noreferrer"
              aria-label={`Share this quote by ${randomQuote.author} on Tumblr`}
            >
              <i className="fa-brands fa-tumblr"></i>
            </a>
          </div>
          <button
            className="new-quote-btn"
            id="new-quote"
            onClick={handleButtonClick}
            style={{ backgroundColor: randomQuote.color }}
            ref={newQuoteBtnRef}
            aria-label="Generate a new random quote"
            aria-describedby="quote-instruction"
          >
            New Quote
          </button>
          <span id="quote-instruction" className="sr-only">
            Clicking this will fetch a new quote and update the quote box.
          </span>
        </div>
      </div>
      <span className="made-by">
        Made by:&nbsp;
        <a
          href="https://github.com/jeffamazed"
          target="_blank"
          rel="noopener noreferrer"
        >
          jeffamazed
        </a>
      </span>
    </main>
  );
}

export default RandomQuoteMachine;
