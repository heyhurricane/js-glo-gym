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
  
  document.body.addEventListener('click', (event) => {
    let target = event.target;
    target = target.closest('.club-select'); 
    if (!target && !event.target.classList.contains('club-select__list') && !event.target.classList.contains('club-select__option') && isSelected) {
      changeClub();
    }
    else {
      if (target) {
        target = event.target;
        if (!target.classList.contains('club-select__link')) {
          if (!target.classList.contains('club-select__list') && !target.classList.contains('club-select__option')) {
            changeClub();
          }
        }
      }
    }
  });
};

export default selectClubs;