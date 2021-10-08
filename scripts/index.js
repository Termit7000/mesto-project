
//ПРОФИЛЬ
const profilePopup = document.querySelector('.popup__profile');
const formProfileEdit = profilePopup.querySelector('.popup__form');
const buttonCloseProfileEdit = profilePopup.querySelector('.popup__button_event_close');
const nameInputFormProfile = formProfileEdit.querySelector('.popup__input-container_name');
const jobInputFormProfile = formProfileEdit.querySelector('.popup__input-container_job');

const jobProfile = document.querySelector('.profile__text');
const nameProfile = document.querySelector('.profile__title');
const buttonEditProfile = document.querySelector('.profile__edit-button');

//POPUP IMG
const imgPopup = document.querySelector('.popup__img');
const imgFigure = imgPopup.querySelector('.image-modal__body');
const captionImg = imgPopup.querySelector('.image-modal__caption');
const buttonCloseImgPopup = imgPopup.querySelector('.popup__button_event_close');

//УПРАВЛЕНИЕ КАРТОЧКАМИ
const buttonAddCard = document.querySelector('.profile__add-button');
const cardPopup = document.querySelector('.popup__card');
const cardForm = cardPopup.querySelector('.popup__form');
const nameImgCardForm = cardForm.querySelector('.popup__input-container_name');
const linkImgCardForm = cardForm.querySelector('.popup__input-container_link');
const buttonCloseCardForm = cardPopup.querySelector('.popup__button_event_close');

const elements = document.querySelector('.elements');
const cardTempl = document.querySelector('.templates').content.querySelector('.elements__list-item');

/**
 * Закрывает модальное окно
 * @param {Element} popup - Модальное окно
 */
function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

/**
 * Открывает модальное окно
 * @param {Element} popup  - Модальное окно
 */
function openPopup(popup) {
  popup.classList.add('popup_opened');
}

/**
 * Открывает модальное окно по переданной картинке
 * @param {URL} imgSrc  - путь к картинке
 * @param {String} caption - подпись к картинке
 */
function openImg(imgSrc, caption) {

  imgFigure.src = imgSrc;
  imgFigure.alt = caption;
  captionImg.textContent = caption;

  openPopup(imgPopup);
}

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

/**
 * Создает новую карточку места
 * @param {URL} link - путь к картинке места
 * @param {String} name - название места
 * @returns
 */
function createCard(link, name) {

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
function insertCardHTML(card, place) {
  place.insertAdjacentElement('afterbegin', card);
}

//ОБРАБОТЧИКИ ПРОФИЛЯ

formProfileEdit.addEventListener('submit', function (evt) {
  evt.preventDefault();
  jobProfile.textContent = jobInputFormProfile.value;
  nameProfile.textContent = nameInputFormProfile.value;
  closePopup(profilePopup);
});

buttonCloseProfileEdit.addEventListener('click', () => closePopup(profilePopup));

buttonEditProfile.addEventListener('click', function () {
  nameInputFormProfile.value = nameProfile.textContent;
  jobInputFormProfile.value = jobProfile.textContent;
  openPopup(profilePopup);
});


//ОБРАБОТЧИКИ МОДАЛЬНОЙ ФОРМЫ КАРТИНКИ

buttonCloseImgPopup.addEventListener('click', () => closePopup(imgPopup));


//ОБРАБОТЧИКИ КАРТОЧКИ МЕСТА

buttonAddCard.addEventListener('click', function () {
  nameImgCardForm.value = "";
  linkImgCardForm.value = "";
  openPopup(cardPopup);
});

cardForm.addEventListener('submit', function (evt) {
  evt.preventDefault();
  insertCardHTML(createCard(linkImgCardForm.value, nameImgCardForm.value), elements);
  closePopup(cardPopup);
});

buttonCloseCardForm.addEventListener('click', () => closePopup(cardPopup));

