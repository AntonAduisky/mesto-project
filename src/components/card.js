import {
    openPopup,
} from './modal.js';

import {
    popupFigcaption,
    popupPhoto,
    imagePopup
} from './index.js';

const cardContainer = document.querySelector(".elements");
const cardTemplate = document.querySelector("#cardTemplate").content;
const addCard = document.querySelector(".elements__list");

const removeCardElement = (cardId) => {
    const cardElement = document.querySelector(`.elements__item[data-id="${cardId}"]`);
    cardElement.remove();
}

const updateLikeCount = (likeCountElement, countOfLikes) => {
    likeCountElement.textContent = countOfLikes;
}

const updateLikeButton = (likeButtonElement) => {
    if (likeButtonElement.classList.contains('elements__element-like_active')) {
        likeButtonElement.classList.remove('elements__element-like_active')
    } else {
        likeButtonElement.classList.add('elements__element-like_active');
    }
}

//создание карточки
function createCard(placeInput, linkInput, id, likes, userId, owner, removeCardHandler, likeCardHandler) {

    const card = cardTemplate.querySelector(".elements__item").cloneNode(true);
    const title = card.querySelector(".elements__element-title");
    const image = card.querySelector(".elements__element-image");
    const likeButton = card.querySelector(".elements__element-like");
    const deleteCardButton = card.querySelector(".elements__element-delete");
    const likeCountElement = card.querySelector('.elements__element-like-count');

    if (likes.some(likedUser => likedUser._id === userId)) {
        likeButton.classList.add('elements__element-like_active');
    }

    if (userId !== owner._id) {
        deleteCardButton.remove();
    }

    image.src = linkInput;
    image.alt = placeInput;
    title.textContent = placeInput;
    card.dataset.id = id;
    likeCountElement.textContent = likes.length;

    deleteCardButton.addEventListener('click', () => removeCardHandler(id).then(() => removeCardElement(id)));
    likeButton.addEventListener('click',
        () => likeCardHandler(id, userId)
        .then(cardData => {
            const countOfLikes = cardData.likes.length;
            updateLikeCount(likeCountElement, countOfLikes)
            updateLikeButton(likeButton)
        }));

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