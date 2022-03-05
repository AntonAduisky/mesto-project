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

//api
import API from './api.js';
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
const imageContainer = document.querySelector(".elements");
//avatar
const avatarPopup = document.querySelector("#avatar-popup");
const avatarInput = avatarPopup.querySelector("#avatar__image");
const avatarForm = document.querySelector("#avatar-form");
const avatarSubmitButton = avatarPopup.querySelector("#avatar_button");
const avatarOpenButton = document.querySelector(".profile__photo-button");
const avatarOpenImage = document.querySelector(".profile__photo-overlay");
//card
const formCard = document.querySelector("#card-form");
const profile = document.querySelector(".profile");
const profileTitle = profile.querySelector(".profile__title");
const profileSubtitle = profile.querySelector(".profile__subtitle");
const imagePopup = document.querySelector("#image-popup");
const popupFigcaption = imagePopup.querySelector(".popup__image-figcaption");
const popupPhoto = imagePopup.querySelector(".popup__image");

const popupCardForm = document.querySelector('#card-form');

const cardButton = document.querySelector('#card_button');




//добавление новой карточки и закрытие попапа
function addCardForm(evt) {
    evt.preventDefault();
    cardButton.textContent = 'Сохранение...'
    API.createCardData(placeInput.value, linkInput.value)
        .then(data => {
            addCard(createCard(data.name, data.link));
            // imageContainer.append(...)
            disableButton(cardButton, validationConfig);
            popupCardForm.reset();
            closePopup(cardPopup);
        })
        .catch(err => console.log(err))
        .finally(() => {
            cardButton.textContent = 'Создать';
        });
};




//добавление информации профиля и закрытие попапа
function addProfileForm(evt) {
    evt.preventDefault();
    cardAddButton.textContent = 'Сохранение...';
    API.createProfileData(nameInput.value, jobInput.value)
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



function addAvatarForm(evt) {
    evt.preventDefault();
    avatarSubmitButton.textContent = 'Сохранение...';
    API.createAvatar(avatarInput.value)
        .then(data => {
            // avatarOpenButton.src = avatarInput.value;
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