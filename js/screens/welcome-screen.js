import {initialState} from '../data/game-data';
// import {showScreen} from '../render';
import WelcomeView from '../views/welcome-view';
// import gameScreen from "../screens/game-screen";
import Router from '../router';

export default class WelcomeScreen {
  constructor() {
    this.screen = new WelcomeView(initialState);
    this.bind();
  }

  get element() {
    return this.screen.element;
  }

  bind() {
    this.screen.playButtonClickHandler = () => Router.showGame();
  }
}

