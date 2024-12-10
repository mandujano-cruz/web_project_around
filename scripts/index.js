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

const formElement = document.querySelector(".popup__container");
const openPopupButton = document.querySelector(".profile__edit-button");
const closePopupButton = document.querySelector(".popup__close");
const popup = document.querySelector(".popup");
const nameInput = document.querySelector(".popup__input_name");
const jobInput = document.querySelector(".popup__input_about");
const nameProfile=document.querySelector(".profile__name");
const jobProfile=document.querySelector(".profile__about-me");
const sectionElements = document.querySelector(".elements");

function handleProfileFormSubmit(evt) {
    evt.preventDefault();

    nameInput.textContent=nameInput.value;
    jobInput.textContent=jobInput.value;

    nameProfile.textContent=nameInput.value;
    jobProfile.textContent=jobInput.value;

    popup.classList.add("popup_opened");
}

function closePopupEdit() {
    popup.classList.add("popup_opened");
}

function openPopupEdit(){
    popup.classList.remove("popup_opened");
    nameInput.value=nameProfile.textContent;
    jobInput.value=jobProfile.textContent;
}

initialCards.forEach(function (card) {
    const cardTemplate = document.querySelector("#card-template").content;
    const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

    cardElement.querySelector(".card__title").textContent = card.name;
    cardElement.querySelector(".card__image").setAttribute("src", card.link);
    cardElement.querySelector(".card__image").setAttribute("alt", card.alt);

    sectionElements.append(cardElement);
});

formElement.addEventListener('submit', handleProfileFormSubmit);
closePopupButton.addEventListener('click', closePopupEdit);
openPopupButton.addEventListener('click', openPopupEdit);