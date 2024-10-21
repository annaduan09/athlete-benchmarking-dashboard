function initStatEntry(statListEl, positionRadioEl, stats, positions, events) {

const listEl = statListEl.querySelector('ul');
const radioEl = positionRadioEl.querySelector('div');

// Initialize list and radio items
const statListItems = {};
const positionRadioItems = {};
positions = positions.sort((a, b) => {
    return a.localeCompare(b);
})

// Update position label
function updatePositionTitle(position) {
    const titleEl = document.getElementById('position-title');
    if (titleEl) {
        titleEl.textContent = `Position Group: ${position}`;
    }
} 

// Initialize list items
function initListItems() {
    for (const stat of stats) {
        const item = document.createElement('li');
        item.innerHTML = `
        <label>
        ${stat}
        <input type="number" id="athlete-stat-${stat}" name="${stat}">
        </label>
        `;
        statListItems[stat] = item;
    }
}

// Initialize radio items
function initRadioItems() {
    for (const position of positions) {
        const label = document.createElement('label');
        const item = document.createElement('input');
        item.type = 'radio';
        item.name = 'position';
        item.value = position;

        label.appendChild(item);
        label.appendChild(document.createTextNode(` ${position}`));

        positionRadioItems[position] = label;
    }
}

initRadioItems();
initListItems();

// Populate list
function populateList(stats) {
    listEl.innerHTML = '';

for (const stat of stats) {
    const item = statListItems[stat];
    listEl.append(item);
}
}

// Populate radio
function populateRadio(positions) {
    radioEl.innerHTML = '';

for (const position of positions) {
    const item = positionRadioItems[position];
    radioEl.append(item);
}
}

populateRadio(positions);
populateList(stats);

 // Capture the input
 function handleNumEntry(evt) {

    const numInput = evt.target;
    const statName = numInput.name;
    const filled = numInput.value !== '' && numInput.value !== null && numInput.value > 0;
    const statValue = filled ? parseFloat(numInput.value) : null;

    const event = new CustomEvent('statFilled', {
      detail: { statName, filled, statValue }
    });
    events.dispatchEvent(event);
  }

  function handleRadioEntry(evt) {
    const radioInput = evt.target;
    const position = radioInput.value;

    // Update position label
    updatePositionTitle(position);

    const event = new CustomEvent('positionSelected', {
      detail: { position }
    });
    events.dispatchEvent(event);
  }

// Add event listener: number input
  for (const item of Object.values(statListItems)) {
    const numInput = item.querySelector('input');
    numInput.addEventListener('input', handleNumEntry);
  }

  // Add event listener: radio input
for (const item of Object.values(positionRadioItems)) {
    const radioInput = item.querySelector('input');
    radioInput.addEventListener('change', handleRadioEntry);
}
}

export { initStatEntry };