import { select } from "d3";
import months from "./months";

const screenXMid = window.innerWidth / 2;
const screenYMid = window.innerHeight / 2;

export function showTooltip(e, d, tooltip, getTemp) {
  const target = select(e.currentTarget);
  const rect = e.currentTarget.getBoundingClientRect();
  const temp = Math.round(getTemp(d) * 10) / 10;
  const tempString = `${temp} °C`;
  const variance = Math.round(d.variance * 10) / 10;
  const varianceString = `${variance} °C`;

  // fallback for mobile
  let x = e.pageX;
  let y = e.pageY;

  target.attr("aria-describedby", "tooltip-desc").attr("stroke", "black");

  // for aria
  select("#tooltip-desc").text(
    `Period: ${d.year} - ${
      months[d.month - 1]
    }. Temp: ${tempString}. Variance: ${varianceString}.`
  );

  tooltip
    .style("opacity", 1)
    .attr("aria-hidden", "false")
    .attr("data-year", d.year)
    .style("top", `${rect.top - rect.height}px`)
    .style("left", `${rect.left}px`)
    .style(
      "transform",
      `translate(${rect.left < screenXMid ? "2%" : "-100%"}, ${
        rect.top < screenYMid ? "100%" : "-70%"
      })`
    ).html(`
      <dl>
        <dt>Period: </dt><dd>${d.year} - ${months[d.month - 1]}</dd><br />
        <dt>Temp: </dt><dd>${tempString}</dd><br />
        <dt>Variance: </dt><dd>${varianceString}</dd>
      </dl>`);
}

export function hideTooltip(e, tooltip) {
  const target = select(e.currentTarget);
  target.attr("aria-describedby", null).attr("stroke", "none");
  tooltip.style("opacity", 0).attr("aria-hidden", "true");
}
