document.addEventListener('DOMContentLoaded', () => {
    const projects = document.querySelectorAll('.project-thumbnail');

    projects.forEach(project => {
        project.addEventListener('click', () => {
            // Replace with the actual URL or function to open the project details
            window.location.href = project.getAttribute('data-url');
        });
    });
});


// Simulated typing effect for your name
const nameElement = document.getElementById('typed-name');
const nameText = 'Charles-Olivier Ipperciel'; // Your name

let charIndex = 0;

function typeCharacter() {
    if (charIndex < nameText.length) {
        nameElement.textContent += nameText.charAt(charIndex);
        charIndex++;
        setTimeout(typeCharacter, 50); // Adjust typing speed (milliseconds)
    }
}
// Start typing animation when the page loads
document.addEventListener('DOMContentLoaded', () => {
    typeCharacter();
});





