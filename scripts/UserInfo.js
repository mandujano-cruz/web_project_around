import { nameInput, jobInput, nameProfile, jobProfile } from "./utils";

class UserInfo {
  constructor ({name, job}) {
    this._name = name;
    this._job = job;
  }

  getUserInfo () {
    nameInput.value=this._name;
    jobInput.value=this._job;
  }

  setUserInfo () {
    // nameInput.textContent=nameInput.value;
    // jobInput.textContent=jobInput.value;

    nameProfile.textContent=this._name;
    jobProfile.textContent=this._job;
  }
}