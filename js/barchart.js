import { Chart } from 'https://cdn.jsdelivr.net/npm/chart.js@4.4.4/auto/+esm';

function initChart(chartEl, teamStats, events, statNames, statGroup) {

let selectedStats = [];
let selectedStatsValues = [];

let positionStats = teamStats.filter(item => item.Position === "Quarterback");
let positionStatValues = [];
let athleteStatValues = [];
let statLabels = [];

const statGroups = {
  Strength: ['Bench', 'Squat', 'Power Clean', '225lb Bench'],
  Agility: ['10-Yard Dash', 'Vertical Jump (vertec)', 'Vertical Jump (mat)', 'Broad Jump', '60-Yard Shuttle', 'L Drill', 'Pro Agility', 'Flying 10'],
  Anthropomorphic: ['Height', 'Weight', 'Wingspan']
};

function getColor() {
  if (statGroup == "Strength") {
    return 'darkcyan';
  } else if (statGroup == "Agility") {
    return 'salmon';
  } else if (statGroup == "Anthropomorphic") {
    return 'dodgerblue';
  }
  return 'gold';
}

 // Filter stats based on the selected statGroup
 function filterStatsByGroup() {
  const validStats = statGroups[statGroup]; // Get valid stats for the selected group
  const filteredStats = selectedStats.filter(stat => validStats.includes(stat));
  const filteredValues = selectedStatsValues.filter((_, index) => validStats.includes(selectedStats[index]));
  return { filteredStats, filteredValues };
}

// Event listener: position group selected
events.addEventListener('positionSelected', (evt) => {
  const { position } = evt.detail;
  positionStats = teamStats.filter(item => item.Position === position);

  updateChart();
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

  updateChart();
});

const data = {
  labels: statLabels,
  datasets: [{
    label: `${statGroup}`,
    data: positionStatValues,
    backgroundColor: getColor,
    borderColor: getColor,
    borderWidth: 0.5
  }]
};

const options = {
    plugins: {
        title: {
            display: true,
            text: 'Custom Chart Title'
        }
},
  indexAxis: 'y',
  aspectRatio: 4,
  scales: {
    x: { beginAtZero: true }
  }
};

let chart = new Chart(chartEl, { type: 'bar', data, options });

// Function to update chart data and refresh the chart
function updateChart() {
  const { filteredStats, filteredValues } = filterStatsByGroup();

  statLabels = filteredStats.map(stat => stat);
  positionStatValues = positionStats.map(item => {
    return filteredStats.map(stat => item[stat]);
  });
  athleteStatValues = filteredValues.map(value => value);

  // Update chart data
  chart.data.labels = statLabels;
  chart.data.datasets[0].data = positionStatValues.flat();

  chart.data.datasets[0].backgroundColor = getColor();
  chart.data.datasets[0].borderColor = getColor();

  chart.update();
}
}

export { initChart };

