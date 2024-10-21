import { Chart } from 'https://cdn.jsdelivr.net/npm/chart.js@4.4.4/auto/+esm';

// Create an object to keep track of charts by canvas element ID
const chartInstances = {};

function initChart(chartEl, positionMedians, statNames, playerStats, playerPercentiles, statGroup, events) {
  console.log("Stat group:", statGroup);

  const statGroups = {
    Strength: ['Bench', 'Squat', 'Power Clean', '225lb Bench'],
    Agility: ['10-Yard Dash', 'Vertical Jump (vertec)', 'Vertical Jump (mat)', 'Broad Jump', '60-Yard Shuttle', 'L Drill', 'Pro Agility', 'Flying 10'],
    Anthropomorphic: ['Height', 'Weight', 'Wingspan']
  };

  let filteredStats = [];
  let filteredMedians = [];
  let filteredPlayerStats = [];
  let filteredPercentiles = [];

  // Filter stats by statGroup
  function filterStatsByGroup() {
    const validStats = statGroups[statGroup]; // Get valid stats for the selected group
    filteredStats = statNames.filter(stat => validStats.includes(stat));
    filteredMedians = positionMedians.filter((_, index) => validStats.includes(statNames[index]));
    filteredPlayerStats = playerStats.filter((_, index) => validStats.includes(statNames[index]));
    filteredPercentiles = playerPercentiles.filter((_, index) => validStats.includes(statNames[index]));

    console.log("Filtered stats", filteredStats);
    console.log("Filtered medians", filteredMedians);
    console.log("Filtered player stats", filteredPlayerStats);
    console.log("Filtered percentiles", filteredPercentiles);
  }

  filterStatsByGroup();

  // Check if a chart already exists for this canvas element
  if (chartInstances[chartEl.id]) {
    // If a chart exists, destroy it before creating a new one
    chartInstances[chartEl.id].destroy();
  }

  const data = {
    labels: filteredStats,
    datasets: [
      {
        label: 'Player Percentiles',
        data: filteredPercentiles,
        backgroundColor: getColor(),
        borderColor: getColor(),
        opacity: 0.5,
        borderWidth: 1,
        barThickness: 50,
        borderWidth: 0,
        borderRadius: 100
      }
    ]
  };

 
  const options = {
    plugins: {
        title: {
            display: true,
            text: statGroup,
        }
},
  indexAxis: 'y',
  aspectRatio: 4,
  scales: {
    x: { beginAtZero: true}
  },
  responsive: true,
};

  // Create a new chart instance and store it in the chartInstances object
  chartInstances[chartEl.id] = new Chart(chartEl, { type: 'bar', data, options });

  function getColor() {
    if (statGroup === "Strength") {
      return 'darkcyan';
    } else if (statGroup === "Agility") {
      return 'salmon';
    } else if (statGroup === "Anthropomorphic") {
      return 'gold';
    }
    return 'navy';
  }
}

export { initChart };
