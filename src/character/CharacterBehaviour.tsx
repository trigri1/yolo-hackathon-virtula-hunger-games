import CHARACTER_CONFIG from "./config";

const isItPossibleToGoHere = (character, nextPosition, map) => {
  const { type } = character;  // strong, agile, wise
  const abilities = CHARACTER_TYPES[type];
  const cell = map[nextPosition.y][nextPosition.x];


  if(cell == 0 || cell ==2){
    return true;
  } else if (cell ==3){

  }else if (cell ==3){

  }else if (cell ==3){

  }else if (cell ==3){

  }
}

export default isItPossibleToGoHere;
