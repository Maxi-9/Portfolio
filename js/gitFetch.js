// Name: Max Schwickert
// Date: Nov 30th 2024
// MEID: MAX2155621
// For the Portfolio Page: Event, DOM, Conditional, Fetch
document.addEventListener('DOMContentLoaded', () => {
    // GitHub API Integration for Portfolio Page
    const projectsContainer = document.getElementById('projects-container');
    const filter = document.getElementById('filter');
    if (projectsContainer) {
        fetch('https://api.github.com/users/Maxi-9/repos')
            .then(response => response.json())
            .then(data => {
                data.forEach(repo => {
                    if (repo.name !== "Maxi-9") {
                        // Fetch .proj folder contents
                        fetch(`https://api.github.com/repos/Maxi-9/${repo.name}/contents/.proj`)
                            .then(res => {
                                if (res.ok) return res.json();
                                throw new Error('No .proj folder found');
                            })
                            .then(files => {
                                // Find image.png and desc.txt in the .proj folder
                                const imageFile = files.find(file => file.name === 'image.png');
                                const descFile = files.find(file => file.name === 'desc.txt');

                                const card = document.createElement('div');
                                card.classList.add('project-card');

                                // Project Image
                                const img = document.createElement('img');
                                img.src = imageFile ? imageFile.download_url : `https://via.placeholder.com/250x150.png?text=${encodeURIComponent(repo.name)}`;
                                img.alt = `${repo.name} Image`;
                                card.appendChild(img);

                                // Project Title
                                const title = document.createElement('h3');
                                title.textContent = repo.name;
                                card.appendChild(title);

                                // Project Description
                                const desc = document.createElement('p');
                                desc.textContent = repo.description || 'No description provided.';
                                card.appendChild(desc);

                                // Project Skills
                                const skills = document.createElement('p');
                                skills.classList.add('skills');
                                if (descFile) {
                                    fetch(descFile.download_url)
                                        .then(skillRes => skillRes.text())
                                        .then(skillText => {
                                            skills.textContent = skillText;
                                            // Add a data attribute for filtering
                                            card.dataset.skills = skillText.toLowerCase();
                                        })
                                        .catch(err => {
                                            console.error('Error fetching desc.txt:', err);
                                            skills.textContent = 'No skills provided.';
                                            // Add a data attribute for filtering
                                            card.dataset.skills = 'no skills provided';
                                        });
                                } else {
                                    skills.textContent = 'No skills provided.';
                                    // Add a data attribute for filtering
                                    card.dataset.skills = 'no skills provided';
                                }
                                card.appendChild(skills);

                                // Link to GitHub
                                const link = document.createElement('a');
                                link.href = repo.html_url;
                                link.textContent = 'View on GitHub';
                                link.target = '_blank';
                                card.appendChild(link);

                                projectsContainer.appendChild(card);
                            })
                            .catch(err => {
                                console.error(`Error fetching .proj folder for ${repo.name}:`, err);
                            });
                    }
                });
            })
            .catch(error => {
                console.error('Error fetching GitHub repositories:', error);
                projectsContainer.innerHTML = '<p>Failed to load projects.</p>';
            });

        filter.addEventListener('change', () => {
            const selectedValue = filter.value.toLowerCase();
            const cards = projectsContainer.querySelectorAll('.project-card');
            cards.forEach(card => {
                const skills = card.dataset.skills || '';
                if (selectedValue === 'all' || skills.includes(selectedValue)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }
});