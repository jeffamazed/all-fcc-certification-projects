import { json, select } from "d3";
import renderChart from "./renderChart";
import "./style.css";

const app = document.getElementById("app");
const width = 1024;
const height = 576;
const margin = { top: 120, bottom: 100, left: 100, right: 60 };

app.innerHTML = `<pre class="loading">Loading...</pre>`;

const url =
  "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json";

json(url)
  .then((json) => {
    const data = json.data.map((d) => {
      return {
        date: d[0],
        gdp: d[1],
      };
    });

    app.innerHTML = `
      <main>
        <h1 id="chart-title" class="sr-only">United States GDP Over Time</h1>
        <p id="chart-desc" class="sr-only">
          A bar chart showing quarterly U.S. GDP from 1947 to 2015. Use Tab to
          explore bars and hear GDP values and dates.
        </p>

        <svg id="svg">
          <g id="chart-container"></g>
        </svg>
        <div id="tooltip" role="tooltip" aria-hidden="true">
          <p id="tooltip-desc" class="sr-only"></p>
        </div>
        <p class="sr-only">
          Hover or focus on a bar to view data for that quarter
        </p>
      </main>`;

    const svg = select("#svg");
    const chart = select("#chart-container");
    const tooltip = select("#tooltip");

    renderChart({ data, width, height, margin, svg, chart, tooltip });
  })
  .catch((error) => console.error("Failed to load JSON", error));
