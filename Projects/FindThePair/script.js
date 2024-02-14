// Animals array
let animals = [
    "&#128053", // Monkey
    "&#129421", // Gorilla
    "&#128054", // Dog
    "&#128008", // Cat
    "&#128049", // Mouse
    "&#128052", // Rabbit
    "&#128048", // Bear
    "&#128046", // Koala
    "&#128047", // Panda
    "&#128045", // Tiger
    "&#128049", // Lion
    "&#128043", // Elephant
    "&#128042", // Hippo
    "&#128041", // Rhino
    "&#128040", // Horse
    "&#128039", // Cow
    "&#128038", // Pig
    "&#128037"  // Sheep
];

// Shuffle the array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}


// Get selected value from dropdown menu
function selectedOption() {
    let select = document.querySelector('.select-button');
    return select.value;
}


// Get a random integer between min and max
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}


// Global variables
let cardsRevealedCount = 0;
let firstCard, secondCard;
let totalPairs = 0;

// Check if the player won
function checkWin() {
    let matchedPairs = document.querySelectorAll('.matched').length / 2;

    if (matchedPairs === totalPairs) {
        setTimeout(() => {
            alert('You won!');
            StartGame();
        }, 500);
    }
}


// Card click event
function cardClick() {
    if (cardsRevealedCount < 2 && !this.classList.contains('matched')) {
        if (cardsRevealedCount === 0) {
            firstCard = this;
            this.innerHTML = this.dataset.animal;
            cardsRevealedCount++;
        } else if (cardsRevealedCount === 1 && this !== firstCard) {
            secondCard = this;
            this.innerHTML = this.dataset.animal;
            cardsRevealedCount++;
            verifyMatch(firstCard, secondCard);
        }
    }
}



// Verify if the cards match
function verifyMatch(firstCard, secondCard) {
    if (firstCard && secondCard) {

        if (firstCard.dataset.animal === secondCard.dataset.animal) {
            firstCard.classList.add('matched');
            secondCard.classList.add('matched');
            cardsRevealedCount = 0;
            checkWin();

        } else {
            setTimeout(() => {
                firstCard.innerHTML = '';
                secondCard.innerHTML = '';
                cardsRevealedCount = 0;
            }, 1000);
        }
    }
}


// Grid Layout
function gridLayout(selectedValue, gridContainer) {
    switch (selectedValue) {
        case 4:
            gridContainer.style.gridTemplateColumns = 'auto auto';
            break;
        case 16:
            gridContainer.style.gridTemplateColumns = 'auto auto auto auto';
            break;
        case 36:
            gridContainer.style.gridTemplateColumns = 'auto auto auto auto auto auto';
            break;
        default:
            break;
    }
}


// Clear the grid
function clearGrid() {
    let gridContainer = document.querySelector('.grid-container');
    gridContainer.innerHTML = '';
}


// Choose animals randomly
function chooseAnimalsRandomly(selectedValue) {
    // Create the grid based on the selected value
    let animalsChosenIndex = [];
    let animalsChosenUnicode = [];

    for (let i = 0; i < selectedValue / 2; i++) {
        let randomIndex = getRandomInt(0, animals.length);

        // Check if the random index was already chosen
        if (!animalsChosenIndex.includes(randomIndex)) {
            animalsChosenIndex.push(randomIndex);
            animalsChosenUnicode.push([animals[randomIndex]]);
        } else {
            i--;
        }
    }
    let animalsChosenPairs = animalsChosenUnicode.concat(animalsChosenUnicode);
    shuffleArray(animalsChosenPairs);
    return animalsChosenPairs;
}


function initializeGridWithAnimals(animalsChosenPairs, gridContainer) {
    for (let i = 0; i < animalsChosenPairs.length; i++) {
        let row = document.createElement('div');
        row.classList.add('grid-item');
        row.dataset.animal = animalsChosenPairs[i];
        row.addEventListener('click', cardClick);
        gridContainer.appendChild(row);
    }
}

// Main Logic to start the game and initialize everything
function StartGame() {
    // Get the selected value and Grid Container
    let gridContainer = document.querySelector('.grid-container');
    let selectedValue = parseInt(selectedOption());

    // Clear the grid and create a new one
    clearGrid();
    gridLayout(selectedValue,gridContainer);

    // Get the animals chosen and shuffle the list
    let animalsChosenPairs = chooseAnimalsRandomly(selectedValue);

    // Get the total pairs to check for a win later
    totalPairs = selectedValue / 2;

    initializeGridWithAnimals(animalsChosenPairs, gridContainer);
}




