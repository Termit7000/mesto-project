import { openImg } from './imgForm.js';
import { openPopup, closePopup } from './modal.js';
import Api from './Api.js';
import { renderLoading, setDefaultText, notifyFormOpened } from './utils.js';
import { userId } from '../pages/index.js'
import { LIKE_CLASS } from './utils/constants.js';

//УПРАВЛЕНИЕ КАРТОЧКАМИ

const api = new Api();

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
 * Размещает карточки на странице
 * @param {Array} cardList  - список карточек JSON для вставки
 */
export function renderCardList(cardList) {
  cardList.forEach(cardJson => {
    const card = new Card({data: cardJson}, '.elements__list-item');
    const cardElement = card.generate();
    insertCardHTML(cardElement);
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
export default class Card {
  _LIKE_BUTTON_SELECTOR = '.card__like-button';
  _TRASH_BUTTON_SELECTOR = '.card__trash-button';
  constructor({ data }, selector) {
    this._data = data;
    this._selector = selector;
    this._cardId = data._id;
    this._isMine = data.owner._id === userId;
    this._cardName = this._data.name;
    this._cardLink = this._data.link;
  }

  _getElement() {
    const cardElement = document
      .querySelector('.templates')
      .content
      .querySelector(this._selector)
      .cloneNode(true);

    return cardElement;
  }

  _setCardImg() {
    const img = this._element.querySelector('.card__img');
    img.src = this._cardLink;
    img.alt = this._cardName;

    this._element.querySelector('.card__text').textContent = this._cardName;
  }

  _toggleLikeStatus(likeButton) {
    const handleLike = likeButton.classList.contains(LIKE_CLASS) ? api.unLikeCardServer.bind(api) : api.likeCardServer.bind(api);

    handleLike(this._cardId)
      .then(data => this._updateLikeStatus(data))
      .catch((error) => console.log(error));
  }

  _updateLikeStatus(data = this._data) {
    const liked = Boolean(data.likes.find(el => el._id === userId));
    const likeButton = this._element.querySelector(this._LIKE_BUTTON_SELECTOR);

    if (liked) {
      likeButton.classList.add(LIKE_CLASS);
    } else {
      likeButton.classList.remove(LIKE_CLASS);
    }

    this._element.querySelector('.card__count-likes').textContent = data.likes.length;
  }

  _setDeleteContext() {
    const trashButton = this._element.querySelector(this._TRASH_BUTTON_SELECTOR);
    if (!this._isMine) {
      trashButton.classList.add('card__trash-button_inactive');
    } else {
      trashButton.addEventListener('click', () => {
        formConfirmation.cardId = this._cardId;
        formConfirmation.currentCard = this._element;
        openPopup(popupConfirmation);
      });
    }
  }

  _setEventListeners() {
    this._element.querySelector(this._LIKE_BUTTON_SELECTOR).addEventListener('click', (evt) => {
      this._toggleLikeStatus(evt.currentTarget);
    });

    //POPUP IMG
    const popupButton = this._element.querySelector('.card__popup-button');
    popupButton.addEventListener('click', () => openImg(this._cardLink, this._cardName));
  }

  generate() {
    this._element = this._getElement();

    this._setCardImg();
    this._updateLikeStatus();
    this._setDeleteContext();
    this._setEventListeners();

    return this._element;
  }
}

//ФУНКЦИИ ОБЩЕГО НАЗНАЧЕНИЯ

/**
 * Удаляет карточку места
 * @param {Element} card - карточка места
 */
function removeCard(card) {
  card.remove();
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
  api.savePictureServer(nameCard, linkCard)
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
  api.deleteCardServer(evt.target.cardId)
    .then(() => {
      removeCard(currentCard);
      closePopup(popupConfirmation);
    })
    .catch((error) => console.log(error));
});
