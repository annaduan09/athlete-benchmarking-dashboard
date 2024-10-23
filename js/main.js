import { initChart } from './barchart.js';
import { initStatEntry } from './stat_entry.js';
import { calculateChartData } from './chart_data.js';

const indivStatsResponse = await fetch('data/stats_2024.json');
const indivStats = await indivStatsResponse.json();

const events = new EventTarget();

// Entry elements
const statListEl = document.querySelector('#athlete-stats');
const positionRadioEl = document.querySelector('#athlete-stats');

const positions = Object.keys(indivStats);
const statNames = Object.keys(Object.values(indivStats)[0][0]);

// Handle stat entry
initStatEntry(statListEl, positionRadioEl, statNames, positions, events);

// Calculate chart data
let chartData = calculateChartData(indivStats, events);

// Get chart elements
const pctChartEl = document.querySelector('#percentile-chart');
function updateCharts() {
  const { positionMedians, playerPercentiles, playerStats, playerStatsValues } = chartData.getCalculatedData();

  initChart(pctChartEl, positionMedians, playerStats, playerStatsValues, playerPercentiles);
}

// Listen for changes in stat or position
events.addEventListener('statFilled', updateCharts);
events.addEventListener('positionSelected', updateCharts);

// Initial chart rendering
updateCharts();
