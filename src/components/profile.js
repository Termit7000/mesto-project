import { openPopup, closePopup } from './modal.js';
import {saveProfileServer} from './api.js';

//ПРОФИЛЬ
const profilePopup = document.querySelector('.popup__profile');
const formProfileEdit = profilePopup.querySelector('.popup__form');
const buttonCloseProfileEdit = profilePopup.querySelector('.popup__button_event_close');
const nameInputFormProfile = formProfileEdit.querySelector('.popup__input_name');
const descriptionInputFormProfile = formProfileEdit.querySelector('.popup__input_description');

const descriptionProfile = document.querySelector('.profile__text');
const nameProfile = document.querySelector('.profile__title');
const buttonEditProfile = document.querySelector('.profile__edit-button');
const profileAvatar = document.querySelector('.profile__avatar');
const defaultAvatar = profileAvatar.src;

//API

export function setProfile(name, description, avatarURL=defaultAvatar) {

  nameProfile.textContent= name;
  descriptionProfile.textContent = description;
  profileAvatar.src = avatarURL;

}

//ОБРАБОТЧИКИ ПРОФИЛЯ
formProfileEdit.addEventListener('submit', function (evt) {
  evt.preventDefault();

  setProfile(nameInputFormProfile.value, descriptionInputFormProfile.value);
  saveProfileServer(nameInputFormProfile.value, descriptionInputFormProfile.value);
  closePopup(profilePopup);
});

buttonCloseProfileEdit.addEventListener('click', () => closePopup(profilePopup));

buttonEditProfile.addEventListener('click', function () {
  nameInputFormProfile.value = nameProfile.textContent;
  descriptionInputFormProfile.value = descriptionProfile.textContent;
  openPopup(profilePopup);
});



