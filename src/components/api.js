import { setProfile } from '../components/profile.js';
import { renderCardList } from '../components/card.js';

const TOKEN = '2da09b68-77d7-4eeb-bec1-377a2129dd59';
const ID_GROUP = 'plus-cohort-5';
const URL_SERVER = `https://nomoreparties.co/v1/${ID_GROUP}`;
let userName = '';

//ЭКСПОРТНЫЕ ФУНКЦИИ

/**
 * Получение данных текущего пользователя
 */
export function getUser() {

  const URL_SERVICE = '/users/me';
  executeRequest({ url_service: URL_SERVICE })
    .then(data => {
      const { name, about, avatar } = data;
      userName = name;
      setProfile(name, about, avatar);
    });
}

/**
 * Обновляет ссылку на аватар на сервере
 * @param {String} urlAvatar
 */
export function updateAvatar(urlAvatar) {

  try{
    const url = new URL(urlAvatar);
  } catch (e) {
    return Promise.reject(`Переданный адрес не является URL`);
  }

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

  executeRequest({ url_service: URL_SERVICE, method: 'PATCH', body: bodyRequest });
}

/**
 * Добавление новой карточки на сервер
 * @param {String} name  - название карточки
 * @param {String} link - ссылка на место хранения картинки
 */
export function savePictureServer(name = '', link = '') {

  const URL_SERVICE = '/cards';
  const bodyRequest = JSON.stringify({ name: name, link: link });

  return executeRequest({ url_service: URL_SERVICE, method: 'POST', body: bodyRequest })
    .then(card => {

      return getCardPropertyFromResponse(card);
    });
}

/**
 * Получение карточек и вставка на страницу
 */
export function getCards() {

  const URL_SERVICE = '/cards';
  executeRequest({ url_service: URL_SERVICE })
    .then(cards => {
      const cardsList = cards.map(card => getCardPropertyFromResponse(card));
      renderCardList(cardsList);
    });
}

/**
 * Удаляет карточку с сервера
 * @param {String} cardId
 * @returns Promise промис о результате удаления карточки
 */
export function deleteCard(cardId = '') {

  if (!cardId) {
    return Promise.reject('Невозможно удалить карточку: ID пуст');
  }

  const URL_SERVICE = `/cards/${cardId}`;
  return executeRequest({ url_service: URL_SERVICE, method: 'DELETE' });
}

/**
 * Устаавливает лайк на карточку
 * @param {String} cardId - ID карточки места
 * @returns Promise с результатом запроса на сервер
 */
export function likeCardServer(cardId = '') {

  if (!cardId) {
    return Promise.reject('Невозможно лайкнуть карточку: ID пуст');
  }

  const URL_SERVICE = `/cards/likes/${cardId}`;
  return executeRequest({ url_service: URL_SERVICE, method: 'PUT' })
    .then(card => getCardPropertyFromResponse(card));
}

/**
 * Снимает лайк с карточки
 * @param {String} cardId  - ID карточки места
 * @returns Promise с резуальтатом запроса
 */
export function unLikeCardServer(cardId = '') {
  if (!cardId) {
    return Promise.reject('Невозможно снять лайк с карточки: ID пуст');
  }

  const URL_SERVICE = `/cards/likes/${cardId}`;
  return executeRequest({ url_service: URL_SERVICE, method: 'DELETE' })
    .then(card => getCardPropertyFromResponse(card));
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
    })
    .catch(err => alert(err));
}

/**
 *
 * @param {JSON} cardJson  - JSON-ответ сервера, содержащий данные карточки
 * @returns Object - со свойствами полученной карточки
 */
function getCardPropertyFromResponse(cardJson) {

  const cardProperties = {
    cardId: cardJson._id,
    cardLink: cardJson.link,
    name: cardJson.name,
    countLikes: cardJson.likes.length,
    isMine: cardJson.owner.name === userName,
    liked: Boolean(cardJson.likes.find(el => el.name === userName))
  };
  return cardProperties;
}
