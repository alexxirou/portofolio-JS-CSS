function showContent() {
  const preloader = document.querySelector('.preloader');
  const content = document.querySelector('.content');
  const h1Element = document.querySelector('.loading-title');
  const mainPage = document.querySelector('.main-page');

  // Add a class to hide the preloader after the transition ends
  preloader.addEventListener('transitionend', function () {
    preloader.style.display = 'none';
  });

  // Delay the visibility of the preloader for a certain duration (e.g., 2 seconds)
  setTimeout(function () {
    preloader.classList.add('visible');
  }); // Adjust the delay to your desired time (in milliseconds)

  // Add the "visible" class to show the content section
  setTimeout(function () {
    content.classList.remove('hidden');
  }, 2500);

  // Add an animation class to slide up the preloader
  setTimeout(function () {
    preloader.classList.add('slide-up');
  }, 2500); // Keep the delay at 100 milliseconds for the animation

  setTimeout(function () {
    // Make the main-page visible
    mainPage.style.display = 'block';
  }, 5500);

  let opacity = 1;
  const fadeOutInterval = setInterval(function () {
    opacity -= 0.05;
    h1Element.style.opacity = opacity;
    if (opacity <= 0) {
      clearInterval(fadeOutInterval);
      h1Element.style.display = 'none';
    }
  }, 180); // Adjust the interval time (in milliseconds) for the gradual fade-out effect

  // Hide the preloader after a certain duration
  setTimeout(function () {
    preloader.style.display = 'none';
  }, 5500); // Adjust the delay to your desired time (in milliseconds)
}