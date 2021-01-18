'use strict';

const scrolling = () => {
  const btnScrollUp = document.getElementById('totop');
  btnScrollUp.style.display = 'none';
  const burgerMenu = document.querySelector(".menu-button");
  window.addEventListener('scroll', () => {
    if (burgerMenu.style.display === 'block') {
      if (window.pageYOffset > 0) {
        if (document.querySelector(".top-menu") !== null) {
          document.querySelector(".top-menu").style.position = "fixed";
          document.querySelector(".top-menu").style.top = '0';
          document.querySelector(".top-menu").style.left = '0';
          document.querySelector(".top-menu").style.right = '0';
        }
      } else {
        if (document.querySelector(".top-menu") !== null) {
          document.querySelector(".top-menu").style.position = "static";
        }
      }
    }
    const sectionHeight = document.querySelector(".header-main").scrollHeight;
    if (window.pageYOffset >= sectionHeight) {
      btnScrollUp.style.display = 'block';
    }
    else {
      btnScrollUp.style.display = 'none';
    }
  });



};

export default scrolling;