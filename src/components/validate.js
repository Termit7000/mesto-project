const options = {
  formSelector: '',
  inputSelector: '',
  submitButtonSelector: '',
  inactiveButtonClass: '',
  inputErrorClass: '',
  errorClass: ''
};

//ЭКСПОРТНЫЕ ФУНКЦИИ
export const enableValidation = function ({
  formSelector = '.popup__form',
  inputSelector = '.popup__input',
  submitButtonSelector = '.popup__button_event_submit',
  inactiveButtonClass = 'popup__button_inactive',
  inputErrorClass = 'popup__input_type_error',
  errorClass = 'popup__input-error_active'
} = {}) {

  options.formSelector = formSelector;
  options.inputSelector = inputSelector;
  options.submitButtonSelector = submitButtonSelector;
  options.inactiveButtonClass = inactiveButtonClass;
  options.inputErrorClass = inputErrorClass;
  options.errorClass = errorClass;


  [...document.querySelectorAll(formSelector)].forEach(formElement => setEventListners(formElement));

};

//ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ

/**
 * Устанавливает проверку валидации для всех полей ввода формы
 * @param {Element} formElement
 */
const setEventListners = (formElement) => {
  const inputList = [...formElement.querySelectorAll(options.inputSelector)];
  const buttonElement = formElement.querySelector(options.submitButtonSelector);
  toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkValidation(inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });

  formElement.addEventListener('popupOpened', ()=>toggleButtonState(inputList, buttonElement));

}

/**
 *
 * @param {Element} inputElement
 */
const checkValidation = (inputElement) => {
  if (inputElement.validity.valid) {
    hideError(inputElement);
  } else {
    showError(inputElement, inputElement.validationMessage);
  }
};

/**
 * Отображает ошибку ввода
 * @param {Element} inputElement
 */
const showError = (inputElement, errorMassage) => {
  const inputErrorLabel = getErrorLabel(inputElement);
  inputElement.classList.add(options.inputErrorClass);
  inputErrorLabel.classList.add(options.errorClass);
  inputErrorLabel.textContent = errorMassage;
};

/**
 * Скрывает ошибку ввода
 * @param {Element} inputElement
 */
const hideError = (inputElement) => {
  const inputErrorLabel = getErrorLabel(inputElement);
  inputElement.classList.remove(options.inputErrorClass);
  inputErrorLabel.classList.remove(options.errorClass);
};

/**
 * Возвращает элемент для вывода ошибки валидации инпута
 * @param {Element} inputElement
 * @returns
 */
const getErrorLabel = (inputElement) => {

  let errorLabel = inputElement.errorLabel;
  if (!errorLabel) {
    errorLabel = inputElement.closest('.popup__input-label').querySelector(`#${inputElement.id}-error`);
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
const toggleButtonState = (inputList, buttonElement) => {

  if (allInputValid(inputList)) {
    buttonElement.classList.remove(options.inactiveButtonClass);
    buttonElement.removeAttribute('disabled');

  } else {
    buttonElement.classList.add(options.inactiveButtonClass);
    buttonElement.setAttribute('disabled', true);
  }
};
