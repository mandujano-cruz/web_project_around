class FormValidator {
    constructor (formList) {
        this._formList = formList;
    }

    _showInputError (formElement, inputElement, errorMessage) {
        const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add("popup__input_type_error");
        errorElement.textContent = errorMessage;
        errorElement.classList.add("popup__input-error_active");
    }

    _hideInputError (formElement, inputElement) {
        const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove("popup__input_type_error");
        errorElement.classList.remove("popup__input-error_active");
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
        const inputList = Array.from(formElement.querySelectorAll(".popup__input"));
        const buttonElement = formElement.querySelector(".popup__save-button");
        this.toggleButtonState(inputList, buttonElement);
    
        inputList.forEach((inputElement) => {
            inputElement.addEventListener("input", () => {
                this._checkInputValidity(formElement, inputElement);
                this.toggleButtonState(inputList, buttonElement);
            });
        });
    }

    enableValidation () {
        // const formList = Array.from(document.querySelectorAll(".popup__container"));
        this._formList.forEach((formElement) => {
            formElement.addEventListener("submit", function (evt) {
                evt.preventDefault();
            });
    
            this._setEventListeners(formElement);
        });
    }
}

export {FormValidator};