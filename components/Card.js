export default class Card {
    constructor({ name, link }, cardSelector, handleCardClick) {
      this._name = name;
      this._link = link;
      this._cardSelector = cardSelector;
      this._handleCardClick = handleCardClick;
    }
  
    _getTemplate() {
      const cardElement = document
        .querySelector(this._cardSelector)
        .content
        .querySelector(".card")
        .cloneNode(true);
      return cardElement;
    }
  
    generateCard() {
      this._element = this._getTemplate();
      this._element.querySelector(".card__title").textContent = this._name;
      this._element.querySelector(".card__image").src = this._link;
      this._element.querySelector(".card__image").alt = this._name;
  
      this._element.querySelector(".card__image").addEventListener("click", () => {
        this._handleCardClick(this._name, this._link);
      });
  
      this._element.querySelector(".card__like").addEventListener("click", (evt) => {
        evt.target.classList.toggle("card__like_active");
      });
  
      this._element.querySelector(".card__delete").addEventListener("click", (evt) => {
        evt.target.closest(".card").remove();
      });
  
      return this._element;
    }
  }