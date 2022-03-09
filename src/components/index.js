import '../pages/index.css';
import {
    openPopup
}
from './utils.js';
import {
    formElement,
    editButton,
    cardAddButton,
    profilePopup,
    cardPopup,
    avatarPopup,
    avatarOpenButton,
    avatarForm,
    addAvatarForm,
    formCard,
    addCardForm,
    addProfileForm,
    popupCardForm,
    profileTitle,
    profileSubtitle
}
from './modal.js';
import {
    validationConfig,
    enableValidation
} from './validate.js';

import {
    createCard,
    addCard
} from './card.js';

import API from './api.js';

//слушатель событий на кнопке отправки формы
formElement.addEventListener("submit", addProfileForm);

//кнопка открытия попапа "профиль"
editButton.addEventListener("click", function () {
    openPopup(profilePopup);
});

//кнопка открытия попапа "карточки"
cardAddButton.addEventListener("click", function () {
    popupCardForm.reset();
    openPopup(cardPopup);
});

formCard.addEventListener("submit", addCardForm);

avatarOpenButton.addEventListener("click", function () {
    avatarForm.reset();
    openPopup(avatarPopup);
});

avatarForm.addEventListener("submit", addAvatarForm);

Promise.all([API.profileData(), API.cardData()])
    .then(([user, cards]) => {
        console.log(user);
        profileTitle.textContent = user.name;
        profileSubtitle.textContent = user.about;
        avatarOpenButton.style = `background-image: url(${user.avatar})`;

        const newCards = cards.map(function (data) {
            return createCard(data.name, data.link, data._id, data.likes, user._id, data.owner)
        });
        addCard.prepend(...newCards);
    })
    .catch((err) => {
        console.log(err)
    });

enableValidation(validationConfig);