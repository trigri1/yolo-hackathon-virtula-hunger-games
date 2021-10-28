
const CHARACTER_TYPES = {
  strong: {
    power: 70,
    avoidance: 15
  },
  agile: {
    power: 50,
    avoidance: 60
  },
  wise: {
    power: 30,
    avoidance: 80
  }
}


const character = {
  type: 'strong',
  currentPosition: {
    x: 1,
    y: 2
  }
}

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

function

export default isItPossibleToGoHere;
