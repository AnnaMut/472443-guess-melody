
export const showResults = (statistics, gameResult) => {
  if (gameResult.time <= 0) {
    return `Время вышло! Вы не успели отгадать все мелодии`;
  }
  if (gameResult.notes > 3) {
    return `У вас закончились все попытки. Ничего, повезёт в следующий раз!`;
  }
  const userPoints = gameResult.points;
  const points = statistics.map((item) => item.points);
  points.push(userPoints);
  points.sort((a, b) => b - a);
  const players = points.length;
  const place = points.indexOf(userPoints) + 1;
  const rate = (players - place) / players * 100;

  return `Вы заняли ${place} место из ${players} игроков. Это лучше, чем у ${rate}% игроков`;
};
