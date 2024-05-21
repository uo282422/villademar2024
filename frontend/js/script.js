document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.container');

    container.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('.section');
        const scrollPos = container.scrollTop + window.innerHeight / 2;

        sections.forEach((section, index) => {
            if (scrollPos >= section.offsetTop && scrollPos < section.offsetTop + section.offsetHeight) {
                window.history.replaceState(null, null, `#section${index + 1}`);
            }
        });
    });

    let scrollTimeout;

    container.addEventListener('wheel', (event) => {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }

        scrollTimeout = setTimeout(() => {
            const sections = document.querySelectorAll('.section');
            let nearestSection = sections[0];
            let minDistance = Math.abs(container.scrollTop - nearestSection.offsetTop);

            sections.forEach((section) => {
                const distance = Math.abs(container.scrollTop - section.offsetTop);
                if (distance < minDistance) {
                    minDistance = distance;
                    nearestSection = section;
                }
            });

            nearestSection.scrollIntoView({ behavior: 'smooth' });
        }, 100);
    });
});

function scrollToSection(sectionNumber) {
    const section = document.getElementById(`section${sectionNumber}`);
    section.scrollIntoView({ behavior: 'smooth' });
}




