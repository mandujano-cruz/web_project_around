import Popup from "./Popup.js";

class PopuoWithImage extends Popup {
  constructor(popupSelector){
    super(popupSelector);
  }

  open () {
    popupImage.src = this._link;
    popupImageTitle.textContent = this._name;
    // popupElement.classList.remove("popup_opened");
    // overlay.classList.remove("overlay_hidden");
  }
}