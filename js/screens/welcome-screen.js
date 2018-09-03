import {initialState} from '../data/game-data';
import {showScreen} from '../render';
import WelcomeView from '../views/welcome-view';
import gameScreen from "../screens/game-screen";

export default (state) => {
  const screen = new WelcomeView(state);

  screen.playButtonClickHandler = () => {
    showScreen(gameScreen(initialState));
  };

  return screen.element;
};

