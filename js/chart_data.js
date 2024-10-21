function calculateChartData(indivStats, events) {
    // Initialize state
    let playerPosition = "Quarterback";  // Default position
    let positionStatsValues = [];
    let playerStats = [];
    let playerStatsValues = [];
  
    let positionMedians;
    let playerPercentiles;
  
    function getPercentiles() {
        playerPercentiles = [];

        playerStats.forEach((values, index) => {
          const playerValue = playerStatsValues[index];
          const statValues = positionStatsValues[index];
          const sortedStatValues = statValues.slice().sort((a, b) => a - b);
          const countBelow = sortedStatValues.filter(value => value <= playerValue).length;

          let percentile = (countBelow / sortedStatValues.length);
          percentile = Math.round(percentile * 100);

          playerPercentiles.push(percentile);
        });
        return playerPercentiles;
    }
  
    function getMedians() {
      positionMedians = [];
    
      positionStatsValues.forEach(statValues => {
        const sortedValues = statValues.slice().sort((a, b) => a - b);
        const mid = Math.floor(sortedValues.length / 2);
    
        let median;
        if (sortedValues.length % 2 === 0) {
          median = (sortedValues[mid - 1] + sortedValues[mid]) / 2;
        } else {
          median = sortedValues[mid];
        }
        positionMedians.push(median);
      });

      return positionMedians;
    }

    function updatePositionStatsValues() {
      positionStatsValues = playerStats.map(statName => {
        return indivStats[playerPosition].map(item => item[statName]);
      });

      positionStatsValues = positionStatsValues.map(statArray => statArray.flat(1));
      getMedians();
      getPercentiles();
    }
  
    events.addEventListener('positionSelected', (evt) => {
      const { position } = evt.detail;
      playerPosition = position; 
      updatePositionStatsValues();
    });
  

    events.addEventListener('statFilled', (evt) => {
      const { statName, filled, statValue } = evt.detail;
  
      if (filled) {
        const index = playerStats.indexOf(statName);
  
        if (index !== -1) {
          playerStatsValues[index] = statValue;
          positionStatsValues[index] = indivStats[playerPosition].map(item => item[statName]);
        } else {
          playerStats.push(statName);
          playerStatsValues.push(statValue);
          positionStatsValues.push(indivStats[playerPosition].map(item => item[statName]));
        }
      } else { 
        const index = playerStats.indexOf(statName);
        if (index !== -1) {
          playerStats.splice(index, 1);
          playerStatsValues.splice(index, 1);
          positionStatsValues.splice(index, 1);
        }
      }
      positionStatsValues = positionStatsValues.map(statArray => statArray.flat(1));
      getMedians();
      getPercentiles();
    });


    function getCalculatedData() {
        return {
          positionMedians,
          playerPercentiles,
          playerStats,
          playerStatsValues,
        };
      }

      return {
        getCalculatedData,
      };
    }
  
  export { calculateChartData };
  