/**
 * Закрывает модальное окно
 * @param {Element} popup - Модальное окно
 */
export function closePopup(popup) {
  popup.classList.remove('popup_opened');
  popup.removeEventListener('mousedown', onClickOverlay);
}

/**
 * Открывает модальное окно
 * @param {Element} popup  - Модальное окно
 */
export function openPopup(popup) {
  popup.classList.add('popup_opened');
  notifyPopupOpened(popup);
  popup.addEventListener('mousedown', onClickOverlay);
}

//ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ

/**
 * Отправляет вложенной форме событие, что попап открыт
 * @param {Element} popup
 */
function notifyPopupOpened(popup) {
  const eventPopupOpened = new CustomEvent('popupOpened');
  const popupForm = popup.querySelector('.popup__form');
  popupForm?.dispatchEvent(eventPopupOpened);
};

/**
 * Обработчик события по клику на оверлею
 */
function onClickOverlay(event) {
  if (event.target === event.currentTarget) {
    closePopup(event.target);
  }
}

//ОБРАБОТЧИКИ СОБЫТИЙ

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
