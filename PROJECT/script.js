const homePage = document.getElementById('homePage');
const gameContainer = document.getElementById('container');
const gameBoard = document.getElementById('puzzle');
const scrambleButton = document.getElementById('scramble');
const timerDisplay = document.getElementById('timer');
const movesDisplay = document.getElementById('moves');
const victoryMessageDisplay = document.getElementById('victorymessage');
const options = document.querySelectorAll('.images')
const referenceImage = document.querySelector('.reference-image');
const victorySound = new Audio('../sounds/sound.mp3');

let tiles = []
let emptyTile = { x: 2, y: 2 };
let moves = 0;
let timer = 0;
let intervalId;
let selectedImage = '';

options.forEach(option => {
    option.addEventListener("click", () => {
        selectedImage = option.dataset.image;
        referenceImage.src = selectedImage;
        homePage.style.display = 'none';
        gameContainer.style.display = 'block';
        startGame(selectedImage);
    })
})

function startGame() {
    tiles = Array.from({ length: 8 }, (_, i) => i + 1);
    tiles.push(null);
    shuffle();
    drawTiles(selectedImage);
    resetTimer();
    resetMoves();
    startTimer();
    clearVictoryMessage();
}

function shuffle() {
    for (let i = tiles.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [tiles[i], tiles[j]] = [tiles[j], tiles[i]];
    }
}

function drawTiles(imageUrl) {
    const containerSize = gameBoard.clientWidth; 
    const tileSize = containerSize / 3;
    gameBoard.innerHTML = '';
    tiles.forEach((tile, index) => {
        const x = index % 3;
        const y = Math.floor(index / 3);

        const tileDiv = document.createElement('div');
        tileDiv.className = 'tile';
        tileDiv.style.left = `${x * tileSize}px`;
        tileDiv.style.top = `${y * tileSize}px`;

        if (tile) {
            tileDiv.style.backgroundImage = `url(${imageUrl})`;
            tileDiv.style.backgroundPosition = `${-(tile - 1) % 3 * tileSize}px ${-Math.floor((tile - 1) / 3) * tileSize}px`;
            tileDiv.dataset.index = index;
            tileDiv.addEventListener('click', () => moveTile(index));
        } else {
            tileDiv.classList.add('hidden');
            emptyTile = { x, y };
        }

        gameBoard.appendChild(tileDiv);
    });
}

function moveTile(index) {
    const x = index % 3;
    const y = Math.floor(index / 3);
    const dx = Math.abs(x - emptyTile.x);
    const dy = Math.abs(y - emptyTile.y);

    if ((dx === 1 && dy === 0) || (dx === 0 && dy === 1)) {
        tiles[3 * emptyTile.y + emptyTile.x] = tiles[3 * y + x];
        tiles[3 * y + x] = null;
        emptyTile = { x, y };
        moves++;
        updateMoves();
        drawTiles(selectedImage);
        checkVictory();
    }
}

function checkVictory() {
    if (tiles.every((tile, index) => !tile || tile === index + 1)) {
        clearInterval(intervalId);
        VictoryMessage();
    }
}

function resetTimer() {
    timer = 0;
    updateTimer();
}

function startTimer() {
    clearInterval(intervalId);
    intervalId = setInterval(() => {
        timer++;
        updateTimer();
    }, 1000);
}

function updateTimer() {
    const minutes = String(Math.floor(timer / 60)).padStart(2, '0');
    const seconds = String(timer % 60).padStart(2, '0');
    timerDisplay.textContent = `Time: ${minutes}:${seconds}`;
}

function resetMoves() {
    moves = 0;
    updateMoves();
}

function updateMoves() {
    movesDisplay.textContent = `Moves: ${moves}`;
}

function VictoryMessage() {
    victorySound.play();
    victoryMessageDisplay.textContent = 'Congratulations! You solved the puzzle!';
}

function clearVictoryMessage() {
    victoryMessageDisplay.textContent = '';
}

scrambleButton.addEventListener('click', () => {
    startGame()
});

let back = document.getElementById("backButton")
back.addEventListener('click', () => {
    homePage.style.display = 'block';
    gameContainer.style.display = 'none';
})