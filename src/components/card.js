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

// функция для удаления карточки(DOM)
const removeCardElement = (cardId) => {
    const cardElement = document.querySelector(`.elements__item[data-id="${cardId}"]`);
    cardElement.remove();
}
// Функция для обновления количества лайков
const updateLikeCount = (cardId, countOfLikes) => {
    const cardElement = document.querySelector(`.elements__item[data-id="${cardId}"]`);
    const likeCountElement = cardElement.querySelector('.elements__element-like-count');
    likeCountElement.textContent = countOfLikes;
}
// Функция для обновления кнопки лайка
const updateLikeButton = (cardId) => {
    const cardElement = document.querySelector(`.elements__item[data-id="${cardId}"]`);
    const likeButtonElement = cardElement.querySelector('.elements__element-like');
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
    //лайки не прибавляются так как не найден счетчик лайков в индекс.жс
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

    deleteCardButton.addEventListener('click', () => removeCardHandler(id));
    likeButton.addEventListener('click',
        () => likeCardHandler(id, userId));

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
    addCard,
    removeCardElement,
    updateLikeCount,
    updateLikeButton
};
//в index.js
//в modal.js