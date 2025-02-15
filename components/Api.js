class Api {
  constructor (options) {

  }

  getInitialCards () {
    return fetch("https://around-api.es.tripleten-services.com/v1/cards", {
      headers: {
        authorization: "f79f57e0-6adb-472c-835e-8925770b15f2"
      }
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
    "Content-Type": "aplication/json"
  }
});