/**
 * Закрывает модальное окно
 * @param {Element} popup - Модальное окно
 */
export function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

/**
 * Открывает модальное окно
 * @param {Element} popup  - Модальное окно
 */
export function openPopup(popup) {
  popup.classList.add('popup_opened');
}


//ОБРАБОТЧИКИ СОБЫТИЙ

/**
 * Закрытие попапа по клику на оверлею
 */
[...document.querySelectorAll('.popup')].forEach(popup => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target === evt.currentTarget) {
      closePopup(popup);
    }
  });
});

/**
 * Закрытьие открытого попапа по ESC
 */
document.addEventListener('keydown', (evt) => {

  if (evt.key === "Escape") {
    const openedPopup = document.querySelector('.popup_opened');
    if (openedPopup) {
      closePopup(openedPopup);
    }
  }
});
