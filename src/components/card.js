import { openImg } from './imgForm.js';
import { openPopup, closePopup } from './modal.js';

//УПРАВЛЕНИЕ КАРТОЧКАМИ
const buttonAddCard = document.querySelector('.profile__add-button');
const cardPopup = document.querySelector('.popup__card');
const cardForm = cardPopup.querySelector('.popup__form');
const nameImgCardForm = cardForm.querySelector('.popup__input_img-name');
const linkImgCardForm = cardForm.querySelector('.popup__input_img-link');
const buttonCloseCardForm = cardPopup.querySelector('.popup__button_event_close');

const elements = document.querySelector('.elements');
const cardTempl = document.querySelector('.templates').content.querySelector('.elements__list-item');

//ЭКСПОРТНЫЕ ФУНКЦИИ

/**
 * Создает новую карточку места
 * @param {URL} link - путь к картинке места
 * @param {String} name - название места
 * @returns
 */
 export function createCard(link, name) {

  const card = cardTempl.cloneNode(true);

  const img = card.querySelector('.card__img');
  img.src = link;
  img.alt = name;

  card.querySelector('.card__text').textContent = name;

  //POPUP IMG
  const popupButton = card.querySelector('.card__popup-button');
  popupButton.addEventListener('click', () => openImg(link, name));

  //LIKE
  const likeButton = card.querySelector('.card__like-button');
  likeButton.addEventListener('click', () => likeCard(likeButton));

  //DELETE CARD
  const trashButton = card.querySelector('.card__trash-button');
  trashButton.addEventListener('click', () => removeCard(card));

  return card;
}

/**
 * Добавляет карточку места в HTML
 * @param {Element} card
 * @param {Element} место вставки карточки
 */
export function insertCardHTML(card, place = elements) {
  place.prepend(card);
}

//ФУНКЦИИ ОБЩЕГО НАЗНАЧЕНИЯ

/**
 * Удаляет карточку места
 * @param {Element} card - карточка места
 */
function removeCard(card) {
  card.remove();
}

/**
 * Отмечает кнопку like
 * @param {Element} likeButton  - кнопка like карточки места
 */
function likeCard(likeButton) {
  likeButton.classList.toggle('card__like-button_active');
}

//ОБРАБОТЧИКИ СОБЫТИЙ

buttonAddCard.addEventListener('click', function () {
  nameImgCardForm.value = "";
  linkImgCardForm.value = "";
  openPopup(cardPopup);
});

cardForm.addEventListener('submit', function (evt) {
  evt.preventDefault();
  insertCardHTML(createCard(linkImgCardForm.value, nameImgCardForm.value));
  closePopup(cardPopup);
});

buttonCloseCardForm.addEventListener('click', () => closePopup(cardPopup));
