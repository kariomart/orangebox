// Fetch the projects data from the JSON file
async function fetchProjectsData() {
    try {
        const response = await fetch('http://localhost/CaseStudies.json');
        const data = await response.json();
        return data.projects;
    } catch (error) {
        console.error('Error fetching projects data:', error);
        return [];
    }
}

// Update the content of the HTML page
async function updatePageContent() {
    // Fetch the projects data
    const projects = await fetchProjectsData();

    // Retrieve the project name from the data attribute
    const projectName = document.body.getAttribute('data-project-name');
    console.log("updating " + projectName + " content");

    // Find the appropriate project based on the project name
    const project = projects.find(project => project.name === projectName);

    if (project) {
        // Update the header image
        const headerImage = document.querySelector(".header img");
        headerImage.src = `CaseStudies/${project.name}/header.png`;

        // Update the left column content
        const leftColumn = document.querySelector(".content .left-column");
        leftColumn.innerHTML = `<p>${project.description}</p>
                              <br>
                              <h3>insight</h3>
                              <p>${project.insight}</p>
                              <br>
                              <h3>solution</h3>
                              <p>${project.solution}</p>
                              <br>
                              <h3>value</h3>
                              <p>${project.value}</p>`;

        // Update the right column images

        const imageContainer = document.querySelector(".content .right-column .image-container");
        imageContainer.innerHTML = '';
        //   imageContainer.innerHTML = project.images.map(image => `<img src="images/CaseStudies/${project.projectName}/images/${image}" alt="Image ${image}">`).join("");
        for (let i = 1; i < 5; i++) {
            const imgPath = "CaseStudies/"+project.name+"/images/image" + i + ".png";
            // if (imgPath.naturalWidth === 0 ) {break;};
            const img = document.createElement('img');
            img.src = imgPath;
            imageContainer.appendChild(img);
        }

        const imgs = document.querySelectorAll(".content .right-column .image-container img")
        console.log(imgs);
        imgs.forEach(image => {
            if (image.naturalWidth === 0) {
                console.log("removing image tag!");
                image.remove();
            }
        });

        // Update the process section
        const processSection = document.querySelector(".process-section");
        processSection.innerHTML = "<h2>Process</h2>";
    }
}

// Call the function to update the page content
updatePageContent();
