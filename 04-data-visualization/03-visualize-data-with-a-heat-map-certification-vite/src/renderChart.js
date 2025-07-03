import {
  scaleBand,
  scaleLinear,
  min,
  max,
  range,
  schemeRdYlBu,
  scaleThreshold,
  axisBottom,
  axisLeft,
  extent,
  format,
  tickStep,
} from "d3";
import { showTooltip, hideTooltip } from "./tooltip";
import months from "./months";

function renderChart({
  data,
  width,
  height,
  margin,
  svg,
  chart,
  tooltip,
  baseTemp,
}) {
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
  const xValue = (d) => d.year;
  const yValue = (d) => d.month;
  const getTemp = (d) => baseTemp + d.variance;

  const xScale = scaleLinear()
    .domain(extent(data, xValue))
    .range([0, innerWidth]);
  const yScale = scaleBand().domain(data.map(yValue)).range([0, innerHeight]);

  // adding bars
  const temps = data.map(getTemp);
  const minTemp = min(temps);
  const maxTemp = max(temps);
  const steps = 11;
  const stepSize = (maxTemp - minTemp) / steps;
  const thresholds = range(1, steps).map((i) => minTemp + i * stepSize);

  const colors = schemeRdYlBu[steps].reverse();
  const colorScale = scaleThreshold().domain(thresholds).range(colors);

  const barWidth = innerWidth / (max(data, xValue) - min(data, xValue));

  chart
    .selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", (d) => xScale(xValue(d)))
    .attr("y", (d) => yScale(yValue(d)))
    .attr("width", barWidth)
    .attr("height", yScale.bandwidth())
    .attr("fill", (d) => colorScale(getTemp(d)))
    .attr("class", "cell")
    .attr("data-month", (d) => d.month - 1)
    .attr("data-year", xValue)
    .attr("data-temp", getTemp)
    .attr("tabIndex", "0")
    .on("pointerover", (e, d) => showTooltip(e, d, tooltip, getTemp))
    .on("pointerout", (e) => hideTooltip(e, tooltip))
    .on("focus", (e, d) => showTooltip(e, d, tooltip, getTemp))
    .on("blur", (e) => hideTooltip(e, tooltip));

  // color legend
  const legendWidth = 350;
  const legendHeight = 20;
  const legendX = margin.left;
  const legendY = height - margin.bottom + 50;

  const legendRectWidth = legendWidth / colors.length;

  const legend = svg.append("g").attr("id", "legend");
  legend
    .append("text")
    .text("Temperature Scale (℃)")
    .attr("x", legendX)
    .attr("y", legendY)
    .attr("class", "legend-title");

  legend
    .selectAll("rect")
    .data(colors)
    .enter()
    .append("rect")
    .attr("x", (_, i) => legendX + i * legendRectWidth)
    .attr("y", legendY + legendHeight / 2)
    .attr("width", legendRectWidth)
    .attr("height", legendHeight)
    .attr("fill", (d) => d)
    .attr("stroke", "#313131");

  const legendScaleOffset = 0.15;
  const legendScale = scaleLinear()
    .domain([minTemp, maxTemp])
    .range([legendX, legendX + legendWidth - legendScaleOffset]);

  const legendXAxis = axisBottom(legendScale)
    .tickValues([minTemp, ...thresholds, maxTemp])
    .tickFormat(format(".1f"))
    .tickSize(5);

  legend
    .append("g")
    .call(legendXAxis)
    .attr("transform", `translate(0, ${legendY + legendHeight * 1.5})`);

  // x and y axes
  const xAxis = axisBottom(xScale)
    .ticks(tickStep(...extent(data, xValue), 10))
    .tickFormat(format("d"));
  chart
    .append("g")
    .call(xAxis)
    .attr("id", "x-axis")
    .attr("transform", `translate(0, ${innerHeight})`);

  const yAxis = axisLeft(yScale)
    .tickFormat((monthNum) => months[monthNum - 1])
    .tickSize(10);

  chart.append("g").call(yAxis).attr("id", "y-axis");
  chart.select("#y-axis").selectAll("path").remove();

  // title
  const title = svg
    .append("text")
    .attr("text-anchor", "middle")
    .attr("y", margin.top / 2)
    .attr("id", "title");

  title
    .append("tspan")
    .text("Monthly Global Land-Surface Temperature")
    .attr("dy", 0)
    .attr("x", width / 2)
    .attr("class", "upper-title");
  title
    .append("tspan")
    .text("1753 - 2015: base temperature 8.66℃")
    .attr("dy", "2em")
    .attr("x", width / 2)
    .attr("class", "lower-title")
    .attr("id", "description");

  // yAxis label
  svg
    .append("text")
    .text("Months")
    .attr("class", "axis-label")
    .attr("text-anchor", "middle")

    .attr(
      "transform",
      `translate(${margin.left / 3}, ${height / 2}) rotate(-90)`
    );

  // xAxis label
  svg
    .append("text")
    .text("Years")
    .attr("class", "axis-label")
    .attr("text-anchor", "middle")
    .attr("dominant-baseline", "middle")
    .attr(
      "transform",
      `translate(${width / 2}, ${height - margin.bottom / 1.7})`
    );
}
export default renderChart;
