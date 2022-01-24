import './index.css';
import '../components/Сard.js';
import '../components/modal.js';
import '../components/profile.js';
import '../components/FormValidator.js';
import '../components/Api.js';

import FormValidator, { enableValidation } from '../components/FormValidator.js';
import Api from '../components/Api.js';
import { setProfile } from '../components/profile.js';
import { renderCardList } from '../components/Сard.js';

export let userId;

const api = new Api();

//ИНИЦИАЛИЗАЦИЯ
Promise.all([api.getUser(), api.getCards()])
  .then(([userData, cards]) => {

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

    document.querySelectorAll(options.formSelector).forEach(formElement => {
        const formValidator = new FormValidator(options, formElement);
        formValidator.enableValidation();
    });

  })
  .catch(err => console.log(`Не удалось связаться с сервером ${err}`));




