export default class Api {
  constructor (options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _handleResponse(res){
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }

  getInitialCards (endpoint) {
    return fetch(`${this._baseUrl}${endpoint}`, {
      headers: this._headers,
    })
      .then(this._handleResponse)
      .then((result) => {
        return [result];
      })
      .catch((err) => console.log(err));
  }

  getUserInfo (endpoint) {
    return fetch(`${this._baseUrl}${endpoint}`, {
      headers: this._headers,
    })
      .then(this._handleResponse)
      .then((result) => {
        console.log(result);
      })
      .catch((err) => console.log(err));
  }

  setProfile (endpoint, data) {
    return fetch(`${this._baseUrl}${endpoint}`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      })
    })
      .then(this._handleResponse)
      .then((result) => {
        console.log(result);
      })
      .catch((err) => console.log(err));
  }

  addCard (endpoint, data) {
    return fetch(`${this._baseUrl}${endpoint}`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: data.title,
        link: data.link,
      })
    })
      .then(this._handleResponse)
      .then((result) => {
        console.log(result);
      })
      .catch((err) => console.log(err));
  }


}

// const api = new Api({
//   baseUrl: "https://around-api.es.tripleten-services.com/v1/",
//   headers: {
//     authorization: "f79f57e0-6adb-472c-835e-8925770b15f2",
//     "Content-Type": "application/json"
//   }
// });