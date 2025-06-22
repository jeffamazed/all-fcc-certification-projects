import { useState } from "react";
import { evaluate } from "mathjs";

function Calculator() {
  const [interDisplay, setInterDisplay] = useState("0");
  const [finalDisplay, setFinalDisplay] = useState("");
  const [isCalculated, setIsCalculated] = useState(false);
  const [result, setResult] = useState("");
  const operators = ["+", "-", "*", "/"];

  const display = (input) => {
    setInterDisplay((prev) => {
      const lastChar = prev.slice(-1);
      if (isCalculated) return input;

      // check if previous input is 0
      if (prev === "0") {
        return input;
      }
      // check if next input is operator
      if (operators.includes(input)) {
        return input;
      }
      // check if previous input is operator
      if (operators.includes(prev)) {
        return input;
      }
      // check if there is already a dot
      if (prev.includes(".") && input === ".") {
        return prev;
      }

      // check for double dots
      if (lastChar === "." && input === ".") {
        return prev;
      }

      return prev + input;
    });

    setFinalDisplay((prev) => {
      // check after calculation
      if (isCalculated && operators.includes(input)) {
        setIsCalculated(false);
        return result + input;
      } else if (isCalculated && !operators.includes(input)) {
        setIsCalculated(false);
        return input;
      }

      const lastChar = prev.slice(-1);
      const secondLastChar = prev.slice(-2, -1);

      if (operators.includes(input)) {
        if (operators.includes(lastChar)) {
          // check for allowing "-"
          if (input === "-" && lastChar !== "-") {
            return prev + input;
          }
          // check for allowing only the last entered operator
          if (operators.includes(secondLastChar)) {
            return prev.slice(0, -2) + input;
          }
          // check for not allowing duplicate operators
          return prev.slice(0, -1) + input;
        }
      }

      // check for double 0 at the beginning
      if (lastChar === "0" && input === "0") {
        return prev;
      }

      // check for no double decimal
      if (input === ".") {
        const lastNumber = prev.split(/[+\-*/]/).pop();

        if (lastNumber.includes(".")) {
          return prev;
        }
      }

      return prev + input;
    });
  };

  const allClear = () => {
    setInterDisplay("0");
    setFinalDisplay("");
    setIsCalculated(false);
  };

  const calculate = () => {
    if (!isCalculated) {
      const result = evaluate(finalDisplay);
      const rounded = Math.round(result * 1e8) / 1e8;
      const output = rounded.toString();
      setIsCalculated(true);
      setInterDisplay(output);
      setFinalDisplay((prev) => `${prev}=${output}`);
      setResult(output);
    }
  };
  return (
    <>
      <div className="calculator-container">
        <div>
          <div className="final-display" value={finalDisplay} tabIndex="0">
            {finalDisplay}
          </div>
          <div
            id="display"
            className="intermediate-display"
            aria-live="polite"
            aria-atomic="true"
            value={interDisplay}
            tabIndex="0"
          >
            {interDisplay}
          </div>
        </div>
        <div
          className="btns-container"
          role="group"
          aria-label="Calculator input keys"
        >
          <button
            id="clear"
            type="button"
            className="btn"
            aria-label="All clear"
            onClick={allClear}
          >
            AC
          </button>
          <button
            id="divide"
            type="button"
            className="btn"
            aria-label="Divide"
            onClick={() => display("/")}
          >
            /
          </button>
          <button
            id="multiply"
            type="button"
            className="btn"
            aria-label="Multiply"
            onClick={() => display("*")}
          >
            *
          </button>
          <button
            id="seven"
            type="button"
            className="btn"
            aria-label="Seven"
            onClick={() => display("7")}
          >
            7
          </button>
          <button
            id="eight"
            type="button"
            className="btn"
            aria-label="Eight"
            onClick={() => display("8")}
          >
            8
          </button>
          <button
            id="nine"
            type="button"
            className="btn"
            aria-label="Nine"
            onClick={() => display("9")}
          >
            9
          </button>
          <button
            id="subtract"
            type="button"
            className="btn"
            aria-label="Subtract"
            onClick={() => display("-")}
          >
            -
          </button>
          <button
            id="four"
            type="button"
            className="btn"
            aria-label="Four"
            onClick={() => display("4")}
          >
            4
          </button>
          <button
            id="five"
            type="button"
            className="btn"
            aria-label="Five"
            onClick={() => display("5")}
          >
            5
          </button>
          <button
            id="six"
            type="button"
            className="btn"
            aria-label="Six"
            onClick={() => display("6")}
          >
            6
          </button>
          <button
            id="add"
            type="button"
            className="btn"
            aria-label="Add"
            onClick={() => display("+")}
          >
            +
          </button>
          <button
            id="one"
            type="button"
            className="btn"
            aria-label="One"
            onClick={() => display("1")}
          >
            1
          </button>
          <button
            id="two"
            type="button"
            className="btn"
            aria-label="Two"
            onClick={() => display("2")}
          >
            2
          </button>
          <button
            id="three"
            type="button"
            className="btn"
            aria-label="Three"
            onClick={() => display("3")}
          >
            3
          </button>
          <button
            id="equals"
            type="button"
            className="btn"
            aria-label="Calculate"
            onClick={calculate}
          >
            =
          </button>
          <button
            id="zero"
            type="button"
            className="btn"
            aria-label="Zero"
            onClick={() => display("0")}
          >
            0
          </button>
          <button
            id="decimal"
            type="button"
            className="btn"
            aria-label="Point"
            onClick={() => display(".")}
          >
            .
          </button>
        </div>
      </div>
    </>
  );
}

export default Calculator;
