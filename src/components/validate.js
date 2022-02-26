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

export {
    validationConfig,
    checkInputValidity,
    enableValidation,
    disableButton
}; //в index.js