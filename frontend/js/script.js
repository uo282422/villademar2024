document.addEventListener('DOMContentLoaded', () => {
    // Espera a que el DOM esté completamente cargado antes de ejecutar el código

    // Busca el contenedor principal de la página con la clase CSS '.container'
    const container = document.querySelector('.container');

    // Agrega un evento de escucha para el desplazamiento en el contenedor
    container.addEventListener('scroll', () => {
        // Dentro de este evento, se ejecuta el siguiente código cada vez que el contenedor se desplaza

        // Busca todas las secciones con la clase CSS '.section'
        const sections = document.querySelectorAll('.section');

        // Calcula la posición de desplazamiento actual dentro del contenedor
        const scrollPos = container.scrollTop + window.innerHeight / 2;

        // Itera sobre cada sección para determinar cuál está en el punto de desplazamiento actual
        sections.forEach((section, index) => {
            if (scrollPos >= section.offsetTop && scrollPos < section.offsetTop + section.offsetHeight) {
                // Si la sección está visible en la ventana actual, actualiza la URL en el historial del navegador
                window.history.replaceState(null, null, `#section${index + 1}`);
            }
        });
    });

    // Declaración de una variable para controlar el tiempo de espera antes de realizar un desplazamiento
    let scrollTimeout;

    // Agrega un evento de escucha para la rueda del ratón dentro del contenedor
    container.addEventListener('wheel', (event) => {
        // Dentro de este evento, se ejecuta el siguiente código cuando se gira la rueda del ratón

        // Si hay un tiempo de espera definido, se borra para evitar múltiples acciones
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }

        // Se establece un nuevo tiempo de espera antes de realizar una acción de desplazamiento
        scrollTimeout = setTimeout(() => {
            // Dentro de este tiempo de espera, se ejecuta el siguiente código después de 100 milisegundos

            // Busca todas las secciones con la clase CSS '.section'
            const sections = document.querySelectorAll('.section');

            // Inicializa variables para encontrar la sección más cercana al punto de desplazamiento actual
            let nearestSection = sections[0];
            let minDistance = Math.abs(container.scrollTop - nearestSection.offsetTop);

            // Itera sobre cada sección para encontrar la más cercana al punto de desplazamiento actual
            sections.forEach((section) => {
                const distance = Math.abs(container.scrollTop - section.offsetTop);
                if (distance < minDistance) {
                    minDistance = distance;
                    nearestSection = section;
                }
            });

            // Realiza un desplazamiento suave (smooth scroll) para mostrar la sección más cercana
            nearestSection.scrollIntoView({ behavior: 'smooth' });
        }, 100); // Tiempo de espera definido en 100 milisegundos
    });
});


