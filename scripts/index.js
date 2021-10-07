function closeForm(popupForm) {
  return function () {
    popupForm.classList.remove('popup_opened');
  }
}

function openForm(popupForm) {
  popupForm.classList.add('popup_opened');
}

const popupProfile = document.querySelector('.popup__profile');
const editForm = popupProfile.querySelector('.popup__form');
const closeButtonFormEdit = popupProfile.querySelector('.popup__button_event_close');
const editFormProfileName = editForm.querySelector('.popup__input-container_name');
const editFormPrifileJob = editForm.querySelector('.popup__input-container_job');

const profileJob = document.querySelector('.profile__text'); //Деятельность
const profileName = document.querySelector('.profile__title'); //Имя профиля

const closeProfileForm = closeForm(popupProfile);

editForm.addEventListener('submit', function (evt) {
  evt.preventDefault();
  profileJob.textContent = editFormPrifileJob.value;
  profileName.textContent = editFormProfileName.value;
  closeProfileForm();
});

closeButtonFormEdit.addEventListener('click', closeProfileForm);

//открытие формы профиля
const editButton = document.querySelector('.profile__edit-button');
editButton.addEventListener('click', function () {
  editFormProfileName.value = profileName.textContent;
  editFormPrifileJob.value = profileJob.textContent;
  openForm(popupProfile);
});

//POPUP IMG
const imgPopup = document.querySelector('.popup__img');
const imgFigure = imgPopup.querySelector('.image-modal__body');
const captionImg = imgPopup.querySelector('.image-modal__caption');
const closeButtonImgModel = imgPopup.querySelector('.popup__button_event_close');
closeButtonImgModel.addEventListener('click', closeForm(imgPopup));

function openImg(imgSrc, caption) {

  return function () {
    imgFigure.src = imgSrc;
    imgFigure.alt = caption;
    captionImg.textContent = caption;

    openForm(imgPopup);
  };
}

//УПРАВЛЕНИЕ КАРТОЧКАМИ
const addCardButton = document.querySelector('.profile__add-button');
const popupCard = document.querySelector('.popup__card');
const cardForm = popupCard.querySelector('.popup__form');
const cardFormImgName = cardForm.querySelector('.popup__input-container_name');
const cardFormimgLink = cardForm.querySelector('.popup__input-container_link');

const elements = document.querySelector('.elements');
const cardTempl = document.querySelector('.templates').content.querySelector('.elements__list-item');

function addCard(link, name) {

  const card = cardTempl.cloneNode(true);
  elements.insertAdjacentElement('afterbegin', card);

  const img = card.querySelector('.card__img');
  img.src = link;
  img.alt = name;

  card.querySelector('.card__text').textContent = name;

  //POPUP IMG
  const popupButton = card.querySelector('.card__popup-button');
  popupButton.addEventListener('click', openImg(link, name));

  //LIKE
  const likeButton = card.querySelector('.card__like-button');
  likeButton.addEventListener('click', function () {
    likeButton.classList.toggle('card__like-button_active');
  });

  //DELETE CARD
  const trashButton = card.querySelector('.card__trash-button');
  trashButton.addEventListener('click', function () {
    card.remove();
  });
}

addCardButton.addEventListener('click', function () {
  cardFormImgName.value = "";
  cardFormimgLink.value = "";
  openForm(popupCard);
});

const closeButtonFormCard = closeForm(popupCard);

cardForm.addEventListener('submit', function (evt) {
  evt.preventDefault();
  addCard(cardFormimgLink.value, cardFormImgName.value);
  closeButtonFormCard();
});

const closeButtonCardForm = popupCard.querySelector('.popup__button_event_close');
closeButtonCardForm.addEventListener('click', closeButtonFormCard);

//Карточки с картинками при загрузке страницы
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

initialCards.forEach(i => {
  addCard(i.link, i.name);
});



