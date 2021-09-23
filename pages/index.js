document.querySelector('.profile__edit-button').addEventListener('click', function() {
  document.querySelector('.popup').classList.toggle('popup_opened');
}, false);


document.querySelectorAll('.card__like-button').forEach(item => item.addEventListener('click', function(event) {
  event.currentTarget.classList.toggle('card__like-button_active');
}, false));
