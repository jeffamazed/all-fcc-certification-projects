import {
  extent,
  scaleLinear,
  axisBottom,
  axisLeft,
  format,
  timeFormat,
} from "d3";
import { showTooltip, hideTooltip } from "./tooltip";
import dateInSeconds from "./utils/dateInSeconds";

function renderChart({
  data,
  width,
  height,
  margin,
  svg,
  chart,
  tooltip,
  green,
  red,
  dopingRadius,
  nonDopingRadius,
}) {
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;
  // setting up responsive svg
  svg
    .attr("viewBox", `0 0 ${width} ${height}`)
    .attr("preserveAspectRatio", "xMidYMid meet")
    .style("max-width", `${width}px`)
    .style("max-height", `${height}px`)
    .attr("role", "img")
    .attr("aria-labelledby", "chart-title chart-desc");

  chart.attr("transform", `translate(${margin.left}, ${margin.top})`);
  const xValue = (d) => d.Year;
  const yValue = (d) => d.Seconds;

  const xExtent = extent(data, xValue);
  const yExtent = extent(data, yValue);
  const xPadding = 1;
  const yPadding = 5;

  const xScale = scaleLinear()
    .domain([xExtent[0] - xPadding, xExtent[1] + xPadding])
    .range([0, innerWidth]);
  const yScale = scaleLinear()
    .domain([yExtent[0] - yPadding, yExtent[1] + yPadding])
    .range([0, innerHeight]);

  // adding dots
  chart
    .selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", (d) => xScale(xValue(d)))
    .attr("cy", (d) => yScale(yValue(d)))
    .attr("r", (d) => (d.Doping ? dopingRadius : nonDopingRadius))
    .attr("fill", (d) => (d.Doping ? red : green))
    .attr("class", "dot")
    .attr("data-xvalue", (d) => xValue(d))
    .attr("data-yvalue", (d) => dateInSeconds(yValue(d)))
    .attr("tabIndex", 0)
    .on("pointerover", (e, d) => showTooltip(e, d, tooltip))
    .on("pointerout", (e) => hideTooltip(e, tooltip))
    .on("focus", (e, d) => showTooltip(e, d, tooltip))
    .on("blur", (e) => hideTooltip(e, tooltip));

  const xAxis = axisBottom(xScale).tickFormat(format("d"));
  chart
    .append("g")
    .call(xAxis)
    .attr("id", "x-axis")
    .attr("transform", `translate(0, ${innerHeight})`);

  const yAxis = axisLeft(yScale).tickFormat((d) =>
    timeFormat("%M:%S")(dateInSeconds(d))
  );
  chart.append("g").call(yAxis).attr("id", "y-axis");

  // title
  const title = svg
    .append("text")
    .attr("text-anchor", "middle")
    .attr("y", margin.top / 2)
    .attr("id", "title");

  title
    .append("tspan")
    .text("Doping in Professional Bicycle Racing")
    .attr("dy", 0)
    .attr("x", width / 2)
    .attr("class", "upper-title");
  title
    .append("tspan")
    .text("35 Fastest times up Alpe d'Huez")
    .attr("dy", "1.4em")
    .attr("x", width / 2) // re-center
    .attr("class", "lower-title");
  // yAxis label
  svg
    .append("text")
    .text("Finish Time in Minutes")
    .attr("class", "axis-label")
    .attr("text-anchor", "middle")

    .attr(
      "transform",
      `translate(${margin.left / 2}, ${height / 2}) rotate(-90)`
    );

  // xAxis label
  svg
    .append("text")
    .text("Time in Year")
    .attr("class", "axis-label")
    .attr("text-anchor", "middle")
    .attr("dominant-baseline", "hanging")
    .attr(
      "transform",
      `translate(${width / 2}, ${height - margin.bottom / 2})`
    );

  // color legend
  const offset = 15;
  const colorLegendGroup = chart
    .append("g")
    .attr("id", "legend")
    .attr("transform", `translate(${innerWidth}, 0)`);

  colorLegendGroup
    .append("text")
    .text("Color Legend")
    .attr("class", "legend-title")
    .attr("text-anchor", "end");

  const nonDoping = colorLegendGroup
    .append("g")
    .attr("transform", `translate(0, ${offset})`);

  nonDoping
    .append("text")
    .text("No doping allegations")
    .attr("text-anchor", "end")
    .attr("dy", offset / 2)
    .attr("dx", -(offset * 1.5));
  nonDoping
    .append("circle")
    .attr("r", nonDopingRadius)
    .attr("fill", green)
    .attr("cy", nonDopingRadius / 2);

  const doping = colorLegendGroup
    .append("g")
    .attr("transform", `translate(0, ${offset * 2.7})`);

  doping
    .append("text")
    .text("Riders with doping allegations")
    .attr("text-anchor", "end")
    .attr("dy", offset / 2)
    .attr("dx", -(offset * 1.5));
  doping
    .append("circle")
    .attr("r", dopingRadius)
    .attr("x", -offset)
    .attr("cy", dopingRadius / 2)
    .attr("fill", red);
}

export default renderChart;
