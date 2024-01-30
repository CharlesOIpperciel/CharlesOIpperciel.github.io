document.addEventListener('DOMContentLoaded', () => {
    const projects = document.querySelectorAll('.project-thumbnail');

    projects.forEach(project => {
        project.addEventListener('click', () => {
            // Replace with the actual URL or function to open the project details
            window.location.href = project.getAttribute('data-url');
        });
    });
});
