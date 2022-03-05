//информация о сервере (токен,тип данных,ссылка на сервер)
const config = {
    url: 'https://mesto.nomoreparties.co/v1/plus-cohort7',
    headers: {
        authorization: '56e44e9a-e6f9-47b7-ac5a-35eba224a4da',
        'Content-Type': 'application/json'
    }
}

//вспомогательная функция проверки на ошибку возвращающая либо ОК ,либо ОШИБКУ
const parseResponse = (res) => {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(new Error(`Произошла ошибка со статус-кодом ${res.status}`));
}

//функция получения данных профиля которые заносятся в форму
const profileData = () => {
    return fetch(`${config.url}/users/me`, {
            headers: config.headers
        })
        .then(res => parseResponse(res))
}


//функция создания данных профиля которые заносятся в форму
const createProfileData = (username, activity) => {
    const profileInfo = {
        name: username,
        about: activity
    }
    return fetch(`${config.url}/users/me`, {
            method: 'PATCH',
            headers: config.headers,
            body: JSON.stringify(profileInfo)
        })
        .then(res => parseResponse(res))
}


//функция получения данных карточки которые заносятся в форму
const cardData = () => {
    return fetch(`${config.url}/cards`, {
            headers: config.headers
        })
        .then(res => parseResponse(res))
}


//функция создания данных карточки которые заносятся в форму
const createCardData = (card_name, card_image) => {
    const cardInfo = {
        name: card_name,
        link: card_image
    }
    return fetch(`${config.url}/cards`, {
            method: 'POST',
            headers: config.headers,
            body: JSON.stringify(cardInfo)
        })
        .then(res => parseResponse(res))
}


//удаление карточки
const deleteCard = (cardId) => {
    return fetch(`${config.url}/cards/${cardId}`, {
            method: 'DELETE',
            headers: config.headers
        })
        .then(res => parseResponse(res))
}


//добавление лайка на страницу
const addLike = (cardId) => {
    return fetch(`${config.url}/cards/likes/${cardId}`, {
            method: 'PUT',
            headers: config.headers
        })
        .then(res => parseResponse(res))
}


//функция удаления лайка со страницы
const removeLike = (cardId) => {
    return fetch(`${config.url}/cards/likes/${cardId}`, {
            method: 'DELETE',
            headers: config.headers
        })
        .then(res => parseResponse(res))
}


//функция создания аватара
const createAvatar = (img) => {
    const avatarInfo = {
        avatar: img
    }
    return fetch(`${config.url}/users/me/avatar`, {
            method: 'PATCH',
            headers: config.headers,
            body: JSON.stringify(avatarInfo)
        })
        .then(res => parseResponse(res))
}


export default {
    profileData,
    cardData,
    createProfileData,
    createCardData,
    deleteCard,
    addLike,
    removeLike,
    createAvatar
}