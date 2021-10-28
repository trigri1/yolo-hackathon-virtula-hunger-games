import CHARACTER_CONFIG from "./config";

const canCharacterMoveToPosition = (
  characterType: string,
  position: [number, number],
  map: any
) => {
  const abilities = CHARACTER_CONFIG[characterType];
  const cell = map[position[1]][position[0]];

  if (cell == 0 || cell == 2) {
    return true;
  } else if (cell == 3 || cell == 4 || cell == 5 || cell == 6) {
    return !shouldAvoidMovement(abilities.avoidance);
  } else {
    return true;
  }
};

function shouldAvoidMovement(charAvoidance) {
  const avoidanceProb = Math.random() * 100;
  return avoidanceProb < charAvoidance;
}

export default canCharacterMoveToPosition;
