const CHARACTER_CONFIG: { [key: string]: any } = {
  strong: {
    numberOnMap: 4,
    allowDiagonal: false,
    power: 90,
    avoidance: 0,
  },
  agile: {
    numberOnMap: 5,
    allowDiagonal: true,
    power: 20,
    avoidance: 80,
  },
  wise: {
    numberOnMap: 6,
    allowDiagonal: false,
    power: 50,
    avoidance: 50,
  },
  enemy: {
    numberOnMap: 3,
    allowDiagonal: false,
    power: 30,
    avoidance: 0,
  },
};

export default CHARACTER_CONFIG;
