
/**
 * Заменяет название кнопки при сохранениии
 * @param {Element} buttonSubmit
 */
export function disableSubmitButton(buttonSubmit) {
  buttonSubmit.setAttribute('disabled', true);
  buttonSubmit.initValue = buttonSubmit.textContent;
  buttonSubmit.textContent = 'Сохранение...';
}

/**
 * Восстанавливает значение кнопки после сохранения
 * @param {Element} buttonSubmit
 */
export function enableSubmitButton(buttonSubmit) {
  buttonSubmit.removeAttribute('disabled');
  buttonSubmit.textContent = buttonSubmit.initValue;
}


/**
 * Задержка в выполнении промиса, для имитации долгого сохранения
 * @param {Number} ms
 * @returns
 */
export function delay(ms) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, ms)
  });
}
