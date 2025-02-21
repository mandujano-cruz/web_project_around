import Popup from "./Popup.js";
import FormValidator from "./FormValidator.js";
import {config} from "../utils/constants.js";

export default class PopupWithForm extends Popup {
  constructor({ handleFormSubmit }, popupSelector) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector(".popup__container");
    this._inputList = Array.from(this._form.querySelectorAll(".popup__input"));
    this._formItems = Array.from(this._popup.querySelectorAll(".popup__container"));
  }

  _getInputValues() {
    const inputValues = {};
    this._inputList.forEach(input => {
      inputValues[input.name] = input.value;
    });
    return inputValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }

  close() {
    super.close();
    this._form.reset();
  }

  open() {
    super.open();
    const validateProfile = new FormValidator(config, this._formItems);
    validateProfile.enableValidation();
  }

  renderLoading (isLoading, loadingText = "Guardando...", defaultText = "Guardar") {
    const submitButton = this._form.querySelector(config.submitButtonSelector);
    submitButton.textContent = isLoading ? loadingText : defaultText;
  }
}