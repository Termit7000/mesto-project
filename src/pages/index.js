import './index.css';

import Api from '../components/Api.js';
import Card from '../components/Сard.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import { notifyFormOpened } from '../utils/utils.js';
import { defaultApiConfig, configValidate } from '../utils/constants.js';

const buttonAddCard = document.querySelector('.profile__add-button');
const buttonEditProfile = document.querySelector('.profile__edit-button');
const avatarProfile = document.querySelector('.profile__avatar');

const api = new Api(defaultApiConfig);

const userInfo = new UserInfo({
  selectorName: '.profile__title',
  selectorAbout: '.profile__text',
  selectorAvatar: '.profile__avatar',
  handlerGetUserInfo: () => api.getUser().catch(error => console.log(error)),
  handlerSetUserInfo: (name, about) => api.saveProfileServer(name, about).catch(error => console.log(error)),
  handlerSetAvatar: (avatar) => api.updateAvatarServer(avatar).catch(error => console.log(error))
});

//ДАННЫЕ ПРОФИЛЯ

const userProfilePopup = new PopupWithForm({
  selector: '.profile-popup',
  handleFormSubmit: ({
    popup__input_name,
    popup__input_description
  }) => {

    userInfo.setUserInfo(popup__input_name, popup__input_description).then(data => {
        userInfo.updateInfo(data);
        userProfilePopup.close();
      }).catch((error) => console.log(error))
      .finally(() => userProfilePopup.setDefaultText());
  }
});

userProfilePopup.name = userProfilePopup.getFormElement().querySelector('.popup__input_name');
userProfilePopup.about = userProfilePopup.getFormElement().querySelector('.popup__input_description');

userProfilePopup.setEventListeners();

//АВАТАР ПОЛЬЗОВАТЕЛЯ

const popupAvatar = new PopupWithForm({
  selector: '.avatar-popup',
  handleFormSubmit: ({
    'avatar-popup__link': avatar
  }) => {
    userInfo.setAvatar(avatar)
      .then(data => {
        userInfo.updateInfo(data);
        popupAvatar.close();
      }).catch((error) => console.log(error))
      .finally(() => popupAvatar.setDefaultText());
  }
});

popupAvatar.setEventListeners();


//КАРТОЧКИ МЕСТ

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
      .catch((error) => console.log(error))
      .finally(() => confirmationPopup.setDefaultText());
  }
})

confirmationPopup.setEventListeners();

const imgPopup = new PopupWithImage('.img-popup');

imgPopup.setEventListeners();


const popupAddCard = new PopupWithForm({
  selector: '.card-popup',
  handleFormSubmit: (formData) => {

    const nameCard = formData['popup__input_img-name'];
    const linkCard = formData['popup__input_img-link'];
    api.savePictureServer(nameCard, linkCard)
      .then(card => {
        section.addItem(card);
        popupAddCard.close();
      })
      .catch((error) => console.log(error))
      .finally(() => popupAddCard.setDefaultText());
  }
});

popupAddCard.setEventListeners();

//РЕНДЕРИНГ

const section = new Section({
  renderer: (cardJson) => {
    const card = new Card({
      data: cardJson,
      userId: userInfo.getId(),
      handleTrashClick: (cardElement, cardId) => {
        confirmationPopup.cardElement = cardElement;
        confirmationPopup.cardId = cardId;
        confirmationPopup.open();
      },
      handleCardClick: (cardLink, cardName) => imgPopup.open(cardLink, cardName),
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
    }, '.templates');
    return card.generate();
  }
}, '.elements');

//ПОДКЛЮЧЕНИЕ ВАЛИДАЦИИ
document.querySelectorAll(configValidate.formSelector).forEach(formElement => {
  const formValidator = new FormValidator(configValidate, formElement);
  formValidator.enableValidation();
});

//ОБРАБОТЧИКИ СОБЫТИЙ

buttonAddCard.addEventListener('click', () => {
  notifyFormOpened(popupAddCard.getFormElement());
  popupAddCard.open();
});

buttonEditProfile.addEventListener('click', () => {
  userInfo.getUserInfo()
    .then(data => {
      userProfilePopup.name.value = data.name;
      userProfilePopup.about.value = data.about;
      notifyFormOpened(userProfilePopup.getFormElement());
      userProfilePopup.open();
    }).catch((error) => console.log(error));
});

avatarProfile.addEventListener('click', () => {
  popupAvatar.open();
});

///////////////////////////////

Promise.all([userInfo.getUserInfo(), api.getCards()])
  .then(([userData, cards]) => {

    userInfo.updateInfo(userData);
    section.renderItems(cards);

  })
  .catch(err => console.log(`Не удалось связаться с сервером ${err}`));
