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
function animateTextMorph() {
  const elts = {
    text1: document.getElementById("text1"),
    text2: document.getElementById("text2")
  };

  const texts = [
    "Front-end",
    "Back-end",
    "Server-setup",
    "Networking"
  ];

  let textIndex = texts.length - 1;
  let time = new Date();
  let morph = 0;
  let cooldown = 0.25;

  elts.text1.textContent = texts[textIndex % texts.length];
  elts.text2.textContent = texts[(textIndex + 1) % texts.length];

  function doMorph() {
    morph -= cooldown;
    cooldown = 0;

    let fraction = morph / 1;

    if (fraction > 1) {
      cooldown = 0.8;
      fraction = 1;
    }

    setMorph(fraction);
  }

  function setMorph(fraction) {
    elts.text2.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
    elts.text2.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

    fraction = 1 - fraction;
    elts.text1.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
    elts.text1.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

    elts.text1.textContent = texts[textIndex % texts.length];
    elts.text2.textContent = texts[(textIndex + 1) % texts.length];
  }

  function doCooldown() {
    morph = 0;

    elts.text2.style.filter = "";
    elts.text2.style.opacity = "100%";

    elts.text1.style.filter = "";
    elts.text1.style.opacity = "0%";
  }

  function animate() {
    requestAnimationFrame(animate);

    let newTime = new Date();
    let shouldIncrementIndex = cooldown > 0;
    let dt = (newTime - time) / 1000;
    time = newTime;

    cooldown -= dt;

    if (cooldown <= 0) {
      if (shouldIncrementIndex) {
        textIndex++;
      }

      doMorph();
    } else {
      doCooldown();
    }
  }

  animate();
}

// Call the function to start the animation
animateTextMorph();
