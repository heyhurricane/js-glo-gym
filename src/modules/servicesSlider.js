"use strict";

const servicesSlider = () => {
  const slider = document.querySelector('.services-slider'),
        slide = slider.querySelectorAll('.slide');

  let currentSlide = 0, nextSlideIndex = 0;

    const prevSlide = (elem, index, strClass) => { 
      elem[index].classList.remove(strClass);
      elem[index].style.display ='none';
    };

    const nextSlide = (elem, index, strClass)  => { 
      elem[index].classList.add(strClass);
      elem[index].style.display ='block';
    };

    // const autoPlaySlide = () => {
    //   prevSlide(slide, currentSlide, 'slide--active');
    //   if (currentSlide > nextSlideIndex) {
    //     nextSlideIndex++;
    //   }
    //   else {
    //     nextSlideIndex = currentSlide + 5;
    //   }
    //   currentSlide++;
    //   if (currentSlide >= slide.length) {
    //     currentSlide = 0;
    //   }
    //   if (nextSlideIndex >= slide.length) {
    //     nextSlideIndex = 0;
    //   }
    //   nextSlide(slide, nextSlideIndex, 'slide--active');
    // };

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
          nextSlideIndex = currentSlide + 5;
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
};

export default servicesSlider;