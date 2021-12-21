import { POPUP_OPENED_CLASS, POPUP_OPENED_SELECTOR, CLOSE_CLASS } from './utils/constants.js';

/**
 * Закрывает модальное окно
 * @param {Element} popup - Модальное окно
 */
export function closePopup(popup) {
  popup.classList.remove(POPUP_OPENED_CLASS);
  document.removeEventListener('keydown', closeByEscape);
}

/**
 * Открывает модальное окно
 * @param {Element} popup  - Модальное окно
 */
export function openPopup(popup) {
  popup.classList.add(POPUP_OPENED_CLASS);
  document.addEventListener('keydown', closeByEscape);
}

//ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ

/**
 * Закрывает открытый попап по Esc
 * @param {Event} evt
 */
function closeByEscape(event) {
  if (event.key === 'Escape') {
    const openedPopup = document.querySelector(POPUP_OPENED_SELECTOR);
    closePopup(openedPopup);
  }
}

//ОБРАБОТЧИКИ СОБЫТИЙ

/**
 * Устанавливает всем кнопкам закрытия обработчки по закрытию попапа
 * я понял, что здесь предлагается отлавливать всплывающее событие от кнопки на попапе. Спасибо!
 */
document.querySelectorAll('.popup').forEach(popup=>{

  popup.addEventListener('click', event=>{

    if (event.target.classList.contains(POPUP_OPENED_CLASS)) {
      closePopup(popup);
    }

    if (event.target.classList.contains(CLOSE_CLASS)) {
      closePopup(popup);
    }
  });
});


