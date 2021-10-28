import CHARACTER_CONFIG from "./config";

const isItPossibleToGoHere = (character, nextPosition, map) => {

  const { type } = character;
  const abilities = CHARACTER_CONFIG[type];
  const cell = map[nextPosition.y][nextPosition.x];

  if (cell == 0 || cell == 2) {
    return true;
  } else if (cell == 3 ||cell == 4||cell == 5||cell == 6) {
    return !shouldAvoidMovement(abilities.avoidance)
  }
}

function shouldAvoidMovement(charAvoidance) {
  const avoidanceProb = Math.random() * 100;
  return avoidanceProb < charAvoidance;
}


function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

export default isItPossibleToGoHere;
