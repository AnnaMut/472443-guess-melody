import {showScreen} from "../render";
import ArtistView from "../views/artist-view";
import GenreView from "../views/genre-view";
import FailView from '../views/fail-view';
import WinView from '../views/win-view';
import Router from '../router';
import header from '../screens/header';
import {getFragmentFromString} from '../render';

const ScreenView = {
  artist: ArtistView,
  genre: GenreView
};

export default class GameScreen {
  constructor(model) {
    this.model = model;
    this.ONE_SECOND = 1000;
    this.screen = new ScreenView[this.model.screenQuestion().type](this.model.state, this.model.screenQuestion());
    this.bind();
  }

  get element() {
    this.startTimer();
    this.updateHeader();
    return this.screen.element;
  }

  showNextGame() {
    this.model.changeLevel();
    showScreen(new GameScreen(this.model).element);
  }

  updateHeader() {
    const headerNode = getFragmentFromString(header(this.model.state));
    this.screen.element.replaceChild(headerNode, this.screen.element.firstElementChild);
  }

  startTimer() {
    this.timer = setTimeout(() => {
      this.model.tick();
      this.startTimer();
    }, this.ONE_SECOND);
  }

  stopTimer() {
    clearTimeout(this.timer);
  }

  bind() {
    this.screen.answerButtonClickHandler = (answer) => {
      this.stopTimer();
      this.model.getAnswers(answer);

      if (this.model.fail()) {
        Router.showResult(new FailView(this.model.state));
      } else if (this.model.win()) {
        Router.showResult(new WinView(this.model.state));
      } else {
        this.showNextGame();
      }
      this.updateHeader();
    };

    this.screen.replayButtonClickHandler = () => {
      Router.showWelcome();
    };

  }
}
