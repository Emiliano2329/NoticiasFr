document.addEventListener('DOMContentLoaded', function () {
    const container = document.getElementById('main');

    fetch('/api/news')
        .then(response => response.json())
        .then(data => {
            data.forEach(news => {

                const container_card = document.createElement('div');
                container_card.className = 'contenedor';

                const card = document.createElement('div');
                card.className = 'news-card';
                card.innerHTML = `
               <div class="image-container">
                <img src="${news.imageUrl}" alt="Imagen de la noticia">
              </div>
                <div>
                <h2 class = "logo">${news.title}</h2>
                <p class="hover_content h6">Fecha: ${news.newsDate}</p>
                <p class="hover_content h6">${news.content.substring(0, 100)}...</p>
                <p class="hover_description h6">${news.body}</p>
                <button class="button" id="show-more">
                    <span class="button_lg">
                        <span class="button_sl"></span>
                        <span class="button_text">Ver más</span>
                    </span>
                </button>
               </div>
            `;

                //<button class="more-btn">Ver más</button>          

                container_card.appendChild(card);

                container.appendChild(container_card);

            });

            // Para la funcionalidad de las tarjetas de noticias
            const btns = document.querySelectorAll("#show-more")  // Se adquiere a los botones de cada una de las tarjetas creadas
            const hoverDescription = document.querySelector('.hover_description');  // Se adquiere la descripción de cada una de las tarjetas creadas
            const containerCards = document.querySelectorAll('.contenedor');

            for (let button of btns) {
                const buttonText = button.querySelector('.button_text');  // Se accede al texto del elemento button
                const containerCard = button.closest('.contenedor');  // Se accede al contenedor de la tarjeta que se seleccione
                const card = containerCard.querySelector('.news-card');  // Se accede al contenido de la tarjeta seleccionada
                const hoverDescription = card.querySelector('.hover_description');  // Se accede a la descripción de la tarjeta seleccionada

                button.addEventListener('click', () => {  // Se le agrega un evento a los elementos buttons

                    console.log(buttonText.textContent);
                    if (buttonText.textContent === 'Ver más') {  // Si se selecciona una noticia

                        buttonText.textContent = 'Ver menos';

                        for (let container of containerCards) {
                            if (container !== containerCard) {
                                container.style.display = 'none';
                            } else {
                                containerCard.classList.replace('contenedor', 'contenedor-alterado');
                                hoverDescription.style.maxHeight = '70rem';
                                hoverDescription.style.transform = 'none';
                            }
                        }
                    } else {  // Si se desea volver a ver las demás noticias
                        buttonText.textContent = 'Ver más';
                        for (let container of containerCards) {
                            if (container !== containerCard) {
                                container.style.display = 'flex';
                            } else {
                                containerCard.classList.replace('contenedor-alterado', 'contenedor');
                                hoverDescription.style.maxHeight = '0';
                                hoverDescription.style.transform = 'translateY(1em)';
                            }
                        }
                    }

                });
            }

            // Se seleccionan los elementos de la barra de búsqueda para poder modificarlos o adaptarlos
            const searchBar = document.getElementById('search-bar');
            const searchButton = document.getElementById('search-button');
            const searchResults = document.getElementById('search-results');

            const previousSearches = ['Alan', 'Anna', 'Andrea', 'Angie', 'Marco'];  // Borrar

            searchBar.addEventListener('input',  async () => {
                const query = searchBar.value.trim().toLowerCase();  // Se toma el contenido de la barra de búsqueda y se convierte a minúsculas todo
                //console.log(findTitle(query));
                searchResults.innerHTML = '';  // Se limpia la barra de búsqueda

                if (query) {  // Si se tiene una cadena válida
                    // Se buscan los resultados que contengan la cadena búscada
                    //const filteredResults = previousSearches.filter(item => item.toLowerCase().includes(query));
                    const filteredResults = await findTitle(query);
                    console.log(`Resultado:`, filteredResults);


                    if (filteredResults.length > 0) {  // Si se han encotrado coincidencias
                        searchResults.style.display = 'block';  // Se ajusta el contenedor
                        filteredResults.forEach(result => {  // Se recorre el arreglo de las coincidencias encontradas
                            const li = document.createElement('li');
                            li.textContent = result; // Se colocan todas las cadenas similares en el contenedor de resúltados
                            li.addEventListener('click', () => {  // Si se selecciona una cadena
                                searchBar.value = result;  // Se coloca en la barra de búsqueda
                                searchResults.style.display = 'none';  // Se eliminan las demás
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

            // Se añade un evento al elemento button para saber cuándo buscar algo
            searchButton.addEventListener('click', () => {
                alert('Buscar: ' + searchBar.value);
            });

            // Si se da click en un área fuera de la barrá de búsqueda o de las coincidencias encontradas
            document.addEventListener('click', (event) => {
                if (!searchBar.contains(event.target) && !searchButton.contains(event.target) && !searchResults.contains(event.target)) {
                    searchResults.style.display = 'none';  // Se ocultan las coincidencias encontradas
                }
            });






        })
        .catch(error => console.error('Error fetching news:', error));

});


function hellow(name) {
    console.log(`Hola ${name}!`);
}

function findTitle(str) {
    return new Promise((resolve, reject) => {
        let titles = [];

        fetch(`/api/news`)
            .then(response => response.json())
            .then(data => {
                for (let newTitle of Object.values(data)) {
                    titles.push(newTitle.title);
                }

                let matches = titles.filter(item => item.toLowerCase().includes(str.toLowerCase()));

                console.log('Coincidencias finales:', matches);

                resolve(matches); // Resuelve la Promesa con las coincidencias encontradas
            })
            .catch(error => {
                console.error('Error al buscar:', error);
                reject(error); // Rechaza la Promesa con el error
            });
    });
}


