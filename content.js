let projData;
// Function to fetch the JSON data from projects.json file
async function fetchProjectsData() {
    try {
      const response = await fetch('http://localhost/projects.json');
      const data = await response.json();
      return data.projects;
    } catch (error) {
      console.error('Error fetching projects data:', error);
      return [];
    }
  }

projData = fetchProjectsData();
  
  // Function to generate project divs dynamically
  async function generateProjectDivs() {
    const projectListContainer = document.getElementById('project-list');
    const projectsData = await fetchProjectsData();
  
    // Iterate over each project object in the JSON data
    projectsData.forEach(project => {
      // Create project div
      const projectDiv = document.createElement('div');
      projectDiv.classList.add('project');
  
      // Create details div
      const detailsDiv = document.createElement('div');
      detailsDiv.id = 'details';

      const detailsTypeDiv = document.createElement('div');
      detailsTypeDiv.id = 'detailsType';
  
      // Create project title heading
      const titleHeading = document.createElement('h3');
      titleHeading.textContent = project.title;
  
      // Create project description paragraph
      const descriptionParagraph = document.createElement('p');
      descriptionParagraph.textContent = project.description;
  
      // Create project link
      const projectLink = document.createElement('h5');
      projectLink.href = project.link;
      projectLink.textContent = 'read more ->';
      const tagsDiv = document.createElement('div');
      tagsDiv.classList.add('tags');
  
      // Append elements to details div
      detailsDiv.appendChild(tagsDiv);

      detailsTypeDiv.appendChild(titleHeading);
      detailsTypeDiv.appendChild(descriptionParagraph);
      detailsTypeDiv.appendChild(projectLink);
  
      // Create tags div

      // Check if tags property exists before iterating over it
      if (project.tags) {
        // Iterate over tags and create bubble elements
        project.tags.forEach(tag => {
            const tagBubble = document.createElement('div');
            tagBubble.classList.add('tag-bubble');
            tagBubble.textContent = tag;
            tagsDiv.appendChild(tagBubble);
        });
      }



      // Create project image
      const projectImage = document.createElement('img');
      projectImage.src = `images/projects/${project.image}`;
  
      // Append details div and image to project div
      detailsDiv.append(detailsTypeDiv);
      projectDiv.appendChild(detailsDiv);
      projectDiv.appendChild(projectImage);
      
      

  
      // Append project div to project list container
      projectListContainer.appendChild(projectDiv);
      const section = document.createElement('section');
      section.id = project.title;
      projectDiv.appendChild(section);

      

      // if (project.section.length > 0) {
      //       console.log("section added");
      //       const section = document.createElement('section');
      //       section.id = project.section;
      //       projectDiv.appendChild(section);
      // }
    });
    setupTagButtons(projectsData);
}

function setupTagButtons(projectsData) {
  const tagBubbles = document.querySelectorAll('.index .tag-bubble');
  tagBubbles.forEach(tagBubble => {
    if (tagBubble.textContent === "selected") {
      // tagBubble.classList.remove("selected");
      // tagButtonClicked(projectsData, tagBubble);
    }
    
    tagBubble.addEventListener('click', () => {
      tagButtonClicked(projectsData, tagBubble);
    });
  });
}

function tagButtonClicked(projectsData, tagBubble) {
  const selectedTag = tagBubble.textContent.trim();

  if (!tagBubble.classList.contains("selected")) {
    deselectAllTags();
    tagBubble.classList.add("selected");
  } else {
    tagBubble.classList.remove("selected");
    deselectAllSquares();
    return;
  }


  projectsData.forEach(project => {
    const projectTags = project.tags;
    const projectTitle = project.title;
    let projectHasSelectedTag = false;
    const gridItem = document.querySelector(`a.grid-item[href="#${projectTitle}"]`);

    projectTags.forEach(projectTag => {
      if (projectTag === selectedTag) {
        console.log(projectTitle + " has " + projectTag);
        projectHasSelectedTag = true;
      }
    });

    if (gridItem != null) {
      if (projectHasSelectedTag) {
        gridItem.style.opacity = '1'; // Show gridItem
      } else {
        // console.log(gridItem);
        gridItem.style.opacity = '.15'; // Hide gridItem
      }
    }
  });



}

function deselectAllSquares() {
  const gridItem = document.querySelectorAll("a.grid-item");
    
  gridItem.forEach(item => {
    item.style.opacity = '1'; 
  });  
}

function deselectAllTags() {
  const tags = document.querySelectorAll(".index .tag-bubble");

  tags.forEach(tag => {
    tag.classList.remove("selected");
  });
}

function reselectProperSquares() {
  const tags = document.querySelectorAll(".index .tag-bubble");

  tags.forEach(tag => {
    if (tag.classList.contains("selected")) {
      SelectProjects(tag);  
    }
  });
}

function SelectProjects(tag) {
  const selectedTag = tagBubble.textContent.trim();

  projData.forEach(project => {
    const projectTags = project.tags;
    const projectTitle = project.title;
    let projectHasSelectedTag = false;
    const gridItem = document.querySelector(`a.grid-item[href="#${projectTitle}"]`);

    projectTags.forEach(projectTag => {
      if (projectTag === selectedTag) {
        console.log(projectTitle + " has " + projectTag);
        projectHasSelectedTag = true;
      }
    });

    if (gridItem != null) {
      if (projectHasSelectedTag) {
        gridItem.style.opacity = '1'; // Show gridItem
      } else {
        // console.log(gridItem);
        gridItem.style.opacity = '.15'; // Hide gridItem
      }
    }
  });

}

function findProject(projectsData, projectName) {
  projectsData.forEach(project => {

    if (project.title === projectName) {
      return project;
    } else {
      console.log(projectName + " not found!");
    }
});

}


  
// Call the function to generate project divs
generateProjectDivs();


  