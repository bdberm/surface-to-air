export const calcCannonEndPoint = (xOffset, coords, length) => {

  const slope = (coords[1]) / (coords[0] - xOffset);
  return slope;
};
