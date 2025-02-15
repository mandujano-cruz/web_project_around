class Api {
  constructor (options) {

  }

  getInitialCards () {
    return fetch("https://around-api.es.tripleten-services.com/v1/cards", {
      headers: {
        authorization: "f79f57e0-6adb-472c-835e-8925770b15f2",
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        if(res.ok){
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      });
  }

  getUserInfo () {
    return fetch("https://around-api.es.tripleten-services.com/v1/users/me", {
      headers: {
        authorization: "f79f57e0-6adb-472c-835e-8925770b15f2",
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        if(res.ok){
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      });
  }

  setProfile (name, about) {
    return fetch("https://around-api.es.tripleten-services.com/v1/users/me", {
      method: "PATCH",
      headers: {
        authorization: "f79f57e0-6adb-472c-835e-8925770b15f2",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
      .then(res => {
        if(res.ok){
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      });
  }

  addCard (name, link) {
    return fetch("https://around-api.es.tripleten-services.com/v1/cards", {
      method: "POST",
      headers: {
        authorization: "f79f57e0-6adb-472c-835e-8925770b15f2",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
      .then(res => {
        if(res.ok){
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      });
  }


}

const api = new Api({
  baseUrl: "https://around-api.es.tripleten-services.com/v1",
  headers: {
    authorization: "f79f57e0-6adb-472c-835e-8925770b15f2",
    "Content-Type": "application/json"
  }
});