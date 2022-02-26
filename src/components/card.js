import {
    popupPhoto,
    popupFigcaption,
    imagePopup,
} from './modal.js'

import {
    openPopup,
} from './utils.js';

const cardContainer = document.querySelector(".elements");
const cardTemplate = document.querySelector("#cardTemplate").content;

//создание карточки
function createCard(placeInput, linkInput) {
    const card = cardTemplate.querySelector(".elements__element").cloneNode(true);
    const title = card.querySelector(".elements__element-title");
    const image = card.querySelector(".elements__element-image");
    const likeButton = card.querySelector(".elements__element-like");
    const deleteCardButton = card.querySelector(".elements__element-delete");
    image.src = linkInput;
    image.alt = placeInput;
    title.textContent = placeInput;
    likeButton.addEventListener("click", function (evt) {
        evt.target.classList.toggle("elements__element-like_active");
    });
    deleteCardButton.addEventListener("click", function (evt) {
        evt.target.closest(".elements__element").remove();
    });
    image.addEventListener("click", function () {
        popupPhoto.src = linkInput;
        popupPhoto.alt = placeInput;
        popupFigcaption.textContent = placeInput;
        openPopup(imagePopup);
    });
    return card;
};

//добавление карточки
function addCard(card) {
    cardContainer.prepend(card);
    return card;
};

export {
    cardContainer,
    cardTemplate,
    createCard,
    addCard
};
//в index.js
//в modal.js