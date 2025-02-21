import {
  cardList,
  nameInput, 
  jobInput,
  editButton,
  addButton,
  containerPhoto
} from "../utils/constants.js";
import Card from "../components/Card.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";
import Api from "../components/Api.js"

const api = new Api({
  baseUrl: "https://around-api.es.tripleten-services.com/v1/",
  headers: {
    authorization: "f79f57e0-6adb-472c-835e-8925770b15f2",
    "Content-Type": "application/json"
  }
});

api.getInitialCards("cards/")
  .then((items) => {
    const section = new Section({
      items: items.flat(),
      renderer: (item) => {
        const card = new Card(item, "#card-template", (name, link) => {
          popupWithImage.open(name, link);
        }, (evt, _id) => {
          popupWithConfirmation.open();
          popupWithConfirmation.setConfirmDelete(() => {
            evt.target.closest(".card").remove();
            api.deleteCard("cards/", _id);
          });
        }, (_id, isLiked) => {
          api.toggleLike("cards/", _id, !isLiked)
            .then((data) => {
              card._isLiked = data.isLiked;
              card._updateLikeView();
            });
        });
        const cardElement = card.generateCard();
        cardList.append(cardElement);
      }
    }, ".elements");
    section.renderer();
  });

api.getUserInfo("users/me")
  .then((data) => {
    userInfo.setUserInfo({
      name: data.name,
      about: data.about,
      avatar: data.avatar
    });
  });

const popupWithImage = new PopupWithImage(".popup_image");
const popupWithConfirmation = new PopupWithConfirmation(".popup_delete");
const popupWithFormEdit = new PopupWithForm({
  handleFormSubmit: (data) => {
    popupWithFormEdit.renderLoading(true);
    console.log(data);
    api.setProfile("users/me", data)
      .then(() => {
        userInfo.setUserInfo(data);
        popupWithFormEdit.close();
      })
      .finally(() => popupWithFormEdit.renderLoading(false));
  }
}, ".popup_edit");

const popupWithFormAdd = new PopupWithForm({
  handleFormSubmit: (data) => {
    api.addCard("cards/", data)
      .then((items) => {
        const card = new Card(items, "#card-template", (name, link) => {
          popupWithImage.open(name, link);
        },  (evt, _id) => {
          popupWithConfirmation.open();
          popupWithConfirmation.setConfirmDelete(() => {
            evt.target.closest(".card").remove();
            api.deleteCard("cards/", _id);
          })
        }, (_id, isLiked) => {
          api.toggleLike("cards/", _id, !isLiked)
            .then((data) => {
              card._isLiked = data.isLiked;
              card._updateLikeView();
            });
        });
        const cardElement = card.generateCard();
        addCard.addItem(cardElement);
        popupWithFormAdd.close();
      })
  }
}, ".popup_add");

const popupWithFormChangePhoto = new PopupWithForm({
  handleFormSubmit: (data) => {
    popupWithFormChangePhoto.renderLoading(true);
    console.log(data);
    api.setProfile("users/me/avatar", data)
    .then(() => {
      userInfo.setUserInfo(data);
      popupWithFormChangePhoto.close();
    })
    .finally(() => popupWithFormChangePhoto.renderLoading(false));
  }
}, ".popup_photo");

const addCard = new Section({
  items: [],
  renderer: (item) => {
    const card = new Card(item, "#card-template", handleCardClick, handleDeleteCard, handleLikeToggle);
    addCard.addItem(card.generateCard());
  }
}, ".elements");

const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  jobSelector: ".profile__about-me",
  photoSelector: ".profile__image"
});

popupWithFormEdit.setEventListeners();
popupWithFormAdd.setEventListeners();
popupWithImage.setEventListeners();
popupWithConfirmation.setEventListeners();
popupWithFormChangePhoto.setEventListeners();

editButton.addEventListener("click", () => {
  const userData = userInfo.getUserInfo();
  nameInput.value = userData.name;
  jobInput.value = userData.about;
  popupWithFormEdit.open();
});

addButton.addEventListener("click", () => {
  popupWithFormAdd.open();
});

containerPhoto.addEventListener("click", () => {
  popupWithFormChangePhoto.open();
});