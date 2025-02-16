import Popup from "./Popup.js"

export default class PopupWithConfirmation extends Popup {
  constructor (popupSelector){
    super (popupSelector);
    this._form = this._popup.querySelector(".popup__container_delete");
  }
  
  setConfirmDelete (action) {
    this._handleConfirm = action;
  }

  // open (cardElement, cardId) {
  //   this._cardElement = cardElement;
  //   this._cardId = cardId;
  //   super.open();
  // }

  setEventListeners () {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleConfirm();
      this.close();
    });
  }
}