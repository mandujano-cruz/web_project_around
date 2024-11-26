let formElement = document.querySelector(".popup__container");
let openPopupButton = document.querySelector(".profile__edit-button");
let closePopupButton = document.querySelector(".popup__close");
let popup = document.querySelector(".popup");

function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    let nameInput = document.querySelector(".popup__input_name");
    let jobInput = document.querySelector(".popup__input_about");

    nameInput.textContent=nameInput.value;
    jobInput.textContent=jobInput.value;

    let nameProfile=document.querySelector(".profile__name");
    let jobProfile=document.querySelector(".profile__about-me");

    nameProfile.textContent=nameInput.value;
    jobProfile.textContent=jobInput.value;
}

function closePopupEdit() {
    popup.classList.add("popup_opened");
}

function openPopupEdit(){
    popup.classList.remove("popup_opened");
}

formElement.addEventListener('submit', handleProfileFormSubmit);
closePopupButton.addEventListener('click', closePopupEdit);
openPopupButton.addEventListener('click', openPopupEdit);