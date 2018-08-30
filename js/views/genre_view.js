import header from '../screens/header';
import {playerGenre} from '../screens/player';
import AbstractView from '../views/abstract_view';
import string from '../data/string_data';

export default class GenreView extends AbstractView {

  constructor(state) {
    super();
    this.state = state;
    this.questions = state.questions[state.level];
  }

  get template() {
    return `
    <section class="game game--genre">
    ${header(this.state)}
    <section class="game__screen">
      <h2 class="game__title">${this.questions.question}</h2>
      <form class="game__tracks">
      ${[...Object.entries(this.questions.answers)].map(([id, answer]) =>{
    return `${playerGenre(answer.song.src)}
      <div class="game__answer">
            <input class="game__input visually-hidden" type="checkbox" name="answer" value="answer-1" id="${id}">
            <label class="game__check" for="${id}">Отметить</label>
          </div>
          </div>`
    ;
  }).join(` `)}
        <button class="game__submit button" type="submit">${string.buttons.answerSend}</button>
      </form>
    </section>
  </section>
  `;
  }

  answerButtonClickHandler() {}

  replayButtonClickHandler() {}

  answersChangeHandler() {}

  playAudio() {}

  bind() {
    const answerButton = this.element.querySelector(`.game__submit`);

    answerButton.addEventListener(`click`, this.answerButtonClickHandler);

    this.element.querySelector(`.game__back`).addEventListener(`click`, this.replayButtonClickHandler);

    const answer = Array.from(this.element.querySelectorAll(`input`));

    answer.forEach((item) => {
      item.addEventListener(`change`, this.answersChangeHandler);
    });

    answerButton.disabled = true;
    // const playerButton = this.element.querySelector(`div.game__track`).querySelector(`button`);
    const players = Array.from(this.element.querySelectorAll(`div.track`));
    const playerButtons = players.map((element) => element.querySelector(`button`));
    playerButtons.forEach((item) => {
      item.addEventListener(`click`, this.playAudio);
    });

  }

}


