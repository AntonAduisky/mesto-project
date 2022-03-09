import {
    popupPhoto,
    popupFigcaption,
    imagePopup,
} from './modal.js'

import {
    openPopup,
} from './utils.js';

import API from './api.js';

const cardContainer = document.querySelector(".elements");
const cardTemplate = document.querySelector("#cardTemplate").content;
const addCard = document.querySelector(".elements__list");

//удаление карточки
function deleteCards(evt) {
    API.deleteCard(evt.target.closest(".elements__item").dataset.id)
        .then(() => {
            evt.target.closest(".elements__item").remove();
        })
        .catch((err) => {
            console.log(err);
        });
}

//создание карточки
function createCard(placeInput, linkInput, id, likes, userId, owner) {

    const card = cardTemplate.querySelector(".elements__item").cloneNode(true);
    const title = card.querySelector(".elements__element-title");
    const image = card.querySelector(".elements__element-image");
    const likeButton = card.querySelector(".elements__element-like");
    const deleteCardButton = card.querySelector(".elements__element-delete");
    const likeCountElement = card.querySelector('.elements__element-like-count');

    if (userId !== owner._id) {
        deleteCardButton.remove();
    }

    image.src = linkInput;
    image.alt = placeInput;
    title.textContent = placeInput;
    card.dataset.id = id;
    likeCountElement.textContent = likes.length;

    likeButton.addEventListener("click", (evt) => {
        if (evt.target.classList.contains('elements__element-like_active')) {
            API.removeLike(evt.target.closest(".elements__item").dataset.id)
                .then((res) => {
                    evt.target.classList.remove('elements__element-like_active')
                    likeCountElement.textContent = res.likes.length;
                })
                .catch(err => console.log(err))
        } else {
            API.addLike(evt.target.closest(".elements__item").dataset.id)
                .then((res) => {
                    evt.target.classList.add('elements__element-like_active')
                    likeCountElement.textContent = res.likes.length;
                })
                .catch(err => console.log(err))
        }
    });
    //удаление карточки
    deleteCardButton.addEventListener("click", deleteCards);
    //при клике на карточку развернуть содержимое
    image.addEventListener("click", function () {
        popupPhoto.src = linkInput;
        popupPhoto.alt = placeInput;
        popupFigcaption.textContent = placeInput;
        openPopup(imagePopup);
    });
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