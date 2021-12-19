import { openImg } from './imgForm.js';
import { openPopup, closePopup } from './modal.js';
import { savePictureServer, deleteCard, likeCardServer, unLikeCardServer } from './api.js';

//УПРАВЛЕНИЕ КАРТОЧКАМИ
const LIKE_BUTTON_CLASS = 'card__like-button_active';
const LIKE_BUTTON_SELECTOR = '.card__like-button';
const IMG_SELECTOR = '.card__img';
const CARD_NAME_SELECTOR = '.card__text';
const IMG_POPUP_BUTTON_SELECTOR = '.card__popup-button';
const BUTTON_TRASH_SELECTOR = '.card__trash-button';
const BUTTON_TRASH_INACTIVE_CLASS = 'card__trash-button_inactive';
const CARD_COUNT_SELECTOR = '.card__count-likes';

const buttonAddCard = document.querySelector('.profile__add-button');
const cardPopup = document.querySelector('.popup__card');
const cardForm = cardPopup.querySelector('.popup__form');
const nameImgCardForm = cardForm.querySelector('.popup__input_img-name');
const linkImgCardForm = cardForm.querySelector('.popup__input_img-link');

const elements = document.querySelector('.elements');
const cardTempl = document.querySelector('.templates').content.querySelector('.elements__list-item');

const popupConfirmation = document.querySelector('.popup__confirmation');
const formConfirmation = popupConfirmation.querySelector('.confirmation__form');

//ЭКСПОРТНЫЕ ФУНКЦИИ

/**
 * Создает новую карточку места
 * @param {String} cardId ID карточки
 * @param {String} cardLink URL к картинке места
 * @param {String} name название места
 * @param {Number} countLikes Количество лайков
 * @param {Boolean} isMine Текущий пользователь - владелец карточки
 * @param {Boolean} liked Текущий пользователь уже лайкнул карточку
 * @returns
 */
export function createCard({ cardId = '', cardLink = '', name = '', countLikes = 0, isMine = false, liked = false } = {}) {

  const card = cardTempl.cloneNode(true);
  card.cardID = cardId;

  setCardImg(card, name, cardLink);
  setLikeContext(card, cardId, liked);
  setCountLikes(card, countLikes);
  setDeleteContext(card,cardId, isMine)

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
 * устанавливает лайки
 * @param {Element} card
 * @param {String} cardId
 * @param {Boolean} liked  - лайкнута ли карточка текущим пользователем
 */
function setLikeContext(card, cardId, liked) {

  const likeButton = card.querySelector(LIKE_BUTTON_SELECTOR);
  likeButton.addEventListener('click', () => {
    toggleikeStatus(card, likeButton, cardId);
  });
  updateLikeStatus(likeButton, liked);
}

/**
 * Устанавливает удаление карточки
 * @param {Element} card
 * @param {String} cardId
 * @param {Boolean} isMine - true если пользователь владелец карточки
 */
function setDeleteContext(card,cardId, isMine){

    const trashButton = card.querySelector(BUTTON_TRASH_SELECTOR);
    if (!isMine) {
      trashButton.classList.add(BUTTON_TRASH_INACTIVE_CLASS);
    }
    trashButton.addEventListener('click', () => {
      formConfirmation.cardId = cardId;
      formConfirmation.currentCard = card;
      openPopup(popupConfirmation);
    });
}

/**
 * Связывает картинку с карточкой
 * @param {Element} card
 * @param {String} cardName
 * @param {String} cardLink
 */
function setCardImg(card, cardName, cardLink) {

  const img = card.querySelector(IMG_SELECTOR);
  img.src = cardLink;
  img.alt = cardName;

  card.querySelector(CARD_NAME_SELECTOR).textContent = cardName;

  //POPUP IMG
  const popupButton = card.querySelector(IMG_POPUP_BUTTON_SELECTOR);
  popupButton.addEventListener('click', () => openImg(cardLink, cardName));
}

/**
 * Отмечает кнопку like
 * @param {Element} likeButton  - кнопка like карточки места
 * @param {boolean} liked - карточку лайкнул текущий пользователь
 */
function updateLikeStatus(likeButton, liked = false) {
  if (liked) {
    likeButton.classList.add(LIKE_BUTTON_CLASS);
  } else {
    likeButton.classList.remove(LIKE_BUTTON_CLASS);
  }
}

/**
 * Определяет лайнкул ли карточку текущий пользователь
 * @param {Element} likeButton
 * @returns true - если карточка лайкнута
 */
function cardIsLiked(likeButton) {
  return likeButton.classList.contains(LIKE_BUTTON_CLASS);
}

/**
 * Переключает лайк на карточке с обновлением на сервере
 * @param {Element} likeButton - кнопка like карточки места
 * @param {*} cardId - ID карточки места
 */
function toggleikeStatus(card, likeButton, cardId) {

  const handleLike = cardIsLiked(likeButton) ? unLikeCardServer : likeCardServer;

  handleLike(cardId)
    .then(cardProperty => {
      updateLikeStatus(likeButton, cardProperty.liked);
      setCountLikes(card, cardProperty.countLikes);
    });
}

function setCountLikes(card, countLikes = 0) {
  card.querySelector(CARD_COUNT_SELECTOR).textContent = countLikes;
}

//ОБРАБОТЧИКИ СОБЫТИЙ

buttonAddCard.addEventListener('click', function () {
  nameImgCardForm.value = "";
  linkImgCardForm.value = "";
  openPopup(cardPopup);
});

cardForm.addEventListener('submit', function (evt) {
  evt.preventDefault();
  const nameCard = nameImgCardForm.value;
  const linkCard = linkImgCardForm.value;
  savePictureServer(nameCard, linkCard)
    .then(cardProperty => insertCardHTML(createCard(cardProperty)))
    .finally(() => closePopup(cardPopup));
});

popupConfirmation.addEventListener('submit', (evt) => {

  evt.preventDefault();
  if (!evt.target.cardId) {
    closePopup(popupConfirmation);
    return;
  }

  const currentCard = evt.target.currentCard;
  deleteCard(evt.target.cardId)
    .then(() => removeCard(currentCard))
    .finally(() => closePopup(popupConfirmation));
});
