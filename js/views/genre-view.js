import {playerGenre} from '../screens/player';
import AbstractView from '../views/abstract-view';
import string from '../data/string-data';

export default class GenreView extends AbstractView {
  constructor(questions) {
    super();
    this.questions = questions;
  }

  get template() {
    return `
    <section class="game game--genre">
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

  bind() {
    const form = this.element.querySelector(`.game__tracks`);
    const answers = Array.from(form.querySelectorAll(`input`));
    const answerButton = form.querySelector(`.game__submit`);
    answerButton.disabled = true;

    const answersChangeHandler = () => {
      if (answers.some((element) => element.checked)) {
        answerButton.disabled = false;
      } else {
        answerButton.disabled = true;
      }
    };

    answers.forEach((item) => {
      item.addEventListener(`change`, answersChangeHandler);
    });

    answerButton.addEventListener(`click`, () => {
      const checkedAnswer = answers.filter((input) => input.checked).map((element) => element.id);
      this.answerButtonClickHandler(checkedAnswer);
    });

    const players = Array.from(this.element.querySelectorAll(`div.track`));
    const playerButtons = players.map((element) => element.querySelector(`.track__button`));
    const audio = Array.from(this.element.querySelectorAll(`audio`));

    const playAudio = (evt) => {
      if (audio.paused) {
        evt.target.classList.replace(`track__button--play`, `track__button--pause`);
        audio.play();
      } else {
        evt.target.classList.replace(`track__button--pause`, `track__button--play`);
        audio.pause();
      }
    };

    playerButtons.forEach((item) => {
      item.addEventListener(`click`, playAudio);
    });

  }
}


