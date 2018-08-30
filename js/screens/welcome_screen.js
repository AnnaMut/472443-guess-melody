
import {initialState} from '../data/game_data';
import {changeScreen} from './change_screen';
import WelcomeView from '../views/welcome_view';

export default (state) => {
  const screen = new WelcomeView(state);

  screen.playButtonClickHandler = () => {
    changeScreen(initialState);
  };

  return screen.element;
};

