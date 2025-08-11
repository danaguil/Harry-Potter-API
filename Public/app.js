
// bootstrapping + api
const myAPI = 'https://hp-api.onrender.com/api';

// Function to fetch data from the API
document.addEventListener('DOMContentLoaded', init);

// Initialize the API client, by grabbing the DOM elemts with the IDs
const listElements = document.getElementById('list-elements');
const searchInput = document.getElementById('search-input');
const houseSelect = document.getElementById('house-select');
const singleElement = document.getElementById('single-element');

// Ap State
let all = []; // entire database from API
let view = []; // filtered view based on search and house selection

// Error handling & display rendered list
async function loadALL() {
    try {
        // Fetch all characters from the API
        const response = await fetch ('${myAPI}/characters');

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        all = await response.json();  // Parse the JSON response
        view = [...all]; // Initialize view with all characters, when nothing is filtered
        renderList(view); // Render the initial list of characters
    } catch (error) {
        showError('Failed to load in elements: ${error.message}');
    }
}


/*  Filer inputted elements to be filtered and held in array: all & view
        if user inputs a search term, it will filter the characters based on that term
        if user selects a house, it will filter the characters based on that house
        if both are applied, it will filter characters based on both conditions
*/
function applyFilters(){
    const searchTerm = searchInput.ariaValueMax.toLowerCase(); // Get the search term from the input
    const selectedHouse = houseSelect.value; // going to be a dropdown
    // .filer() loops through the array and returns a new array with elements that match the condition
    view = all.filter(characters => {
        // Check if the character's name includes the search term and if the house matches the selected house
        const matchesSearch = characters.name.toLowerCase().includes(searchTerm);
        const matchesHouse = selectedHouse === 'all' || characters.house === selectedHouse;
        
        // character is kept only if both conditions are true
        return matchesSearch && matchesHouse;
    })
    renderList(view); // Render the filtered list of characters
}
