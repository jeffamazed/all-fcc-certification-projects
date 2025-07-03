import quarterFormatter from "./utils/quarterFormatter";
import { select, format } from "d3";

const screenXMid = window.innerWidth / 2;
const formatNumber = format(",d");

export function showTooltip(e, d, tooltip) {
  const bar = select(e.currentTarget);
  bar.attr("fill", "#ceceff").attr("aria-describedby", "tooltip-desc");

  // fallback for mobile
  let x = e.pageX;
  let y = e.pageY;

  if (x == null || y == null) {
    const rect = e.currentTarget.getBoundingClientRect();
    x = rect.left + window.scrollX + rect.width / 2;
    y = rect.top + window.scrollY + rect.height / 2;
  }

  // for aria
  select("#tooltip-desc").text(
    `${quarterFormatter(d.date)}: $${formatNumber(d.gdp)} Billion`
  );

  tooltip
    .style("opacity", 1)
    .attr("data-date", d.date)
    .attr("aria-hidden", "false")
    .html(
      `<span role="text">${quarterFormatter(d.date)}</span>
        <br />
      <span role="text">$${formatNumber(d.gdp)} Billion</span>`
    )
    .style("left", `${x + 20}px`)
    .style("transform", `translate(${x > screenXMid ? "-127%" : "0"}, 0)`);
}

export function hideTooltip(e, tooltip) {
  const bar = select(e.currentTarget);
  bar.attr("fill", "#63b1ff").attr("aria-describedby", null);

  tooltip.style("opacity", 0).attr("aria-hidden", "true");
}
