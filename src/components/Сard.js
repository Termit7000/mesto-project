import Api from './Api.js';
import { userId } from '../pages/index.js'
import { LIKE_CLASS } from './utils/constants.js';

//УПРАВЛЕНИЕ КАРТОЧКАМИ

const api = new Api();

//ЭКСПОРТНЫЕ ФУНКЦИИ

export default class Card {
  _LIKE_BUTTON_SELECTOR = '.card__like-button';
  _TRASH_BUTTON_SELECTOR = '.card__trash-button';
  constructor({ data, handleCardClick, handleTrashClick }, selector) {

    this._data = data;
    this._handleCardClick = handleCardClick;
    this._handleTrashClick = handleTrashClick;

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
        this._handleTrashClick();
      });
    }
  }

  _setEventListeners() {
    this._element.querySelector(this._LIKE_BUTTON_SELECTOR).addEventListener('click', (evt) => {
      this._toggleLikeStatus(evt.currentTarget);
    });

    //POPUP IMG
    const popupButton = this._element.querySelector('.card__popup-button');
    popupButton.addEventListener('click', () =>  this._handleCardClick(this._cardLink, this._cardName));
  }

  generate() {
    this._element = this._getElement();

    this._setCardImg();
    this._updateLikeStatus();
    this._setDeleteContext();
    this._setEventListeners();

    return this._element;
  }

  remove() {
    this._element.remove();
  }

  getId() {
    return this._cardId;
  }

}
