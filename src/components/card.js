import { openImg } from './imgForm.js';
import { openPopup, closePopup } from './modal.js';
import { savePictureServer, deleteCardServer, likeCardServer, unLikeCardServer } from './api.js';
import { renderLoading, setDefaultText, notifyFormOpened } from './utils.js';
import { userId } from '../pages/index.js'
import { LIKE_CLASS } from './utils/constants.js';

//УПРАВЛЕНИЕ КАРТОЧКАМИ

const buttonAddCard = document.querySelector('.profile__add-button');
const popupCard = document.querySelector('.card-popup');
const buttonSubmit = popupCard.querySelector('.popup__button_event_submit');
const formCard = popupCard.querySelector('.popup__form');
const inputImgName = formCard.querySelector('.popup__input_img-name');
const inputLink = formCard.querySelector('.popup__input_img-link');

const elements = document.querySelector('.elements');
const cardTempl = document.querySelector('.templates').content.querySelector('.elements__list-item');

const popupConfirmation = document.querySelector('.confirmation-popup');
const formConfirmation = popupConfirmation.querySelector('.confirmation-popup__form');

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
  setDeleteContext(card, cardId, isMine)

  return card;
}

/**
 * Размещает карточки на странице
 * @param {Array} cardList  - список карточек JSON для вставки
 */
export function renderCardList(cardList) {
  cardList.forEach(cardJson => {
    const cardProperties = getCardPropertyFromResponse(cardJson);
    insertCardHTML(createCard(cardProperties));
  })
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

  const likeButton = card.querySelector('.card__like-button');
  likeButton.addEventListener('click', () => {
    toggleLikeStatus(card, likeButton, cardId);
  });
  updateLikeStatus(likeButton, liked);
}

/**
 * Устанавливает удаление карточки
 * @param {Element} card
 * @param {String} cardId
 * @param {Boolean} isMine - true если пользователь владелец карточки
 */
function setDeleteContext(card, cardId, isMine) {

  const trashButton = card.querySelector('.card__trash-button');
  if (!isMine) {
    trashButton.classList.add('card__trash-button_inactive');
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

  const img = card.querySelector('.card__img');
  img.src = cardLink;
  img.alt = cardName;

  card.querySelector('.card__text').textContent = cardName;

  //POPUP IMG
  const popupButton = card.querySelector('.card__popup-button');
  popupButton.addEventListener('click', () => openImg(cardLink, cardName));
}

/**
 * Отмечает кнопку like
 * @param {Element} likeButton  - кнопка like карточки места
 * @param {boolean} liked - карточку лайкнул текущий пользователь
 */
function updateLikeStatus(likeButton, liked = false) {
  if (liked) {
    likeButton.classList.add(LIKE_CLASS);
  } else {
    likeButton.classList.remove(LIKE_CLASS);
  }
}

/**
 * Определяет лайнкул ли карточку текущий пользователь
 * @param {Element} likeButton
 * @returns true - если карточка лайкнута
 */
function cardIsLiked(likeButton) {
  return likeButton.classList.contains(LIKE_CLASS);
}

/**
 * Переключает лайк на карточке с обновлением на сервере
 * @param {Element} likeButton - кнопка like карточки места
 * @param {String} cardId - ID карточки места
 */
function toggleLikeStatus(card, likeButton, cardId) {

  const handleLike = cardIsLiked(likeButton) ? unLikeCardServer : likeCardServer;

  handleLike(cardId)
    .then(cardResponse => {
      const cardProperies = getCardPropertyFromResponse(cardResponse);
      updateLikeStatus(likeButton, cardProperies.liked);
      setCountLikes(card, cardProperies.countLikes);
    })
    .catch((error) => console.log(error));
}

function setCountLikes(card, countLikes = 0) {
  card.querySelector('.card__count-likes').textContent = countLikes;
}

/**
 *
 * @param {JSON} cardJson  - JSON-ответ сервера, содержащий данные карточки
 * @returns Object - со свойствами полученной карточки
 */
function getCardPropertyFromResponse(cardJson) {

  const cardProperties = {
    cardId: cardJson._id,
    cardLink: cardJson.link,
    name: cardJson.name,
    countLikes: cardJson.likes.length,
    isMine: cardJson.owner._id === userId,
    liked: Boolean(cardJson.likes.find(el => el._id === userId))
  };
  return cardProperties;
}

//ОБРАБОТЧИКИ СОБЫТИЙ

buttonAddCard.addEventListener('click', function () {
  notifyFormOpened(formCard);
  openPopup(popupCard);
});

formCard.addEventListener('submit', function (evt) {
  evt.preventDefault();
  renderLoading(buttonSubmit);

  const nameCard = inputImgName.value;
  const linkCard = inputLink.value;
  savePictureServer(nameCard, linkCard)
    .then(card => {
      renderCardList([card]);
      closePopup(popupCard);
      inputImgName.value = "";
      inputLink.value = "";
    })
    .catch((error) => console.log(error))
    .finally(() => setDefaultText(buttonSubmit));
});

popupConfirmation.addEventListener('submit', (evt) => {

  evt.preventDefault();
  if (!evt.target.cardId) {
    closePopup(popupConfirmation);
    return;
  }

  const currentCard = evt.target.currentCard;
  deleteCardServer(evt.target.cardId)
    .then(() => {
      removeCard(currentCard);
      closePopup(popupConfirmation);
    })
    .catch((error) => console.log(error));
});
