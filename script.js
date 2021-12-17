//элементы разметки
const formElement = document.querySelector(".edit-form");
const editButton = document.querySelector(".profile__edit-button");
const cardAddButton = document.querySelector(".profile__add-button");
const closeButton = document.querySelectorAll(".popup__close-button");
const nameInput = formElement.querySelector("#username__title");
const jobInput = formElement.querySelector("#username__activity");
const profilePopup = document.querySelector("#profile-popup");
const cardPopup = document.querySelector("#card-popup");
const formCard = document.querySelector("#card-form");
const cardContainer = document.querySelector(".elements");
const placeInput = document.querySelector("#card__name");
const linkInput = document.querySelector("#card__image");
const profile = document.querySelector(".profile");
const profileTitle = profile.querySelector(".profile__title");
const profileSubtitle = profile.querySelector(".profile__subtitle");
const imagePopup = document.querySelector("#image-popup");
const popupFigcaption = imagePopup.querySelector(".popup__image-figcaption");
const popupPhoto = imagePopup.querySelector(".popup__image");
//шаблон карточек
const cardTemplate = document.querySelector("#cardTemplate").content;
//массив обьектов карточек отображаемых на странице
const initialCards = [
    {
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
}
formElement.addEventListener("submit", addProfileForm);

//закрытие попапов по нажатию на крестик
for (let i = 0; i < closeButton.length; i++) {
    closeButton[i].addEventListener("click", closePopup);
}

//открытие попапов
function openPopup(popup) {
    popup.classList.add("popup_opened");
}

//кнопка открытия попапа "профиль"
editButton.addEventListener("click", function () {
    openPopup(profilePopup);
});

//кнопка открытия попапа "карточки"
cardAddButton.addEventListener("click", function () {
    openPopup(cardPopup);
});

//закрытие попапов
function closePopup() {
    document.querySelector(".popup_opened").classList.remove("popup_opened");
}

//добавление новой карточки и закрытие попапа
function addCardForm(evt) {
    evt.preventDefault();
    addCard(createCard(placeInput.value, linkInput.value));
    clearCardForm();
    const form = evt.target.getAttribute("data-form");
    if (form === "cardButton") {
        closePopup(cardPopup);
    } else {
        closePopup(profilePopup);
    }
}
formCard.addEventListener("submit", addCardForm);

//очистка полей ввода
function clearCardForm() {
    placeInput.value = "";
    linkInput.value = "";
}
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
}
//добавление карточки
function addCard(card) {
    cardContainer.prepend(card);
    return card;
}
//отображение карточек из массива
initialCards.forEach(function (card) {
    return addCard(createCard(card.name, card.link));
});
