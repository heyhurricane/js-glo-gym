'use strict';

const burgerMenu = () => {
  const burgerBtn = document.querySelectorAll('.hidden-large')[0],
        desktopNav = document.querySelector('.hidden-small'),
        navBlock = document.querySelector('.header-main'),
        popupMenu = document.querySelector('.popup-menu'),
        menuItems = popupMenu.querySelectorAll('ul>li>a');

  let isActive = false;       

  const handlerMenu = () => {
    popupMenu.classList.toggle('hidden-large');
    if (!isActive) {
      popupMenu.style.display = 'flex';
    }
    else {
      popupMenu.style.display = 'none';
    }
    isActive = !isActive;
  };

  if (window.innerWidth < 768) {
    burgerBtn.style.display = 'block';
    desktopNav.style.display = 'none';
  }

  navBlock.addEventListener('click', (event) => {
    let target = event.target;
    target = target.closest('.menu-button img');
    if (target) {
      handlerMenu();
    }
    else {
      target = event.target;
      target = target.closest('.close-menu-btn');
      if (target) {
        handlerMenu();
      }
      else {
        target = event.target;
        menuItems.forEach((elem) => {
          if (elem === target) {
            handlerMenu();
          }
        });
      }
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth <= 768) {
      burgerBtn.style.display = 'block';
      desktopNav.style.display = 'none';
    }
    else {
      burgerBtn.style.display = 'none';
      desktopNav.style.display = 'flex';
    }
  });


};

export default burgerMenu;