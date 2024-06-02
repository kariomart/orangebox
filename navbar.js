function addNavListeners() {
    // Get all the .nav-item elements within the proj-nav container
    const navItems = document.querySelectorAll('.nav-item');

    // Iterate over each .nav-item and add the event listener to the nested <h2> element
    navItems.forEach(navItem => {
        const h2 = navItem.querySelector('h2');
        h2.addEventListener('click', () => {
            // Perform desired action when an <h2> element is clicked
            console.log(`Clicked on ${h2.textContent}`);
            // Scroll to the corresponding section on the page
            const sectionId = h2.textContent.toLowerCase();
            const section = document.getElementById(sectionId);
            if (section) {
                section.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

addNavListeners();


