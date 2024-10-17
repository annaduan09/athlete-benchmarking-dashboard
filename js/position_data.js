
let filteredMeans = {};
let position = "";

async function loadPositionData() {
    // Load position means data for all positions
    const means24Response = await fetch('data/group_means_2024.json');
    const means24 = await means24Response.json();
    
    let strengthStats = false;
    let agilityStats = false;
    let anthroStats = false;    

    const strengthMeans = ['bench', 'squat', 'power_clean'];
    const agilityMeans = ['dash_10y', 'vert_vertec', 'broad_jump', 'shuttle_60y', 'l_drill', 'pro_agil', 'flying_10'];
    const anthroMeans = ['height', 'weight', 'wing'];

    const strengthStatCheckbox = document.querySelector('#strength-stats');
    const agilityStatCheckbox = document.querySelector('#agility-stats');
    const anthroStatCheckbox = document.querySelector('#anthro-stats');

    let positionMeans = means24.find(group => group.position === position);


    let selectedMetrics = []     

    // Handle position inputs
    function updatePosition() {
    const positionRadio = document.querySelector('input[name="position"]:checked');
    if (positionRadio) {
        position = positionRadio.value;

        positionMeans = means24.find(group => group.position === position);

        updateStatGroups();
    } 
};


    const positionRadios = document.querySelectorAll('input[name="position"]');
    positionRadios.forEach(radio => {
    radio.addEventListener('change', updatePosition);
    });

    // Handle metric selection
    function updateStatGroups() {
        selectedMetrics = [];
        Object.keys(filteredMeans).forEach(key => delete filteredMeans[key]);

        agilityStats = agilityStatCheckbox.checked;
        if (agilityStats) {
            selectedMetrics = selectedMetrics.concat(agilityMeans);
        }
    
        strengthStats = strengthStatCheckbox.checked;
        if (strengthStats) {
            selectedMetrics = selectedMetrics.concat(strengthMeans);
        }
    
        anthroStats = anthroStatCheckbox.checked;
        if (anthroStats) {
            selectedMetrics = selectedMetrics.concat(anthroMeans);
        }
        
        Object.keys(positionMeans).forEach(key => {
            if (selectedMetrics.includes(key)) {
              filteredMeans[key] = positionMeans[key];
            }
        });
        
        const event = new CustomEvent('filteredMeansUpdated', { detail: { filteredMeans, position } });
        window.dispatchEvent(event);
        }


    const statCheckboxes = document.querySelectorAll('input[name="stat-group"]');
    statCheckboxes.forEach(box => {
        box.addEventListener('change', updateStatGroups);
        });
    }
    
    export { loadPositionData,  filteredMeans, position};