const initialCards = [
    {
        name: "Boston",
        link: "https://images.unsplash.com/photo-1531874668635-85a25b7279a2?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        alt: "Fotografía de la calle Arcon en Boston"
    },
    {
        name: "Hollywood",
        link: "https://images.unsplash.com/photo-1568502303729-8d32d9dd97a6?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        alt: "Fotografía de una de las calles de Hollywood"
    },
    {
        name: "Valle de los Monumentos",
        link: "https://images.unsplash.com/photo-1558353016-37b89cf18040?q=80&w=1031&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        alt: "Fotografía del Valle de los monumentos"
    },
    {
        name: "Stafford TX",
        link: "https://images.unsplash.com/photo-1625110180367-45169a188533?q=80&w=1050&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        alt: "Fotografía exterior de Stafford, Texas"
    },
    {
        name: "Estatua de la Libertad",
        link: "https://images.unsplash.com/photo-1520885161078-041b9f6ad3ef?q=80&w=1035&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        alt: "Fotografía de la Estatua de a Libertad"
    },
    {
        name: "Capitolio",
        link: "https://images.unsplash.com/photo-1648135589381-a07e0ca19d87?q=80&w=985&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        alt: "Fotografía del Capitolio en Washington"
    }
];

import {showInputError, hideInputError, checkInputValidity, hasInvalidInput, toggleButtonState, setEventListeners, enableValidation} from "./validate.js";

const popupEdit = document.querySelector(".popup_edit");
const popupAdd = document.querySelector(".popup_add");
const popupImage = document.querySelector(".popup_image");
const overlay = document.querySelector(".overlay");

// const formElementEdit = popupEdit.querySelector(".popup__container");
// const formElementAdd = popupAdd.querySelector(".popup__container");
const formElementEdit = document.forms.profile;
const formElementAdd = document.forms.image;

const closePopupButtonEdit = popupEdit.querySelector(".popup__close");
const closePopupButtonAdd = popupAdd.querySelector(".popup__close");
const closePopupButtonImage = popupImage.querySelector(".popup__close");

const openPopupButtonEdit = document.querySelector(".profile__edit-button");
const openPopupButtonAdd = document.querySelector(".profile__add-image");

const nameInput = document.querySelector(".popup__input-name");
const jobInput = document.querySelector(".popup__input-about");
const nameProfile=document.querySelector(".profile__name");
const jobProfile=document.querySelector(".profile__about-me");

const titleInput = document.querySelector(".popup__input-title");
const linkInput = document.querySelector(".popup__input-link");

const sectionElements = document.querySelector(".elements");

initialCards.forEach(function (card) {
    const cardTemplate = document.querySelector("#card-template").content;
    const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

    cardElement.querySelector(".card__title").textContent = card.name;
    cardElement.querySelector(".card__image").setAttribute("src", card.link);
    cardElement.querySelector(".card__image").setAttribute("alt", card.alt);

    cardElement.querySelector(".card__like").addEventListener("click", function (evt){
        evt.target.classList.toggle("card__like_active");
    });

    cardElement.querySelector(".card__image").addEventListener("click", function (evt){
        popupImage.classList.remove("popup_opened");
        overlay.classList.remove("overlay_hidden");
        const imageModal = document.querySelector(".popup__image");
        imageModal.setAttribute("src", evt.target.src);
        imageModal.setAttribute("alt", evt.target.alt);
        const imageTitle = document.querySelector(".popup__image-title");
        imageTitle.textContent = evt.target.alt;

        popupImage.append(imageModal);

        document.addEventListener("keydown", function (evt) {
            if (evt.key === "Escape") {
                closePopupImage();
            }
        });
        overlay.addEventListener("click", function (evt) {
            if (evt.target===overlay) {
                closePopupImage();
            }
        });
    });

    cardElement.querySelector(".card__delete").addEventListener("click", function (e){
        e.target.parentElement.remove();
    });

    sectionElements.append(cardElement);
});

function handleImageFormSubmit(evt) {
    evt.preventDefault();

    const cardTemplate = document.querySelector("#card-template").content;
    const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

    cardElement.querySelector(".card__title").textContent = titleInput.value;
    cardElement.querySelector(".card__image").setAttribute("src", linkInput.value);
    cardElement.querySelector(".card__image").setAttribute("alt", "");

    cardElement.querySelector(".card__like").addEventListener("click", function (evt){
        evt.target.classList.toggle("card__like_active");
    });

    cardElement.querySelector(".card__image").addEventListener("click", function (evt){
        popupImage.classList.remove("popup_opened");
        overlay.classList.remove("overlay_hidden");
        const imageModal = document.querySelector(".popup__image");
        imageModal.setAttribute("src", evt.target.src);
        imageModal.setAttribute("alt", evt.target.alt);
        const imageTitle = document.querySelector(".popup__image-title");
        imageTitle.textContent = evt.target.alt;

        popupImage.append(imageModal);

        document.addEventListener("keydown", function (evt) {
            if (evt.key === "Escape") {
                closePopupImage();
            }
        });
        overlay.addEventListener("click", function (evt) {
            if (evt.target===overlay) {
                closePopupImage();
            }
        });
    });

    cardElement.querySelector(".card__delete").addEventListener("click", function (e){
        e.target.parentElement.remove();
    });

    sectionElements.prepend(cardElement);

    popupAdd.classList.add("popup_opened");
    overlay.classList.add("overlay_hidden");
    formElementAdd.reset();
}

function handleProfileFormSubmit(evt) {
    evt.preventDefault();

    nameInput.textContent=nameInput.value;
    jobInput.textContent=jobInput.value;

    nameProfile.textContent=nameInput.value;
    jobProfile.textContent=jobInput.value;

    popupEdit.classList.add("popup_opened");
    overlay.classList.add("overlay_hidden");
}



function closePopupEdit() {
    popupEdit.classList.add("popup_opened");
    overlay.classList.add("overlay_hidden");
}

function closePopupAdd() {
    popupAdd.classList.add("popup_opened");
    overlay.classList.add("overlay_hidden");
}

function closePopupImage() {
    popupImage.classList.add("popup_opened");
    overlay.classList.add("overlay_hidden");
}

function openPopupEdit(){
    popupEdit.classList.remove("popup_opened");
    overlay.classList.remove("overlay_hidden");
    nameInput.value=nameProfile.textContent;
    jobInput.value=jobProfile.textContent;
}

function openPopupAdd(){
    popupAdd.classList.remove("popup_opened");
    overlay.classList.remove("overlay_hidden");
    nameInput.value=nameProfile.textContent;
    jobInput.value=jobProfile.textContent;
}


formElementEdit.addEventListener('submit', handleProfileFormSubmit);
formElementAdd.addEventListener('submit', handleImageFormSubmit);
closePopupButtonEdit.addEventListener('click', closePopupEdit);
closePopupButtonAdd.addEventListener('click', closePopupAdd);
closePopupButtonImage.addEventListener('click', closePopupImage);
openPopupButtonEdit.addEventListener('click', openPopupEdit);
openPopupButtonAdd.addEventListener('click', openPopupAdd);