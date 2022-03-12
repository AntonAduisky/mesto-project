import '../pages/index.css';

import {
    enableValidation,
    disableButton,
    validationConfig,
} from './validate.js';

import API from './api.js';

import {
    openPopup,
    closePopup
}
from './modal.js';

import {
    createCard,
    addCard,
    removeCardElement,
    updateLikeCount,
    updateLikeButton
} from './card.js';
//--------------------------------------------------------------------------constants-----------------------------------------------------------------------------
//profile
const formElement = document.querySelector(".edit-form");
const placeInput = document.querySelector("#card__name");
const linkInput = document.querySelector("#card__image");
const nameInput = formElement.querySelector("#username__title");
const jobInput = formElement.querySelector("#username__activity");
//popup`s
const editButton = document.querySelector(".profile__edit-button");
const cardAddButton = document.querySelector(".profile__add-button");
const profilePopup = document.querySelector("#profile-popup");
const cardPopup = document.querySelector("#card-popup");
//avatar
const avatarPopup = document.querySelector("#avatar-popup");
const avatarInput = avatarPopup.querySelector("#avatar__image");
const avatarForm = document.querySelector("#avatar-form");
const avatarSubmitButton = avatarPopup.querySelector("#avatar_button");
const avatarOpenButton = document.querySelector(".profile__photo-button");
//card
const formCard = document.querySelector("#card-form");
const profile = document.querySelector(".profile");
const profileTitle = profile.querySelector(".profile__title");
const profileSubtitle = profile.querySelector(".profile__subtitle");
const imagePopup = document.querySelector("#image-popup");
const popupFigcaption = imagePopup.querySelector(".popup__image-figcaption");
const popupPhoto = imagePopup.querySelector(".popup__image");
const cardButton = document.querySelector('#card_button');

const popupCardForm = document.querySelector('#card-form');

//--------------------------------------------------------------------------progile--------------------------------------------------------------------------
//кнопка открытия попапа "профиль"
editButton.addEventListener("mousedown", function () {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileSubtitle.textContent;

    openPopup(profilePopup);
});


//добавление информации профиля и закрытие попапа
function addProfileForm(evt) {
    evt.preventDefault();
    cardAddButton.textContent = 'Сохранение...';
    const userInput = nameInput.value;
    const workInput = jobInput.value;
    API.createProfileData(userInput, workInput)
        .then(data => {
            profileTitle.textContent = data.name;
            profileSubtitle.textContent = data.about;
            closePopup(profilePopup);
        })
        .catch(err => console.log(err))
        .finally(() => {
            cardAddButton.textContent = 'Сохранить';
        })
};

//слушатель событий на кнопке отправки формы
formElement.addEventListener("submit", addProfileForm);

//---------------------------------------------------------------------------card---------------------------------------------------------------------------
//кнопка открытия попапа "карточки"
cardAddButton.addEventListener("mousedown", function () {
    popupCardForm.reset();
    openPopup(cardPopup);
});
//добавление новой карточки и закрытие попапа
function addCardForm(evt) {
    evt.preventDefault();
    cardButton.textContent = 'Сохранение...';
    const mestoInput = placeInput.value;
    const urlInput = linkInput.value;
    API.createCardData(mestoInput, urlInput)
        .then(res => {
            addCard.prepend(createCard(res.name, res.link, res._id, res.likes, res.owner._id, res.owner, removeCardHandler, likeCardHandler));
            disableButton(cardButton, validationConfig);
            popupCardForm.reset();
            closePopup(cardPopup);
        })
        .catch((err) => {
            console.log(err)
        })
        .finally(() => {
            cardButton.textContent = 'Создать';
        });
};

formCard.addEventListener("submit", addCardForm);
//--------------------------------------------------------------------------avatar-------------------------------------------------------------------------
avatarOpenButton.addEventListener("mousedown", function () {
    avatarForm.reset();
    openPopup(avatarPopup);
});

//добавление нового аватара профиля
function addAvatarForm(evt) {
    evt.preventDefault();
    avatarSubmitButton.textContent = 'Сохранение...';
    const avaInput = avatarInput.value;
    API.createAvatar(avaInput)
        .then(data => {
            avatarOpenButton.style = `background-image: url(${data.avatar})`;
            avatarInput.value = '';
            disableButton(avatarSubmitButton, validationConfig);
            avatarForm.reset();
            closePopup(avatarPopup)
        })
        .catch(err => console.log(err))
        .finally(() => {
            avatarSubmitButton.textContent = 'Сохранить';
        })
}

avatarForm.addEventListener("submit", addAvatarForm);

//----------------------------------------------------------------------like & delete card functions-------------------------------------------------------------------------
// функция для обработки нажатия лайка
const likeCardHandler = (cardId, userId) => {
    API.cardData()
        .then(allCards => allCards.find(card => card._id === cardId))
        .then(card => card.likes
            .some(likedUser => likedUser._id === userId) ?
            API.removeLike(cardId) :
            API.addLike(cardId))
        .then(cardData => {
            const countOfLikes = cardData.likes.length;
            updateLikeCount(cardId, countOfLikes)
            updateLikeButton(cardId)
        })
        .catch((err) => {
            console.log(err)
        });
}


// функция для обработки нажатия на кнопку удаления
const removeCardHandler = (cardId) => {
    API.deleteCard(cardId)
        .then(() => removeCardElement(cardId))
        .catch((err) => {
            console.log(err)
        });
}

//-----------------------------------------------------------------------promise-------------------------------------------------------------------------------------------
Promise.all([API.profileData(), API.cardData()])
    .then(([user, cards]) => {
        profileTitle.textContent = user.name;
        profileSubtitle.textContent = user.about;
        avatarOpenButton.style = `background-image: url(${user.avatar})`;

        const newCards = cards.map(function (data) {
            return createCard(data.name, data.link, data._id, data.likes, user._id, data.owner, removeCardHandler, likeCardHandler)
        });
        addCard.prepend(...newCards);
    })
    .catch((err) => {
        console.log(err)
    });

enableValidation(validationConfig);


export {
    likeCardHandler,
    popupFigcaption,
    popupPhoto,
    imagePopup
};