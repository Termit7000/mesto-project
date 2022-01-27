import PopupWithForm from "./PopupWithForm";

export default class UserInfo extends PopupWithForm {
  constructor({ selector, selectorName, selectorAbout, handleGetUserInfo, handleFormSubmit }) {
    super({selector, handleFormSubmit});
    this._name = this._popup.querySelector(selectorName);
    this._about = this._popup.querySelector(selectorAbout);
    this._handleGetUserInfo = handleGetUserInfo;
  }

  getUserInfo() {
    return this._handleGetUserInfo();
  }

  setUserInfo() {
    this._handleFormSubmit(this._name.value, this._about.value);
  }

  updateUserInfo({ name, about }) {
    this._name.value = name;
    this._about.value = about;
  }
}
