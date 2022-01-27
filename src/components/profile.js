import { openPopup, closePopup } from './modal.js';
import Api from './Api.js';
import { renderLoading, setDefaultText, notifyFormOpened } from './utils.js';
import { userId } from '../pages/index.js';

//ПРОФИЛЬ

//const api = new Api();

// const buttonSubmit = popupPrifle.querySelector('.popup__button_event_submit');


// const popupAvatar = document.querySelector('.avatar-popup');
// const formAvatar = popupAvatar.querySelector('.popup__form');
// const inputLinkAvatar = popupAvatar.querySelector('.avatar-popup__link');
// const buttonSubmitAvatar = popupAvatar.querySelector('.popup__button_event_submit');




//API


//ОБРАБОТЧИКИ ПРОФИЛЯ
// formProfile.addEventListener('submit', (evt) => {
//   evt.preventDefault();

//   renderLoading(buttonSubmit);

//   api.saveProfileServer(inputNameProfile.value, inputDescriptionProfile.value)
//     .then((data) => {
//       setProfile(data);
//       closePopup(popupPrifle);
//     })
//     .catch((error) => console.log(error))
//     .finally(() => setDefaultText(buttonSubmit));

// });

// /**
//  * Открытие формы обновления профиля
//  */


// /**
//  * Редактирование аватара
//  */
// avatarProfile.addEventListener('click', (evt) => {
//   notifyFormOpened(formAvatar);
//   openPopup(popupAvatar);
// });

// /**
//  * Обновление аватара
//  */
// popupAvatar.addEventListener('submit', (evt) => {
//   evt.preventDefault();
//   renderLoading(buttonSubmitAvatar);

//   api.updateAvatarServer(inputLinkAvatar.value)
//     .then((data) => {
//       setProfile(data);
//       closePopup(popupAvatar);
//     })
//     .catch((error) => console.log(error))
//     .finally(() => setDefaultText(buttonSubmitAvatar));
// });



