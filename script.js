document.addEventListener('DOMContentLoaded', function() {
    const reposContainer = document.getElementById('repos-container');
    const avatar = document.getElementById('avatar');
    const username = document.getElementById('username');
    const bio = document.getElementById('bio');
    const aboutMe = document.getElementById('about-me');

    // Load profile information
    fetch('https://api.github.com/users/the13joker1')
        .then(response => response.json())
        .then(data => {
            avatar.src = data.avatar_url;
            username.textContent = data.name || data.login;
            bio.textContent = data.bio || 'No bio available';
        })
        .catch(error => {
            bio.textContent = 'Error loading bio information.';
            console.error('Error fetching profile:', error);
        });

    // Load README file as "About Me" section
    fetch('https://api.github.com/repos/the13joker1/the13joker1/readme', {
        headers: { Accept: 'application/vnd.github.VERSION.html' }
    })
        .then(response => response.text())
        .then(data => {
            aboutMe.innerHTML = data;
        })
        .catch(error => {
            aboutMe.textContent = 'Error loading README.';
            console.error('Error fetching README:', error);
        });

    // Load repositories
    fetch('https://api.github.com/users/the13joker1/repos')
        .then(response => response.json())
        .then(repos => {
            reposContainer.innerHTML = '';
            repos.forEach(repo => {
                const repoElement = document.createElement('div');
                repoElement.classList.add('repo');
                repoElement.innerHTML = `
                    <a href="${repo.html_url}" target="_blank">${repo.name}</a>
                    <p>${repo.description ? repo.description : 'No description available'}</p>
                    <p class="stars">⭐ ${repo.stargazers_count} Stars</p>
                    <p>Forks: ${repo.forks_count}</p>
                    <p>Language: ${repo.language}</p>
                `;
                reposContainer.appendChild(repoElement);
            });
        })
        .catch(error => {
            reposContainer.innerHTML = '<p>Error loading repositories. Please try again later.</p>';
            console.error('Error fetching repositories:', error);
        });
});
