let scrolling = false;
let scrollTimeout;
let lastScrollPosition = 0;
let startScrollSection;

function getScrollDirection() {
  const currentScrollPosition = window.pageYOffset;
  return currentScrollPosition > lastScrollPosition ? 1 : -1;
}

function scrollToNextSection() {
  const sections = document.querySelectorAll('.project');
  const currentScrollPosition = window.pageYOffset + (window.innerHeight / 2);
  const scrollDirection = getScrollDirection();
  let nextSection;

  sections.forEach((section) => {
    const distance = section.offsetTop - currentScrollPosition;
    if (
      (scrollDirection === 1 && distance > 0) ||
      (scrollDirection === -1 && distance < 0)
    ) {
      nextSection = section;
      return;
    }
  });

  if (nextSection) {
    window.scrollTo({
      top: nextSection.offsetTop,
      behavior: 'smooth'
    });
  }
}

window.addEventListener('scroll', () => {
  clearTimeout(scrollTimeout);
  scrolling = true;

  if (!scrolling) {
    startScrollSection = document.elementFromPoint(
      window.innerWidth / 2,
      window.innerHeight / 2
    );
  }

  lastScrollPosition = window.pageYOffset;

  scrollTimeout = setTimeout(() => {
    scrolling = false;
    scrollToNextSection();
  }, 100);
});
