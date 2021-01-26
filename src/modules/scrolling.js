'use strict';

const scrolling = () => {
  const btnScrollUp = document.getElementById('totop');
  btnScrollUp.style.display = 'none';
  const burgerMenu = document.querySelector(".menu-button");

  const toggleFixedMenu = (position, num) => {
    document.querySelector(".top-menu").style.position = position;
    document.querySelector(".top-menu").style.top = num;
    document.querySelector(".top-menu").style.left = num;
    document.querySelector(".top-menu").style.right = num;
  };

  const scrollLinks = document.querySelectorAll('.scroll a[href*="#"], .about a[href*="#"], .for-clients a[href*="#"]');

  const scrollingDown = () => {
    scrollLinks.forEach((anchor) => {
      if (anchor.attributes.href.value !== "index.html#clubs") {
        anchor.addEventListener('click', (elem) => {
          elem.preventDefault();
          const blockID = anchor.getAttribute('href').substr(1);
          if (document.getElementById(blockID) !== null) {
            document.getElementById(blockID).scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
          }
        });
      }
    });
  };

  scrollingDown();

  window.addEventListener('scroll', () => {
    if (burgerMenu.style.display === 'block') {
      if (window.pageYOffset > 0) {
        if (document.querySelector(".top-menu") !== null) {
          toggleFixedMenu('fixed', '0');
        }
      } else {
        if (document.querySelector(".top-menu") !== null) {
          toggleFixedMenu('static', '');
        }
      }
    }
    else {
      toggleFixedMenu('static', '');
    }
    const sectionHeight = document.querySelector(".header-main").scrollHeight;
    if (window.pageYOffset >= sectionHeight) {
      btnScrollUp.style.display = 'block';
    }
    else {
      btnScrollUp.style.display = 'none';
    }
  });

  btnScrollUp.addEventListener('click', (event) => {
    event.preventDefault();
    document.querySelector('.head-main').scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  });

};

export default scrolling;