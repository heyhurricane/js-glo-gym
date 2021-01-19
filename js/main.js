"use strict";


const selectClubs = () => {
  const clubs = document.querySelector('.club-select'),
        clubsList = document.querySelector('.clubs-list');
  let isSelected = false;

  const changeClub = () => {
    const ul = clubs.querySelector('ul');
    if (isSelected) {
      ul.style.display = 'none';
    }
    else { ul.style.display = 'block'; }
    isSelected = !isSelected;
  };

  document.body.addEventListener('click', (event) => {
    let target = event.target;
    target = target.closest('.club-select'); 
    if (!target && !event.target.classList.contains('club-select__list') && !event.target.classList.contains('club-select__option') && isSelected) {
      changeClub();
    }
    else {
      if (target) {
        target = event.target;
        console.log(target.classList);
        if (!target.classList.contains('club-select__link')) {
          if (!target.classList.contains('club-select__list') && !target.classList.contains('club-select__option')) {
            changeClub();
          }
        }
        else {
          console.log(target.classList);
        }
      }
    }
  });
  
  // clubs.addEventListener('click', (event) => {
  //   let target = event.target;
  //   console.log(target.classList);
  //   if (!target.classList.contains('club-select__link')) {
  //     if (!target.classList.contains('club-select__list') && !target.classList.contains('club-select__option')) {
  //       changeClub();
  //     }
  //   }
  //   else {
  //     console.log(target.classList);
  //   }
  // });
};

selectClubs();

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

servicesSlider();

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

gallerySlider();

