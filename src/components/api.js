import { setProfile } from '../components/profile.js';
import { createCard, insertCardHTML } from '../components/card.js';

const TOKEN = '2da09b68-77d7-4eeb-bec1-377a2129dd59';
const ID_GROUP = 'plus-cohort-5';
const URL_SERVER = `https://nomoreparties.co/v1/${ID_GROUP}`;

export function getUser() {

  const URL_USER = '/users/me';
  executeRequest({ url_service: URL_USER })
    .then(data => {

      const { name, about, avatar } = data;
      setProfile(name, about, avatar);

    });
}

export function saveProfileServer(name='sivanov', about='Описание') {

  const URL_USER_UPDATE = '/users/me';
  const bodyRequest = JSON.stringify({name: name, about: about});

  executeRequest({ url_service: URL_USER_UPDATE,method: 'PATCH', body: bodyRequest});
}

export function savePictureServer(name='', link='') {

  const URL_SERVICE = '/cards';
  const bodyRequest = JSON.stringify({name: name, link: link});

  executeRequest({ url_service: URL_SERVICE,method: 'POST', body: bodyRequest});
}

export function getCards() {

  const URL_USER = '/cards';
  executeRequest({ url_service: URL_USER })
    .then(cards => {
      cards.forEach(card=>insertCardHTML(createCard(card.link, card.name)));
    });
}

function executeRequest({ url_service, method = 'GET', body = '' }) {

  const config  = {
    method: method,
    headers: {
      authorization: TOKEN,
      'Content-Type': 'application/json'
    }
  };

  if (body) {
    config.body = body;
  }

  return fetch(`${URL_SERVER}${url_service}`, config )
    .then(res => {

      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Не удалось выполнить запрос к серверу ${res.statusText}`);
    })
    .catch(err => alert(err));
}
