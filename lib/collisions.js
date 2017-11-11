export const checkBombLaserCollision = (laser, bomb) => {


  const startInHitbox = checkPosInHitbox(laser.startPos, bomb.hitbox());
  const endInHitbox = checkPosInHitbox(laser.endPos, bomb.hitbox());

  return (startInHitbox || endInHitbox);

};

export const checkCityBombCollision = (city, bomb) => {
  const bombHitbox = bomb.hitbox();
  const bombTopLeft = bombHitbox[0];
  const bombBottomRight = bombHitbox[1];
  const bombTopRight = [bombBottomRight[0], bombTopLeft[1]];
  const bombBottomLeft = [bombTopLeft[0],bombBottomRight[1]];

  const topLeftInHitbox = checkPosInHitbox(bombTopLeft, city.hitbox());
  const bottomRightInHitBox = checkPosInHitbox(bombBottomRight, city.hitbox());
  const topRightInHitbox = checkPosInHitbox(bombTopRight, city.hitbox());
  const bottomLeftInHitbox = checkPosInHitbox(bombBottomLeft, city.hitbox());

  return (topLeftInHitbox || bottomRightInHitBox || topRightInHitbox || bottomLeftInHitbox);

};

const checkPosInHitbox = (pos, hitbox) => {
  const topLeft = hitbox[0];
  const bottomRight = hitbox[1];
  const x = pos[0];
  const y = pos[1];
  let inBox = false;

  if (x >= topLeft[0] && x <= bottomRight[0]
    && y >= topLeft[1] && y <= bottomRight[1]) {
      inBox = true;
  }

  return inBox;
};
