function scrollElementIntoView(elementID) {
    let elem = document.getElementById(elementID);
    if (elem) {
        elem.scrollIntoView({ behavior: "smooth" });
    }
}

fetch('https://api.github.com/users/Krone404/repos')
  .then(response => response.json())
  .then(data => {
    const projectsDiv = document.getElementById('github-projects');

    data.forEach(repo => {
      // Check if the description contains the keyword "featured"
      if (repo.description && repo.description.includes('#featured')) {
        const name = repo.name;
        const description = repo.description.replace(" #featured", "");
        const link = 'https://github.com/Krone404/' + name;

        // Create HTML elements for repo details
        const repoDiv = document.createElement('div');
        const repoLink = document.createElement('a');
        const repoName = document.createElement('h3');
        const repoDescription = document.createElement('p');

        repoDiv.setAttribute('class', 'repoCard');
        repoDiv.setAttribute('id', name);

        repoLink.setAttribute('href', link);
        repoLink.setAttribute('target', '_blank');

        repoName.textContent = name;
        repoDescription.textContent = description;

        repoDiv.appendChild(repoLink);
        repoLink.appendChild(repoName);
        repoLink.appendChild(repoDescription);

        // Fetch contributors and append them to the repoDiv
        fetchContributors(name, repoDiv);

        projectsDiv.appendChild(repoDiv); // Append only repos with the "featured" keyword
      }
    });
  })
  .catch(error => console.error('Error fetching repos:', error));

// Fetch contributors and append to the repoDiv
async function fetchContributors(repoName, repoDiv) {
  fetch(`https://api.github.com/repos/Krone404/${repoName}/contributors`)
    .then(response => response.json())
    .then(data => {
      const contributorsDiv = document.createElement('div');
      contributorsDiv.setAttribute('class', 'contributors');

      data.forEach(contributor => {
        // Create elements for contributor details
        const contributorDiv = document.createElement('div');
        const contributorAvatar = document.createElement('img');
        const contributorName = document.createElement('p');

        // Set contributor info
        contributorAvatar.src = contributor.avatar_url;
        contributorAvatar.alt = `${contributor.login}'s avatar`;
        contributorAvatar.style.width = '40px'; // Adjust size if necessary

        contributorName.textContent = contributor.login;

        // Append contributor details to the contributor div
        contributorDiv.appendChild(contributorAvatar);
        contributorDiv.appendChild(contributorName);

        // Append each contributor's details to the contributorsDiv
        contributorsDiv.appendChild(contributorDiv);
      });

      // Append the contributorsDiv to the repository's repoDiv
      repoDiv.appendChild(contributorsDiv);
    })
    .catch(error => console.error('Error fetching contributors:', error));
}
