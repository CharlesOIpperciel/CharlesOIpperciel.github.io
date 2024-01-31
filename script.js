document.addEventListener('DOMContentLoaded', () => {
    const projects = document.querySelectorAll('.project-thumbnail');

    projects.forEach(project => {
        project.addEventListener('click', () => {
            // Replace with the actual URL or function to open the project details
            window.location.href = project.getAttribute('data-url');
        });
    });
});

// Define an array of objects with text and element selectors
const typingElements = [
    {
        text: "Venture into the realm of my projects, where code meets creativity.",
        selector: '#text-image-portfolio' // ID of the element in index.html
    },
    {
        text: "Hi, nice to meet you.",
        selector: '#text-image-about' // ID of the element in about.html
    },
    {
        text: "Contact me.",
        selector: '#text-contact' // ID of the element in about.html
    }
];

function typeText(element, text) {
    let charIndex = 0;
    const targetElement = document.querySelector(element);

    function typeCharacter() {
        if (charIndex < text.length) {
            targetElement.textContent += text.charAt(charIndex);
            charIndex++;
            setTimeout(typeCharacter, 40); // Adjust typing speed (milliseconds)
        }
    }

    typeCharacter();
}

// Start typing animations when the page loads
document.addEventListener('DOMContentLoaded', () => {
    typingElements.forEach((item) => {
        if (document.querySelector(item.selector)) {
            typeText(item.selector, item.text);
        }
    });
});








