import { Chart } from 'https://cdn.jsdelivr.net/npm/chart.js@4.4.4/auto/+esm';

function initChart(chartEl, filteredMeans) {


console.log("Inside initChart");
console.log(filteredMeans);

// labels are the keys of the filteredMeans object
const labels = Object.keys(filteredMeans);
console.log(labels);

const data = {
        labels: ["squat", "bench", "power clean"],
        datasets: [{
          label: "Position group average",
          data: [650, 435, 335],
        }]
      };


const options = {
        indexAxis: 'y',
        aspectRatio: 2.5,
        scales: {
          y: { beginAtZero: true }
        }
      };

    
const chart = new Chart(chartEl, { type: 'bar', data, options });

}

export {initChart};