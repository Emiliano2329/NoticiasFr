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



                const btn = card.querySelector('.button');
                const hoverDescription = card.querySelector('.hover_description');

                const buttonText = btn.querySelector('.button_text'); // Seleccionar el elemento <span> con la clase button_text
                const image = card.querySelector('img');

                let band = 0;
                btn.addEventListener('click', function () {
                    const elementosContenedor = container.querySelectorAll('.contenedor');
                    const ContenedorPrincipal = document.querySelector('.contenedor-principal');
                    const imageContainer = card.querySelector('.image-container');

                    // Obtén el contenedor padre del botón presionado
                    const contenedorPadreBoton = btn.closest('.contenedor');
                    

                    // Toggle (agregar o quitar) los estilos CSS directamente
                    if (band == 1) {
                        hoverDescription.style.maxHeight = '0';
                        hoverDescription.style.transform = 'translateY(1em)';
                        // hoverDescription.style.overflow = 'hidden';
                        console.log("pan");

                        elementosContenedor.forEach(elemento => {
                            //elemento.classList.toggle('hidden');
                            elemento.style.display = 'flex';
                           
                            elemento.style.width = '40rem';
                            elemento.style.height = '50rem';
                            elemento.style.margin = '3rem';
                            elemento.style.padding = '1rem';

                        });

                        

                        container.style.height = 'auto';

                        buttonText.textContent = 'Ver más'; 

                        // image.style.maxHeight = "auto";
                        // image.style.maxWidth = "100%";

                        band = 0;
                    } else {

                        elementosContenedor.forEach(elemento => {
                            //elemento.classList.toggle('hidden');
                            if (elemento !== contenedorPadreBoton) {
                                elemento.style.display = 'none';
                            } else {
                              
                                elemento.style.width = '120rem';
                                elemento.style.height = '100rem';
                               
                            }
                        });

                  
                        container.style.height = '120rem';

                        hoverDescription.style.maxHeight = '90rem';
                        hoverDescription.style.transform = 'none';
                        // hoverDescription.style.overflow = 'visible';
                        console.log("no pan");

                        

                        buttonText.textContent = 'Ver menos'; 

                        // image.style.backgroundColor = "blue";
                        // image.style.maxHeight = "30%";
                        // image.style.maxWidth = "30%";

                        imageContainer.style.height = '50%';
                 



                        band = 1;
                    }

                });
            });
        })
        .catch(error => console.error('Error fetching news:', error));
});

