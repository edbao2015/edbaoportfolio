document.addEventListener('DOMContentLoaded', function() {
    const content = {
        home: `
            <h1>Welcome to my Portfolio</h1>
            <p>This is the home page content.</p>
        `,
        about: `
            <h1>About Me</h1>
            <p>Details about Edward Bao...</p>
        `,
        contact: `
            <h1>Contact Me</h1>
            <p>Details on how to contact Edward Bao...</p>
        `,
        projects: `
            <h1>My Projects</h1>
            <p>Details about Edward Bao's projects...</p>
        `
    };

    const links = document.querySelectorAll('.links');
    const contentDiv = document.getElementById('content');

    links.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const contentKey = event.target.getAttribute('data-content');
            contentDiv.innerHTML = content[contentKey];
        });
    });

    // Load home content by default
    contentDiv.innerHTML = content.home;
});

