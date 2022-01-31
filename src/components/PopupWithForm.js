import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor({ selector, handleFormSubmit }) {
    super(selector);
    this._handleFormSubmit = handleFormSubmit;
    this._formElement = this._popup.querySelector('.popup__form');
    this._inputList = this._formElement.querySelectorAll('.popup__input');
    this._submitButton = this._formElement.querySelector('.popup__button_event_submit');
  }

  _getInputValues() {

    this._formValues = {};

    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });

    return this._formValues;
  }

  getFormElement() {
    return this._formElement;
  }

  _renderLoading() {
    this._submitButton.setAttribute('disabled', true);
    this._submitButton.initValue = this._submitButton.textContent;
    this._submitButton.textContent = 'Сохранение...';
  }

  setDefaultText() {
    this._submitButton.removeAttribute('disabled');
    this._submitButton.textContent = this._submitButton.initValue;
  }

  setEventListeners() {
    super.setEventListeners();

    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._getInputValues();
      this._renderLoading();
      this._handleFormSubmit(this._formValues);
    })
  }

  close() {
    super.close();
    this._formElement.reset();
  }
}
