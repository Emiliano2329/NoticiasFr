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

            // Para la funcionalidad de la barra de búsqueda
            // const input = document.querySelector('.input');
            // const searchResultsContainer = document.getElementById('searchResultsContainer');
            // input.addEventListener('input', () => {
            //     // Aquí puedes ejecutar cualquier acción que desees cada vez que se cambie el valor del input
            //     const searchText = input.value.trim(); // Obtener el texto del input y eliminar espacios en blanco al principio y al final

            //     // Llamar a una función de búsqueda o realizar otras operaciones según sea necesario
            //     fetch(`/api/news`)
            //         .then(response => response.json())
            //         .then(data => {

            //             // Limpiar los resultados anteriores
            //             searchResultsContainer.innerHTML = '';

            //             // Crear una lista para los resultados
            //             const resultList = document.createElement('ul');

            //             // Agregar cada resultado como un elemento de lista
            //             data.forEach(news => {
            //                 const resultItem = document.createElement('li');
            //                 resultItem.textContent = news.title;
            //                 resultList.appendChild(resultItem);
            //             });

            //             // Agregar la lista de resultados al contenedor
            //             searchResultsContainer.appendChild(resultList);


            //         })
            //         .catch(error => console.error('Error fetching search results:', error)); // Imprime cualquier error que ocurra durante la solicitud al backend
            // });

            // Ocultar los resultados cuando se hace clic fuera de la barra de búsqueda
            // document.addEventListener('click', (event) => {
            //     if (!searchResultsContainer.contains(event.target)) {
            //         searchResultsContainer.style.display = 'none';
            //     }
            // });







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


        })
        .catch(error => console.error('Error fetching news:', error));

});

