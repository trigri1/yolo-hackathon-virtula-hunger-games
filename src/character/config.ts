const CHARACTER_CONFIG = {
  strong: {
    numberOnMap: 4,
    allowDiagonal: false,
    power: 70,
    avoidance: 15
  },
  agile: {
    numberOnMap: 5,
    allowDiagonal: true,
    power: 50,
    avoidance: 50
  },
  wise: {
    numberOnMap: 6,
    allowDiagonal: false,
    power: 30,
    avoidance: 80
  },
  enemy: {
    numberOnMap: 3,
    allowDiagonal: false,
    power: 30,
    avoidance: 0
  }
};

export default CHARACTER_CONFIG;
