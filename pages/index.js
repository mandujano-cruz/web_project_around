import { 
  initialCards,
  cardList,
  nameInput, 
  jobInput,
  editButton,
  addButton,
  profilePhoto,
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

// api.getInitialCards("cards/").then(data => {
//   data.forEach(item =>  {
//     const cards = item;
//   });
// });
// console.log(cards);

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

// const section = new Section({
//   items: api.getInitialCards("cards/"),
//   renderer: (item) => {
//     const card = new Card(item, "#card-template", (name, link) => {
//       popupWithImage.open(name, link);
//     }, (evt) => {
//       popupWithConfirmation.open();
//       popupWithConfirmation.setConfirmDelete(() => {
//         evt.target.closest(".card").remove();
//       })
//     });
//     const cardElement = card.generateCard();
//     cardList.append(cardElement);
//   }
// }, ".elements");
// section.renderer();


const popupWithImage = new PopupWithImage(".popup_image");

const popupWithConfirmation = new PopupWithConfirmation(".popup_delete");

api.getUserInfo("users/me")
  .then((data) => {
    userInfo.setUserInfo({
      name: data.name,
      about: data.about,
      avatar: data.avatar
    });
  });

const popupWithFormEdit = new PopupWithForm({
  handleFormSubmit: (data) => {
    console.log(data);
    api.setProfile("users/me", data)
      .then(() => {
        userInfo.setUserInfo(data);
        popupWithFormEdit.close();
      });
  }
}, ".popup_edit");


const addCard = new Section({
  items: [],
  renderer: (item) => {
    const card = new Card(item, "#card-template", handleCardClick, handleDeleteCard, handleLikeToggle);
    addCard.addItem(card.generateCard());
  }
}, ".elements");


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
    console.log(data);
    api.setProfile("users/me/avatar", data)
    .then(() => {
      userInfo.setUserInfo(data);
      popupWithFormChangePhoto.close();
    });
  }
}, ".popup_photo");

popupWithFormEdit.setEventListeners();
popupWithFormAdd.setEventListeners();
popupWithImage.setEventListeners();
popupWithConfirmation.setEventListeners();
popupWithFormChangePhoto.setEventListeners();


const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  jobSelector: ".profile__about-me",
  photoSelector: ".profile__image"
});


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