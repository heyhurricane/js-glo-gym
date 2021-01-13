"use strict";


const selectClubs = () => {
  const clubs = document.querySelector('.club-select');
  let isSelected = false;

  const changeClub = () => {
    const ul = clubs.querySelector('ul');
    if (isSelected) {
      ul.style.display = 'none';
    }
    else { ul.style.display = 'block'; }
    isSelected = !isSelected;
  };
  
  clubs.addEventListener('click', () => {
    changeClub();
  });
};

selectClubs();

const togglePopUp = () => {
  const popupFreeVisit = document.getElementById('free_visit_form'),
        openPopUp = document.querySelector('.open-popup'),
        callbackBtn = document.querySelectorAll('.callback-btn'),
        popupCallback = document.getElementById('callback_form'),
        gift = document.querySelector('.fixed-gift'),
        popupGift = document.getElementById('gift');

  openPopUp.addEventListener('click', (event) => {
    event.preventDefault();
    popupFreeVisit.style.display = 'block';
  });

  callbackBtn.forEach((elem) => {
    elem.addEventListener('click', (event) => {
      event.preventDefault();
      popupCallback.style.display = 'block';
    });
  });

  const popupClose = (modal, target) => {
    if (target.classList.contains('close_icon') || target.classList.contains('close-btn')) {
      modal.style.display = 'none';
    }
    else {
      target = target.closest('.overlay'); 
      if (target) {
        modal.style.display = 'none';
      }
    }
  };

  popupFreeVisit.addEventListener('click', ((event) => {
    let target = event.target;
    popupClose(popupFreeVisit, target);
  }));

  popupCallback.addEventListener('click', ((event) => {
    let target = event.target;
    popupClose(popupCallback, target);
  }));

  popupGift.addEventListener('click', ((event) => {
    let target = event.target;
    popupClose(popupGift, target);
  }));

  gift.addEventListener('click', (event) => {
    event.preventDefault();
    popupGift.style.display = 'block';
    gift.style.display = 'none';
  });
};

togglePopUp();

const mainSlider = () => {
  const slider = document.querySelector('.main-slider'),
        slide = slider.querySelectorAll('.slide');
  
  let currentSlide = 0,
    interval;

    const prevSlide = (elem, index, strClass) => { 
      elem[index].classList.remove(strClass);
      elem[index].style.display ='none';
    };

    const nextSlide = (elem, index, strClass)  => { 
      elem[index].classList.add(strClass);
      elem[index].style.display ='flex';
    };

    const autoPlaySlide = () => {
      prevSlide(slide, currentSlide, 'slide--active');
      currentSlide++;
      if (currentSlide>=slide.length) {
        currentSlide = 0;
      }
      nextSlide(slide, currentSlide, 'slide--active');
    };

    const startSlide = (time = 3000) => {
      interval = setInterval(autoPlaySlide, time);
    };

    startSlide(4000);

        
};

mainSlider();

const servicesSlider = () => {
  const slider = document.querySelector('.services-slider'),
        slide = slider.querySelectorAll('.slide');

  let currentSlide = 0, nextSlideIndex = 0,
    interval;

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

servicesSlider();