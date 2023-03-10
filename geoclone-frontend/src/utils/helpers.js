export const getDistanceString = (distance) => {
  let text = "";
  if (distance > 1000) {
    text = Math.round(distance / 1000) + " km";
  } else {
    text = Math.round(distance) + " m";
  }

  return text;
};
