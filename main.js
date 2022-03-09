(()=>{"use strict";document.querySelectorAll(".popup__close-button");var e=document.querySelector(".wrapper"),t="popup_opened",n=function(){return document.querySelector(".".concat(t))};function r(n){n.classList.add(t),e.addEventListener("click",c),document.addEventListener("keydown",a),document.addEventListener("click",i)}function o(n){n.classList.remove(t),e.removeEventListener("click",c),document.removeEventListener("keydown",a),document.removeEventListener("click",i)}function c(e){e.target.classList.contains(t)&&o(n())}function a(e){"Escape"===e.key&&o(n())}function i(e){e.target.classList.contains("popup__close-button")&&o(n())}var l={url:"https://nomoreparties.co/v1/plus-cohort7",headers:{authorization:"56e44e9a-e6f9-47b7-ac5a-35eba224a4da","Content-Type":"application/json"}},u=function(e){return e.ok?e.json():Promise.reject(new Error("Произошла ошибка со статус-кодом ".concat(e.status)))};document.querySelector(".elements");var s=document.querySelector("#cardTemplate").content,d=document.querySelector(".elements__list");function m(e){var t;(t=e.target.closest(".elements__item").dataset.id,fetch("".concat(l.url,"/cards/").concat(t),{method:"DELETE",headers:l.headers}).then((function(e){return u(e)}))).then((function(){e.target.closest(".elements__item").remove()})).catch((function(e){console.log(e)}))}function f(e,t,n,o,c,a){var i=s.querySelector(".elements__item").cloneNode(!0),d=i.querySelector(".elements__element-title"),f=i.querySelector(".elements__element-image"),v=i.querySelector(".elements__element-like"),y=i.querySelector(".elements__element-delete"),_=i.querySelector(".elements__element-like-count");return c!==a._id&&y.remove(),f.src=t,f.alt=e,d.textContent=e,i.dataset.id=n,_.textContent=o.length,v.addEventListener("click",(function(e){var t;e.target.classList.contains("elements__element-like_active")?(t=e.target.closest(".elements__item").dataset.id,fetch("".concat(l.url,"/cards/likes/").concat(t),{method:"DELETE",headers:l.headers}).then((function(e){return u(e)}))).then((function(t){e.target.classList.remove("elements__element-like_active"),_.textContent=t.likes.length})).catch((function(e){return console.log(e)})):function(e){return fetch("".concat(l.url,"/cards/likes/").concat(e),{method:"PUT",headers:l.headers}).then((function(e){return u(e)}))}(e.target.closest(".elements__item").dataset.id).then((function(t){e.target.classList.add("elements__element-like_active"),_.textContent=t.likes.length})).catch((function(e){return console.log(e)}))})),y.addEventListener("click",m),f.addEventListener("click",(function(){J.src=t,J.alt=e,N.textContent=e,r(P)})),i}var v={formSelector:".edit-form",inputSelector:".edit-form__item",errorClass:"error-message_visible",inputInvalidClass:"edit-form__item_invalid",buttonSelector:".edit-form__save-button",buttonDisabledClass:"edit-form__save-button_disabled"},y=function(e,t){e.classList.add(t.buttonDisabledClass),e.disabled=!0},_=function(e,t,n){var r=e.querySelector(n.buttonSelector);!function(e){return e.some((function(e){return!e.validity.valid}))}(t)?function(e,t){e.classList.remove(t.buttonDisabledClass),e.disabled=!1}(r,n):y(r,n)},p=document.querySelector(".edit-form"),h=document.querySelector("#card__name"),S=document.querySelector("#card__image"),b=p.querySelector("#username__title"),g=p.querySelector("#username__activity"),q=document.querySelector(".profile__edit-button"),L=document.querySelector(".profile__add-button"),k=document.querySelector("#profile-popup"),C=document.querySelector("#card-popup"),E=document.querySelector("#avatar-popup"),x=E.querySelector("#avatar__image"),A=document.querySelector("#avatar-form"),w=E.querySelector("#avatar_button"),T=document.querySelector(".profile__photo-button"),D=document.querySelector("#card-form"),I=document.querySelector(".profile"),j=I.querySelector(".profile__title"),O=I.querySelector(".profile__subtitle"),P=document.querySelector("#image-popup"),N=P.querySelector(".popup__image-figcaption"),J=P.querySelector(".popup__image"),H=document.querySelector("#card-form"),M=document.querySelector("#card_button");function U(e,t){if(e){if("string"==typeof e)return z(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?z(e,t):void 0}}function z(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}p.addEventListener("submit",(function(e){e.preventDefault(),L.textContent="Сохранение...";var t,n,r,c=b.value,a=g.value;(t=c,n=a,r={name:t,about:n},fetch("".concat(l.url,"/users/me"),{method:"PATCH",headers:l.headers,body:JSON.stringify(r)}).then((function(e){return u(e)}))).then((function(e){j.textContent=e.name,O.textContent=e.about,o(k)})).catch((function(e){return console.log(e)})).finally((function(){L.textContent="Сохранить"}))})),q.addEventListener("click",(function(){r(k)})),L.addEventListener("click",(function(){H.reset(),r(C)})),D.addEventListener("submit",(function(e){e.preventDefault(),M.textContent="Сохранение...";var t,n,r,c=h.value,a=S.value;(t=c,n=a,r={name:t,link:n},fetch("".concat(l.url,"/cards"),{method:"POST",headers:l.headers,body:JSON.stringify(r)}).then((function(e){return u(e)}))).then((function(e){console.log(e),d.prepend(f(e.name,e.link,e._id,e.likes,e.owner._id,e.owner)),y(M,v),H.reset(),o(C)})).catch((function(e){console.log(e)})).finally((function(){M.textContent="Создать"}))})),T.addEventListener("click",(function(){A.reset(),r(E)})),A.addEventListener("submit",(function(e){e.preventDefault(),w.textContent="Сохранение...";var t,n,r=x.value;(t=r,n={avatar:t},fetch("".concat(l.url,"/users/me/avatar"),{method:"PATCH",headers:l.headers,body:JSON.stringify(n)}).then((function(e){return u(e)}))).then((function(e){T.style="background-image: url(".concat(e.avatar,")"),x.value="",y(w,v),A.reset(),o(E)})).catch((function(e){return console.log(e)})).finally((function(){w.textContent="Сохранить"}))})),Promise.all([fetch("".concat(l.url,"/users/me"),{headers:l.headers}).then((function(e){return u(e)})),fetch("".concat(l.url,"/cards"),{headers:l.headers}).then((function(e){return u(e)}))]).then((function(e){var t,n,r=(n=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,c=[],a=!0,i=!1;try{for(n=n.call(e);!(a=(r=n.next()).done)&&(c.push(r.value),!t||c.length!==t);a=!0);}catch(e){i=!0,o=e}finally{try{a||null==n.return||n.return()}finally{if(i)throw o}}return c}}(t,n)||U(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),o=r[0],c=r[1];console.log(o),j.textContent=o.name,O.textContent=o.about,T.style="background-image: url(".concat(o.avatar,")");var a=c.map((function(e){return f(e.name,e.link,e._id,e.likes,o._id,e.owner)}));d.prepend.apply(d,function(e){return function(e){if(Array.isArray(e))return z(e)}(e)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||U(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}(a))})).catch((function(e){console.log(e)})),function(e){Array.from(document.querySelectorAll(e.formSelector)).forEach((function(t){t.addEventListener("submit",(function(e){e.preventDefault()})),function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector));n.forEach((function(r){r.addEventListener("input",(function(){!function(e,t,n){var r=e.querySelector("#error-".concat(t.id));t.validity.valid?function(e,t,n){e.classList.remove(n.inputInvalidClass),t.classList.remove(n.errorClass),t.textContent=""}(t,r,n):function(e,t,n,r){e.classList.add(r.inputInvalidClass),t.classList.add(r.errorClass),t.textContent=n}(t,r,t.validationMessage,n)}(e,r,t),_(e,n,t)}))})),_(e,n,t)}(t,e)}))}(v)})();