import adaptServerData from './data/data-adapter';

const URL = `https://es.dump.academy/guess-melody`;

const APP_ID = 33883388;

const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
};

const toJSON = (res) => res.json();

export default class Loader {
  static loadData() {
    return fetch(`${URL}/questions`)
      .then(checkStatus)
      .then(toJSON)
      .then(adaptServerData);
  }

  static loadResults() {
    return fetch(`${URL}/stats/${APP_ID}`)
      .then(checkStatus)
      .then(toJSON);
  }

  static saveResults(data) {
    const requestSettings = {
      body: JSON.stringify(data),
      headers: {
        'Content-Type': `application/json`
      },
      method: `POST`
    };
    return fetch(`${URL}/stats/${APP_ID}`, requestSettings)
      .then(checkStatus);
  }
}