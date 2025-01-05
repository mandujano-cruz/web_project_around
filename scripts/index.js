import { Card } from "./Card.js";
import {closePopup, openPopupAdd, openPopupEdit, nameInput, jobInput, nameProfile, jobProfile} from "./utils.js";

const popupEdit = document.querySelector(".popup_edit");
const popupAdd = document.querySelector(".popup_add");

const formElementEdit = document.forms.profile;
const formElementAdd = document.forms.image;

const titleInput = document.querySelector(".popup__input-title");
const linkInput = document.querySelector(".popup__input-link");

const sectionElements = document.querySelector(".elements");

function handleImageFormSubmit(evt) {
    evt.preventDefault();
    const card = new Card(titleInput.value, linkInput.value, "#card-template");
    const cardElement = card.generateCard();

    sectionElements.prepend(cardElement);

    closePopup(popupAdd);
    formElementAdd.reset();
}

function handleProfileFormSubmit(evt) {
    evt.preventDefault();

    nameInput.textContent=nameInput.value;
    jobInput.textContent=jobInput.value;

    nameProfile.textContent=nameInput.value;
    jobProfile.textContent=jobInput.value;

    closePopup(popupEdit);
    formElementEdit.reset();
}

formElementEdit.addEventListener('submit', handleProfileFormSubmit);
formElementAdd.addEventListener('submit', handleImageFormSubmit);