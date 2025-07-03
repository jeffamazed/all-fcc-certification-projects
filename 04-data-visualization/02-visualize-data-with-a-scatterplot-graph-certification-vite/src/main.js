import renderChart from "./renderChart";
import "./style.css";
import { json, select } from "d3";

const app = document.getElementById("app");
app.innerHTML = `<pre class="loading">Loading...</pre>`;
const url =
  "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json";
const width = 1024;
const height = 576;
const margin = { top: 100, bottom: 60, left: 90, right: 90 };
const green = "#2ecc71";
const red = "#e74c3c";
const dopingRadius = 5;
const nonDopingRadius = 10;

json(url)
  .then((data) => {
    app.innerHTML = ` 
      <main>
        <h1 id="chart-title" class="sr-only">
          Doping in Professional Bicycle Racing
        </h1>
        <p id="chart-desc" class="sr-only">
          35 fastest times up Alpe d'Huez. Each dot represents a cyclist, with and
          without doping allegations.
        </p>

        <svg id="svg">
          <g id="chart-container"></g>
        </svg>
        <div id="tooltip" role="tooltip" aria-hidden="true">
          <p id="tooltip-desc" class="sr-only"></p>
        </div>
        <p class="sr-only">
          Hover or focus on a dot to view data for the contestant
        </p>
      </main>`;

    const svg = select("#svg");
    const chart = select("#chart-container");
    const tooltip = select("#tooltip");

    renderChart({
      data,
      width,
      height,
      margin,
      svg,
      chart,
      tooltip,
      green,
      red,
      dopingRadius,
      nonDopingRadius,
    });
  })
  .catch((error) => console.error("Failed to load JSON", error));
