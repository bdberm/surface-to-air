export const calcDist = (pos1, pos2) => {
  
  const dist = Math.sqrt(
    Math.pow((pos2[0] - pos1[0]),2) +
    Math.pow((pos2[1] - pos1[1]),2)
  );
  return dist;
};
