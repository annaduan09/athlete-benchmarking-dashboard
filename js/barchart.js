import { Chart } from 'https://cdn.jsdelivr.net/npm/chart.js@4.4.4/auto/+esm';

function initChart(chartEl, teamStats, events, statNames) {

let selectedStats = [];
let selectedStatsValues = [];

let positionStats = teamStats.filter(item => item.Position === "Quarterback");
let positionStatValues = [];
let athleteStatValues = [];
let statLabels = [];

const colorMapping = {
  darkcyan: ['Bench', 'Squat', 'Power Clean', '225lb Bench'],
  salmon: ['10-Yard Dash', 'Vertical Jump (vertec)', 'Vertical Jump (mat)', 'Broad Jump', '60-Yard Shuttle', 'L Drill', 'Pro Agility', 'Flying 10'],
  dodgerblue: ['Height', 'Weight', 'Wingspan']
};

  function getColorForStat(statName) {
    if (colorMapping.darkcyan.includes(statName)) {
      return 'darkcyan';
    } else if (colorMapping.salmon.includes(statName)) {
      return 'salmon';
    } else if (colorMapping.dodgerblue.includes(statName)) {
      return 'dodgerblue';
    }
    return 'gold';
  }

  // Event listener: position group selected
  events.addEventListener('positionSelected', (evt) => {
    const { position } = evt.detail;
    positionStats = teamStats.filter(item => item.Position === position);
  });
  
// Event listener: stats filled
events.addEventListener('statFilled', (evt) => {
  const { statName, filled, statValue } = evt.detail;

  if (filled) {
    const index = selectedStats.indexOf(statName);
    
    if (index !== -1) {
      selectedStatsValues[index] = statValue;
    } else {
      selectedStats.push(statName);
      selectedStatsValues.push(statValue);
    }
  } else { // Remove stat if no longer filled
    const index = selectedStats.indexOf(statName);
    if (index !== -1) {
      selectedStats.splice(index, 1);
      selectedStatsValues.splice(index, 1);
    }
  }

  // Populate chart data
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
      label: 'Position Stats',
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
