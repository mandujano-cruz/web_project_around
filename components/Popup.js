export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._closeButton = this._popup.querySelector(".popup__close");
    this._overlay = document.querySelector(".overlay");
  }

  open() {
    this._popup.classList.remove("popup_opened");
    this._overlay.classList.remove("overlay_hidden");
  }

  close() {
    this._popup.classList.add("popup_opened");
    this._overlay.classList.add("overlay_hidden");
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape" && !this._popup.classList.contains("popup_opened")) {
      this.close();
    }
  }

  setEventListeners() {
    this._closeButton.addEventListener("click", () => this.close());
    this._overlay.addEventListener("click", (evt) => {
      if (evt.target === this._overlay && !this._popup.classList.contains("popup_opened")) {
        this.close();
      }
    });
    document.addEventListener("keydown", (evt) => this._handleEscClose(evt));
  }
}