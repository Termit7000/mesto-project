/**
 * Заменяет название кнопки при сохранениии
 * @param {Element} buttonSubmit
 */
export function renderLoading(buttonSubmit) {
  buttonSubmit.setAttribute('disabled', true);
  buttonSubmit.initValue = buttonSubmit.textContent;
  buttonSubmit.textContent = 'Сохранение...';
}

/**
 * Восстанавливает значение кнопки после сохранения
 * @param {Element} buttonSubmit
 */
export function setDefaultText(buttonSubmit) {
  buttonSubmit.removeAttribute('disabled');
  buttonSubmit.textContent = buttonSubmit.initValue;
}


/**
 * Отправляет переданной форме, событие открытие
 * @param {Element} popup
 */
 export function notifyFormOpened(formElement) {
  const evenFormOpened = new CustomEvent('formOpened');
  formElement.dispatchEvent(evenFormOpened);
};
