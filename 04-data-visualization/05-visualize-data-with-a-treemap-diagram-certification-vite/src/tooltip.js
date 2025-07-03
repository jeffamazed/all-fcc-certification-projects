import { select } from "d3";

const screenYMid = window.innerHeight / 2;
const screenXMid = window.innerWidth / 2;

export function showTooltip(e, d, tooltip) {
  const target = select(e.currentTarget);

  // fallback for mobile
  let x = e.pageX;
  let y = e.pageY;

  if (x == null || y == null) {
    const rect = e.currentTarget.getBoundingClientRect();
    x = rect.left + window.scrollX + rect.width / 2;
    y = rect.top + window.scrollY + rect.height / 2;
  }

  const { name, category, value } = d.data;

  target.attr("aria-describedby", "tooltip-desc");

  // for aria
  select("#tooltip-desc").text(
    `Name: ${name}. Category: ${category}. Value: ${value}.`
  );

  tooltip
    .style("opacity", 1)
    .attr("aria-hidden", "false")
    .attr("data-value", value)
    .style("top", `${y + 10}px`)
    .style("left", `${x + 10}px`)
    .html(
      `<dl>
      <dt>Name: </dt><dd>${name}</dd><br />
      <dt>Category: </dt><dd>${category}</dd><br />
      <dt>Value: </dt><dd>${value}</dd>
      </dl>`
    )
    .style(
      "transform",
      `translate(${x > screenXMid ? "-110%" : "0"}, ${
        y > screenYMid ? "-110%" : "0"
      })`
    );
}

export function hideTooltip(e, tooltip) {
  const target = select(e.currentTarget);
  target.attr("aria-describedby", null);
  tooltip.style("opacity", 0).attr("aria-hidden", "true");
}
