"use strict";

const gallerySlider = () => {
  const slider = document.querySelector('.gallery-slider'),
        slide = slider.querySelectorAll('.slide'),
        sliderDots = document.querySelector('.slider-dots');

    for (let i = 0; i < slide.length; i++) {
      const li = document.createElement('li');
      li.classList.add('dot');
      sliderDots.append(li);
    }

    const dot = document.querySelectorAll('.dot');
    dot[0].classList.add('dot-active');
  
  let currentSlide = 0,
    interval;

    const prevSlide = (elem, index, strClass) => { 
      elem[index].classList.remove(strClass);
    };

    const nextSlide = (elem, index, strClass)  => { 
      elem[index].classList.add(strClass);
    };

    const autoPlaySlide = () => {
      prevSlide(slide, currentSlide, 'slide--active');
      prevSlide(dot, currentSlide, 'dot-active');
      currentSlide++;
      if (currentSlide>=slide.length) {
        currentSlide = 0;
      }
      nextSlide(slide, currentSlide, 'slide--active');
      nextSlide(dot, currentSlide, 'dot-active');
    };

    const startSlide = (time = 3000) => {
      interval = setInterval(autoPlaySlide, time);
    };

    const stopSlide = () => {
      clearInterval(interval);
    };

    startSlide(4000);

    slider.addEventListener('click', (event) => {
      event.preventDefault();
      let target = event.target;

      if (!target.matches('.gallery-slider-btn, .dot')) {
        return;
      }
      
      prevSlide(slide, currentSlide, 'slide--active');
      prevSlide(dot, currentSlide, 'dot-active');

      if (target.matches('.gallery-slider-btn-next')) {
        currentSlide++;
      }
      else if (target.matches('.gallery-slider-btn-prev')) {
        currentSlide--;
      }
      else if (target.matches('.dot')) {
        dot.forEach((elem, index) => {
          if (elem === target) {
            currentSlide = index;
          }
        });
      }

      if (currentSlide >= slide.length) {
        currentSlide = 0;
      }
      if (currentSlide < 0) {
        currentSlide = slide.length - 1;
      }
      nextSlide(slide, currentSlide, 'slide--active');
      nextSlide(dot, currentSlide, 'dot-active');

    });

    slider.addEventListener('mouseover', (event) => {
      let target = event.target;

      if (target.matches('.gallery-slider-btn, .dot')) {
        stopSlide();
      }
    });

    slider.addEventListener('mouseout', (event) => {
      let target = event.target;

      if (target.matches('.gallery-slider-btn, .dot')) {
        startSlide(4000);
      }
    });

        
};


export default gallerySlider;