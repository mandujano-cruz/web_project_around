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
            _showInputError(formElement, inputElement, inputElement.validationMessage);
        } else {
            _hideInputError(formElement, inputElement);
        }
    }

    _hasInvalidInput (inputList) {
        return inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    }
    
    _toggleButtonState (inputList, buttonElement) {
        if (_hasInvalidInput(inputList)) {
            buttonElement.setAttribute("disabled", true);
        } else {
            buttonElement.removeAttribute("disabled");
        }
    }
    
    _setEventListeners (formElement) {
        const inputList = Array.from(formElement.querySelectorAll(".popup__input"));
        const buttonElement = formElement.querySelector(".popup__save-button");
        _toggleButtonState(inputList, buttonElement);
    
        inputList.forEach((inputElement) => {
            inputElement.addEventListener("input", function () {
                _checkInputValidity(formElement, inputElement);
                _toggleButtonState(inputList, buttonElement);
            });
        });
    }

    enableValidation () {
        const formList = Array.from(document.querySelectorAll(".popup__container"));
        formList.forEach((formElement) => {
            formElement.addEventListener("submit", function (evt) {
                evt.preventDefault();
            });
    
            _setEventListeners(formElement);
        });
    }
}

// enableValidation();

export {FormValidator};