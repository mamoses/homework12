const counterNumber = document.getElementById('counter');
const addButton = document.getElementById('add');
const subtractButton = document.getElementById('subtract');
const resetButton = document.getElementById('reset');
const bestNumber = document.getElementById('best');
const lastUpdated = document.getElementById('lastUpdated');


const savedState = localStorage.getItem('counterState');
const counterState = savedState
    ? JSON.parse(savedState)
    : { count: 0, lastUpdated: null, best: 0 };


function render() {
    counterNumber.textContent = counterState.count;
    bestNumber.textContent = `Best: ${counterState.best}`;
    lastUpdated.textContent = `Last updated: ${counterState.lastUpdated || 'Never'}`;
}


function updateAndSave() {
    render();
    localStorage.setItem('counterState', JSON.stringify(counterState));
}


render();

addButton.addEventListener('click', () => {
    counterState.count++;
    counterState.lastUpdated = new Date().toLocaleTimeString();

    if (counterState.count > counterState.best) {
        counterState.best = counterState.count;
    }

    updateAndSave();
});

subtractButton.addEventListener('click', () => {
    if (counterState.count > 0) {
        counterState.count--;
        counterState.lastUpdated = new Date().toLocaleTimeString();

        updateAndSave();
    }
});

resetButton.addEventListener('click', () => {
    counterState.count = 0;
    counterState.lastUpdated = new Date().toLocaleTimeString();

    updateAndSave();
});
