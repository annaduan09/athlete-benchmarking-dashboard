import {initChart} from './barchart.js';
import {loadPositionData} from './position_data.js';

// Load position data and update charts
(async () => {
    await loadPositionData();
    window.addEventListener('filteredMeansUpdated', (event) => {
        const updatedFilteredMeans = event.detail.filteredMeans;
        console.log('Updated filteredMeans:', updatedFilteredMeans);
        updateCharts(updatedFilteredMeans);
    });
})();

// Update charts with filtered means
function updateCharts(filteredMeans) {
    const strengthChartEl = document.querySelector('.strength-chart canvas');
    initChart(strengthChartEl, filteredMeans, 'strength');

    const agilityChartEl = document.querySelector('.agility-chart canvas');
    initChart(agilityChartEl, filteredMeans, 'agility');

    const anthroChartEl = document.querySelector('.anthro-chart canvas');
    initChart(anthroChartEl, filteredMeans, 'anthro');
}