const sendForm = () => {
  const errorMessage ='Что-то пошло не так...',
        loadMessage = 'Идёт отправка...',
        successMessage = 'Отправлено! Мы скоро с Вами свяжемся';

  const forms = document.querySelectorAll('form'); 

  let statusMessage = document.createElement('div');
  
  statusMessage.style.cssText = 'font-size: 2rem;';

  const postData = (body) => {
    return fetch('./server.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });
  };

  // изменение контента модального окна после отправки данных
  const changePopupContent = (form, text, header) => {
    const popup = form.closest('.popup');
    const popupContent = form.childNodes;
    const popupHeader = form.querySelector('h4');
    popupHeader.textContent = header;
    for (let i = 0; i < popupContent.length; i++) {
      if (popupContent[i].nodeName !== '#text' && popupContent[i].nodeName !== 'H4' &&
      popupContent[i].nodeName !== '#comment') {
          popupContent[i].style.display = 'none';
        }
    }
    const newP = document.createElement('p');
    newP.classList.add('message');
    newP.innerHTML = text;
    newP.style.cssText = 'font-size: 20px; color: #fff; font-weight: 500;  margin-top: 30px;';
    form.append(newP);
    setTimeout(() => {
      popup.style.display = 'none';
      popupContent[0].innerHTML = '';
      if (popup.getAttribute('id') === 'callback_form') { popupHeader.textContent = 'Обратный звонок'; }
      else { popupHeader.textContent = 'Записаться на визит'; }
      for (let i = 0; i < popupContent.length; i++) {
        if (popupContent[i].nodeName !== '#text' && popupContent[i].nodeName !== 'H4'&&
          popupContent[i].nodeName !== '#comment') {
            popupContent[i].style.display = 'block';
        }
      }
      form.removeChild(newP);
    }, 4000); 
  };

  // изменение контента модального окна Thanks после отправки данных
  const changeThanksContent = (text, header) => {
    const popup = document.querySelector('#thanks');
    popup.style.display = 'block';
    const popupContent = popup.querySelector('.form-content p');
    const popupHeader = popup.querySelector('.form-content h4');
    popupContent.innerHTML = text;
    popupHeader.textContent = header;    
    setTimeout(() => {
      popup.style.display = 'none';
    }, 4000); 
  };

  forms.forEach((form) => {
    if (form.getAttribute('id') === 'footer_form') {
      form.addEventListener('click', () => {
        const formInput = forms[3].querySelector('#callback_form1-phone');
        formInput.value = form.querySelectorAll('input')[2].value;
      });
    }
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const inputs = form.querySelectorAll('input');
      if (form.getAttribute('id') === 'form1' || form.getAttribute('id') === 'form2') { 
        statusMessage.style.color = '#FFF';
      }
      statusMessage.textContent = '';
      let count = 0;
      inputs.forEach((input) => {
        let newMistake;
        if (form.getAttribute('id') === 'form1' || form.getAttribute('id') === 'card_order' || form.getAttribute('id') === 'form2') { 
          newMistake = document.createElement('span');
        }
        else {
          newMistake = document.createElement('div');
        }
        const mistake = newMistake;
        mistake.classList.add('mistake');
        if (form.getAttribute('id') === 'form1' || form.getAttribute('id') === 'card_order' || form.getAttribute('id') === 'form2') { 
          if (input.classList.contains('form-check')) {
            if (input.parentNode.childNodes.length === 4) { input.parentNode.childNodes[3].remove(); }
          }
          else if (input.parentNode.childNodes.length === 2) { input.parentNode.childNodes[1].remove(); }
        }
        else {
          if (form.getAttribute('id') === 'footer_form') {
            if (input.parentNode.childNodes.length === 2) { input.parentNode.childNodes[1].remove(); }
            if (input.parentNode.childNodes.length === 5) { input.parentNode.childNodes[4].remove(); }
          } 
          else {
            if (input.parentNode.childNodes.length === 4) { input.parentNode.childNodes[3].remove(); }
            else if (input.classList.contains('form-check')) {
              if (input.parentNode.parentNode.childNodes.length === 4) { input.parentNode.parentNode.childNodes[3].remove(); }
            }
          }
        }
        mistake.style.cssText = 'font-size: 1rem; color: tomato; left: 2%; bottom: -2.5rem; position: static;';
        if (window.innerWidth >= 768 && form.getAttribute('id') !== 'footer_form') {
          mistake.style.cssText += 'position: absolute'; 
        }
        else {
          mistake.style.cssText += 'display: block; margin-bottom: 1rem;';
        }
       
        if (form.getAttribute('id') === 'form1' || form.getAttribute('id') === 'card_order' || form.getAttribute('id') === 'form2') { 
          mistake.style.cssText = 'font-size: 1rem; color: tomato; left: 2%;';
          if (form.getAttribute('id') === 'card_order') {
             mistake.style.cssText += 'margin-left: 30px; margin-bottom: 0.5rem;';
          }
          else { mistake.style.cssText += 'margin-top: 0.4rem;'; }
        }
        if (input.classList.contains('form-name') && (input.value.length < 2 || input.value.length > 50)) {
          mistake.textContent = 'Имя должно быть от 2 до 50 символов';
          input.parentNode.append(mistake);
          count++;
        }
        if (input.classList.contains('form-phone') && input.value.length < 18) {
          if (form.getAttribute('id') === 'footer_form') {
            mistake.style.cssText = 'font-size: 1rem; color: tomato; line-height: 1.2; text-align: left; margin-bottom: 0.4rem;';
            mistake.innerHTML = 'Номер должен содержать<br>11 символов';
          }
          else { mistake.textContent = 'Номер должен содержать 11 символов'; }
          input.parentNode.append(mistake);
          count++;
        }
        if (input.getAttribute('name') === 'club-name') {
          const checkClub = form.querySelectorAll('[name="club-name"]');
          let countCheck = 0;
          checkClub.forEach((check) => {
            if (check.checked === false) { countCheck++; }
          });
          if (countCheck === 2) { 
            if (input.getAttribute('id') === "footer_leto_schelkovo") {
              mistake.textContent = 'Выберите клуб';
              //  mistake.style.cssText += 'position: absolute'; 
              input.parentNode.append(mistake);
              count++;
            }
          }
        }
        if (input.classList.contains('form-check') && input.checked === false) {
          if (window.innerWidth >= 768) {
            mistake.style.cssText = 'font-size: 1rem; color: tomato; left: 0; margin-top: 0.4rem;';
          }
          else {
            mistake.style.cssText = 'font-size: 1rem; color: tomato; left: 0; top: -2rem;';
          }
          
          mistake.textContent = 'Необходимо подтвердить согласие!';
          if (input.getAttribute('id') === 'check' || input.getAttribute('id') === 'check2' || form.getAttribute('id') === 'card_order' ) {
            input.parentNode.append(mistake);
          }
          else {
            input.parentNode.parentNode.append(mistake);
          }
          count++;
        }
      });
      if (count === 0) {
        statusMessage.textContent = loadMessage;
        form.append(statusMessage);

        const formData = new FormData(form);
        let body = {};
      
        formData.forEach((val, key) => {
          body[key] = val;
        });
        
        postData(body)
          .then((response) => {
            if (response.status !== 200) {
              throw new Error("Status network isn't 200");
            }
            statusMessage.textContent = '';
            if (form.getAttribute('id') === 'banner-form' || form.getAttribute('id') === 'card_order' || form.getAttribute('id') === 'footer_form') {
              changeThanksContent('Ваша заявка отправлена. <br> Мы свяжемся с вами в ближайшее время.', 'Спасибо!');
            }
            else {
              changePopupContent(form, 'Ваша заявка отправлена. <br> Мы свяжемся с вами в ближайшее время.', 'Спасибо!');
            }
            if (form.getAttribute('id') === 'card_order') {
              inputs[0].checked = true;
              for (let i = 6; i < inputs.length; i++) {
                if (i === 7) { 
                  if (!inputs[i].classList.contains('form-phone-club')) { continue; }
                }
                inputs[i].value = '';
                if (inputs[i].classList.contains('form-check')) { inputs[i].checked = false;}
              }
            }
            else {
              if (form.getAttribute('id') === 'footer_form') {
                inputs[2].value = '';
              } 
              else {
                inputs.forEach((input) => {
                  input.value = '';
                  if (input.classList.contains('form-check')) { input.checked = false;}
                });
              }
            }
          })
          .catch((error) => { 
            statusMessage.textContent = '';
            console.error(error);    
            if (form.getAttribute('id') === 'banner-form' || form.getAttribute('id') === 'card_order' || form.getAttribute('id') === 'footer_form') {
              changeThanksContent(errorMessage, 'Ошибка!');
            }
            else {
              changePopupContent(form, errorMessage, 'Ошибка!');
            }
          });
      }

    });
  });

};

