import {initialState} from '../data/game-data';
import {showScreen} from '../render';
import WelcomeView from '../views/welcome-view';
import screenGame from "../screens/screen-game";

export default (state) => {
  const screen = new WelcomeView(state);

  screen.playButtonClickHandler = () => {
    showScreen(screenGame(initialState));
  };

  return screen.element;
};

