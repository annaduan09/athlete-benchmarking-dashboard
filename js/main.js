import {initChart} from './barchart.js';

// Individual player benchmarking charts
const strengthChartEl = document.querySelector('.strength-chart canvas');
initChart(strengthChartEl);

const agilityChartEl = document.querySelector('.agility-chart canvas');
initChart(agilityChartEl);

const anthroChartEl = document.querySelector('.anthro-chart canvas');
initChart(anthroChartEl);
