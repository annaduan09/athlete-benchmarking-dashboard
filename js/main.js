import {initChart} from './barchart.js';
//import {loadPositionData} from './position_data.js';
import {initStatEntry} from './stat_entry.js';
import {calculateChartData} from './chart_data.js';

const teamStatsResponse = await fetch('data/group_means_2024.json');
const teamStats = await teamStatsResponse.json();

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
calculateChartData(indivStats, events);

// Handle  charts - ultimately, want the inptus to be: strengthChartEl, teamMedians, inputStats, inputPercentile, events, statNames, "Strength"
const strengthChartEl = document.querySelector('#strength-chart');
initChart(strengthChartEl, teamStats, indivStats, events, statNames, "Strength");

const agilityChartEl = document.querySelector('#agility-chart');
initChart(agilityChartEl, teamStats, indivStats, events, statNames, "Agility");

const anthroChartEl = document.querySelector('#anthro-chart');
initChart(anthroChartEl, teamStats, indivStats, events, statNames, "Anthropomorphic");