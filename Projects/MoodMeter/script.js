const container = document.getElementById('container');
const rectangle = document.getElementById('rectangle');
const value = document.getElementById('value');
const resetButton = document.getElementById('resetButton');

let moodValue = '-';

const handleRectanglePress = (event) => {
    const maxY = 400;
    const newValue = 10 - (event.offsetY / maxY) * 10;
    moodValue = Math.round(Math.max(0, Math.min(newValue, 10)));
    value.textContent = moodValue;
};

const handleReset = () => {
    moodValue = '-';
    value.textContent = moodValue;
};

rectangle.addEventListener('click', handleRectanglePress);
resetButton.addEventListener('click', handleReset);