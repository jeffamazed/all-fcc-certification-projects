import { select } from "d3";

const screenXMid = window.innerWidth / 2;
const screenYMid = window.innerHeight / 2;

export function showTooltip(e, d, tooltip) {
  const target = select(e.currentTarget);
  target.attr("aria-describedby", "tooltip-desc");

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
    `${d.Name}, ${d.Nationality}. Year: ${d.Year}, Time: ${d.Time}. Doping: ${
      d.Doping ? d.Doping : "None"
    }`
  );

  tooltip
    .style("opacity", 1)
    .attr("aria-hidden", "false")
    .html(
      `
        <dl>
          <dt>Name: </dt><dd>${d.Name}, ${d.Nationality}</dd><br />
          <dt>Year: </dt><dd>${d.Year}</dd>, <dt>Time: </dt><dd>${
        d.Time
      }</dd><br /> <br />
          <dt>Doping Allegation: </dt><dd>${d.Doping ? d.Doping : "None"}</dd>
        </dl>`
    )
    .style("top", `${y}px`)
    .style("left", `${x}px`)
    .style(
      "transform",
      `translate(${x > screenXMid ? "-105%" : "5%"}, ${
        y > screenYMid ? "-100%" : "0"
      })`
    )

    .attr("data-year", d.Year);
}

export function hideTooltip(e, tooltip) {
  const target = select(e.currentTarget);
  target.attr("aria-describedby", null);
  tooltip.style("opacity", 0).attr("aria-hidden", "true");
}
