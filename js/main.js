import {initChart} from './barchart.js';
import {loadPositionData, filteredMeans} from './position_data.js';


(async () => {
    await loadPositionData();

    setInterval(() => {
    }, 1000);
})();

console.log("filteredMeans");

// Individual player benchmarking charts
const strengthChartEl = document.querySelector('.strength-chart canvas');
initChart(strengthChartEl, filteredMeans);

const agilityChartEl = document.querySelector('.agility-chart canvas');
initChart(agilityChartEl, filteredMeans);

const anthroChartEl = document.querySelector('.anthro-chart canvas');
initChart(anthroChartEl, filteredMeans);

