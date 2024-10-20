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
const strengthChartEl = document.querySelector('#strength-chart');
initChart(strengthChartEl, teamStats, events, statNames, "Strength");

const agilityChartEl = document.querySelector('#agility-chart');
initChart(agilityChartEl, teamStats, events, statNames, "Agility");

const anthroChartEl = document.querySelector('#anthro-chart');
initChart(anthroChartEl, teamStats, events, statNames, "Anthropomorphic");