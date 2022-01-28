(()=>{"use strict";var e="https://nomoreparties.co/v1/".concat("plus-cohort-5");function t(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function n(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var r={baseUrl:e,headers:{authorization:"2da09b68-77d7-4eeb-bec1-377a2129dd59","Content-Type":"application/json"}},o=function(){function o(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:r,n=e.baseUrl,i=e.headers;t(this,o),this.baseUrl=n,this.headers=i}var i,u;return i=o,u=[{key:"getUser",value:function(){return this._executeRequest({url_service:"/users/me"})}},{key:"updateAvatarServer",value:function(e){var t=JSON.stringify({avatar:e});return this._executeRequest({url_service:"/users/me/avatar",method:"PATCH",body:t})}},{key:"saveProfileServer",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"sivanov",t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"Описание",n="/users/me",r=JSON.stringify({name:e,about:t});return this._executeRequest({url_service:n,method:"PATCH",body:r})}},{key:"savePictureServer",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",n="/cards",r=JSON.stringify({name:e,link:t});return this._executeRequest({url_service:n,method:"POST",body:r})}},{key:"getCards",value:function(){return this._executeRequest({url_service:"/cards"})}},{key:"deleteCardServer",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t="/cards/".concat(e);return this._executeRequest({url_service:t,method:"DELETE"})}},{key:"likeCardServer",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t="/cards/likes/".concat(e);return this._executeRequest({url_service:t,method:"PUT"})}},{key:"unLikeCardServer",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t="/cards/likes/".concat(e);return this._executeRequest({url_service:t,method:"DELETE"})}},{key:"_executeRequest",value:function(t){var n=t.url_service,r=t.method,o=void 0===r?"GET":r,i=t.body,u=void 0===i?"":i,a={method:o,headers:this.headers};return u&&(a.body=u),fetch("".concat(e).concat(n),a).then((function(e){return e.ok?e.json():Promise.reject("Не удалось выполнить запрос к серверу ".concat(e.statusText))}))}}],u&&n(i.prototype,u),Object.defineProperty(i,"prototype",{writable:!1}),o}();function i(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function u(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var a=function(){function e(t,n){var r=t.data,o=t.userId,i=t.handleCardClick,a=t.handleTrashClick,c=t.handleLike,l=t.handleUnLike;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),u(this,"_LIKE_BUTTON_SELECTOR",".card__like-button"),u(this,"_TRASH_BUTTON_SELECTOR",".card__trash-button"),u(this,"_LIKE_CLASS","card__like-button_active"),this._data=r,this._handleCardClick=i,this._handleTrashClick=a,this._handleLike=c,this._handleUnLike=l,this._selector=n,this._cardId=r._id,this._userId=o,this._isMine=r.owner._id===o,this._cardName=this._data.name,this._cardLink=this._data.link}var t,n;return t=e,n=[{key:"_getElement",value:function(){return document.querySelector(".templates").content.querySelector(this._selector).cloneNode(!0)}},{key:"_setCardImg",value:function(){var e=this._element.querySelector(".card__img");e.src=this._cardLink,e.alt=this._cardName,this._element.querySelector(".card__text").textContent=this._cardName}},{key:"_toggleLikeStatus",value:function(e){(e.classList.contains(this._LIKE_CLASS)?this._handleUnLike:this._handleLike)(this._cardId)}},{key:"updateLikeStatus",value:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this._data,n=Boolean(t.likes.find((function(t){return t._id===e._userId}))),r=this._element.querySelector(this._LIKE_BUTTON_SELECTOR);n?r.classList.add(this._LIKE_CLASS):r.classList.remove(this._LIKE_CLASS),this._element.querySelector(".card__count-likes").textContent=t.likes.length}},{key:"_setDeleteContext",value:function(){var e=this,t=this._element.querySelector(this._TRASH_BUTTON_SELECTOR);this._isMine?t.addEventListener("click",(function(){e._handleTrashClick()})):t.classList.add("card__trash-button_inactive")}},{key:"_setEventListeners",value:function(){var e=this;this._element.querySelector(this._LIKE_BUTTON_SELECTOR).addEventListener("click",(function(t){e._toggleLikeStatus(t.currentTarget)})),this._element.querySelector(".card__popup-button").addEventListener("click",(function(){return e._handleCardClick(e._cardLink,e._cardName)}))}},{key:"generate",value:function(){return this._element=this._getElement(),this._setCardImg(),this.updateLikeStatus(),this._setDeleteContext(),this._setEventListeners(),this._element}},{key:"remove",value:function(){this._element.remove()}},{key:"getId",value:function(){return this._cardId}}],n&&i(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function c(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function l(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var s=function(){function e(t,n){var r=t.formSelector,o=t.inputSelector,i=t.submitButtonSelector,u=t.inactiveButtonClass,a=t.inputErrorClass,c=t.errorClass;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._formSelector=r,this._inputSelector=o,this._submitButtonSelector=i,this._inactiveButtonClass=u,this._inputErrorClass=a,this._errorClass=c,this._formElement=n}var t,n;return t=e,(n=[{key:"enableValidation",value:function(){this._setEventListners()}},{key:"_setEventListners",value:function(){var e,t=this,n=function(e){if(Array.isArray(e))return c(e)}(e=this._formElement.querySelectorAll(this._inputSelector))||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||function(e,t){if(e){if("string"==typeof e)return c(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?c(e,t):void 0}}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}(),r=this._formElement.querySelector(this._submitButtonSelector);this._toggleButtonState(n,r),n.forEach((function(e){e.addEventListener("input",(function(){t._checkValidation(e),t._toggleButtonState(n,r)}))})),this._formElement.addEventListener("formOpened",(function(){return t._toggleButtonState(n,r)}))}},{key:"_toggleButtonState",value:function(e,t){e.every((function(e){return e.validity.valid}))?(t.classList.remove(this._inactiveButtonClass),t.removeAttribute("disabled")):(t.classList.add(this._inactiveButtonClass),t.setAttribute("disabled",!0))}},{key:"_checkValidation",value:function(e){e.validity.valid?this._hideError(e):this._showError(e,e.validationMessage)}},{key:"_hideError",value:function(e){var t=this._getErrorLabel(e);e.classList.remove(this._inputErrorClass),t.classList.remove(this._errorClass)}},{key:"_showError",value:function(e,t){var n=this._getErrorLabel(e);e.classList.add(this._inputErrorClass),n.classList.add(this._errorClass),n.textContent=t}},{key:"_getErrorLabel",value:function(e){var t=e.errorLabel;return t||(t=this._formElement.querySelector("#".concat(e.id,"-error")),e.errorLabel=t),t}}])&&l(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function f(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var p=function(){function e(t,n){var r=t.items,o=t.renderer;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._items=r,this._renderer=o,this._container=document.querySelector(n)}var t,n;return t=e,n=[{key:"clear",value:function(){this._container.innerHTML=""}},{key:"renderItems",value:function(){var e=this,t=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];t&&this.clear(),this._items.forEach((function(t){e._renderer(t)}))}},{key:"addItem",value:function(e){this._container.prepend(e)}}],n&&f(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function h(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function _(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var d=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),_(this,"_POPUP_OPENED_CLASS","popup_opened"),_(this,"_POPUP_CLOSED_CLASS","popup__close"),this._popup=document.querySelector(t),this._handlerEsc=this._handleEscClose.bind(this)}var t,n;return t=e,(n=[{key:"_handleEscClose",value:function(e){"Escape"===e.key&&this.close()}},{key:"open",value:function(){this._popup.classList.add(this._POPUP_OPENED_CLASS),document.addEventListener("keydown",this._handlerEsc)}},{key:"close",value:function(){this._popup.classList.remove(this._POPUP_OPENED_CLASS),document.removeEventListener("keydown",this._handlerEsc)}},{key:"setEventListeners",value:function(){var e=this;this._popup.addEventListener("mousedown",(function(t){t.target.classList.contains(e._POPUP_OPENED_CLASS)&&e.close(),t.target.classList.contains(e._POPUP_CLOSED_CLASS)&&e.close()}))}}])&&h(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function y(e){return y="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},y(e)}function v(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function m(){return m="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(e,t,n){var r=b(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(arguments.length<3?e:n):o.value}},m.apply(this,arguments)}function b(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=E(e)););return e}function S(e,t){return S=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},S(e,t)}function g(e,t){if(t&&("object"===y(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function E(e){return E=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},E(e)}var k=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");Object.defineProperty(e,"prototype",{value:Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),writable:!1}),t&&S(e,t)}(u,e);var t,n,r,o,i=(r=u,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=E(r);if(o){var n=E(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return g(this,e)});function u(e){var t;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,u),(t=i.call(this,e))._imgFigure=t._popup.querySelector(".image-modal__body"),t._captionImg=t._popup.querySelector(".image-modal__caption"),t}return t=u,(n=[{key:"open",value:function(e,t){this._imgFigure.src=e,this._imgFigure.alt=t,this._captionImg.textContent=t,m(E(u.prototype),"open",this).call(this)}}])&&v(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),u}(d);function L(e){return L="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},L(e)}function O(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function w(){return w="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(e,t,n){var r=C(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(arguments.length<3?e:n):o.value}},w.apply(this,arguments)}function C(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=T(e)););return e}function P(e,t){return P=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},P(e,t)}function j(e,t){if(t&&("object"===L(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function T(e){return T=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},T(e)}var I=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");Object.defineProperty(e,"prototype",{value:Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),writable:!1}),t&&P(e,t)}(u,e);var t,n,r,o,i=(r=u,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=T(r);if(o){var n=T(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return j(this,e)});function u(e){var t,n=e.selector,r=e.handleFormSubmit;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,u),(t=i.call(this,n))._handleFormSubmit=r,t._formElement=t._popup.querySelector(".popup__form"),t}return t=u,(n=[{key:"_getInputValues",value:function(){var e=this;return this._inputList=this._formElement.querySelectorAll(".popup__input"),this._formValues={},this._inputList.forEach((function(t){e._formValues[t.name]=t.value})),this._formValues}},{key:"setEventListeners",value:function(){var e=this;w(T(u.prototype),"setEventListeners",this).call(this),this._formElement.addEventListener("submit",(function(t){t.preventDefault(),e._getInputValues(),e._handleFormSubmit(e._formValues)}))}}])&&O(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),u}(d);function R(e){return R="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},R(e)}function q(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function A(e,t){return A=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},A(e,t)}function U(e,t){if(t&&("object"===R(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function x(e){return x=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},x(e)}var B,N=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");Object.defineProperty(e,"prototype",{value:Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),writable:!1}),t&&A(e,t)}(u,e);var t,n,r,o,i=(r=u,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=x(r);if(o){var n=x(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return U(this,e)});function u(e){var t,n=e.selector,r=e.selectorName,o=e.selectorAbout,a=e.handleGetUserInfo,c=e.handleFormSubmit;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,u),(t=i.call(this,{selector:n,handleFormSubmit:c}))._name=t._popup.querySelector(r),t._about=t._popup.querySelector(o),t._handleGetUserInfo=a,t}return t=u,(n=[{key:"getUserInfo",value:function(){return this._handleGetUserInfo()}},{key:"setUserInfo",value:function(){this._handleFormSubmit(this._name.value,this._about.value)}},{key:"updateUserInfo",value:function(e){var t=e.name,n=e.about;this._name.value=t,this._about.value=n}}])&&q(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),u}(I);function D(e){e.setAttribute("disabled",!0),e.initValue=e.textContent,e.textContent="Сохранение..."}function F(e){e.removeAttribute("disabled"),e.textContent=e.initValue}function V(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var K=document.querySelector(".profile__add-button"),M=document.querySelector(".card-popup").querySelector(".popup__button_event_submit"),G=document.querySelector(".profile__edit-button"),H=document.querySelector(".profile__text"),J=document.querySelector(".profile__title"),$=document.querySelector(".profile__avatar"),z=document.querySelector(".avatar-popup").querySelector(".popup__button_event_submit"),Q=new o;function W(e){var t=e.name,n=e.about,r=e.avatar;J.textContent=t,H.textContent=n,$.src=r}function X(e,t){var n=new p({items:e,renderer:function(e){var t=new a({data:e,userId:B,handleTrashClick:function(){var e=new I({selector:".confirmation-popup",handleFormSubmit:function(){Q.deleteCardServer(t.getId()).then((function(){t.remove(),e.close()})).catch((function(e){return console.log(e)}))}});e.setEventListeners(),e.open()},handleCardClick:function(e,t){var n=new k(".img-popup");n.setEventListeners(),n.open(e,t)},handleLike:function(e){Q.likeCardServer(e).then((function(e){return t.updateLikeStatus(e)})).catch((function(e){return console.log(e)}))},handleUnLike:function(e){Q.unLikeCardServer(e).then((function(e){return t.updateLikeStatus(e)})).catch((function(e){return console.log(e)}))}},".elements__list-item"),r=t.generate();n.addItem(r)}},".elements");n.renderItems(t)}Promise.all([Q.getUser(),Q.getCards()]).then((function(e){var t,n,r=(n=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,i=[],u=!0,a=!1;try{for(n=n.call(e);!(u=(r=n.next()).done)&&(i.push(r.value),!t||i.length!==t);u=!0);}catch(e){a=!0,o=e}finally{try{u||null==n.return||n.return()}finally{if(a)throw o}}return i}}(t,n)||function(e,t){if(e){if("string"==typeof e)return V(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?V(e,t):void 0}}(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),o=r[0],i=r[1];B=o._id,W(o),X(i)})).catch((function(e){return console.log("Не удалось связаться с сервером ".concat(e))}));var Y=new N({selector:".profile-popup",selectorName:".popup__input_name",selectorAbout:".popup__input_description",handleGetUserInfo:function(){Q.getUser().then((function(e){Y.updateUserInfo(e),Y.setEventListeners(),Y.open()})).catch((function(e){return console.log(e)}))},handleFormSubmit:function(e){var t=e.popup__input_name,n=e.popup__input_description;Q.saveProfileServer(t,n).then((function(e){W(e),Y.close()})).catch((function(e){return console.log(e)}))}});G.addEventListener("click",(function(){Y.getUserInfo()}));var Z=new I({selector:".card-popup",handleFormSubmit:function(e){D(M);var t=e["popup__input_img-name"],n=e["popup__input_img-link"];Q.savePictureServer(t,n).then((function(e){X([e],!1),Z.close()})).catch((function(e){return console.log(e)})).finally((function(){return F(M)}))}});Z.setEventListeners(),K.addEventListener("click",(function(){Z.open()}));var ee=new I({selector:".avatar-popup",handleFormSubmit:function(e){D(z),Q.updateAvatarServer(e["avatar-popup__link"]).then((function(e){W(e),ee.close()})).catch((function(e){return console.log(e)})).finally((function(){return F(z)}))}});ee.setEventListeners(),$.addEventListener("click",(function(){ee.open()}));var te={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button_event_submit",inactiveButtonClass:"popup__button_inactive",inputErrorClass:"popup__input_type_error",errorClass:"popup__input-error_active"};document.querySelectorAll(te.formSelector).forEach((function(e){new s(te,e).enableValidation()}))})();