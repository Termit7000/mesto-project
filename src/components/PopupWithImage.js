import Popup from "./Popup";

export default class PopupWithImage extends Popup {

  constructor(selector) {
    super(selector);
    this._imgFigure = this._popup.querySelector('.image-modal__body');
    this._captionImg = this._popup.querySelector('.image-modal__caption');
  }

  open(cardLink, cardName) {

    this._imgFigure.src = cardLink;
    this._imgFigure.alt = cardName;
    this._captionImg.textContent = cardName;

    super.open();
  }
}
