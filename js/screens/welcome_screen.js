import {getFragmentFromString} from '../render';
import string from '../data/string_data';
import {initialState} from '../data/game_data';
import {changeScreen} from './change_screen';

export default () => {
  const content = `
<section class="welcome">
<div class="welcome__logo"><img src="img/melody-logo.png" alt="${string.header.logo}" width="186" height="83"></div>
<button class="welcome__button"><span class="visually-hidden">${string.buttons.play}</span></button>
<h2 class="welcome__rules-title">${string.welcome.title}</h2>
<p class="welcome__text">${string.welcome.rulesTitle}</p>
<ul class="welcome__rules-list">
  <li>${string.welcome.ruleOne}</li>
  <li>${string.welcome.ruleTwo}</li>
</ul>
<p class="welcome__text">${string.welcome.welcomText}</p>
</section>
`;

  const welcomeScreen = getFragmentFromString(content);
  const playButton = welcomeScreen.querySelector(`.welcome__button`);

  const playButtonClickHandler = () => {
    changeScreen(initialState);
  };

  playButton.addEventListener(`click`, playButtonClickHandler);

  return welcomeScreen;
};
