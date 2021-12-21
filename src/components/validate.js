//ЭКСПОРТНЫЕ ФУНКЦИИ
export const enableValidation = function (options) {
  document.querySelectorAll(options.formSelector).forEach(formElement => setEventListners(formElement, options));
};

//ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ

/**
 * Устанавливает проверку валидации для всех полей ввода формы
 * @param {Element} formElement
 */
const setEventListners = (formElement, options) => {
  const inputList = [...formElement.querySelectorAll(options.inputSelector)];
  const buttonElement = formElement.querySelector(options.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, options);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkValidation(formElement, inputElement, options);
      toggleButtonState(inputList, buttonElement, options);
    });
  });

  /**
   * Отлавливает кастомное событие открытия формы
   */
  formElement.addEventListener('formOpened', () => {
    inputList.forEach(inputElement => checkValidation(formElement, inputElement, options));
    toggleButtonState(inputList, buttonElement, options);
  });
}

/**
 *
 * @param {Element} inputElement
 */
const checkValidation = (formElement, inputElement, options) => {
  if (inputElement.validity.valid) {
    hideError(formElement, inputElement, options);
  } else {
    showError(formElement, inputElement, inputElement.validationMessage, options);
  }
};

/**
 * Отображает ошибку ввода
 * @param {Element} inputElement
 */
const showError = (formElement, inputElement, errorMassage, options) => {
  const inputErrorLabel = getErrorLabel(formElement, inputElement);
  inputElement.classList.add(options.inputErrorClass);
  inputErrorLabel.classList.add(options.errorClass);
  inputErrorLabel.textContent = errorMassage;
};

/**
 * Скрывает ошибку ввода
 * @param {Element} inputElement
 */
const hideError = (formElement, inputElement, options) => {
  const inputErrorLabel = getErrorLabel(formElement, inputElement);
  inputElement.classList.remove(options.inputErrorClass);
  inputErrorLabel.classList.remove(options.errorClass);
};

/**
 * Возвращает элемент для вывода ошибки валидации инпута
 * @param {Element} inputElement
 * @returns
 */
const getErrorLabel = (formElement, inputElement) => {

  let errorLabel = inputElement.errorLabel;
  if (!errorLabel) {
    errorLabel = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.errorLabel = errorLabel;
  }

  return errorLabel;
};

/**
 * Проверяет все переданные поля ввода на валидность
 * @param {Array} inputList
 * @returns
 */
const allInputValid = (inputList) => {
  return inputList.every(inputElement => inputElement.validity.valid);
}

/**
 * Переключает кнопку отправки формы, в зависимости от валидности полей ввода
 * @param {Array} inputList
 * @param {Element} buttonElement
 */
const toggleButtonState = (inputList, buttonElement, options) => {

  if (allInputValid(inputList)) {
    buttonElement.classList.remove(options.inactiveButtonClass);
    buttonElement.removeAttribute('disabled');

  } else {
    buttonElement.classList.add(options.inactiveButtonClass);
    buttonElement.setAttribute('disabled', true);
  }
};
