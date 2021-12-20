
const FORM_SELECTOR = '.popup__form';
const POPUP_OPENED_CLASS = 'popup_opened';
const POPUP_OPENED_SELECTOR = '.popup_opened';
const BUTTON_CLOSE_SELECTOR = '.popup__button_event_close';

/**
 * Закрывает модальное окно
 * @param {Element} popup - Модальное окно
 */
export function closePopup(popup) {
  popup.classList.remove(POPUP_OPENED_CLASS);
  popup.removeEventListener('mousedown', onClickOverlay);
}

/**
 * Открывает модальное окно
 * @param {Element} popup  - Модальное окно
 */
export function openPopup(popup) {
  popup.classList.add(POPUP_OPENED_CLASS);
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
  const popupForm = popup.querySelector(FORM_SELECTOR);
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
    const openedPopup = document.querySelector(POPUP_OPENED_SELECTOR);
    if (openedPopup) {
      closePopup(openedPopup);
    }
  }
});

/**
 * Устанавливает всем кнопкам закрытия обработчки по закрытию попапа
 */
[...document.querySelectorAll('.popup')].forEach(popup=>{

  const buttonClose = popup.querySelector(BUTTON_CLOSE_SELECTOR);
  if (buttonClose) {
    buttonClose.addEventListener('click', ()=>closePopup(popup));
  }
});


