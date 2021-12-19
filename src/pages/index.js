import './index.css';
import '../components/card.js';
import '../components/modal.js';
import '../components/profile.js';
import '../components/validate.js';
import '../components/api.js';

import { enableValidation } from '../components/validate.js';
import {getUser, getCards} from '../components/api.js';

//ИНИЦИАЛИЗАЦИЯ
getUser();
getCards();

enableValidation();

//import { createCard, insertCardHTML } from '../components/card.js';
/*
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

initialCards.forEach(card => {
  insertCardHTML(createCard(card.link, card.name));
});

*/


