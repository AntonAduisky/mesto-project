import {
    popupCardForm
} from './modal.js';

const closeButtons = document.querySelectorAll(".popup__close-button");
const wrapper = document.querySelector('.wrapper');

const popupActiveClass = 'popup_opened';

const getActivePopup = () => document.querySelector(`.${popupActiveClass}`);

//открытие попапов
function openPopup(popup) {
    popup.classList.add(popupActiveClass);
    wrapper.addEventListener('click', handleClickOutside);
    document.addEventListener('keydown', handleEscDown);
    document.addEventListener('click', handleClickCloseButton);
};

//закрытие попапов
function closePopup(popup) {
    popup.classList.remove(popupActiveClass);
    wrapper.removeEventListener('click', handleClickOutside);
    document.removeEventListener('keydown', handleEscDown);
    document.removeEventListener('click', handleClickCloseButton);
};

//закрытие на свободное от формы пространство
function handleClickOutside(e) {
    if (e.target.classList.contains(popupActiveClass)) {
        closePopup(getActivePopup());
        popupCardForm.reset();
    };
};

//закрытие на ESC
function handleEscDown(e) {
    if (e.keyCode === 27) {
        closePopup(getActivePopup());
        popupCardForm.reset();
    };
};




//закрытие на closeButton
function handleClickCloseButton() {
    for (let i = 0; i < closeButtons.length; i++) {
        closeButtons[i].addEventListener('click', (e) => closePopup(e.target.closest('.popup')));
    };
    popupCardForm.reset();
};



export {
    handleEscDown,
    handleClickOutside,
    openPopup,
    closePopup,
    closeButtons,
    wrapper
}; //переношу в index.js