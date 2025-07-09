import "./style.css";
import { select, geoPath, json } from "d3";
import { feature, mesh } from "topojson-client";
import renderChart from "./renderChart";

const app = document.getElementById("app");
app.innerHTML = `<pre class="loading">Loading...</pre>`;
const countiesUrl =
  "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json";
const USEducationUrl =
  "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json";
const width = 1280;
const height = 850;
const margin = { top: 200, bottom: 0, left: 160, right: 160 };

const path = geoPath();
const eduByFips = new Map();

json(USEducationUrl).then((eduData) => {
  eduData.forEach((d) => {
    eduByFips.set(d.fips, d.bachelorsOrHigher);
  });

  json(countiesUrl).then((topology) => {
    app.innerHTML = ` 
      <main>
        <h1 id="chart-title" class="sr-only">
          United States Educational Attainment
        </h1>

        <p id="chart-desc" class="sr-only">
          This choropleth map visualizes the percentage of adults age 25 and older
          in each U.S. county who hold a bachelor's degree or higher, based on
          data from 2010 to 2014. Darker shades indicate higher educational
          attainment.
        </p>

        <svg id="svg">
          <g id="chart-container"></g>
        </svg>
        <div id="tooltip" role="tooltip" aria-hidden="true">
          <p id="tooltip-desc" class="sr-only"></p>
        </div>
        <p class="sr-only">
          Hover or focus on a county to view its education level percentage.
        </p>
     </main>`;
    const svg = select("#svg");
    const chart = select("#chart-container");
    const tooltip = select("#tooltip");
    const { counties, states } = topology.objects;
    const countiesFeature = feature(topology, counties);
    const statesMesh = mesh(topology, states, (a, b) => a !== b);
    console.log(Object.keys(topology.objects)); // Should be ['counties', 'states']

    renderChart({
      countiesFeature,
      statesMesh,
      eduData,
      svg,
      chart,
      tooltip,
      width,
      height,
      margin,
      eduByFips,
      path,
    });
  });
});
