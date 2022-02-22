import {
    closePopup
} from './utils.js';
import {
    addCard,
    createCard
} from './card.js';

const formElement = document.querySelector(".edit-form");
const placeInput = document.querySelector("#card__name");
const linkInput = document.querySelector("#card__image");
const nameInput = formElement.querySelector("#username__title");
const jobInput = formElement.querySelector("#username__activity");

const editButton = document.querySelector(".profile__edit-button");
const cardAddButton = document.querySelector(".profile__add-button");
const profilePopup = document.querySelector("#profile-popup");
const cardPopup = document.querySelector("#card-popup");
const formCard = document.querySelector("#card-form");
const profile = document.querySelector(".profile");
const profileTitle = profile.querySelector(".profile__title");
const profileSubtitle = profile.querySelector(".profile__subtitle");
const imagePopup = document.querySelector("#image-popup");
const popupFigcaption = imagePopup.querySelector(".popup__image-figcaption");
const popupPhoto = imagePopup.querySelector(".popup__image");


function clearCardForm() {
    placeInput.value = "";
    linkInput.value = "";
    nameInput.value = "";
    jobInput.value = "";
};

//добавление новой карточки и закрытие попапа
function addCardForm(evt) {
    evt.preventDefault();
    addCard(createCard(placeInput.value, linkInput.value));
    const form = evt.target.getAttribute("data-form");
    if (form === "cardButton") {
        closePopup(cardPopup);
    } else {
        closePopup(profilePopup);
    }
};


//добавление информации профиля и закрытие попапа
function addProfileForm(evt) {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileSubtitle.textContent = jobInput.value;
    const form = evt.target.getAttribute("data-form");
    if (form === "profileButton") {
        closePopup(profilePopup);
    } else {
        closePopup(cardPopup);
    }
};

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
    formCard,
    profile,
    profileTitle,
    profileSubtitle,
    imagePopup,
    popupFigcaption,
    popupPhoto,
    clearCardForm,
    addCardForm,
    addProfileForm
};