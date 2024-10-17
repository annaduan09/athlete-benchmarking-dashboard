import {initChart} from './barchart.js';
import {loadPositionData} from './position_data.js';

// Load position data and update charts
(async () => {
    await loadPositionData();
    window.addEventListener('filteredMeansUpdated', (event) => {
        const updatedFilteredMeans = event.detail.filteredMeans;
        console.log('Updated filteredMeans:', updatedFilteredMeans);
        updateCharts(updatedFilteredMeans, position);
    });
})();

// Update charts with filtered means
function updateCharts(filteredMeans, position) {
    updatePositionTitle(position);

    const strengthChartEl = document.querySelector('.strength-chart canvas');
    initChart(strengthChartEl, filteredMeans, 'strength');

    const agilityChartEl = document.querySelector('.agility-chart canvas');
    initChart(agilityChartEl, filteredMeans, 'agility');

    const anthroChartEl = document.querySelector('.anthro-chart canvas');
    initChart(anthroChartEl, filteredMeans, 'anthro');
}

// Update position title
function updatePositionTitle(position) {
    console.log('Position:', position);
    const titleEl = document.getElementById('position-title');
    if (titleEl) {
        titleEl.textContent = `Position Group: ${position}`;
    }
}
