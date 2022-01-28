import './index.css';

import Api from '../components/Api.js';
import Card from '../components/Сard.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import { renderLoading, setDefaultText } from '../components/utils/utils.js';


let userId;

const buttonAddCard = document.querySelector('.profile__add-button');
const popupCard = document.querySelector('.card-popup');
const buttonSubmit = popupCard.querySelector('.popup__button_event_submit');
const buttonEditProfile = document.querySelector('.profile__edit-button');

const descriptionProfile = document.querySelector('.profile__text');
const nameProfile = document.querySelector('.profile__title');
const avatarProfile = document.querySelector('.profile__avatar');
const avatarPopup = document.querySelector('.avatar-popup');
const buttonSubmitAvatar = avatarPopup.querySelector('.popup__button_event_submit');

const api = new Api();

function setProfile({ name, about, avatar }) {
  nameProfile.textContent = name;
  descriptionProfile.textContent = about;
  avatarProfile.src = avatar;
}

Promise.all([api.getUser(), api.getCards()])
  .then(([userData, cards]) => {

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
        userId: userId,
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
        },
        handleLike : cardId=> {
                    api.likeCardServer(cardId)
                      .then(data => card.updateLikeStatus(data))
                      .catch((error) => console.log(error));},

        handleUnLike : cardId => {
          api.unLikeCardServer(cardId)
                      .then(data => card.updateLikeStatus(data))
                      .catch((error) => console.log(error)); }

      }
        , '.elements__list-item');
      const cardElement = card.generate();
      section.addItem(cardElement);
    }
  }, '.elements');

  section.renderItems(clearing);
}

const userInfoPopup = new UserInfo({
  selector: '.profile-popup',
  selectorName: '.popup__input_name',
  selectorAbout: '.popup__input_description',
  handleGetUserInfo: () => {
    api.getUser()
      .then(data => {
        userInfoPopup.updateUserInfo(data);
        userInfoPopup.setEventListeners();
        userInfoPopup.open();
      })
      .catch(error=>console.log(error));
  },
  handleFormSubmit: ({popup__input_name, popup__input_description}) => {

    api.saveProfileServer(popup__input_name, popup__input_description)
      .then(data => {
        setProfile(data);
        userInfoPopup.close();
      })
      .catch(error=>console.log(error));
  }
});

buttonEditProfile.addEventListener('click', () => {
  userInfoPopup.getUserInfo();
});

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
  popupAddCard.open();
});

const popupAvatar = new PopupWithForm({
  selector: '.avatar-popup',
  handleFormSubmit: (formData) => {
      renderLoading(buttonSubmitAvatar);

      api.updateAvatarServer(formData['avatar-popup__link'])
        .then((data) => {
          setProfile(data);
          popupAvatar.close();
        })
        .catch((error) => console.log(error))
        .finally(() => setDefaultText(buttonSubmitAvatar));
  }
});

popupAvatar.setEventListeners();

avatarProfile.addEventListener('click', () => {
  popupAvatar.open();
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
