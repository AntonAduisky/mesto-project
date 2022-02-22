import {
    clearCardForm,
} from './modal.js';

const closeButton = document.querySelectorAll(".popup__close-button");
const wrapper = document.querySelector('.wrapper');

//закрытие попапов на свободное от формы пространство
function handleClickOutside(evt) {
    if (evt.target.classList.contains('popup_opened')) {
        evt.target.classList.remove('popup_opened');
    };
};


//закрытие попапов на ESC
function handleEscDown(evt) {
    if (evt.keyCode === 27) {
        const activePopup = document.querySelector('.popup_opened');
        closePopup(activePopup);
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
    popup.classList.remove('popup_opened');
    wrapper.removeEventListener('click', handleClickOutside);
    document.removeEventListener('keydown', handleEscDown);
    clearCardForm()
};

//закрытие попапов по нажатию на крестик
for (let i = 0; i < closeButton.length; i++) {
    closeButton[i].addEventListener('click', function (evt) {
        const popup = evt.target.closest('.popup');
        closePopup(popup);
    });
};

export {
    handleEscDown,
    handleClickOutside,
    openPopup,
    closePopup,
    closeButton,
    wrapper
}; //переношу в index.js