import {
    closePopup
} from './utils.js';
import {
    addCard,
    createCard
} from './card.js';
import {
    disableButton,
    validationConfig,
} from './validate.js';

// export default {
//     profileData,
//     cardData,
//     createProfileData,
//     createCardData,
//     deleteCard,
//     addLike,
//     removeLike,
//     createAvatar
// }

import API from './api.js';

const formElement = document.querySelector(".edit-form");
const placeInput = document.querySelector("#card__name");
const linkInput = document.querySelector("#card__image");
const nameInput = formElement.querySelector("#username__title");
const jobInput = formElement.querySelector("#username__activity");

const editButton = document.querySelector(".profile__edit-button");
const cardAddButton = document.querySelector(".profile__add-button");
const profilePopup = document.querySelector("#profile-popup");
const cardPopup = document.querySelector("#card-popup");

const avatarPopup = document.querySelector("#avatar-popup");
const avatarInput = avatarPopup.querySelector("#avatar__image");
const avatarForm = document.querySelector("#avatar-form");
const avatarSubmitButton = avatarPopup.querySelector("#avatar_button");
const avatarOpenButton = document.querySelector(".profile__photo-button");
const avatarOpenImage = document.querySelector(".profile__photo-overlay");


const formCard = document.querySelector("#card-form");
const profile = document.querySelector(".profile");
const profileTitle = profile.querySelector(".profile__title");
const profileSubtitle = profile.querySelector(".profile__subtitle");
const imagePopup = document.querySelector("#image-popup");
const popupFigcaption = imagePopup.querySelector(".popup__image-figcaption");
const popupPhoto = imagePopup.querySelector(".popup__image");

const popupCardForm = document.querySelector('#card-form');

const cardButton = document.querySelector('#card_button');


function waitAnswer(submit) {
    submit.textContent = 'Сохранение...';
}

//добавление новой карточки и закрытие попапа
function addCardForm(evt) {
    evt.preventDefault();
    waitAnswer(cardButton);
    addCard(createCard(placeInput.value, linkInput.value));
    disableButton(cardButton, validationConfig);
    popupCardForm.reset();
    closePopup(cardPopup);
};


//добавление информации профиля и закрытие попапа
function addProfileForm(evt) {
    evt.preventDefault();
    waitAnswer(cardAddButton);
    profileTitle.textContent = nameInput.value;
    profileSubtitle.textContent = jobInput.value;
    closePopup(profilePopup);
};

function addAvatarForm(evt) {
    evt.preventDefault();
    waitAnswer(avatarSubmitButton);
    // avatarOpenButton.src = avatarInput.value;
    avatarOpenButton.style = `background-image: url(${evt.img})`;
    disableButton(avatarSubmitButton, validationConfig);
    avatarForm.reset();
    closePopup(avatarPopup)
}


export {
    formElement,
    placeInput,
    linkInput,
    nameInput,
    jobInput,
    editButton,
    cardAddButton,
    profilePopup,
    cardPopup,
    avatarPopup,
    avatarOpenButton,
    avatarForm,
    addAvatarForm,
    formCard,
    profile,
    profileTitle,
    profileSubtitle,
    imagePopup,
    popupFigcaption,
    popupPhoto,
    popupCardForm,
    addCardForm,
    addProfileForm
};
//в index.js
//в card.js