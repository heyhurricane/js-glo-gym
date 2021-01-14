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
    nameInput.addEventListener('input', () => {
      nameInput.value = nameInput.value.replace(/[^а-яА-Я\s]/,'');
    });
  });

};

export default validation;