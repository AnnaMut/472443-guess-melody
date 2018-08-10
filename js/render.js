const main = document.querySelector(`.app`).querySelector(`.main`);

const getFragmentFromString = (str) => new DOMParser().parseFromString(str, `text/html`).body.firstChild;

const showScreen = (screen) => {
  main.textContent = ``;
  main.appendChild(screen);
};

export {getFragmentFromString, showScreen};
