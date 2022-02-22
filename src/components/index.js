import '../pages/index.css';

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
const wrapper = document.querySelector('.wrapper');
//шаблон карточек
const cardTemplate = document.querySelector("#cardTemplate").content;
//массив обьектов карточек отображаемых на странице
const initialCards = [{
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





//валидация 
const validationConfig = {
    formSelector: '.edit-form',
    inputSelector: '.edit-form__item',
    errorClass: 'error-message_visible',
    inputInvalidClass: 'edit-form__item_invalid',
    buttonSelector: '.edit-form__save-button',
    buttonDisabledClass: 'edit-form__save-button_disabled'
};

//спарятать ошибку валидации
const hideInputError = (inputElement, errorElement, config) => {
    inputElement.classList.remove(config.inputInvalidClass);
    errorElement.classList.remove(config.errorClass);
    errorElement.textContent = '';
};

//показать ошибку валидации
const showInputError = (inputElement, errorElement, errorMessage, config) => {
    inputElement.classList.add(config.inputInvalidClass);
    errorElement.classList.add(config.errorClass);
    errorElement.textContent = errorMessage;
};

//проверка валидности и показ сообщения об ошибке
const checkInputValidity = (formElement, inputElement, config) => {
    const errorElement = formElement.querySelector(`#error-${inputElement.id}`);

    if (inputElement.validity.valid) {
        hideInputError(inputElement, errorElement, config);
    } else {
        showInputError(inputElement, errorElement, inputElement.validationMessage, config);
    };
};


// //отключение кнопки и смены ее цвета на серый
const disableButton = (buttonElement, config) => {
    buttonElement.classList.add(config.buttonDisabledClass);
    buttonElement.disabled = true;
};


//включение кнопки
const enableButton = (buttonElement, config) => {
    buttonElement.classList.remove(config.buttonDisabledClass);
    buttonElement.disabled = false;
};


//перебор всех полей ввода на предмет не валидного инпута
const hasInvalidInput = (inputList) => {
    return inputList.some(inputElement => {
        return !inputElement.validity.valid;
    });
};


//условие включения кнопки
const toggleButtonState = (formElement, inputList, config) => {
    const buttonElement = formElement.querySelector(config.buttonSelector);

    if (hasInvalidInput(inputList)) {
        disableButton(buttonElement, config);
    } else {
        enableButton(buttonElement, config);
    }
};


//массив из всех полей ввода 
const setEventListeners = (formElement, config) => {
    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
    //перебор полей ввода
    inputList.forEach(inputElement => {
        inputElement.addEventListener('input', () => {
            //проверка валидации конкретного inputElement
            checkInputValidity(formElement, inputElement, config);
            //проверять стейт кнопки submit
            toggleButtonState(formElement, inputList, config);
        });
    });

    toggleButtonState(formElement, inputList, config);
};



const enableValidation = (config) => {
    const forms = Array.from(document.querySelectorAll(config.formSelector));

    //находим форму
    forms.forEach(formElement => {
        formElement.addEventListener('submit', event => {
            event.preventDefault();
        });
        setEventListeners(formElement, config);
    });
};


enableValidation(validationConfig);






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


//слушатель событий на кнопке отправки формы
formElement.addEventListener("submit", addProfileForm);

//закрытие попапов по нажатию на крестик
for (let i = 0; i < closeButton.length; i++) {
    closeButton[i].addEventListener('click', function (evt) {
        const popup = evt.target.closest('.popup');
        closePopup(popup);
    });
};

//закрытие попапов на свободное от формы пространство
function handleClickOutside(evt) {
    if (evt.target.classList.contains('popup_opened')) {
        evt.target.classList.remove('popup_opened');
        forms.reset();
    };
};


//закрытие попапов на ESC
function handleEscDown(evt) {
    if (evt.keyCode === 27) {
        const activePopup = document.querySelector('.popup_opened');
        closePopup(activePopup);
        forms.reset();
    };
};

//открытие попапов
function openPopup(popup) {
    popup.classList.add('popup_opened');
    wrapper.addEventListener('click', handleClickOutside);
    document.addEventListener('keydown', handleEscDown);
};

//закрытие попапов
function closePopup(popup) {
    popup.classList.remove("popup_opened");
    wrapper.removeEventListener('click', handleClickOutside);
    document.removeEventListener('keydown', handleEscDown);
};


//кнопка открытия попапа "профиль"
editButton.addEventListener("click", function () {
    openPopup(profilePopup);
});

//кнопка открытия попапа "карточки"
cardAddButton.addEventListener("click", function () {
    openPopup(cardPopup);
});


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
};

formCard.addEventListener("submit", addCardForm);

//очистка полей ввода
function clearCardForm() {
    placeInput.value = "";
    linkInput.value = "";
    nameInput.value = "";
    jobInput.value = "";
};

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