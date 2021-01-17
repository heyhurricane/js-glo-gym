'use strict';

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

export default calc;