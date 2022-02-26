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

//закрытие на overlay
function handleClickOutside(e) {
    if (e.target.classList.contains(popupActiveClass)) {
        closePopup(getActivePopup());
    };
};

//закрытие на ESC
function handleEscDown(e) {
    if (e.key === 'Escape') {
        closePopup(getActivePopup());
    };
};

//закрытие на closeButton
function handleClickCloseButton(e) {
    if (e.target.classList.contains('popup__close-button')) {
        closePopup(getActivePopup());
    };
};

export {
    handleEscDown,
    handleClickOutside,
    openPopup,
    closePopup,
    closeButtons,
    wrapper
};
//в index.js
//в card.js