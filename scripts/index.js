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

const popupEdit = document.querySelector(".popup_edit");
const popupAdd = document.querySelector(".popup_add");

const formElementEdit = popupEdit.querySelector(".popup__container");
const formElementAdd = popupAdd.querySelector(".popup__container");

const closePopupButtonEdit = popupEdit.querySelector(".popup__close");
const closePopupButtonAdd = popupAdd.querySelector(".popup__close");

const openPopupButtonEdit = document.querySelector(".profile__edit-button");
const openPopupButtonAdd = document.querySelector(".profile__add-image");

const nameInput = document.querySelector(".popup__input_name");
const jobInput = document.querySelector(".popup__input_about");
const nameProfile=document.querySelector(".profile__name");
const jobProfile=document.querySelector(".profile__about-me");

const titleInput = document.querySelector(".popup__input_title");
const linkInput = document.querySelector(".popup__input_link");

const sectionElements = document.querySelector(".elements");

function handleProfileFormSubmit(evt) {
    evt.preventDefault();

    nameInput.textContent=nameInput.value;
    jobInput.textContent=jobInput.value;

    nameProfile.textContent=nameInput.value;
    jobProfile.textContent=jobInput.value;

    popupEdit.classList.add("popup_opened");
}

function handleImageFormSubmit(evt) {
    evt.preventDefault();

    const cardTemplate = document.querySelector("#card-template").content;
    const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

    cardElement.querySelector(".card__title").textContent = titleInput.value;
    cardElement.querySelector(".card__image").setAttribute("src", linkInput.value);
    cardElement.querySelector(".card__image").setAttribute("alt", "");

    cardElement.querySelector(".card__like").addEventListener("click", function (evt){
        evt.target.classList.toggle("card__like_active");
    })

    sectionElements.prepend(cardElement);

    popupAdd.classList.add("popup_opened");
    titleInput.value = "";
    linkInput.value = "";
}

function closePopupEdit() {
    popupEdit.classList.add("popup_opened");
}

function closePopupAdd() {
    popupAdd.classList.add("popup_opened");
}

function openPopupEdit(){
    popupEdit.classList.remove("popup_opened");
    nameInput.value=nameProfile.textContent;
    jobInput.value=jobProfile.textContent;
}

function openPopupAdd(){
    popupAdd.classList.remove("popup_opened");
    nameInput.value=nameProfile.textContent;
    jobInput.value=jobProfile.textContent;
}

initialCards.forEach(function (card) {
    const cardTemplate = document.querySelector("#card-template").content;
    const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

    cardElement.querySelector(".card__title").textContent = card.name;
    cardElement.querySelector(".card__image").setAttribute("src", card.link);
    cardElement.querySelector(".card__image").setAttribute("alt", card.alt);

    cardElement.querySelector(".card__like").addEventListener("click", function (evt){
        evt.target.classList.toggle("card__like_active");
    })

    sectionElements.append(cardElement);
});

formElementEdit.addEventListener('submit', handleProfileFormSubmit);
formElementAdd.addEventListener('submit', handleImageFormSubmit);
closePopupButtonEdit.addEventListener('click', closePopupEdit);
closePopupButtonAdd.addEventListener('click', closePopupAdd);
openPopupButtonEdit.addEventListener('click', openPopupEdit);
openPopupButtonAdd.addEventListener('click', openPopupAdd);