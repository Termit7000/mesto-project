export default class Popup {

  _POPUP_OPENED_CLASS = 'popup_opened';
  _POPUP_CLOSED_CLASS = 'popup__close';

  constructor(selector) {
    this._popup = document.querySelector(selector);
    this._handlerEsc =  this._handleEscClose.bind(this);
  }

  _handleEscClose(event) {
    if (event.key === 'Escape') {
      this.close();
    }
  }

  open() {
    this._popup.classList.add(this._POPUP_OPENED_CLASS);
    document.addEventListener('keydown', this._handlerEsc);
  }

  close() {

    this._popup.classList.remove(this._POPUP_OPENED_CLASS);
    document.removeEventListener('keydown', this._handlerEsc);
  }

  setEventListeners() {

    this._popup.addEventListener('mousedown', event => {

      if (event.target.classList.contains(this._POPUP_OPENED_CLASS)) {
        this.close();
      }

      if (event.target.classList.contains(this._POPUP_CLOSED_CLASS)) {
        this.close();
      }
    });
  }



}
