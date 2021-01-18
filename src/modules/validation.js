'use strict';

const validation = () => {

  // const inputs = document.querySelectorAll('input.calc-item');

  // inputs.forEach((input) => {
  //   input.addEventListener('input', () => {
  //     input.value = input.value.replace(/[^\d]/,'');
  //   });
  // });
  

  const nameInputs = document.querySelectorAll('[name="name"]');
  nameInputs.forEach((nameInput) => {
    if (!nameInput.matches('[placeholder="Промокод"]')) {
      nameInput.addEventListener('input', () => {
        nameInput.value = nameInput.value.replace(/[^а-яА-Я\s]/gi,'');
      });
    }
    else {
      nameInput.addEventListener('input', () => {
        nameInput.value = nameInput.value.replace(/[^а-яА-Я\s\d]/gi,'');
      });
    }
  });

};

export default validation;