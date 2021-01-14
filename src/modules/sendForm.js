'use strict';


const sendForm = () => {
  const errorMessage ='Что-то пошло не так...',
        loadMessage = 'Идёт отправка...',
        successMessage = 'Отправлено! Мы скоро с Вами свяжемся';

  const forms = document.querySelectorAll('form');
  // const popup = document.querySelector('.popup');
  

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
          if (input.parentNode.childNodes.length === 2) { input.parentNode.childNodes[1].remove(); }
        }
        else {
          if (input.parentNode.childNodes.length === 4) { input.parentNode.childNodes[3].remove(); }
          else if (input.classList.contains('form-check')) {
            if (input.parentNode.parentNode.childNodes.length === 4) { input.parentNode.parentNode.childNodes[3].remove(); }
          }
        }
        mistake.style.cssText = 'font-size: 1rem; color: tomato; left: 2%; bottom: -2.5rem; position: static;';
        if (window.innerWidth >= 768) {
          mistake.style.cssText += 'position: absolute'; 
        }
        else {
          mistake.style.cssText += 'display: block; margin-bottom: 1rem;';
        }
       
        if (form.getAttribute('id') === 'form1' || form.getAttribute('id') === 'card_order' || form.getAttribute('id') === 'form2') { 
          mistake.style.cssText = 'font-size: 1rem; color: tomato; left: 2%; margin-top: 0.4rem;';
        }
        if (input.classList.contains('form-name') && (input.value.length < 2 || input.value.length > 50)) {
          mistake.textContent = 'Имя должно быть от 2 до 50 символов';
          input.parentNode.append(mistake);
          count++;
        }
        if (input.classList.contains('form-phone') && input.value.length < 18) {
          mistake.textContent = 'Номер должен содержать 11 символов';
          input.parentNode.append(mistake);
          count++;
        }
        if (input.classList.contains('form-check') && input.checked === false) {
          if (window.innerWidth >= 768) {
            mistake.style.cssText = 'font-size: 1rem; color: tomato; left: 0; margin-top: 0.4rem;';
          }
          else {
            mistake.style.cssText = 'font-size: 1rem; color: tomato; left: 0; top: -5rem;';
          }
          
          mistake.textContent = 'Необходимо подтвердить согласие!';
          input.parentNode.parentNode.append(mistake);
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
            const popup = document.querySelector('#thanks');
            popup.style.display = 'block';
            const popupContent = popup.querySelector('.form-content p');
            const popupHeader = popup.querySelector('.form-content h4');
            popupContent.innerHTML = 'Ваша заявка отправлена. <br> Мы свяжемся с вами в ближайшее время.';
            popupHeader.textContent = 'Спасибо!';
            inputs.forEach((input) => {
              input.value = '';
            });
            statusMessage.textContent = '';
            setTimeout(() => {
              popup.style.display = 'none';
            }, 4000); 
          })
          .catch((error) => { 
            const popup = document.querySelector('#thanks');
            popup.style.display = 'block';
            const popupContent = popup.querySelector('.form-content p');
            const popupHeader = popup.querySelector('.form-content h4');
            popupContent.textContent = errorMessage;
            popupHeader.textContent = 'Ошибка';
            statusMessage.textContent = '';
            console.error(error);    
            setTimeout(() => {
              popup.style.display = 'none';
            }, 4000);  
          });
      }

    });
  });

};

export default sendForm;