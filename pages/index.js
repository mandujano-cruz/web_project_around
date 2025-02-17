import { 
  initialCards,
  cardList,
  nameInput, 
  jobInput,
  editButton,
  addButton
} from "../utils/constants.js";
import Card from "../components/Card.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";


const section = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card(item, "#card-template", (name, link) => {
      popupWithImage.open(name, link);
    });
    const cardElement = card.generateCard();
    cardList.append(cardElement);
  }
}, ".elements");
section.renderer();


const popupWithImage = new PopupWithImage(".popup_image");


const popupWithFormEdit = new PopupWithForm({
  handleFormSubmit: (data) => {
    userInfo.setUserInfo(data);
    popupWithFormEdit.close();
  }
}, ".popup_edit");


const addCard = new Section({
  items: [],
  renderer: (item) => {
    const card = new Card(item, "#card-template", handleCardClick);
    addCard.addItem(card.generateCard());
  }
}, ".elements");


const popupWithFormAdd = new PopupWithForm({
  handleFormSubmit: (data) => {
    const card = new Card({
      name: data.title, 
      link: data.link
    }, "#card-template", (name, link) => {
      popupWithImage.open(name, link);
    });
    const cardElement = card.generateCard();
    addCard.addItem(cardElement);
    popupWithFormAdd.close();
  }
}, ".popup_add");
popupWithFormEdit.setEventListeners();
popupWithFormAdd.setEventListeners();
popupWithImage.setEventListeners();


const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  jobSelector: ".profile__about-me"
});


editButton.addEventListener("click", () => {
  const userData = userInfo.getUserInfo();
  nameInput.value = userData.name;
  jobInput.value = userData.job;
  popupWithFormEdit.open();
});

addButton.addEventListener("click", () => {

  popupWithFormAdd.open();
})