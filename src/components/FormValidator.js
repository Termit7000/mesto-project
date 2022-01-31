
export default class FormValidator {

  constructor({
    formSelector,
    inputSelector,
    submitButtonSelector,
    inactiveButtonClass,
    inputErrorClass,
    errorClass
  }, formElement) {

    this._formSelector = formSelector;
    this._inputSelector = inputSelector;
    this._submitButtonSelector = submitButtonSelector;
    this._inactiveButtonClass = inactiveButtonClass;
    this._inputErrorClass = inputErrorClass;
    this._errorClass = errorClass;

    this._formElement = formElement;
  }

  enableValidation() {
    this._setEventListners();
  }

  _setEventListners() {

    const inputList = [...this._formElement.querySelectorAll(this._inputSelector)];
    const buttonElement = this._formElement.querySelector(this._submitButtonSelector);
    this._toggleButtonState(inputList, buttonElement);

    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkValidation(inputElement);
        this._toggleButtonState(inputList, buttonElement);
      });
    });

    /**
     * Отлавливает кастомное событие открытия формы
     */
    this._formElement.addEventListener('formOpened', () => this._toggleButtonState(inputList, buttonElement));
  }

  _toggleButtonState(inputList, buttonElement) {

    const allValid = inputList.every(inputElement => inputElement.validity.valid);

    if (allValid) {
      buttonElement.classList.remove(this._inactiveButtonClass);
      buttonElement.removeAttribute('disabled');

    } else {
      buttonElement.classList.add(this._inactiveButtonClass);
      buttonElement.setAttribute('disabled', true);
    }
  }

  _checkValidation(inputElement) {

    if (inputElement.validity.valid) {
      this._hideError(inputElement);
    } else {
      this._showError(inputElement, inputElement.validationMessage);
    }
  }

  _hideError(inputElement) {
    const inputErrorLabel = this._getErrorLabel(inputElement);
    inputElement.classList.remove(this._inputErrorClass);
    inputErrorLabel.classList.remove(this._errorClass);
  };

  _showError(inputElement, errorMassage) {
    const inputErrorLabel = this._getErrorLabel(inputElement);
    inputElement.classList.add(this._inputErrorClass);
    inputErrorLabel.classList.add(this._errorClass);
    inputErrorLabel.textContent = errorMassage;
  };

  _getErrorLabel(inputElement) {
    let errorLabel = inputElement.errorLabel;
    if (!errorLabel) {
      errorLabel = this._formElement.querySelector(`#${inputElement.id}-error`);
      inputElement.errorLabel = errorLabel;
    }
    return errorLabel;
  };


}