sendForm();

const maskPhone = (selector, masked = '+7 (___) ___-__-__') => {
  const elems = document.querySelectorAll(selector);

  const mask = (event) => {
    const target = event.target;
    const keyCode = event.keyCode;
    const template = masked,
          def = template.replace(/\D/g, ""),
          val = target.value.replace(/\D/g, "");
    let i = 0,
      newValue = template.replace(/[_\d]/g, function (a) {
        return i < val.length ? val.charAt(i++) || def.charAt(i) : a;
      });
    i = newValue.indexOf("_");
    if (i !== -1) {
      newValue = newValue.slice(0, i);
    }
    let reg = template.substr(0, target.value.length).replace(/_+/g,
      function (a) {
        return "\\d{1," + a.length + "}";
      }).replace(/[+()]/g, "\\$&");
    reg = new RegExp("^" + reg + "$");
    if (!reg.test(target.value) || target.value.length < 5 || keyCode > 47 && keyCode < 58) {
      target.value = newValue;
    }
    if (event.type === "blur" && target.value.length < 5) {
      target.value = "";
    }

  };

  for (const elem of elems) {
    elem.addEventListener("input", mask);
    elem.addEventListener("focus", mask);
    elem.addEventListener("blur", mask);
  }
    
};

maskPhone('[name="phone"]', '+7 (___) ___-__-__');

const calc = () => {
  const calcBlock = document.getElementById('card_order'),
        cardType = calcBlock.querySelectorAll('[name="card-type"]'),
        calcClubs = calcBlock.querySelectorAll('[name="club-name"]'),
        promocode = calcBlock.querySelector('[placeholder="Промокод"]'),
        totalValue = document.getElementById('price-total');
  
  const priceList = {
    mozaika: [1999, 9990, 13990, 19990],
    schelkovo: [2999, 14990, 21990, 24990]
  };

  const countSum = () => {
    for (let i = 0; i < calcClubs.length; i++) {
      if (calcClubs[i].checked) {
        for (let j = 0; j < cardType.length; j++) {
          if (cardType[j].checked) {
            if (promocode.value === 'ТЕЛО2019') {
              totalValue.textContent = Math.ceil(0.7 * priceList[calcClubs[i].value][j]);
            }
            else { totalValue.textContent = priceList[calcClubs[i].value][j]; }

          }
        }
      }
    }
    
  };

  if (promocode) {
    calcBlock.addEventListener('change', (event) => {
      const target = event.target;
      if (target.matches('[name="club-name"]') || target.matches('[name="card-type"]') || 
      target.matches('[placeholder="Промокод"]')) {
        countSum();
      }
    });
  }
};

calc();

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

burgerMenu();


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

scrolling();