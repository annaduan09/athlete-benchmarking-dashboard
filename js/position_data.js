
async function loadPositionData() {
    // Load position means data for all positions
    const means24Response = await fetch('data/group_means_2024.json');
    const means24 = await means24Response.json();
    
    const strengthMeans = ['bench', 'squat', 'power_clean'];
    const agilityMeans = ['dash_10y', 'vert_vertec', 'broad_jump', 'shuttle_60y', 'l_drill', 'pro_agil', 'flying_10'];
    const anthroMeans = ['height', 'weight', 'wing'];

    const strengthStatCheckbox = document.querySelector('#strength-stats');
    const agilityStatCheckbox = document.querySelector('#agility-stats');
    const anthroStatCheckbox = document.querySelector('#anthro-stats');

    let position = "QB";
    let positionMeans = means24.find(group => group.position === position);

    let selectedMetrics = []

    let strengthStats = false;
    let agilityStats = false;
    let anthroStats = false;         

    // Handle position inputs
    function updatePosition() {
    const positionRadio = document.querySelector('input[name="position"]:checked');
    if (positionRadio) {
        position = positionRadio.value;
        console.log(position);

        positionMeans = means24.find(group => group.position === position);
        console.log(positionMeans);
    } else {
        console.log("No position selected");
        }
    };

    const positionRadios = document.querySelectorAll('input[name="position"]');
    
    positionRadios.forEach(radio => {
    radio.addEventListener('change', updatePosition);
    });

    // Handle metric selection
    function updateStatGroups() {
        selectedMetrics = [];
        agilityStats = agilityStatCheckbox.checked;
        console.log(agilityStats);
        if (agilityStats) {
            console.log("Agility stats selected");
            selectedMetrics = selectedMetrics.concat(agilityMeans);
        }
    
        strengthStats = strengthStatCheckbox.checked;
        console.log(strengthStats);
        if (strengthStats) {
            console.log("Strength stats selected");
            selectedMetrics = selectedMetrics.concat(strengthMeans);
        }
    
        anthroStats = anthroStatCheckbox.checked;
        console.log(anthroStats);
        if (anthroStats) {
            console.log("Anthro stats selected");
            selectedMetrics = selectedMetrics.concat(anthroMeans);
        }

        let filteredMeans = {};

        Object.keys(positionMeans).forEach(key => {
            if (selectedMetrics.includes(key)) {
              filteredMeans[key] = positionMeans[key];
            }
        });

        console.log(filteredMeans);
        return filteredMeans;
        }


    const statCheckboxes = document.querySelectorAll('input[name="stat-group"]');

    statCheckboxes.forEach(box => {
        box.addEventListener('change', updateStatGroups);
        });
    
    return {positionMeans};
    }
    
    export { loadPositionData };