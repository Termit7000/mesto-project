import { openPopup, closePopup } from './modal.js';
import Api from './Api.js';
import { renderLoading, setDefaultText, notifyFormOpened } from './utils.js';
import { userId } from '../pages/index.js';

//ПРОФИЛЬ

const api = new Api();
const popupPrifle = document.querySelector('.profile-popup');
const buttonSubmit = popupPrifle.querySelector('.popup__button_event_submit');
const formProfile = popupPrifle.querySelector('.popup__form');
const inputNameProfile = formProfile.querySelector('.popup__input_name');
const inputDescriptionProfile = formProfile.querySelector('.popup__input_description');

const popupAvatar = document.querySelector('.avatar-popup');
const formAvatar = popupAvatar.querySelector('.popup__form');
const inputLinkAvatar = popupAvatar.querySelector('.avatar-popup__link');
const buttonSubmitAvatar = popupAvatar.querySelector('.popup__button_event_submit');


const descriptionProfile = document.querySelector('.profile__text');
const nameProfile = document.querySelector('.profile__title');
const buttonEditProfile = document.querySelector('.profile__edit-button');
const avatarProfile = document.querySelector('.profile__avatar');

//API
export function setProfile({ name, about, avatar }) {
  nameProfile.textContent = name;
  descriptionProfile.textContent = about;
  avatarProfile.src = avatar;
}

//ОБРАБОТЧИКИ ПРОФИЛЯ
formProfile.addEventListener('submit', (evt) => {
  evt.preventDefault();

  renderLoading(buttonSubmit);

  api.saveProfileServer(inputNameProfile.value, inputDescriptionProfile.value)
    .then((data) => {
      setProfile(data);
      closePopup(popupPrifle);
    })
    .catch((error) => console.log(error))
    .finally(() => setDefaultText(buttonSubmit));

});

/**
 * Открытие формы обновления профиля
 */
buttonEditProfile.addEventListener('click', () => {
  inputNameProfile.value = nameProfile.textContent;
  inputDescriptionProfile.value = descriptionProfile.textContent;

  openPopup(popupPrifle);
  notifyFormOpened(formProfile);
});

/**
 * Редактирование аватара
 */
avatarProfile.addEventListener('click', (evt) => {
  notifyFormOpened(formAvatar);
  openPopup(popupAvatar);
});

/**
 * Обновление аватара
 */
popupAvatar.addEventListener('submit', (evt) => {
  evt.preventDefault();
  renderLoading(buttonSubmitAvatar);

  api.updateAvatarServer(inputLinkAvatar.value)
    .then((data) => {
      setProfile(data);
      closePopup(popupAvatar);
    })
    .catch((error) => console.log(error))
    .finally(() => setDefaultText(buttonSubmitAvatar));
});



