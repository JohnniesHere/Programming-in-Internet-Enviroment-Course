// DOM Elements
const currentDateElement = document.getElementById('current-date');
const specificDateBtn = document.getElementById('specific-date-btn');
const dateInput = document.getElementById('date-input');
const todayPastBtn = document.getElementById('today-past-btn');
const errorMessage = document.getElementById('error-message');
const results = document.getElementById('results');
const loadingSpinner = document.querySelector('.loading-spinner');

// Update current date with animation
function updateCurrentDate() {
    const date = new Date();
    const options = {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
        weekday: 'long'
    };
    const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);
    currentDateElement.textContent = `${formattedDate}`;
}

// Validate date format (dd/mm)
function validateDate(date) {
    if (!date || date === 'dd/mm') return null;

    const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])$/;
    if (!dateRegex.test(date)) return false;

    const [day, month] = date.split('/').map(num => parseInt(num));
    const testDate = new Date(2000, month - 1, day);
    return testDate.getMonth() === month - 1;
}

// Show error message with animation
function showError(message) {
    errorMessage.querySelector('span').textContent = message;
    errorMessage.classList.remove('hidden');
    errorMessage.style.animation = 'none';
    errorMessage.offsetHeight; // Trigger reflow
    errorMessage.style.animation = 'slideDown 0.3s ease-out';
}

// Hide error message
function hideError() {
    errorMessage.classList.add('hidden');
}

// Show loading spinner
function showLoading() {
    loadingSpinner.classList.remove('hidden');
    results.style.opacity = '0.5';
}

// Hide loading spinner
function hideLoading() {
    loadingSpinner.classList.add('hidden');
    results.style.opacity = '1';
}

// Format historical event text
function formatEventText(year, text, month, day) {
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    return `
        <div class="event-wrapper">
            <div class="event-date">
                <span class="date-badge">${months[month - 1]} ${day}, ${year}</span>
            </div>
            <div class="event-description">
                <p>${text}</p>
            </div>
        </div>
    `;
}

// Add dynamic styles for event display
function addEventStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .event-wrapper {
            background: rgba(145, 71, 255, 0.1);
            border-radius: 0.5rem;
            padding: 1.5rem;
            margin: 1rem 0;
        }
        .event-year {
            margin-bottom: 1rem;
        }
        .date-badge {
            background: var(--twitch-purple);
            color: white;
            padding: 0.5rem 1rem;
            border-radius: 1rem;
            font-weight: bold;
            font-size: 1.1rem;
        }
        .event-description {
            color: var(--text-color);
            line-height: 1.8;
        }
    `;
    document.head.appendChild(style);
}

// Fetch historical event from API
async function fetchHistoricalEvent(month, day) {
    try {
        showLoading();
        const response = await fetch(`https://history.muffinlabs.com/date/${month}/${day}`);
        const data = await response.json();

        if (data.data.Events && data.data.Events.length > 0) {
            const randomEvent = data.data.Events[Math.floor(Math.random() * data.data.Events.length)];
            return formatEventText(randomEvent.year, randomEvent.text, month, day);
        }
        return '<div class="no-events">No events found for this date.</div>';
    } catch (err) {
        console.error('Error fetching event:', err);
        return '<div class="error-state">Failed to fetch historical event. Please try again.</div>';
    } finally {
        hideLoading();
    }
}

// Handle specific date button click
async function handleSpecificDate() {
    hideError();
    const isValid = validateDate(dateInput.value);

    if (isValid === false) {
        showError('Please enter a valid date in dd/mm format');
        return;
    }

    if (isValid === null) {
        const randomMonth = Math.floor(Math.random() * 12) + 1;
        const randomDay = Math.floor(Math.random() * 28) + 1;
        const event = await fetchHistoricalEvent(randomMonth, randomDay);
        results.innerHTML = event;
        return;
    }

    const [day, month] = dateInput.value.split('/');
    const event = await fetchHistoricalEvent(month, day);
    results.innerHTML = event;
}

// Handle today in past button click
async function handleTodayInPast() {
    hideError();
    const today = new Date();
    const event = await fetchHistoricalEvent(today.getMonth() + 1, today.getDate());
    results.innerHTML = event;
}

// Input focus handler with animation
function handleInputFocus() {
    if (dateInput.value === 'dd/mm') {
        dateInput.value = '';
    }
    dateInput.classList.add('focused');
}

// Input blur handler
function handleInputBlur() {
    if (dateInput.value === '') {
        dateInput.value = 'dd/mm';
    }
    dateInput.classList.remove('focused');
}

// Button click animation
function addButtonClickAnimation(button) {
    button.addEventListener('click', () => {
        button.style.transform = 'scale(0.95)';
        setTimeout(() => {
            button.style.transform = '';
        }, 100);
    });
}

// Initialize
function init() {
    updateCurrentDate();
    addEventStyles();
    addButtonClickAnimation(specificDateBtn);
    addButtonClickAnimation(todayPastBtn);
}

// Event Listeners
document.addEventListener('DOMContentLoaded', init);
specificDateBtn.addEventListener('click', handleSpecificDate);
todayPastBtn.addEventListener('click', handleTodayInPast);
dateInput.addEventListener('focus', handleInputFocus);
dateInput.addEventListener('blur', handleInputBlur);