
import header from '../screens/header';
import {playerArtist} from '../screens/player';
import AbstractView from '../views/abstract_view';

export default class ArtistView extends AbstractView {

  constructor(state) {
    super();
    this.state = state;
    this.questions = state.questions[state.level];
  }

  get template() {
    return `
    <section class="game game--artist">
    ${header(this.state)}
        <section class="game__screen">
          <h2 class="game__title">${this.questions.question}</h2>
          ${playerArtist(this.questions.src)}
          <form class="game__artist">
          ${[...Object.entries(this.questions.answers)].map(([value, answer], i) => {
    return `<div class="artist">
            <input class="artist__input visually-hidden" type="radio" name="answer" value="${value}" id="answer-${i + 1}">
            <label class="artist__name" for="answer-${i + 1}">
              <img class="artist__picture" src="${answer.song.image}" alt="${answer.song.name}">
              ${answer.song.name}
            </label>
          </div>`;
  }
  ).join(``)}
          </form>
        </section>
      </section>`;
  }

  answerButtonClickHandler() {}

  replayButtonClickHandler() {}

  bind() {
    const form = this.element.querySelector(`.game__artist`);
    const answerButton = Array.from(form.querySelectorAll(`.artist__input`));

    answerButton.forEach((item) => {
      item.addEventListener(`click`, this.answerButtonClickHandler);
    });

    const answerNode = form.elements[`answer`];

    this.element.querySelector(`.game__back`).addEventListener(`click`, this.replayButtonClickHandler);

    const playerButton = this.element.querySelector(`div.game__track`).querySelector(`button`);

    playerButton.addEventListener(`click`, this.playAudio);
  }

}
