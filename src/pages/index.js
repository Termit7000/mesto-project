import './index.css';

import Api from '../components/Api.js';
import Card from '../components/Сard.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import { notifyFormOpened, renderLoading, setDefaultText } from '../utils/utils.js';

const buttonAddCard = document.querySelector('.profile__add-button');
const popupCard = document.querySelector('.card-popup');
const buttonSubmit = popupCard.querySelector('.popup__button_event_submit');
const buttonEditProfile = document.querySelector('.profile__edit-button');

const avatarProfile = document.querySelector('.profile__avatar');

const api = new Api();

const userInfo = new UserInfo({
  selectorName: '.profile__title',
  selectorAbout: '.profile__text',
  selectorAvatar: '.profile__avatar',
  handlerGetUserInfo: () => api.getUser().catch(error => console.log(error)),
  handlerSetUserInfo: (name, about) => api.saveProfileServer(name, about).catch(error => console.log(error)),
  handlerSetAvatar: (avatar) => api.updateAvatarServer(avatar).catch(error => console.log(error))
});

Promise.all([userInfo.getUserInfo(), api.getCards()])
  .then(([userData, cards]) => {

    userInfo.id = userData._id;
    userInfo.updateInfo(userData);
    renderCards(cards);

  })
  .catch(err => console.log(`Не удалось связаться с сервером ${err}`));

const confirmationPopup = new PopupWithForm({
  selector: '.confirmation-popup',
  handleFormSubmit: () => {

    api.deleteCardServer(confirmationPopup.cardId)
      .then(() => {
        confirmationPopup.cardElement.remove();

        confirmationPopup.cardElement = "";
        confirmationPopup.cardId = "";

        confirmationPopup.close();
      })
      .catch((error) => console.log(error));
  }
})

confirmationPopup.setEventListeners();


function renderCards(cards, clearing) {

  const section = new Section({
    items: cards,
    renderer: (cardJson) => {
      const card = new Card({
        data: cardJson,
        userId: userInfo.id,
        handleTrashClick: (cardElement, cardId) => {
          confirmationPopup.cardElement = cardElement;
          confirmationPopup.cardId = cardId;
          confirmationPopup.open();
        },
        handleCardClick: function (cardLink, cardName) {
          const imgPopup = new PopupWithImage('.img-popup');
          imgPopup.setEventListeners();
          imgPopup.open(cardLink, cardName);
        },
        handleLike: cardId => {
          api.likeCardServer(cardId)
            .then(data => card.updateLikeStatus(data))
            .catch((error) => console.log(error));
        },

        handleUnLike: cardId => {
          api.unLikeCardServer(cardId)
            .then(data => card.updateLikeStatus(data))
            .catch((error) => console.log(error));
        }
      }
        , '.templates');
      const cardElement = card.generate();
      section.addItem(cardElement);
    }
  }, '.elements');

  section.renderItems(clearing);
}


//ДАННЫЕ ПРОФИЛЯ

const userProfilePopup = new PopupWithForm({
  selector: '.profile-popup',
  handleFormSubmit: ({ popup__input_name, popup__input_description }) => {

    renderLoading(userProfilePopup.buttonSubmit);

    userInfo.setUserInfo(popup__input_name, popup__input_description).then(data => {
      userInfo.updateInfo(data);
      userProfilePopup.close();
    })
      .finally(() => setDefaultText(userProfilePopup.buttonSubmit));
  }
});

userProfilePopup.name = userProfilePopup.getFormElement().querySelector('.popup__input_name');
userProfilePopup.about = userProfilePopup.getFormElement().querySelector('.popup__input_description');
userProfilePopup.buttonSubmit = userProfilePopup.getFormElement().querySelector('.popup__button_event_submit');

userProfilePopup.setEventListeners();

buttonEditProfile.addEventListener('click', () => {
  userInfo.getUserInfo()
    .then(data => {
      userProfilePopup.name.value = data.name;
      userProfilePopup.about.value = data.about;
      notifyFormOpened(userProfilePopup.getFormElement());
      userProfilePopup.open();
    });
});

//АВАТАР ПОЛЬЗОВАТЕЛЯ

const popupAvatar = new PopupWithForm({
  selector: '.avatar-popup',
  handleFormSubmit: ({ 'avatar-popup__link': avatar }) => {
    renderLoading(popupAvatar.buttonSubmit);
    userInfo.setAvatar(avatar)
      .then(data => {
        userInfo.updateInfo(data);
        popupAvatar.close();
      }).catch((error) => console.log(error))
      .finally(() => setDefaultText(popupAvatar.buttonSubmit));
  }
});

popupAvatar.buttonSubmit = popupAvatar.getFormElement().querySelector('.popup__button_event_submit');
popupAvatar.setEventListeners();

avatarProfile.addEventListener('click', () => {
  popupAvatar.open();
});

//КАРТОЧКИ МЕСТ

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

buttonAddCard.addEventListener('click', () => {
  notifyFormOpened(popupAddCard.getFormElement());
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
