'use strict';


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

export default sendForm;