import {Time} from './data/game-data';

export const getRadius = (radius, time) => {
  const strokeDasharray = Math.floor(2 * Math.PI * radius);
  const strokeDashoffset = strokeDasharray - Math.floor((time / Time.MAX) * strokeDasharray);

  return {strokeDasharray, strokeDashoffset};
};
