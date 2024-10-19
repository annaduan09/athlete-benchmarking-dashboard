import {initChart} from './barchart.js';
//import {loadPositionData} from './position_data.js';
import {initStatEntry} from './stat_entry.js';

const teamStatsResponse = await fetch('data/group_means_2024.json');
const teamStats = await teamStatsResponse.json();

const events = new EventTarget();

// Entry elements
const statListEl = document.querySelector('#athlete-stats');
const positionRadioEl = document.querySelector('#athlete-stats');

const positions = teamStats.map(item => item.Position);
const statNames = teamStats.reduce((keys, item) => {
    Object.keys(item).forEach(key => {
      if (key !== "Position" && !keys.includes(key)) {
        keys.push(key); 
      }
    });
    return keys;
  }, []);

// Handle stat entry
initStatEntry(statListEl, positionRadioEl, statNames, positions, events);

// Handle  charts
const chartEl = document.querySelector('#chart-canvas-test');
initChart(chartEl, teamStats, events, statNames);



// Update charts with filtered means

/* function updateCharts(filteredMeans, position) {
    updatePositionTitle(position);

    const strengthChartEl = document.querySelector('.strength-chart canvas');
    initChart(strengthChartEl, filteredMeans, 'strength');

    const agilityChartEl = document.querySelector('.agility-chart canvas');
    initChart(agilityChartEl, filteredMeans, 'agility');

    const anthroChartEl = document.querySelector('.anthro-chart canvas');
    initChart(anthroChartEl, filteredMeans, 'anthro');
} */
