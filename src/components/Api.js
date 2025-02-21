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
        return result;
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
        avatar: data.avatar,
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
        return result
      })
      .catch((err) => console.log(err));
  }

  toggleLike(endpoint, cardId, isLiked) {
    const method = isLiked ? "PUT" : "DELETE";
    return fetch(`${this._baseUrl}${endpoint}${cardId}/likes`, {
      method: method,
      headers: this._headers,
      body: JSON.stringify({
        isLiked: isLiked,
      })
    })
      .then(this._handleResponse)
      .then((result) => {
        return result
      })
      .catch((err) => console.log(err));    
  }

  deleteCard (endpoint, cardId) {
    return fetch(`${this._baseUrl}${endpoint}${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    })
      .then(this._handleResponse)
      .catch((err) => console.log(err));
  }
}
