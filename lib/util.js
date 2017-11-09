export const calcDist = (pos1, pos2) => {

  const dist = Math.sqrt(
    Math.pow((pos2[0] - pos1[0]),2) +
    Math.pow((pos2[1] - pos1[1]),2)
  );
  return dist;
};

export const calcPointBetween = (startPos, endPos, length) => {
  const startProportion = (length / calcDist(startPos, endPos));
  const endProportion = (1 - startProportion);

  const posX = (startProportion * startPos[0])
        + (endProportion * endPos[0]);

  const posY = (startProportion * startPos[1])
        + (endProportion * endPos[1]);

  return [posX, posY];            

};
