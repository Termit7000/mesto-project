import './index.css';

import Api from '../components/Api.js';
import Card from '../components/Сard.js';
import FormValidator from '../components/FormValidator.js';
import { setProfile } from '../components/profile.js';
import Section from '../components/Section';
import Popup from '../components/Popup';
import PopupWithImage from '../components/PopupWithImage';

export let userId;

const api = new Api();

//ИНИЦИАЛИЗАЦИЯ
Promise.all([api.getUser(), api.getCards()])
  .then(([userData, cards]) => {

    //ДАННЫЕ ПРОФИЛЯ
    userId = userData._id;
    setProfile(userData);

    //КАРТОЧКИ МЕСТ
    const section = new Section({
      items: cards,
      renderer: (cardJson) => {
        const card = new Card({
          data: cardJson,
          handleTrashClick: function() {
            const confirmationPopup =  new Popup('.confirmation-popup');
            confirmationPopup.setEventListeners();
            confirmationPopup.open();
          } ,
          handleCardClick: function(cardLink, cardName) {
            const imgPopup = new PopupWithImage('.img-popup');
            imgPopup.setEventListeners();
            imgPopup.open(cardLink, cardName);
          }

        }
        , '.elements__list-item');
        const cardElement = card.generate();
        section.addItem(cardElement);
      }
    }, '.elements');

    section.renderItems();

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
