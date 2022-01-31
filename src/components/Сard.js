export default class Card {
  _LIKE_BUTTON_SELECTOR = '.card__like-button';
  _TRASH_BUTTON_SELECTOR = '.card__trash-button';
  _LIKE_CLASS = 'card__like-button_active';
  _ELEMENTS_SELECTOR =  '.elements__list-item';
  constructor({ data, userId, handleCardClick, handleTrashClick, handleLike, handleUnLike }, selector) {

    this._data = data;
    this._handleCardClick = handleCardClick;
    this._handleTrashClick = handleTrashClick;
    this._handleLike = handleLike;
    this._handleUnLike = handleUnLike;

    this._selector = selector;
    this._cardId = data._id;
    this._userId = userId;
    this._isMine = data.owner._id === userId;

    this._cardName = this._data.name;
    this._cardLink = this._data.link;
  }

  _getElement() {
    const cardElement = document
      .querySelector(this._selector)
      .content
      .querySelector(this._ELEMENTS_SELECTOR)
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
    const handleLike = likeButton.classList.contains(this._LIKE_CLASS) ? this._handleUnLike : this._handleLike;
    handleLike(this._cardId);
  }

  updateLikeStatus(data = this._data) {
    const liked = Boolean(data.likes.find(el => el._id === this._userId));
    const likeButton = this._element.querySelector(this._LIKE_BUTTON_SELECTOR);

    if (liked) {
      likeButton.classList.add(this._LIKE_CLASS);
    } else {
      likeButton.classList.remove(this._LIKE_CLASS);
    }

    this._element.querySelector('.card__count-likes').textContent = data.likes.length;
  }

  _setDeleteContext() {
    const trashButton = this._element.querySelector(this._TRASH_BUTTON_SELECTOR);
    if (!this._isMine) {
      trashButton.classList.add('card__trash-button_inactive');
    } else {
      trashButton.addEventListener('click', () => {
        this._handleTrashClick(this._element, this._cardId);
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

    this._setDeleteContext();
  }

  generate() {
    this._element = this._getElement();

    this._setCardImg();
    this.updateLikeStatus();
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
