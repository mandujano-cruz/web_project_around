import {overlay, popupAdd} from "./utils.js";

export default class Popup {
  constructor (popupSelector) {
    this._popupSelector = popupSelector;
  }

  open () {
    // const formList = Array.from(document.querySelectorAll(".popup__container"));
    // const validateProfile = new FormValidator(config, formList);
    popupAdd.classList.remove("popup_opened");
    overlay.classList.remove("overlay_hidden");
    // validateProfile.enableValidation();
  }

  close (element) {
    element.classList.add("popup_opened");
    overlay.classList.add("overlay_hidden");
  }

  _handleEscClose (evt) {
    evt.key === "Escape" && this.close(this._popupSelector);
  }

  setEventListeners () {
    document.addEventListener("keydown", (evt) => {
      this._handleEscClose(evt);
    } );
    overlay.addEventListener("click", (evt) => {
      evt.target === overlay && this.close(this._popupSelector);
    });
  }
}