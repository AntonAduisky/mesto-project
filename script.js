const formElement = document.querySelector(".edit-form");
const profilePopup = document.querySelector("#profile-popup");
const cardPopup = document.querySelector("#card-popup");

const profile = document.querySelector(".profile");
const profileTitle = profile.querySelector(".profile__title");
const profileSubtitle = profile.querySelector(".profile__subtitle");

//массив обьектов
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


const nameInput = formElement.querySelector("#username__title");
const jobInput = formElement.querySelector("#username__activity");


//значения в первом попапе = значениям на странице при вводе
function setData() {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileSubtitle.textContent;
}

function formSubmitHandler(evt) {
    //удаление настроек по умолчанию у события EVENT для того чтобы написать свои условия
    evt.preventDefault();
    //первый попап.идеально работает
    profileTitle.textContent = nameInput.value;
    profileSubtitle.textContent = jobInput.value;
    //получаем форму отправки данных попапов где написано условие при котором
    //закрывается тот попап,на кнопку закрытия которого мы нажмем
    const form = evt.target.getAttribute("data-form");
    if (form === "profileButton") {
        closePopup(profilePopup);
    } else {
        closePopup(cardPopup);
    }
}
//передаем функцию №сохранить переменной ФОРМЫ попапов, по клику на одноименную кнопку
formElement.addEventListener("submit", formSubmitHandler);

//атрибуту попап добавлен класс открытия,так же обьявлено и реализовано закрытие по клику на крестик и сохранение данных по нажатию на (сохранить)
function openPopup(popup) {
    popup.classList.add("popup_opened");
    const closeButton = popup.querySelector(".popup__close-button");
    closeButton.addEventListener(
        "click",
        function () {
            closePopup(popup);
        },
        {
            once: true,
        }
    );

    setData();
}

//открытие попапов №редактирование профиля и №карточки
const editButton = document.querySelector(".profile__edit-button");
editButton.addEventListener("click", function () {
    openPopup(profilePopup);
});


const cardAddButton = document.querySelector(".profile__add-button");
cardAddButton.addEventListener("click", function () {
    openPopup(cardPopup);
});

//закрытие попапов
function closePopup(popup) {
  popup.classList.remove("popup_opened");
}

const formCard = document.querySelector("#card-form");
//место куда будут вставлены карточки из темплейт(секция Элементс)
const cardContainer = document.querySelector(".elements");

const placeInput = document.querySelector("#card__name");
const linkInput = document.querySelector("#card__image");
//подставление значений полей №ссылка№название в карточку темплейт

function formCardAdd(evt) {
  //удаление настроек по умолчанию у события EVENT для того чтобы написать свои условия
  evt.preventDefault();
  addCard(placeInput.value, linkInput.value);
  clearCardForm();
  const form = evt.target.getAttribute("data-form");
  if (form === "cardButton") {
      closePopup(cardPopup);
  } else {
      closePopup(profilePopup);
  }
}


formCard.addEventListener("submit", formCardAdd);


function clearCardForm() {
  placeInput.value = "";
  linkInput.value = "";
}


//открытие картинки по нажатию на нее после открытия карточки
const imagePopup = document.querySelector("#image-popup");

//добавление карточки/добавление элементов из массива обьектов/открытие картинки 
function addCard(placeInput, linkInput) {
  const card = document.querySelector("#cardTemplate").content.querySelector(".elements__element").cloneNode(true);
  const title = card.querySelector(".elements__element-title");
  const image = card.querySelector(".elements__element-image");

  const likeButton = card.querySelector(".elements__element-like");
  const deleteCardButton = card.querySelector(".elements__element-delete");

  image.src = linkInput;
  image.alt = linkInput;
  title.textContent = placeInput;

  likeButton.addEventListener("click", function (evt) {
      evt.target.classList.toggle("elements__element-like_active");
  });

  deleteCardButton.addEventListener("click", function (evt) {
      evt.target.closest(".elements__element").remove();
  });
  const popupFigcaption = imagePopup.querySelector(".popup__image-figcaption");
  const popupPhoto = imagePopup.querySelector(".popup__image");

  image.addEventListener("click", function () {
      popupPhoto.src = linkInput;
      popupFigcaption.textContent = placeInput;
      openPopup(imagePopup);
  });

  cardContainer.prepend(card);
}

 initialCards.forEach((card) => {
  addCard(card.name, card.link);
});