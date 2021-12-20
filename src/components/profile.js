import { openPopup, closePopup } from './modal.js';
import {saveProfileServer, updateAvatar} from './api.js';

//ПРОФИЛЬ
const profilePopup = document.querySelector('.popup__profile');
const formProfileEdit = profilePopup.querySelector('.popup__form');
const nameInputFormProfile = formProfileEdit.querySelector('.popup__input_name');
const descriptionInputFormProfile = formProfileEdit.querySelector('.popup__input_description');
const avatarPopup = document.querySelector('.popup__avatar');
const avatarInput = avatarPopup.querySelector('.avatar__link');

const descriptionProfile = document.querySelector('.profile__text');
const nameProfile = document.querySelector('.profile__title');
const buttonEditProfile = document.querySelector('.profile__edit-button');
const profileAvatar = document.querySelector('.profile__avatar');
let defaultAvatar = profileAvatar.src;

//API
export function setProfile(name, description, avatarURL=defaultAvatar) {
  nameProfile.textContent= name;
  descriptionProfile.textContent = description;
  profileAvatar.src = avatarURL;
  defaultAvatar = avatarURL;
}



//ОБРАБОТЧИКИ ПРОФИЛЯ
formProfileEdit.addEventListener('submit',  (evt)=> {
  evt.preventDefault();

  setProfile(nameInputFormProfile.value, descriptionInputFormProfile.value);
  saveProfileServer(nameInputFormProfile.value, descriptionInputFormProfile.value);
  closePopup(profilePopup);
});

/**
 * Открытие формы обновления профиля
 */
buttonEditProfile.addEventListener('click',  ()=> {
  nameInputFormProfile.value = nameProfile.textContent;
  descriptionInputFormProfile.value = descriptionProfile.textContent;
  openPopup(profilePopup);
});

/**
 * Редактирование аватара
 */
profileAvatar.addEventListener('click', (evt)=>{
  avatarInput.value = defaultAvatar;
  openPopup(avatarPopup);
});

/**
 * Обновление аватара
 */
avatarPopup.addEventListener('submit', (evt)=>{
  evt.preventDefault();
  updateAvatar(avatarInput.value)
    .then(()=>{
      defaultAvatar = avatarInput.value;
      profileAvatar.src = avatarInput.value;
      closePopup(avatarPopup);});
});



