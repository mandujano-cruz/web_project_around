import Popup from "./Popup.js";
import FormValidator from "./FormValidator.js";

class PopupWithForms extends Popup {
  constructor ({}, popupSelector) {
    super(popupSelector);
  }

  _getInputValues () {

  }

  open () {
    const formList = Array.from(document.querySelectorAll(".popup__container"));
    const validateProfile = new FormValidator(config, formList);
    // popupAdd.classList.remove("popup_opened");
    // overlay.classList.remove("overlay_hidden");
    validateProfile.enableValidation();

    if(super(popupSelector)===".popup__edit"){

    }
  }

  setEventListener () {
    document.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
  }
}