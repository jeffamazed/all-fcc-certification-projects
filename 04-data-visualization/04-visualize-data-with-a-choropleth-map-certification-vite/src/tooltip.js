import { select } from "d3";

const screenXMid = window.innerWidth / 2;

export function showTooltip(e, d, eduData, tooltip, height) {
  const target = select(e.currentTarget);
  const { area_name, state, bachelorsOrHigher } = eduData.find(
    (data) => d.id === data.fips
  );

  // fallback for mobile
  let x = e.pageX;
  let y = e.pageY;

  if (x == null || y == null) {
    const rect = e.currentTarget.getBoundingClientRect();
    x = rect.left + window.scrollX + rect.width / 2;
    y = rect.top + window.scrollY + rect.height / 2;
  }

  target
    .attr("aria-describedby", "tooltip-desc")
    .attr("stroke", "#313131")
    .attr("stroke-width", 0.8);

  // for aria
  select("#tooltip-desc").text(`
    County: ${area_name}, ${state}. Percentage: ${bachelorsOrHigher}%.
    `);

  tooltip
    .style("opacity", 1)
    .attr("aria-hidden", "false")
    .style("top", `${y}px`)
    .style("left", `${x}px`)
    .style(
      "transform",
      `translate(${x > screenXMid ? "-110%" : "10%"}, ${
        y > height / 2 ? "-110%" : "10%"
      })`
    )
    .html(
      `<dl>
        <dt>County: </dt><dd>${area_name}, ${state}</dd><br />
        <dt>Percentage: </dt><dd>${bachelorsOrHigher}%</dd>
      </dl>`
    )
    .attr("data-education", bachelorsOrHigher);
}

export function hideTooltip(e, tooltip) {
  const target = select(e.currentTarget);
  target.attr("aria-describedby", null).attr("stroke", "none");
  tooltip.style("opacity", 0).attr("aria-hidden", "true");
}
