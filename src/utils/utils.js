/**
 * Отправляет переданной форме, событие открытие
 * @param {Element} popup
 */
 export function notifyFormOpened(formElement) {
  const evenFormOpened = new CustomEvent('formOpened');
  formElement.dispatchEvent(evenFormOpened);
};
