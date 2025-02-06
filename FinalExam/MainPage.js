// Parse the movies data from JSON string
let moviesData = JSON.parse(movies).movies;

const chuckImages = [
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnYZw21VXF9xtidDJl00n1mlDeJHpG7VvZfw&s',
    'https://thealabamabaptist.org/wp-content/uploads/2023/11/Chuck-Norris-Roundhouse-1-scaled-e1700254602612.jpg',
    'https://static0.colliderimages.com/wordpress/wp-content/uploads/2024/05/how-did-the-original-walker-texas-ranger-end-chuck-norris.jpg',
    'https://m.media-amazon.com/images/M/MV5BZDI5ZjMzYTQtYWM2Ny00YTg2LTllNDUtYTkxNjVhY2ViNzk2XkEyXkFqcGdeQXRyYW5zY29kZS13b3JrZmxvdw@@._V1_.jpg',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVAA8woXUTaDHekpxmgY9WhjfvbP9DWtycbg&s'
];

/**
 * Adjusts the height of the text section to match the image section
 */
function adjustTextHeight() {
    const imageSection = document.querySelector('.content-wrapper section:first-child');
    const textSection = document.querySelector('.content-wrapper section:last-child');
    const image = document.getElementById('chuck-image');

    // Calculate total height including padding
    const imageHeight = image.offsetHeight;
    const imageSectionPadding = parseInt(window.getComputedStyle(imageSection).padding) * 2;
    const totalHeight = imageHeight + imageSectionPadding;

    // Set text section height to match
    textSection.style.height = totalHeight + 'px';
}

/**
 * Initializes the page content:
 * - Sets random Chuck Norris image
 * - Loads movies table
 * - Sets up event listeners
 */
function initializePage() {
    // Select and set random Chuck image
    const randomImage = chuckImages[Math.floor(Math.random() * chuckImages.length)];
    const imageElement = document.getElementById('chuck-image');

    // Adjust height after image loads
    imageElement.onload = () => {
        adjustTextHeight();
    };
    imageElement.src = randomImage;

    // Initialize movies table
    displayMovies(moviesData);

    // Handle window resize events
    window.addEventListener('resize', adjustTextHeight);

    // Initial height adjustment (for cached images)
    adjustTextHeight();
}

/**
 * Displays movies in the table
 */
function displayMovies(movies) {
    const tbody = document.querySelector('#movies-table tbody');
    tbody.innerHTML = '';

    // Create table rows for each movie
    movies.forEach(movie => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${movie.title}</td>
            <td>${movie.year}</td>
            <td>${movie.role}</td>
        `;
        tbody.appendChild(row);
    });
}

/**
 * Filters movies based on the year input
 * Shows error message if input is invalid
 */
function filterMovies() {
    const yearInput = document.getElementById('year-filter').value;
    const errorMsg = document.getElementById('error-message');

    // Validate year format (4 digits)
    if (!/^\d{4}$/.test(yearInput)) {
        errorMsg.textContent = 'Please enter a valid 4-digit year';
        return;
    }

    // Clear error and filter movies
    errorMsg.textContent = '';
    const year = parseInt(yearInput);
    const filteredMovies = moviesData.filter(movie => movie.year >= year);
    displayMovies(filteredMovies);
}

/**
 * Fetches a random Chuck Norris joke from the API
 * Updates UI with the joke and enables interaction buttons
 */
async function getJoke() {
    try {
        const response = await fetch('https://api.chucknorris.io/jokes/random');
        const data = await response.json();
        const jokeContainer = document.getElementById('joke-container');
        jokeContainer.textContent = data.value;
        jokeContainer.style.color = 'var(--light)';

        // Enable interaction buttons
        document.getElementById('like-btn').disabled = false;
        document.getElementById('dislike-btn').disabled = false;
        document.getElementById('clear-btn').disabled = false;
    } catch (error) {
        console.error('Error fetching joke:', error);
    }
}

/**
 * Marks the current joke as liked by changing text color to green
 */
function likeJoke() {
    const jokeContainer = document.getElementById('joke-container');
    jokeContainer.style.color = 'var(--like-green)';
}

/**
 * Marks the current joke as disliked by changing text color to red
 */
function dislikeJoke() {
    const jokeContainer = document.getElementById('joke-container');
    jokeContainer.style.color = 'var(--error-red)';
}

/**
 * Clears the current joke and resets the UI
 * Disables interaction buttons
 */
function clearJoke() {
    const jokeContainer = document.getElementById('joke-container');
    jokeContainer.textContent = '';
    jokeContainer.style.color = 'var(--light)';

    // Disable interaction buttons
    document.getElementById('like-btn').disabled = true;
    document.getElementById('dislike-btn').disabled = true;
    document.getElementById('clear-btn').disabled = true;
}