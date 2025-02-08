export default class FormValidator {
    constructor (config, formList) {
        this._config = config;
        this._formList = formList;
    }

    _showInputError (formElement, inputElement, errorMessage) {
        const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this._config.inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._config.errorClass);
    }

    _hideInputError (formElement, inputElement) {
        const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
        errorElement.classList.remove(this._config.errorClass);
        inputElement.classList.remove(this._config.inputErrorClass);
        errorElement.textContent = "";
    }

    _checkInputValidity (formElement, inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(formElement, inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError(formElement, inputElement);
        }
    }

    _hasInvalidInput (inputList) {
        return inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    }
    
    toggleButtonState (inputList, buttonElement) {
        if (this._hasInvalidInput(inputList)) {
            buttonElement.setAttribute("disabled", true);
        } else {
            buttonElement.removeAttribute("disabled");
        }
    }
    
    _setEventListeners (formElement) {
        const inputList = Array.from(formElement.querySelectorAll(this._config.inputSelector));
        const buttonElement = formElement.querySelector(this._config.submitButtonSelector);
        this.toggleButtonState(inputList, buttonElement);
    
        inputList.forEach((inputElement) => {
            inputElement.addEventListener("input", () => {
                this._checkInputValidity(formElement, inputElement);
                this.toggleButtonState(inputList, buttonElement);
            });
        });
    }

    enableValidation () {
        this._formList.forEach((formElement) => {
            formElement.addEventListener("submit", function (evt) {
                evt.preventDefault();
            });
    
            this._setEventListeners(formElement);
        });
    }
}