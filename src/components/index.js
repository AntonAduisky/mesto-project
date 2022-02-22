import '../pages/index.css';
import {
    openPopup,
}
from './utils.js';
import {
    formElement,
    editButton,
    cardAddButton,
    profilePopup,
    cardPopup,
    formCard,
    addCardForm,
    addProfileForm
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


//массив обьектов карточек отображаемых на странице
const initialCards = [{
        name: "Архыз",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
        name: "Челябинская область",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
        name: "Иваново",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
        name: "Камчатка",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
        name: "Холмогорский район",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
        name: "Байкал",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    },
];

//отображение карточек из массива
initialCards.forEach(function (card) {
    return addCard(createCard(card.name, card.link));
});



//слушатель событий на кнопке отправки формы
formElement.addEventListener("submit", addProfileForm);



//кнопка открытия попапа "профиль"
editButton.addEventListener("click", function () {
    openPopup(profilePopup);
});

//кнопка открытия попапа "карточки"
cardAddButton.addEventListener("click", function () {
    openPopup(cardPopup);
});


formCard.addEventListener("submit", addCardForm);


enableValidation(validationConfig);