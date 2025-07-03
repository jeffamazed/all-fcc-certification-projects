import { select } from "d3";

function wrapText(textSelection, maxWordsPerLine = 2) {
  textSelection.each(function () {
    const text = select(this);
    const words = text.text().split(/\s+/);
    text.text(null);

    words.forEach((word, i) => {
      if (i % maxWordsPerLine === 0) {
        text
          .append("tspan")
          .attr("x", text.attr("x"))
          .attr("dy", i === 0 ? "0em" : "1em")
          .text(word);
      } else {
        const tspans = text.selectAll("tspan");
        const lastTspan = tspans.nodes()[tspans.size() - 1];
        d3.select(lastTspan).text(d3.select(lastTspan).text() + " " + word);
      }
    });
  });
}
export default wrapText;
