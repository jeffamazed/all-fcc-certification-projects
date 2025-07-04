import { showTooltip, hideTooltip } from "./tooltip";
import { hierarchy, treemap, scaleOrdinal, select } from "d3";
import colorCollection from "./colorsCollection";
import wrapText from "./utils/wrapText";

function renderChart({ data, svg, chart, tooltip, width, height, margin }) {
  // setting up responsive svg
  svg
    .attr("viewBox", `0 0 ${width} ${height}`)
    .attr("preserveAspectRatio", "xMidYMid meet")
    .style("max-width", `${width}px`)
    .style("max-height", `${height}px`)
    .attr("role", "img")
    .attr("aria-labelledby", "chart-title chart-desc");

  chart.attr("transform", `translate(${margin.left}, ${margin.top})`);

  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;
  // create root
  const root = hierarchy(data)
    .sum((d) => d.value)
    .sort((a, b) => b.value - a.value);

  // custom paddingInner
  const winInnerW = window.innerWidth;
  const innerPadding =
    winInnerW < 400
      ? 3.5
      : winInnerW < 600
      ? 3
      : winInnerW < 768
      ? 2.5
      : winInnerW < 1024
      ? 2
      : winInnerW < 1280
      ? 1.5
      : 1;

  // create treemap
  treemap().size([innerWidth, innerHeight]).paddingInner(innerPadding)(root);
  const leaves = root.leaves();

  // colors
  const categories = Array.from(
    new Set(leaves.map((leaf) => leaf.data.category))
  );

  const colorScale = scaleOrdinal().domain(categories).range(colorCollection);

  // laying out the treemap
  const tiles = chart
    .selectAll("g.tile-group")
    .data(leaves)
    .enter()
    .append("g")
    .attr("class", "tile-group");

  tiles
    .append("rect")
    .attr("x", (d) => d.x0)
    .attr("y", (d) => d.y0)
    .attr("width", (d) => d.x1 - d.x0)
    .attr("height", (d) => d.y1 - d.y0)
    .attr("fill", (d) => colorScale(d.data.category))
    .attr("class", "tile")
    .attr("data-name", (d) => d.data.name)
    .attr("data-category", (d) => d.data.category)
    .attr("data-value", (d) => d.value)
    .attr("tabIndex", 0)
    .on("pointerover", (e, d) => showTooltip(e, d, tooltip))
    .on("pointermove", (e, d) => showTooltip(e, d, tooltip))
    .on("pointerout", (e) => hideTooltip(e, tooltip))
    .on("focus", (e, d) => showTooltip(e, d, tooltip))
    .on("blur", (e) => hideTooltip(e, tooltip));

  // for text clipping
  const defs = chart.append("defs");

  defs
    .selectAll("clipPath")
    .data(leaves)
    .enter()
    .append("clipPath")
    .attr("id", (_, i) => `clip-${i}`)
    .append("rect")
    .attr("x", (d) => d.x0)
    .attr("y", (d) => d.y0)
    .attr("width", (d) => d.x1 - d.x0)
    .attr("height", (d) => d.y1 - d.y0);

  tiles
    .append("text")
    .attr("x", (d) => d.x0 + 4)
    .attr("y", (d) => d.y0 + 4)
    .attr("dominant-baseline", "hanging")
    .attr("font-size", "10px")
    .attr("fill", "black")
    .attr("clip-path", (_, i) => `url(#clip-${i})`)

    .each(function () {
      const text = select(this).text((d) => d.data.name);
      wrapText(text, 1);
    });

  // color legend
  const legendWidth = 300;
  const space = 10;
  const legendHeight = 15;
  const legendX =
    width / 2 - legendWidth / 2 - (colorCollection.length * space) / 2;
  const legendY = height - margin.bottom / 1.5;
  const legendTitleX = width / 2;
  const legendTitleY = height - margin.bottom / 1.35;
  const legendRectWidth = legendWidth / colorCollection.length;
  const legend = svg.append("g").attr("id", "legend");

  legend
    .append("text")
    .text("Categories")
    .attr("x", legendTitleX)
    .attr("text-anchor", "middle")
    .attr("y", legendTitleY)
    .attr("class", "legend-title");
  const categoryGroup = legend
    .selectAll("g")
    .data(categories)
    .enter()
    .append("g");

  categoryGroup
    .append("rect")
    .attr("x", (_, i) => legendX + i * (legendRectWidth + space))
    .attr("y", legendY)
    .attr("width", legendRectWidth)
    .attr("height", legendHeight)
    .attr("fill", (d) => colorScale(d))
    .attr("class", "legend-item");

  categoryGroup
    .append("text")

    .text((d) => d)
    .attr("x", (_, i) => legendX + i * (legendRectWidth + space))
    .attr("y", legendY)
    .attr("text-anchor", "end")
    .attr("class", "legend-text")

    .attr("transform", (_, i) => {
      const x = legendX + i * (legendRectWidth + space);
      const y = legendY;
      return `translate(${legendRectWidth / 1.4}, ${
        legendRectWidth * 1.5
      }) rotate(-60, ${x}, ${y})`;
    });

  // title
  const title = svg
    .append("text")
    .attr("text-anchor", "middle")
    .attr("y", margin.top / 2)
    .attr("id", "title");
  title
    .append("tspan")
    .text("Video Game Sales")
    .attr("dy", 0)
    .attr("x", width / 2)
    .attr("class", "upper-title");
  title
    .append("tspan")
    .text("Top 100 Most Sold Video Games Grouped by Platform")
    .attr("dy", "3em")
    .attr("x", width / 2)
    .attr("class", "lower-title")
    .attr("id", "description");
}

export default renderChart;
