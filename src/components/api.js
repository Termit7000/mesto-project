import { TOKEN, URL_SERVER } from './utils/constants.js';


const defaultConfig = {
  baseUrl: URL_SERVER,
  headers: {
    authorization: TOKEN,
    'Content-Type': 'application/json'
  }
}

//ЭКСПОРТНЫЕ ФУНКЦИИ

export default class Api {
  constructor({ baseUrl, headers } = defaultConfig) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  /**
  * Получение данных текущего пользователя
  */
  getUser() {
    const URL_SERVICE = '/users/me';
    return this._executeRequest({ url_service: URL_SERVICE });
  }

  /**
   * Обновляет ссылку на аватар на сервере
   * @param {String} urlAvatar
   */
  updateAvatarServer(urlAvatar) {
    const URL_SERVICE = '/users/me/avatar';
    const bodyRequest = JSON.stringify({ avatar: urlAvatar });
    return this._executeRequest({ url_service: URL_SERVICE, method: 'PATCH', body: bodyRequest });
  }

  /**
   * Обновление профиля пользователя
   * @param {String} name - Имя пользователя
   * @param {String} about  - Описание (О себе)
   */
  saveProfileServer(name = 'sivanov', about = 'Описание') {
    const URL_SERVICE = '/users/me';
    const bodyRequest = JSON.stringify({ name: name, about: about });
    return this._executeRequest({ url_service: URL_SERVICE, method: 'PATCH', body: bodyRequest });
  }

  /**
   * Добавление новой карточки на сервер
   * @param {String} name  - название карточки
   * @param {String} link - ссылка на место хранения картинки
   */
  savePictureServer(name = '', link = '') {
    const URL_SERVICE = '/cards';
    const bodyRequest = JSON.stringify({ name: name, link: link });
    return this._executeRequest({ url_service: URL_SERVICE, method: 'POST', body: bodyRequest });
  }

  /**
   * Получение карточек и вставка на страницу
   */
  getCards() {
    const URL_SERVICE = '/cards';
    return this._executeRequest({ url_service: URL_SERVICE });
  }

  /**
   * Удаляет карточку с сервера
   * @param {String} cardId
   * @returns Promise промис о результате удаления карточки
   */
  deleteCardServer(cardId = '') {
    const URL_SERVICE = `/cards/${cardId}`;
    return this._executeRequest({ url_service: URL_SERVICE, method: 'DELETE' });
  }

  /**
   * Устаавливает лайк на карточку
   * @param {String} cardId - ID карточки места
   * @returns Promise с результатом запроса на сервер
   */
  likeCardServer(cardId = '') {
    const URL_SERVICE = `/cards/likes/${cardId}`;
    return this._executeRequest({ url_service: URL_SERVICE, method: 'PUT' });
  }

  /**
   * Снимает лайк с карточки
   * @param {String} cardId  - ID карточки места
   * @returns Promise с резуальтатом запроса
   */
  unLikeCardServer(cardId = '') {
    const URL_SERVICE = `/cards/likes/${cardId}`;
    return this._executeRequest({ url_service: URL_SERVICE, method: 'DELETE' });
  }
  /**
 * Выполнение запроса к серверу
 * @param {config} параметры запроса: имя сервиса, метод, тело запроса
 * @returns Promise
 */
  _executeRequest({ url_service, method = 'GET', body = '' }) {

    const config = {
      method: method,
      headers: this.headers
    };

    if (body) {
      config.body = body;
    }

    return fetch(`${URL_SERVER}${url_service}`, config)
      .then(res => {

        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Не удалось выполнить запрос к серверу ${res.statusText}`);
      });
  }
}
