import { Chart } from 'https://cdn.jsdelivr.net/npm/chart.js@4.4.4/auto/+esm';

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
  }

  filterStatsByGroup();

  if (chartInstances[chartEl.id]) {
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
        borderWidth: 1,
        barThickness: 'flex',
        maxBarThickness: 70,
        borderRadius: 10,
        borderSkipped: false,
        minBarLength: 10
      }
    ]
  };

  const options = {
    plugins: {
        title: {
            display: true,
            text: statGroup,
        },
        legend: {
            display: false
          },
          tooltip: {
            usePointStyle: true,
            callbacks: {
                labelPointStyle: function(context) {
                    return {
                        pointStyle: 'triangle',
                        rotation: 90
                    };
                }
            }
        }
},
  indexAxis: 'y',
  aspectRatio: 4,
  scales: {
    x: {beginAtZero: true,
      min: 0, 
      max: 100
    }
  },
  elements: {
    bar: {
      minBarLength: 40, 
    }
  },
  responsive: true
};

  chartInstances[chartEl.id] = new Chart(chartEl, { type: 'bar', data, options });

  
  function getColor() {
    return filteredPercentiles.map(percentile => {
      if (percentile >= 75) {
        return 'rgba(0, 139, 139, 0.5)';
      } else if (percentile >= 50) {
        return 'rgba(255, 215, 0, 0.5)'; 
      } else {
        return 'rgba(250, 128, 114, 0.5)';
      }
    });
  }
}

export { initChart };
