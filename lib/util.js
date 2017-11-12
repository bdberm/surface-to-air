export const calcDist = (startPos, endPos) => {

  const dist = Math.sqrt(
    Math.pow((endPos[0] - startPos[0]),2) +
    Math.pow((endPos[1] - startPos[1]),2)
  );
  return dist;
};


export const calcUnitVector = (startPos, endPos) => {
  const vector = [(endPos[0] - startPos[0]), (endPos[1] - startPos[1])];
  const dist = calcDist(startPos, endPos);

  return [vector[0] / dist, vector[1] / dist];
};

export const calcPosDistAway = (startPos, unitVector, dist) => {
  return [
    startPos[0] + (dist * unitVector[0]),
    startPos[1] + (dist * unitVector[1])
  ];
};

export const RandomStartPos = (boardWidth) => (
  [Math.random() * boardWidth , 0]
);

export const RandomEndPos = (boardWidth, boardHeight) => (
  [Math.random() * (boardWidth + 200) - 100 ,boardHeight]
);
