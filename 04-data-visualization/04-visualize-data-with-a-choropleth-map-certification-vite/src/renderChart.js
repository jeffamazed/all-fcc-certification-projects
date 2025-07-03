import { min, max, range, scaleThreshold, scaleLinear, axisBottom } from "d3";
import { showTooltip, hideTooltip } from "./tooltip";
import colors from "./colors";

function renderChart({
  countiesFeature,
  eduData,
  svg,
  chart,
  tooltip,
  width,
  height,
  margin,
  eduByFips,
  path,
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

  const bachelorPercentages = [...eduByFips.values()];

  const minPercentage = min(bachelorPercentages);
  const maxPercentage = max(bachelorPercentages);

  const steps = 8;
  const stepSize = (maxPercentage - minPercentage) / steps;
  const thresholds = range(1, steps).map((i) => minPercentage + i * stepSize);

  const colorScale = scaleThreshold().domain(thresholds).range(colors);

  chart
    .selectAll("path")
    .data(countiesFeature.features)
    .enter()
    .append("path")
    .attr("fill", (d) => colorScale(eduByFips.get(d.id)))
    .attr("d", path)
    .attr("class", "county")
    .attr("data-fips", (d) => d.id)
    .attr("data-education", (d) => eduByFips.get(d.id))
    .attr("tabindex", 0)
    .on("pointerover", (e, d) => showTooltip(e, d, eduData, tooltip, height))
    .on("pointerout", (e) => hideTooltip(e, tooltip))
    .on("focus", (e, d) => showTooltip(e, d, eduData, tooltip, height))
    .on("blur", (e) => hideTooltip(e, tooltip));

  // color legend
  const legendWidth = 250;
  const legendHeight = 10;
  const legendX = width / 2 + 100;
  const legendY = margin.top + 20;
  const legendRectWidth = legendWidth / colors.length;
  const legend = svg.append("g").attr("id", "legend");
  legend
    .selectAll("rect")
    .data(colors)
    .enter()
    .append("rect")
    .attr("x", (_, i) => legendX + i * legendRectWidth)
    .attr("y", legendY)
    .attr("width", legendRectWidth)
    .attr("height", legendHeight)
    .attr("fill", (d) => d);

  const legendScale = scaleLinear()
    .domain([minPercentage, maxPercentage])
    .range([legendX, legendX + legendWidth]);
  const legendXAxis = axisBottom(legendScale)
    .tickValues([minPercentage, ...thresholds, maxPercentage])
    .tickFormat((d) => `${Math.round(d)}%`)
    .tickSize(-legendHeight + 0.3)
    .tickPadding(5);
  legend
    .append("g")
    .call(legendXAxis)
    .attr("transform", `translate(0, ${legendY + legendHeight})`)
    .call((g) => g.select(".domain").remove());

  // title
  const title = svg
    .append("text")
    .attr("text-anchor", "middle")
    .attr("y", margin.top / 2)
    .attr("id", "title");
  title
    .append("tspan")
    .text("United States Educational Attainment")
    .attr("dy", 0)
    .attr("x", width / 2)
    .attr("class", "upper-title");
  title
    .append("tspan")
    .text(
      "Percentage of adults age 25 and older with a bachelor's degree or higher (2010-2014)"
    )
    .attr("dy", "4em")
    .attr("x", width / 2)
    .attr("class", "lower-title")
    .attr("id", "description");

  // more info label
  const infoLabelOffset = 10;
  const infoGroupData = [
    { text: "Source: ", fill: "" },
    { text: "USDA Economic Research Service", fill: "blue" },
  ];
  const infoGroup = svg
    .append("a")
    .attr(
      "xlink:href",
      "https://www.ers.usda.gov/data-products/county-level-data-sets/county-level-data-sets-download-data/"
    )
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
