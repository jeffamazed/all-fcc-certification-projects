import "./style.css";
import renderChart from "./renderChart";
import { json, select } from "d3";

const app = document.getElementById("app");
app.innerHTML = `<pre class="loading">Loading...</pre>`;
const url =
  "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json";
const width = 1366;
const height = 600;
const margin = { top: 130, bottom: 110, left: 110, right: 40 };

json(url)
  .then((json) => {
    app.innerHTML = ` 
      <main>
        <h1 id="chart-title" class="sr-only">
          Monthly Global Land-Surface Temperature
        </h1>

        <p id="chart-desc" class="sr-only">
          This heat map highlights the highest and lowest monthly land-surface
          temperatures for each year from 1753 to 2015. Red indicates the hottest
          month of the year, and blue indicates the coldest month. The base
          temperature is 8.66℃.
        </p>

        <svg id="svg">
          <g id="chart-container"></g>
        </svg>
        <div id="tooltip" role="tooltip" aria-hidden="true">
          <p id="tooltip-desc" class="sr-only"></p>
        </div>
        <p class="sr-only">
          Hover or focus on a cell to view the period, temperature, and variance
          of a month.
        </p>
      </main>`;
    const svg = select("#svg");
    const chart = select("#chart-container");
    const tooltip = select("#tooltip");
    const data = json.monthlyVariance;
    const baseTemp = json.baseTemperature;

    renderChart({ data, width, height, margin, svg, chart, tooltip, baseTemp });
  })
  .catch((error) => console.error("Failed to load JSON", error));
