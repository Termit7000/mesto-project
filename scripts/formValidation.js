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
  inputElement.classList.add('popup__input_type_error');
  inputErrorLabel.classList.add('popup__input-error_active');
  inputErrorLabel.textContent = errorMassage;
};


/**
 * Скрывает ошибку ввода
 * @param {Element} inputElement
 */
const hideError = (inputElement) => {
  const inputErrorLabel = getErrorLabel(inputElement);
  inputElement.classList.remove('popup__input_type_error');
  inputErrorLabel.classList.remove('popup__input-error_active');
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
    buttonElement.classList.remove('popup__button_inactive');
    buttonElement.removeAttribute('disabled');

  } else {
    buttonElement.classList.add('popup__button_inactive');
    buttonElement.setAttribute('disabled', true);
  }
};

/**
 * Устанавливает проверку валидации для всех полей ввода формы
 * @param {Element} formElement
 */
const setEventListners = (formElement) => {
  const inputList = [...formElement.querySelectorAll('.popup__input')];
  const buttonElement = formElement.querySelector('.popup__button_event_submit');
  toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkValidation(inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
}

[...document.querySelectorAll('.popup__form')].forEach(formElement=>setEventListners(formElement));
