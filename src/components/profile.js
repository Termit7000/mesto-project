import { openPopup, closePopup } from './modal.js';
import { saveProfileServer, updateAvatar } from './api.js';
import { disableSubmitButton, enableSubmitButton, delay } from './utils.js';

//ПРОФИЛЬ
const profilePopup = document.querySelector('.profile-popup');
const buttonSubmit = profilePopup.querySelector('.popup__button_event_submit');
const formProfileEdit = profilePopup.querySelector('.popup__form');
const nameInputFormProfile = formProfileEdit.querySelector('.popup__input_name');
const descriptionInputFormProfile = formProfileEdit.querySelector('.popup__input_description');

const avatarPopup = document.querySelector('.avatar-popup');
const avatarInput = avatarPopup.querySelector('.avatar-popup__link');
const buttonSubmitAvatar = avatarPopup.querySelector('.popup__button_event_submit');


const descriptionProfile = document.querySelector('.profile__text');
const nameProfile = document.querySelector('.profile__title');
const buttonEditProfile = document.querySelector('.profile__edit-button');
const profileAvatar = document.querySelector('.profile__avatar');
let defaultAvatar = profileAvatar.src;

//API
export function setProfile(name, description, avatarURL = defaultAvatar) {
  nameProfile.textContent = name;
  descriptionProfile.textContent = description;
  profileAvatar.src = avatarURL;
  defaultAvatar = avatarURL;
}

//ОБРАБОТЧИКИ ПРОФИЛЯ
formProfileEdit.addEventListener('submit', (evt) => {
  evt.preventDefault();

  disableSubmitButton(buttonSubmit);

  saveProfileServer(nameInputFormProfile.value, descriptionInputFormProfile.value)
    .then(() => delay(1500)) //ИМТИТАЦИЯ ДОЛГОГО СОХРАНЕНИЯ
    .finally(() => {
      setProfile(nameInputFormProfile.value, descriptionInputFormProfile.value);
      enableSubmitButton(buttonSubmit);
      closePopup(profilePopup);
    });

});

/**
 * Открытие формы обновления профиля
 */
buttonEditProfile.addEventListener('click', () => {
  nameInputFormProfile.value = nameProfile.textContent;
  descriptionInputFormProfile.value = descriptionProfile.textContent;
  openPopup(profilePopup);
});

/**
 * Редактирование аватара
 */
profileAvatar.addEventListener('click', (evt) => {
  avatarInput.value = defaultAvatar;
  openPopup(avatarPopup);
});

/**
 * Обновление аватара
 */
avatarPopup.addEventListener('submit', (evt) => {
  evt.preventDefault();
  disableSubmitButton(buttonSubmitAvatar);

  updateAvatar(avatarInput.value)
    .then(() => delay(1500)) //ИМТИТАЦИЯ ДОЛГОГО СОХРАНЕНИЯ
    .finally(() => {
      defaultAvatar = avatarInput.value;
      profileAvatar.src = avatarInput.value;
      enableSubmitButton(buttonSubmit);
      closePopup(avatarPopup);
    });
});



