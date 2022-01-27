import './index.css';

import Api from '../components/Api.js';
import Card from '../components/Сard.js';
import FormValidator from '../components/FormValidator.js';
import { setProfile } from '../components/profile.js';
import Section from '../components/Section';
import Popup from '../components/Popup';
import PopupWithImage from '../components/PopupWithImage';
import PopupWithForm from '../components/PopupWithForm';
import { renderLoading, setDefaultText } from '../components/utils';

export let userId;

const buttonAddCard = document.querySelector('.profile__add-button');
const popupCard = document.querySelector('.card-popup');
const buttonSubmit = popupCard.querySelector('.popup__button_event_submit');


const popupConfirmation = document.querySelector('.confirmation-popup');
const formConfirmation = popupConfirmation.querySelector('.confirmation-popup__form');

const api = new Api();

//ИНИЦИАЛИЗАЦИЯ
Promise.all([api.getUser(), api.getCards()])
  .then(([userData, cards]) => {

    //ДАННЫЕ ПРОФИЛЯ
    userId = userData._id;
    setProfile(userData);

    renderCards(cards);

  })
  .catch(err => console.log(`Не удалось связаться с сервером ${err}`));

function renderCards(cards, clearing) {

  const section = new Section({
    items: cards,
    renderer: (cardJson) => {
      const card = new Card({
        data: cardJson,
        handleTrashClick: ()=> {

          const confirmationPopup = new PopupWithForm({
            selector: '.confirmation-popup',
            handleFormSubmit: () => {

              api.deleteCardServer(card.getId())
                .then(() => {
                  card.remove();
                  confirmationPopup.close();
                })
                .catch((error) => console.log(error));
            }
          });

          confirmationPopup.setEventListeners();
          confirmationPopup.open();
        },
        handleCardClick: function (cardLink, cardName) {
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

  section.renderItems(clearing);
}

buttonAddCard.addEventListener('click', () => {
  // const evenFormOpened = new CustomEvent('formOpened');
  // document.querySelector('.').dispatchEvent(evenFormOpened);

  const popupAddCard = new PopupWithForm({
    selector: '.card-popup',
    handleFormSubmit: (formData) => {

      renderLoading(buttonSubmit);

      const nameCard = formData['popup__input_img-name'];
      const linkCard = formData['popup__input_img-link'];
      api.savePictureServer(nameCard, linkCard)
        .then(card => {
          renderCards([card], false);
          popupAddCard.close();
        })
        .catch((error) => console.log(error))
        .finally(() => setDefaultText(buttonSubmit));
    }
  });
  popupAddCard.setEventListeners();
  popupAddCard.open();
});

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
