export const playerGenre = (src) => `
<div class="track">
  <button class="track__button track__button--play" type="button"></button>
  <div class="track__status">
  <audio src="${src}" preload="auto"></audio>
</div>`;

export const playerArtist = (src) => `
<div class="game__track">
  <button class="track__button track__button--play" type="button"></button>
  <audio src="${src}" preload="auto"></audio>
</div>`;

export const playTrack = (tracks) => {
  const audioList = Array.from(tracks.map((item) => item.querySelector(`audio`)));
  const buttonsList = Array.from(tracks.map((item) => item.querySelector(`button`)));

  const stopAll = () => {
    buttonsList.forEach((button, index) => {
      if (button.classList.contains(`track__button--pause`)) {
        stopAudio(index);
      }
    });
  };

  const stopAudio = (index) => {
    buttonsList[index].classList.replace(`track__button--pause`, `track__button--play`);
    audioList[index].pause();
  };

  const playAudio = (index) => {
    buttonsList[index].classList.replace(`track__button--play`, `track__button--pause`);
    audioList[index].play();
  };

  buttonsList[0].classList.replace(`track__button--play`, `track__button--pause`);
  audioList[0].setAttribute(`autoplay`, true);

  const playAudioHandler = (evt, index) => {
    if (evt.target.classList.contains(`track__button--play`)) {
      stopAll();
      playAudio(index);
    } else {
      stopAudio(index);
    }
  };

  buttonsList.forEach((item, index) => {
    item.addEventListener(`click`, (evt) => playAudioHandler(evt, index));
  });
};
