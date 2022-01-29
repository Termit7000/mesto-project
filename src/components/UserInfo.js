

export default class UserInfo {
  constructor({ selectorName, selectorAbout, selectorAvatar, handlerGetUserInfo, handlerSetUserInfo, handlerSetAvatar }) {

    this._name = document.querySelector(selectorName);
    this._about = document.querySelector(selectorAbout);
    this._avatar = document.querySelector(selectorAvatar);

    this._handlerGetUserInfo = handlerGetUserInfo;
    this._handlerSetUserInfo = handlerSetUserInfo;
    this._handlerSetAvatar = handlerSetAvatar;
  }

  getUserInfo() {
    return this._handlerGetUserInfo();
  }

  setUserInfo(name, about) {
    return this._handlerSetUserInfo(name, about);
  }

  setAvatar(avatar) {
    return this._handlerSetAvatar(avatar);
  }

  updateInfo(data) {
    this._name.textContent = data.name;
    this._about.textContent = data.about;
    this._avatar.src = data.avatar;
  }
}
