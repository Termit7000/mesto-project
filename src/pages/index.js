import './index.css';
import '../components/card.js';
import '../components/modal.js';
import '../components/profile.js';
import '../components/validate.js';
import '../components/api.js';

import {enableValidation } from '../components/validate.js';
import {getUser, getCards} from '../components/api.js';
import {setProfile} from '../components/profile.js';
import {renderCardList } from '../components/card.js';

export let userId;

//ИНИЦИАЛИЗАЦИЯ
Promise.all([getUser(), getCards()])
  .then(([userData, cards])=>{

    //ДАННЫЕ ПРОФИЛЯ
    userId = userData._id;
    setProfile(userData);

    //КАРТОЧКИ МЕСТ
    renderCardList(cards);

    //ПОДКЛЮЧЕНИЕ ВАЛИДАЦИИ
    const options = {
      formSelector: '.popup__form',
      inputSelector: '.popup__input',
      submitButtonSelector: '.popup__button_event_submit',
      inactiveButtonClass: 'popup__button_inactive',
      inputErrorClass: 'popup__input_type_error',
      errorClass: 'popup__input-error_active'
    };

    enableValidation(options);
  })
  .catch(err=>console.log(`Не удалось связаться с сервером ${err}`));




