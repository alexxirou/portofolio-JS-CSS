
function sliderInit() {
    const slides = document.querySelectorAll('.slide');
    const dotContainer = document.querySelector('.dots');
    const btnRight = document.querySelector('.slider__btn--right');
    const btnLeft = document.querySelector('.slider__btn--left');
    let curSlide = 0;
    const maxSlide = slides.length;
  
    function createDots() {
      slides.forEach(function (_, i) {
        dotContainer.insertAdjacentHTML(
          'beforeend',
          `<button class="dots__dot" data-slide="${i}"></button>`
        );
      });
    }
  
    function goToSlide(slide) {
      slides.forEach((s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`));
    }
  
    function nextSlide() {
      curSlide = (curSlide + 1) % maxSlide; // Use modulo operator
      activateDot(curSlide);
      goToSlide(curSlide);
    }
  
    function prevSlide() {
      curSlide = (curSlide - 1 + maxSlide) % maxSlide; // Use modulo operator
      goToSlide(curSlide);
      activateDot(curSlide);
    }
  
    function activateDot(curSlide) {
      const dots = document.querySelectorAll('.dots__dot');
      dots.forEach(dot => dot.classList.remove('dots__dot--active'));
      dots[curSlide].classList.add('dots__dot--active');
    }
  
    createDots();
    activateDot(0);
    goToSlide(0);
    btnRight.addEventListener('click', nextSlide);
    btnLeft.addEventListener('click', prevSlide);
  }
  
  sliderInit();