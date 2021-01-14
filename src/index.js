"use strict";

import selectClubs from './modules/selectClubs';
import togglePopUp from './modules/togglePopUp';
import mainSlider from './modules/mainSlider';
import servicesSlider from './modules/servicesSlider';
import gallerySlider from './modules/gallerySlider';

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