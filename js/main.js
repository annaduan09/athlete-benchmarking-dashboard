import { initChart } from './barchart.js';
import { initStatEntry } from './stat_entry.js';
import { calculateChartData } from './chart_data.js';

/* const teamStatsResponse = await fetch('data/group_means_2024.json');
const teamStats = await teamStatsResponse.json(); */

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
const strengthChartEl = document.querySelector('#strength-chart');
const agilityChartEl = document.querySelector('#agility-chart');
const anthroChartEl = document.querySelector('#anthro-chart');

// Function to update charts when data changes
function updateCharts() {
  const { positionMedians, playerPercentiles, playerStats, playerStatsValues } = chartData.getCalculatedData();

  // Update each chart with the newly calculated data
  initChart(strengthChartEl, positionMedians, playerStats, playerStatsValues, playerPercentiles, "Strength", events);
  initChart(agilityChartEl, positionMedians, playerStats, playerStatsValues, playerPercentiles, "Agility", events);
  initChart(anthroChartEl, positionMedians, playerStats, playerStatsValues, playerPercentiles, "Anthropomorphic", events);
}

// Listen for changes in stat or position
events.addEventListener('statFilled', updateCharts);
events.addEventListener('positionSelected', updateCharts);

// Initial chart rendering
updateCharts();
