import "./style.css";
import renderChart from "./renderChart";
import { json, select } from "d3";

const app = document.getElementById("app");
app.innerHTML = `<pre class="loading">Loading...</pre>`;

const url =
  "https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/video-game-sales-data.json";
const width = 1280;
const height = 1024;
const margin = { top: 200, bottom: 150, left: 50, right: 50 };

json(url).then((data) => {
  app.innerHTML = ` 
    <main>
      <h1 id="chart-title" class="sr-only">Video Game Sales</h1>

      <p id="chart-desc" class="sr-only">
        This treemap visualizes the top 100 best-selling video games, grouped by
        platform. The size of each tile represents total units sold. Larger
        tiles indicate higher global sales, highlighting the most successful
        games and platforms.
      </p>

      <svg id="svg">
        <g id="chart-container"></g>
      </svg>
      <div id="tooltip" role="tooltip" aria-hidden="true">
        <p id="tooltip-desc" class="sr-only"></p>
      </div>
      <p class="sr-only">
        Hover or focus on a tile to view the game's title, platform, and value.
      </p>
    </main>`;
  const svg = select("#svg");
  const chart = select("#chart-container");
  const tooltip = select("#tooltip");
  renderChart({ data, svg, chart, tooltip, width, height, margin });
});
