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

    // Add a container for the overlapping avatars
    const avatarContainer = document.createElement('div');
    avatarContainer.setAttribute('class', 'avatar-container');

    let contributerArray = [];

    data.slice(0, 4).forEach(contributor => {  // Limiting to 4 contributors as per the image
      const contributorAvatar = document.createElement('img');
      contributorAvatar.src = contributor.avatar_url;
      contributorAvatar.alt = `${contributor.login}'s avatar`;
      contributorAvatar.classList.add('contributor-avatar');  // Add class for avatar styling
      
      contributerArray.push(`${contributor.login}`);

      // Append each avatar to the avatarContainer
      avatarContainer.appendChild(contributorAvatar);
    });

    // Add a counter if more than 4 contributors exist
    if (data.length > 4) {
      const moreContributors = document.createElement('div');
      moreContributors.classList.add('more-contributors');
      moreContributors.textContent = `+${data.length - 4}`;  // Show how many more contributors
      avatarContainer.appendChild(moreContributors);

      contributerArray.push(`${data.length - 4}`); 
    }

    let title = "";
    for (let i = 0; i < contributerArray.length; i++) {
      if (i == contributerArray.length-1) {
        title = title+"+"+contributerArray[i];
      } else {
        title = title+contributerArray[i]+", ";
      }
    }

    repoDiv.setAttribute('title', `${title}`)

    contributorsDiv.appendChild(avatarContainer);  // Add avatarContainer to contributorsDiv

    repoDiv.appendChild(contributorsDiv);  // Append to the repository's div
  })
  .catch(error => console.error('Error fetching contributors:', error));
}
