"use strict";

const togglePopUp = () => {
  const popupFreeVisit = document.getElementById('free_visit_form'),
        openPopUp = document.querySelector('.open-popup'),
        callbackBtn = document.querySelectorAll('.callback-btn'),
        popupCallback = document.getElementById('callback_form'),
        gift = document.querySelector('.fixed-gift'),
        popupGift = document.getElementById('gift'),
        popupThanks = document.getElementById('thanks');

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

  if (popupGift) {
    popupGift.addEventListener('click', ((event) => {
      let target = event.target;
      popupClose(popupGift, target);
    }));

    gift.addEventListener('click', (event) => {
      event.preventDefault();
      popupGift.style.display = 'block';
      gift.style.display = 'none';
    });
  }

  popupThanks.addEventListener('click', ((event) => {
    let target = event.target;
    popupClose(popupThanks, target);
  }));
  
};

export default togglePopUp;