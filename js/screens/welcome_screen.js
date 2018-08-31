import {initialState} from '../data/game_data';
import {showScreen} from '../render';
import WelcomeView from '../views/welcome_view';
import screenGame from "../screens/screen_game";

export default (state) => {
  const screen = new WelcomeView(state);

  screen.playButtonClickHandler = () => {
    showScreen(screenGame(initialState));
  };

  return screen.element;
};

