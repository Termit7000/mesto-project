import { openPopup } from './modal.js';

//POPUP IMG
const imgPopup = document.querySelector('.img-popup');
const imgFigure = imgPopup.querySelector('.image-modal__body');
const captionImg = imgPopup.querySelector('.image-modal__caption');

/**
 * Открывает модальное окно по переданной картинке
 * @param {URL} imgSrc  - путь к картинке
 * @param {String} caption - подпись к картинке
 */
export function openImg(imgSrc, caption) {

  imgFigure.src = imgSrc;
  imgFigure.alt = caption;
  captionImg.textContent = caption;

  openPopup(imgPopup);
}
