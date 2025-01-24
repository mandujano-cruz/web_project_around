import { FormValidator } from "../components/FormValidator.js";

const popupEdit = document.querySelector(".popup_edit");
const popupAdd = document.querySelector(".popup_add");
const popupElement = document.querySelector(".popup_image");
const popupImage = popupElement.querySelector(".popup__image");
const overlay = document.querySelector(".overlay");

const nameInput = document.querySelector(".popup__input-name");
const jobInput = document.querySelector(".popup__input-about");
const nameProfile=document.querySelector(".profile__name");
const jobProfile=document.querySelector(".profile__about-me");

const formElementEdit = document.forms.profile;
const formElementAdd = document.forms.image;

const closePopupButtonEdit = popupEdit.querySelector(".popup__close");
const closePopupButtonAdd = popupAdd.querySelector(".popup__close");
const closePopupButtonImage = popupElement.querySelector(".popup__close");

const openPopupButtonEdit = document.querySelector(".profile__edit-button");
const openPopupButtonAdd = document.querySelector(".profile__add-image");

const titleInput = document.querySelector(".popup__input-title");
const linkInput = document.querySelector(".popup__input-link");

const sectionElements = document.querySelector(".elements");

const config = {
    formSelector: '.popup__container',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save-button',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active'
};

const initialCards = [
    {
        name: "Boston",
        link: "https://images.unsplash.com/photo-1531874668635-85a25b7279a2?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
        name: "Hollywood",
        link: "https://images.unsplash.com/photo-1568502303729-8d32d9dd97a6?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
        name: "Valle de los Monumentos",
        link: "https://images.unsplash.com/photo-1558353016-37b89cf18040?q=80&w=1031&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
        name: "Stafford TX",
        link: "https://images.unsplash.com/photo-1625110180367-45169a188533?q=80&w=1050&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
        name: "Estatua de la Libertad",
        link: "https://images.unsplash.com/photo-1520885161078-041b9f6ad3ef?q=80&w=1035&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
        name: "Capitolio",
        link: "https://images.unsplash.com/photo-1648135589381-a07e0ca19d87?q=80&w=985&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    }
];

const popupImageTitle = popupElement.querySelector(".popup__image-title");
const popupCloseButton = popupElement.querySelector(".popup__close");
const cardList = document.querySelector(".elements");

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

export {closePopup, openPopupAdd, openPopupEdit, nameInput, jobInput, nameProfile, jobProfile, titleInput, linkInput, sectionElements, formElementAdd, formElementEdit, initialCards, popupElement, popupImageTitle, popupCloseButton, cardList, overlay, popupImage, popupAdd, popupEdit};