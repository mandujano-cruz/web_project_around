export default class UserInfo {
  constructor({ nameSelector, jobSelector, photoSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._jobElement = document.querySelector(jobSelector);
    this._photoElement = document.querySelector(photoSelector);
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      about: this._jobElement.textContent,
      avatar: this._photoElement.src
    };
  }

  setUserInfo({ name, about, avatar }) {
    if (name) this._nameElement.textContent = name;
    if (about) this._jobElement.textContent = about;
    if (avatar) this._photoElement.src = avatar;
  }
}