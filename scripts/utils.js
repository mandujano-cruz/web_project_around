import { FormValidator } from "./FormValidator.js";

const popupEdit = document.querySelector(".popup_edit");
const popupAdd = document.querySelector(".popup_add");
const popupImage = document.querySelector(".popup_image");
const overlay = document.querySelector(".overlay");

const nameInput = document.querySelector(".popup__input-name");
const jobInput = document.querySelector(".popup__input-about");
const nameProfile=document.querySelector(".profile__name");
const jobProfile=document.querySelector(".profile__about-me");

const formElementEdit = document.forms.profile;
const formElementAdd = document.forms.image;

const closePopupButtonEdit = popupEdit.querySelector(".popup__close");
const closePopupButtonAdd = popupAdd.querySelector(".popup__close");
const closePopupButtonImage = popupImage.querySelector(".popup__close");

const openPopupButtonEdit = document.querySelector(".profile__edit-button");
const openPopupButtonAdd = document.querySelector(".profile__add-image");

const config = {
    formSelector: '.popup__container',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save-button',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active'
};

function closePopup(popupElement) {
    popupElement.classList.add("popup_opened");
    overlay.classList.add("overlay_hidden");
    formElementAdd.reset();
    formElementEdit.reset();
}

function openPopupEdit(){
    const formList = Array.from(document.querySelectorAll(config.formSelector));
    const validateProfile = new FormValidator(config, formList);
    validateProfile.enableValidation();

    popupEdit.classList.remove("popup_opened");
    overlay.classList.remove("overlay_hidden");
    nameInput.value=nameProfile.textContent;
    jobInput.value=jobProfile.textContent;

    validateProfile.toggleButtonState([nameInput, jobInput], formElementEdit.querySelector(config.submitButtonSelector));

    document.addEventListener("keydown", function (evt) {
        evt.key==="Escape" && closePopup(popupEdit);
    });
    overlay.addEventListener("click", function (evt) {
        evt.target===overlay && closePopup(popupEdit);
    });
    
}

function openPopupAdd(){
    const formList = Array.from(document.querySelectorAll(config.formSelector));
    const validateProfile = new FormValidator(config, formList);
    validateProfile.enableValidation();

    popupAdd.classList.remove("popup_opened");
    overlay.classList.remove("overlay_hidden");

    document.addEventListener("keydown", function (evt) {
        evt.key==="Escape" && closePopup(popupAdd);
    });
    overlay.addEventListener("click", function (evt) {
        evt.target===overlay && closePopup(popupAdd);
    });
}

closePopupButtonEdit.addEventListener('click', () => closePopup(popupEdit));
closePopupButtonAdd.addEventListener('click', () => closePopup(popupAdd));
closePopupButtonImage.addEventListener('click', () => closePopup(popupImage));
openPopupButtonEdit.addEventListener('click', openPopupEdit);
openPopupButtonAdd.addEventListener('click', openPopupAdd);

export {closePopup, openPopupAdd, openPopupEdit, nameInput, jobInput, nameProfile, jobProfile};