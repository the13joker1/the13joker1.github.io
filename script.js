document.addEventListener('DOMContentLoaded', function() {
    const reposContainer = document.getElementById('repos-container');

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
                `;
                reposContainer.appendChild(repoElement);
            });
        })
        .catch(error => {
            reposContainer.innerHTML = '<p>Error loading repositories. Please try again later.</p>';
            console.error('Error fetching repositories:', error);
        });
});
