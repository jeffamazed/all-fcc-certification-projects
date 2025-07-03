import { scaleBand, scaleLinear, axisBottom, axisLeft, max } from "d3";
import { showTooltip, hideTooltip } from "./tooltip";

function renderChart({ data, width, height, margin, svg, chart, tooltip }) {
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;
  chart.attr("transform", `translate(${margin.left}, ${margin.top})`);

  // setting up responsive svg
  svg
    .attr("viewBox", `0 0 ${width} ${height}`)
    .attr("preserveAspectRatio", "xMidYMid meet")
    .style("max-width", `${width}px`)
    .style("max-height", `${height}px`)
    .attr("role", "img")
    .attr("aria-labelledby", "chart-title chart-desc");

  const xValue = (d) => d.date;
  const yValue = (d) => d.gdp;

  const xScale = scaleBand().domain(data.map(xValue)).range([0, innerWidth]);
  const yScale = scaleLinear()
    .domain([0, max(data, yValue)])
    .range([innerHeight, 0]);

  // adding bars and interactivity
  chart
    .selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", (d) => xScale(xValue(d)))
    .attr("y", (d) => yScale(yValue(d)))
    .attr("width", xScale.bandwidth())
    .attr("height", (d) => innerHeight - yScale(yValue(d)))
    .attr("class", "bar")
    .attr("data-date", (d) => xValue(d))
    .attr("data-gdp", (d) => yValue(d))
    .attr("fill", "#63b1ff")
    .attr("tabIndex", 0)
    .on("pointerover", (e, d) => showTooltip(e, d, tooltip))
    .on("pointerout", (e) => hideTooltip(e, tooltip))
    .on("focus", (e, d) => showTooltip(e, d, tooltip))
    .on("blur", (e) => hideTooltip(e, tooltip));

  // manual adjusting of x axis
  const xTickValues = xScale.domain().filter((dateStr) => {
    const date = new Date(dateStr);
    const year = date.getFullYear();
    const month = date.getMonth();
    return year % 5 === 0 && month === 0;
  });

  const xAxis = axisBottom(xScale)
    .tickValues(xTickValues)
    .tickFormat((d) => new Date(d).getFullYear());
  chart
    .append("g")
    .call(xAxis)
    .attr("id", "x-axis")
    .attr("transform", `translate(0, ${innerHeight})`);

  const yAxis = axisLeft(yScale).ticks(10);
  chart.append("g").call(yAxis).attr("id", "y-axis");

  // title
  svg
    .append("text")
    .text("United States GDP Over Time")
    .attr("text-anchor", "middle")
    .attr("class", "title")
    .attr("transform", `translate(${width / 2}, ${margin.top / 2})`)
    .attr("dominant-baseline", "middle");

  // yAxis label
  svg
    .append("text")
    .text("Gross Domestic Product")
    .attr("class", "axis-label")
    .attr("text-anchor", "middle")

    .attr(
      "transform",
      `translate(${margin.left / 2}, ${height / 2}) rotate(-90)`
    );

  // xAxis label
  svg
    .append("text")
    .text("Time (year)")
    .attr("class", "axis-label")
    .attr("text-anchor", "middle")
    .attr("dominant-baseline", "middle")
    .attr(
      "transform",
      `translate(${width / 2}, ${height - margin.bottom / 2})`
    );

  // more info label
  const infoLabelOffset = 10;
  const infoGroupData = [
    { text: "More Information: ", fill: "black" },
    { text: "NIPA Handbook", fill: "blue" },
  ];
  const infoGroup = svg
    .append("a")
    .attr("xlink:href", "https://www.bea.gov/national/pdf/nipaguid.pdf")
    .attr("target", "_blank");

  infoGroup
    .append("text")
    .attr("class", "info-label")
    .attr("text-anchor", "end")
    .attr("x", width - infoLabelOffset)
    .attr("y", height - infoLabelOffset)
    .selectAll("tspan")
    .data(infoGroupData)
    .enter()
    .append("tspan")
    .text((d) => d.text)
    .attr("fill", (d) => d.fill);
}

export default renderChart;
