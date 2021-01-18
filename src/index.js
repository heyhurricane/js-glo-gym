"use strict";

import selectClubs from './modules/selectClubs';
import togglePopUp from './modules/togglePopUp';
import mainSlider from './modules/mainSlider';
import servicesSlider from './modules/servicesSlider';
import gallerySlider from './modules/gallerySlider';
import maskPhone from './modules/maskPhone';
import validation from './modules/validation';
import sendForm from './modules/sendForm';
import calc from './modules/calc';
import burgerMenu from './modules/burgerMenu';
import scrolling from './modules/scrolling';

// выпадающее меню (селектор)
selectClubs();
// модальные окна
togglePopUp();
// слайдер основной секции
mainSlider();
// слайдер секции Услуг
servicesSlider();
// слайдер Фотогалереи
gallerySlider();
// валидация поля Имя
validation();
// маска
maskPhone('[name="phone"]', '+7 (___) ___-__-__');
// отправка форм
sendForm();
// калькулятор
calc();
// появление бургер-меню
burgerMenu();
// прокрутка
scrolling();