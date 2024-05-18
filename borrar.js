document.addEventListener('DOMContentLoaded', function () {
    const searchBar = document.getElementById('search-bar');
    const searchButton = document.getElementById('search-button');
    const searchResults = document.getElementById('search-results');

    const previousSearches = ['Alan', 'Anna', 'Andrea', 'Angie','Marco'];

    searchBar.addEventListener('input', () => {
        const query = searchBar.value.toLowerCase();
        searchResults.innerHTML = '';

        if (query) {
            const filteredResults = previousSearches.filter(item => item.toLowerCase().includes(query));
            if (filteredResults.length > 0) {
                searchResults.style.display = 'block';
                filteredResults.forEach(result => {
                    const li = document.createElement('li');
                    li.textContent = result;
                    li.addEventListener('click', () => {
                        searchBar.value = result;
                        searchResults.style.display = 'none';
                    });
                    searchResults.appendChild(li);
                });
            } else {
                searchResults.style.display = 'none';
            }
        } else {
            searchResults.style.display = 'none';
        }
    });

    searchButton.addEventListener('click', () => {
        alert('Buscar: ' + searchBar.value);
    });

    document.addEventListener('click', (event) => {
        if (!searchBar.contains(event.target) && !searchButton.contains(event.target) && !searchResults.contains(event.target)) {
            searchResults.style.display = 'none';
        }
    });
});
