import {showScreen} from '../render';
import welcomeScreen from './welcome_screen';
import {initialState} from '../data/game_data';
import FailView from '../views/fail_view';

export default (state) => {
  const screen = new FailView(state);

  screen.replayButtonClickHandler = () => {
    showScreen(welcomeScreen(initialState));
  };

  return screen.element;
};

