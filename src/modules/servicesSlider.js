"use strict";

const servicesSlider = () => {
  const slider = document.querySelector('.services-slider'),
        slide = slider.querySelectorAll('.slide');
  let activeSlides = slider.querySelectorAll('.slide--active');
  let numActiveSlide = 5;

  let currentSlide = 0, nextSlideIndex = 0;

    const prevSlide = (elem, index, strClass) => { 
      elem[index].classList.remove(strClass);
      elem[index].style.display ='none';
    };

    const nextSlide = (elem, index, strClass)  => { 
      elem[index].classList.add(strClass);
      elem[index].style.display ='block';
    };

   slider.addEventListener('click', (event) => {
      event.preventDefault();
      let target = event.target;

      if (!target.matches('.slider-btn')) {
        return;
      }
    
      if (target.matches('.slider-btn-next')) {
        if ((nextSlideIndex + 1) >= slide.length) {
          return;
        }
        
        prevSlide(slide, currentSlide, 'slide--active');

        if (currentSlide > nextSlideIndex) {
          nextSlideIndex++;
        }
        else {
          nextSlideIndex = currentSlide + numActiveSlide;
        }
        currentSlide++;
        if (currentSlide >= slide.length) {
          currentSlide = 0;
        }
        if (currentSlide < 0) {
          currentSlide = slide.length - 1;
        }
        if (nextSlideIndex  < 0) {
          nextSlideIndex = slide.length - 1;
        }
        nextSlide(slide, nextSlideIndex, 'slide--active');
      }
      else if (target.matches('.slider-btn-prev')) {
        if (currentSlide === 0) {
          return;
        }

        prevSlide(slide, nextSlideIndex, 'slide--active');

        if (currentSlide > nextSlideIndex) {
          nextSlideIndex--;
        }
        else {
          nextSlideIndex--;
        }
        currentSlide--;
        if (currentSlide >= slide.length) {
          currentSlide = 0;
        }
        if (currentSlide < 0) {
          currentSlide = slide.length - 1;
        }
        if (nextSlideIndex  < 0) {
          nextSlideIndex = slide.length - 1;
        }
        nextSlide(slide, currentSlide, 'slide--active');
      }

      

    });

  const resizeSlider = (activeSlide, numDelete, numAdd) => {
    if (activeSlide.length === numDelete) {
      activeSlide[activeSlide.length - 1].classList.remove('slide--active');
    }
    else {
      if (activeSlide.length < numAdd) {
        do {
          slide[activeSlide.length].classList.add('slide--active');
          activeSlide = slider.querySelectorAll('.slide--active');
        }
        while (activeSlide.length < numAdd);
      }
      else if (activeSlide.length > numAdd) {
        do {
          slide[activeSlide.length-1].classList.remove('slide--active');
          activeSlide = slider.querySelectorAll('.slide--active');
        }
        while (activeSlide.length > numAdd);
      }
    }
  };

  const windowResize = (activeSlide) => {
    if (window.innerWidth > 992) {
      numActiveSlide = 5;
      resizeSlider(activeSlide, 6, 5);
    }
    if (window.innerWidth <= 992 && window.innerWidth >= 768) {
      numActiveSlide = 4;
      resizeSlider(activeSlide, 5, 4);
    }
    if (window.innerWidth < 768 && window.innerWidth >= 577) {
      numActiveSlide = 3;
      resizeSlider(activeSlide, 4, 3);
    }
    if (window.innerWidth <= 576 && window.innerWidth >= 480) {
      numActiveSlide = 2;
      resizeSlider(activeSlide, 3, 2);
    }
    if (window.innerWidth < 480) {
      numActiveSlide = 1;
      resizeSlider(activeSlide, 2, 1);
    };
  };

  windowResize(activeSlides);

  window.addEventListener('resize', () => {
    activeSlides = slider.querySelectorAll('.slide--active');
    windowResize(activeSlides);
  });
};

export default servicesSlider;