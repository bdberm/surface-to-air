export const calcDist = (startPos, endPos) => {

  const dist = Math.sqrt(
    Math.pow((endPos[0] - startPos[0]),2) +
    Math.pow((endPos[1] - startPos[1]),2)
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


export const calcUnitVector = (startPos, endPos) => {
  const vector = [(endPos[0] - startPos[0]), (endPos[1] - startPos[1])];
  const dist = calcDist(startPos, endPos);

  const uv = [vector[0] / dist, vector[1] / dist];
  debugger
  return uv;
};
