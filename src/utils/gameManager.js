// TODO: Improve scoring system
export const getScore = (distance, time) => {
  const score =
    (5000000 - distance) / 1000 > 0
      ? Math.round((5000000 - distance) / 1000)
      : 0;

  return score;
};
