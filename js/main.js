import {initChart} from './barchart.js';
import {loadPositionData} from './position_data.js';


const {positionMeans, strengthStats, agilityStats, anthroStats} = await loadPositionData();



// Individual player benchmarking charts
const strengthChartEl = document.querySelector('.strength-chart canvas');
initChart(strengthChartEl, positionMeans, strengthStats, agilityStats, anthroStats);

const agilityChartEl = document.querySelector('.agility-chart canvas');
initChart(agilityChartEl, positionMeans, strengthStats, agilityStats, anthroStats);

const anthroChartEl = document.querySelector('.anthro-chart canvas');
initChart(anthroChartEl, positionMeans, strengthStats, agilityStats, anthroStats);

