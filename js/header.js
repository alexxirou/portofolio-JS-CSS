const root = document.querySelector(".front-page");
const bg = document.querySelector(".backdrop-image");

const positions = [];

const handleMove = (e) => {
  let x, y;

  if (e.touches) {
    // Touch events
    x = -(e.touches[0].pageX + bg.offsetLeft) / 100; // Increase divisor value for more pronounced horizontal movement
    y = 0; // Set y value to 0 for horizontal parallax on mobile
  } else {
    // Mouse events
    x = -(e.pageX + bg.offsetLeft) / 200;
    y = -(e.pageY + bg.offsetTop) / 500;
  }

  positions.push({ x, y });
  const averageCount = 10;
  if (positions.length > averageCount) positions.splice(0, 1);

  const current = positions.reduce(
    (acc, e) => {
      acc.x += e.x;
      acc.y += e.y;
      return acc;
    },
    { x: 0, y: 0 }
  );
  current.x /= positions.length;
  bg.style.transform = `translate(${current.x}px, ${current.y}px)`;
};

root.addEventListener("mousemove", handleMove);
root.addEventListener("touchmove", handleMove);



function showContent() {
  const preloader = document.querySelector('.preloader');
  const content = document.querySelector('.content');
  const h1Element = document.querySelector('.loading-title');
  const mainPage = document.querySelector('.main-page');

  // Add a class to hide the preloader after the transition ends
  preloader.addEventListener('transitionend', function() {
    preloader.classList.add('hidden');
  });

  // Delay the visibility of the preloader for a certain duration (e.g., 2 seconds)
  setTimeout(function() {
    preloader.classList.add('visible');
  }); // Adjust the delay to your desired time (in milliseconds)

  // Add the "visible" class to show the content section
  setTimeout(function() {
  content.classList.remove('hidden')},3500);


  // Add an animation class to animate the content from top to bottom
  setTimeout(function() {
    content.classList.add('animate');
  }, 3500); // Keep the delay at 100 milliseconds for the animation


  setTimeout(function(){ 
    // Make the main-page visible
    mainPage.style.display = 'block';
  },6500);

  let opacity = 1;
  const fadeOutInterval = setInterval(function() {
    opacity -= 0.05;
    h1Element.style.opacity = opacity;
    if (opacity <= 0) {
      clearInterval(fadeOutInterval);
      h1Element.style.display = 'none';

    }
  }, 180); // Adjust the interval time (in milliseconds) for the gradual fade-out effect


}
