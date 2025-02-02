// Game configuration
const BOARD_ROWS = 6;
const BOARD_COLS = 5;
const CARD_PAIRS = (BOARD_ROWS * BOARD_COLS) / 2;

// Game images - replace with your actual image paths
const IMAGES = [
    'https://skycoach.gg/storage/uploads/products/poe-2-mirrors-of-kalandra1733822808_picture_item_small.png',
    'https://preview.redd.it/i-only-just-realized-the-exalted-orb-is-made-of-divine-orbs-v0-jelw95fth1691.png?auto=webp&s=2e801dc1f1a6b81281b2331bcece2e0875d76628',
    'https://kboosting.com/img/22580/c/chaos-orbs-500x500.png',
    'https://skycoach.gg/storage/uploads/products/poe-2-divine-orbs1733131858_picture_item_small.png',
    'https://skycoach.gg/storage/uploads/products/poe-2-vaal-orbs1733133459_picture_item_small.png',
    'https://kboosting.com/img/26600/c/regal-orb-500x500.png',
    'https://kboosting.com/img/26583/c/orb-of-augmentation-500x500.png',
    'https://kboosting.com/img/26590/c/orb-of-transmutation-500x500.png',
    'https://skycoach.gg/storage/uploads/products/poe-2-orbs-of-alchemy1733133657_picture_item_small.png',
    'https://kboosting.com/img/26579/c/orb-of-annulment-500x500.png',
    'https://assets.mmoexp.com/images/202412/b7b601becdd211c203947365b2df001b79a2dd17.png',
    'https://skycoach.gg/storage/uploads/products/poe-2-jewellers-orbs1733822784_picture_item_small.png',
    'https://skycoach.gg/storage/uploads/products/veiled-chaos-orbs1637055002_picture_item_small.png',
    'https://kboosting.com/img/27370/c/gemcutters-prism-300x300.png',
    'https://kboosting.com/img/27386/c/glassblowers-bauble-500x500.png'
];

// Game state
let cards = [];
let flippedCards = [];
let moves = 0;
let matches = 0;
let needToHideCards = false;

// Initialize game board
function initializeBoard() {
    // Reset game state
    cards = [];
    flippedCards = [];
    moves = 0;
    matches = 0;
    needToHideCards = false;
    updateDisplay();

    // Clear board
    const board = document.querySelector('.board');
    board.innerHTML = '';

    // Create shuffled pairs of cards
    const cardPairs = [];
    // Add pairs of images
    for (let i = 0; i < CARD_PAIRS; i++) {
        cardPairs.push(IMAGES[i], IMAGES[i]);
    }
    // Shuffle
    for (let i = cardPairs.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cardPairs[i], cardPairs[j]] = [cardPairs[j], cardPairs[i]];
    }

    // Create card elements
    cardPairs.forEach((image, index) => {
        const card = document.createElement('div');
        card.className = 'card';
        card.setAttribute('data-index', index);
        card.setAttribute('data-image', image);

        const img = document.createElement('img');
        img.src = image;
        img.alt = 'card';

        card.appendChild(img);
        card.addEventListener('click', handleCardClick);
        board.appendChild(card);
        cards.push(card);
    });
}

// Handle card click
function handleCardClick(event) {
    const card = event.currentTarget;

    // If we need to hide previous cards and clicked a face-down card
    if (needToHideCards && !card.classList.contains('flipped')) {
        // Hide previously flipped cards that aren't matched
        flippedCards.forEach(previousCard => {
            if (!previousCard.classList.contains('matched')) {
                previousCard.classList.remove('flipped');
            }
        });
        flippedCards = [];
        needToHideCards = false;
    }

    // Ignore clicks if:
    // - clicking already flipped card
    // - clicking matched card
    // - clicking third card when two unmatched cards are flipped
    if (card.classList.contains('flipped') ||
        card.classList.contains('matched') ||
        (flippedCards.length === 2 && !needToHideCards)) return;

    // Flip the card
    flipCard(card);

    // If this is the second card
    if (flippedCards.length === 2) {
        moves++;
        updateDisplay();
        checkMatch();
    }
}

// Flip a card
function flipCard(card) {
    card.classList.add('flipped');
    flippedCards.push(card);
}

// Check for match
function checkMatch() {
    const [card1, card2] = flippedCards;
    const match = card1.dataset.image === card2.dataset.image;

    if (match) {
        // Mark cards as matched
        card1.classList.add('matched');
        card2.classList.add('matched');
        matches++;
        updateDisplay();
        flippedCards = [];

        // Check for game over
        if (matches === CARD_PAIRS) {
            setTimeout(showGameOver, 500);
        }
    } else {
        // Set flag to hide cards on next valid click
        needToHideCards = true;
    }
}

// Update display
function updateDisplay() {
    document.getElementById('moves').textContent = moves;
    document.getElementById('matches').textContent = matches;
}

// Show game over message
function showGameOver() {
    const gameOver = document.createElement('div');
    gameOver.className = 'game-over';
    gameOver.textContent = `Congratulations! Game Over in ${moves} moves!`;
    document.body.appendChild(gameOver);

    setTimeout(() => {
        gameOver.remove();
    }, 3000);
}

// Event listeners
document.getElementById('newGameBtn').addEventListener('click', initializeBoard);

// Initialize game when page loads
window.addEventListener('load', initializeBoard);