import { TOKEN, ID_GROUP, URL_SERVER } from './utils/constants.js';

//ЭКСПОРТНЫЕ ФУНКЦИИ

/**
 * Получение данных текущего пользователя
 */
export function getUser() {
  const URL_SERVICE = '/users/me';
  return executeRequest({ url_service: URL_SERVICE });
}

/**
 * Обновляет ссылку на аватар на сервере
 * @param {String} urlAvatar
 */
export function updateAvatarServer(urlAvatar) {
  const URL_SERVICE = '/users/me/avatar';
  const bodyRequest = JSON.stringify({avatar: urlAvatar});
  return executeRequest({url_service: URL_SERVICE, method: 'PATCH', body: bodyRequest});
}

/**
 * Обновление профиля пользователя
 * @param {String} name - Имя пользователя
 * @param {String} about  - Описание (О себе)
 */
export function saveProfileServer(name = 'sivanov', about = 'Описание') {
  const URL_SERVICE = '/users/me';
  const bodyRequest = JSON.stringify({ name: name, about: about });
  return executeRequest({ url_service: URL_SERVICE, method: 'PATCH', body: bodyRequest });
}

/**
 * Добавление новой карточки на сервер
 * @param {String} name  - название карточки
 * @param {String} link - ссылка на место хранения картинки
 */
export function savePictureServer(name = '', link = '') {
  const URL_SERVICE = '/cards';
  const bodyRequest = JSON.stringify({ name: name, link: link });
  return executeRequest({ url_service: URL_SERVICE, method: 'POST', body: bodyRequest });
}

/**
 * Получение карточек и вставка на страницу
 */
export function getCards() {
  const URL_SERVICE = '/cards';
  return executeRequest({ url_service: URL_SERVICE });
}

/**
 * Удаляет карточку с сервера
 * @param {String} cardId
 * @returns Promise промис о результате удаления карточки
 */
export function deleteCardServer(cardId = '') {
  const URL_SERVICE = `/cards/${cardId}`;
  return executeRequest({url_service: URL_SERVICE, method: 'DELETE'});
}

/**
 * Устаавливает лайк на карточку
 * @param {String} cardId - ID карточки места
 * @returns Promise с результатом запроса на сервер
 */
export function likeCardServer(cardId = '') {
  const URL_SERVICE = `/cards/likes/${cardId}`;
  return executeRequest({url_service: URL_SERVICE, method: 'PUT'});
}

/**
 * Снимает лайк с карточки
 * @param {String} cardId  - ID карточки места
 * @returns Promise с резуальтатом запроса
 */
export function unLikeCardServer(cardId = '') {
  const URL_SERVICE = `/cards/likes/${cardId}`;
  return executeRequest({ url_service: URL_SERVICE, method: 'DELETE'});
}

//ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ
/**
 * Выполнение запроса к серверу
 * @param {config} параметры запроса: имя сервиса, метод, тело запроса
 * @returns Promise
 */
function executeRequest({ url_service, method = 'GET', body = '' }) {

  const config = {
    method: method,
    headers: {
      authorization: TOKEN,
      'Content-Type': 'application/json'
    }
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
