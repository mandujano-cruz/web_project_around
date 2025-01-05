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

const popupElement = document.querySelector(".popup_image");
const popupImage = popupElement.querySelector(".popup__image");
const popupImageTitle = popupElement.querySelector(".popup__image-title");
const popupCloseButton = popupElement.querySelector(".popup__close");
const overlay = document.querySelector(".overlay");
const cardList = document.querySelector(".elements");

class Card {
    constructor (name, link, cardSelector) {
        this._name = name;
        this._link = link;
        this._cardSelector = cardSelector;
    }

    _getTemplate () {
        const cardElement = document
        .querySelector(this._cardSelector)
        .content
        .querySelector(".card")
        .cloneNode(true);

        return cardElement;
    }

    _handleOpenPopup () {
        popupImage.src = this._link;
        popupImageTitle.textContent = this._name;
        popupElement.classList.remove("popup_opened");
        overlay.classList.remove("overlay_hidden");
    }

    _handleClosePopup () {
        popupImage.src = "";
        popupImageTitle.textContent = "";
        popupElement.classList.add("popup_opened");
        overlay.classList.add("overlay_hidden");
    }

    _setEventListeners () {
        this._element.querySelector(".card__image").addEventListener("click", () => {
            this._handleOpenPopup();
        });

        popupCloseButton.addEventListener("click", () => {
            this._handleClosePopup();
        });

        document.addEventListener("keydown", (evt) => {
            evt.key === "Escape" && this._handleClosePopup();
        });

        overlay.addEventListener("click", (evt) => {
            evt.target === overlay && this._handleClosePopup();
        });

        this._element.querySelector(".card__like").addEventListener("click", (evt) => {
            evt.target.classList.toggle("card__like_active");
        });

        this._element.querySelector(".card__delete").addEventListener("click", (evt) => {
            evt.target.parentElement.remove();
        });
    }

    generateCard () {
        this._element = this._getTemplate();
        this._setEventListeners();

        this._element.querySelector(".card__title").textContent = this._name;
        this._element.querySelector(".card__image").src = this._link;

        return this._element;
    }
}

initialCards.forEach((item) => {
    const card = new Card(item.name, item.link, "#card-template");
    const cardElement = card.generateCard();
    cardList.append(cardElement);
});

export {Card};