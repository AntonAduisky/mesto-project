import API from './api.js';
import {
    openPopup
} from './utils.js';
import {
    openConfirmationPopup
} from './modal';

const imagePopup = document.querySelector('.popup_type_full-image');
const fullImage = imagePopup.querySelector('.full-image__picture');
const fullImageDescription = imagePopup.querySelector('.full-image__description');
const cardTemplate = document.querySelector(`#photo-template`).content;
const selfCardTemplate = document.querySelector(`#self-photo-template`).content;
const cardContainer = document.querySelector(`.photos`);





function addReactionListener(button) {
    const cardItemElement = button.closest('.photo');
    const likesCountElement = button.querySelector('.photo__likes-count');

    button.addEventListener('click', function () {
        if (button.classList.contains('photo__likes-button_active')) {
            API.removeLike(cardItemElement.id)
                .then(res => {
                    likesCountElement.textContent = res.likes.length;
                    button.classList.remove('photo__likes-button_active');
                })
                .catch(err => console.log(err));
        } else {
            API.addLike(cardItemElement.id)
                .then(res => {
                    likesCountElement.textContent = res.likes.length;
                    button.classList.add('photo__likes-button_active');
                })
                .catch(err => console.log(err));
        }
    });
};




function deleteCard(evt) {
    const deleteButton = evt.target;
    const cardItem = deleteButton.closest('.photo');
    openConfirmationPopup(cardItem.id);
};

function clickOnImageButton(evt) {
    const imageButton = evt.target;
    const cardElement = imageButton.closest('.photo');
    const photoDescription = cardElement.querySelector('.photo__description-text').textContent;
    fullImage.src = imageButton.dataset.image;
    fullImage.alt = photoDescription;
    fullImageDescription.textContent = photoDescription;
    openPopup(imagePopup);
};

export function createCardElement(card, isSelf = true, isLiked = false) {
    const {
        _id,
        link,
        name,
        likes = 0
    } = card;

    const photoCard = isSelf ? selfCardTemplate.cloneNode(true) : cardTemplate.cloneNode(true);

    const cardElement = photoCard.querySelector('.photo');
    const imageButton = cardElement.querySelector('.photo__image');
    const cardDescriptionElement = photoCard.querySelector('.photo__description-text');
    const likeButtonElement = photoCard.querySelector('.photo__likes-button');
    const likesCountElement = likeButtonElement.querySelector('.photo__likes-count');

    if (isLiked) {
        likeButtonElement.classList.add('photo__likes-button_active');
    }

    cardElement.id = _id;
    imageButton.style = `background-image: url(${link})`;
    imageButton.dataset.image = link;
    likesCountElement.textContent = likes.length;
    cardDescriptionElement.textContent = name;

    imageButton.addEventListener('click', clickOnImageButton);
    addReactionListener(likeButtonElement);
    if (isSelf) {
        photoCard.querySelector('.photo__delete-button').addEventListener('click', deleteCard);
    }
    return photoCard;
}

export function initializationCards(initialCards, userId) {
    initialCards.forEach(function (card) {
        const isSelf = userId === card.owner._id;
        const isLiked = Boolean(card.likes.find(like => like._id === userId));
        const newCard = createCardElement(card, isSelf, isLiked);
        cardContainer.append(newCard);
    });
}