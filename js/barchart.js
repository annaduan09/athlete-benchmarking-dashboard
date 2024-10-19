import { Chart } from 'https://cdn.jsdelivr.net/npm/chart.js@4.4.4/auto/+esm';

function initChart(chartEl, teamStats, events, statNames) {
  console.log("Entered initChart function");
  console.log("Events console log:", events);

let selectedStats = [];
let selectedStatsValues = [];

let statLabels = [];
let positionStats = teamStats.filter(item => item.Position === "Quarterback");
let positionStatValues = [];
let athleteStatValues = [];

const colorMapping = {
  darkcyan: ['Bench', 'Squat', 'Power Clean'],
  salmon: ['10-Yard Dash', 'Vertical Jump (vertec)', 'Broad Jump', '60-Yard Shuttle', 'L Drill', 'Pro Agility', 'Flying 10'],
  dodgerblue: ['Height', 'Weight', 'Wingspan']
};

  // Function to determine the color for each stat
  function getColorForStat(statName) {
    if (colorMapping.darkcyan.includes(statName)) {
      return 'darkcyan';
    } else if (colorMapping.salmon.includes(statName)) {
      return 'salmon';
    } else if (colorMapping.dodgerblue.includes(statName)) {
      return 'dodgerblue';
    }
    return 'gray'; // Default color if stat doesn't match any group
  }

  // Add event listener: filter by position
  events.addEventListener('positionSelected', (evt) => {
    const { position } = evt.detail;
    positionStats = teamStats.filter(item => item.Position === position);
  });
  
// Add event listener: include only filled stats
events.addEventListener('statFilled', (evt) => {
  const { statName, filled, statValue } = evt.detail;

  if (filled) {
    // Check if the stat already exists in selectedStats
    const index = selectedStats.indexOf(statName);
    
    if (index !== -1) {
      // If stat exists, update its value
      selectedStatsValues[index] = statValue;
    } else {
      // If stat doesn't exist, add it
      selectedStats.push(statName);
      selectedStatsValues.push(statValue);
    }
  } else {
    // If stat is no longer filled, remove it from both arrays
    const index = selectedStats.indexOf(statName);
    if (index !== -1) {
      selectedStats.splice(index, 1);
      selectedStatsValues.splice(index, 1);
    }
  }

  statLabels = selectedStats.map(stat => stat);
  positionStatValues = positionStats.map(item => {
    return selectedStats.map(stat => item[stat]);
  });
  athleteStatValues = selectedStatsValues.map(value => value);


  updateChart();

});


const data = {
  labels: statLabels,
  datasets: [{
      label: "Position group average",
      data: positionStatValues,
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

let chart = new Chart(chartEl, { type: 'bar', data, options });




// Function to update chart data and refresh the chart
function updateChart() {
  statLabels = selectedStats.map(stat => stat);
  positionStatValues = positionStats.map(item => {
    return selectedStats.map(stat => item[stat]);
  });
  athleteStatValues = selectedStatsValues.map(value => value);

  console.log("Updated stat labels:", statLabels);
  console.log("Updated position stat values:", positionStatValues);
  console.log("Updated athlete stat values:", athleteStatValues);

  // Update chart data
  chart.data.labels = statLabels;
  chart.data.datasets[0].data = positionStatValues.flat();

  chart.data.datasets[0].backgroundColor = statLabels.map(stat => getColorForStat(stat));
  chart.data.datasets[0].borderColor = statLabels.map(stat => getColorForStat(stat));

  chart.update(); 
}

}






export {initChart};

/* function initChart(chartEl, filteredMeans, chartType) {

const metrics = getMetricsForChartType(chartType);

const lab = [];
const dat = [];


metrics.forEach(metric => {
  if (filteredMeans.hasOwnProperty(metric)) {
      lab.push(metric);
      dat.push(filteredMeans[metric]);
  }
});





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
} */