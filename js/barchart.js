import { Chart } from 'https://cdn.jsdelivr.net/npm/chart.js@4.4.4/auto/+esm';

function initChart(chartEl, filteredMeans, chartType) {

const metrics = getMetricsForChartType(chartType);

const lab = [];
const dat = [];


metrics.forEach(metric => {
  if (filteredMeans.hasOwnProperty(metric)) {
      lab.push(metric);
      dat.push(filteredMeans[metric]);
  }
});

const data = {
  labels: lab,
  datasets: [{
      label: "Position group average",
      data: dat,
      backgroundColor: 'rgba(75, 192, 192, 0.2)', 
      borderColor: 'rgba(75, 192, 192, 1)',       
      borderWidth: 0.5
  }]
};


const options = {
        indexAxis: 'y',
        aspectRatio: 3,
        scales: {
          x: { beginAtZero: true }
        }
      };

 // Handle empty data
 if (lab.length === 0) {
  if (chartEl.chartInstance) {
      chartEl.chartInstance.destroy();
      chartEl.chartInstance = null;
  }
  const ctx = chartEl.getContext('2d');
  ctx.clearRect(0, 0, chartEl.width, chartEl.height);
  return; // Exit the function
}

// Update or create chart
if (chartEl.chartInstance) {
  chartEl.chartInstance.data = data;
  chartEl.chartInstance.options = options;
  chartEl.chartInstance.update();
} else {
  // Create new chart
  const chart = new Chart(chartEl, { type: 'bar', data, options });
  chartEl.chartInstance = chart;
}
}

function getMetricsForChartType(chartType) {
switch (chartType) {
  case 'strength':
      return ['bench', 'squat', 'power_clean'];
  case 'agility':
      return ['dash_10y', 'vert_vertec', 'broad_jump', 'shuttle_60y', 'l_drill', 'pro_agil', 'flying_10'];
  case 'anthro':
      return ['height', 'weight', 'wing'];
  default:
      return [];
}
}

export {initChart};