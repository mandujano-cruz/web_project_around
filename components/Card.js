export default class Card {
    constructor({ name, link, isLiked, _id }, cardSelector, handleCardClick, handleDeleteCard, handleLikeToggle) {
      this._name = name;
      this._link = link;
      this._isLiked = isLiked;
      this._id = _id;
      this._cardSelector = cardSelector;
      this._handleCardClick = handleCardClick;
      this._handleDeleteCard = handleDeleteCard;
      this._handleLikeToggle = handleLikeToggle;
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
      this._isLiked ? this._element.querySelector(".card__like").classList.add("card__like_active") : this._element.querySelector(".card__like").classList.remove("card__like_active");
  
      this._element.querySelector(".card__image").addEventListener("click", () => {
        this._handleCardClick(this._name, this._link);
      });
  
      this._element.querySelector(".card__like").addEventListener("click", (evt) => {
        evt.target.classList.toggle("card__like_active");
        this._handleLikeToggle(this._id, this._isLiked);
      });
  
      this._element.querySelector(".card__delete").addEventListener("click", (evt) => {
        this._handleDeleteCard(evt, this._id);
      });
  
      return this._element;
    }

    _updateLikeView () {
      const likeButton = this._element.querySelector(".card__like");
      this._isLiked ? likeButton.classList.add("card__like_active") : likeButton.classList.remove("card__like_active");
    }
  }