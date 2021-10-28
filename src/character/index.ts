import CHARACTER_CONFIG from "./config";
import PF, { DiagonalMovement } from "pathfinding";

const characters = {
  strong: {
    position: [0, 0],
    vision: null,
  },
  agile: {
    position: [0, 0],
    vision: null,
  },
  wise: {
    position: [0, 0],
    vision: null,
  },
} as any;

// let map = [
//   [0, 0, 0, 1, 0, 0, 0, 0],
//   [1, 4, 0, 0, 1, 0, 1, 0],
//   [0, 0, 1, 0, 0, 1, 6, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 1, 0, 0, 0, 0, 0],
//   [0, 0, 0, 5, 0, 1, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 1, 0, 0, 0, 1, 0, 0],
// ];
// let vision = [
//   [0, 0, 0, -1, -1, -1, -1, -1],
//   [1, 4, 0, -1, -1, -1, -1, -1],
//   [0, 0, 1, -1, -1, -1, -1, -1],
//   [-1, -1, -1, -1, -1, -1, -1, -1],
//   [0, 0, 1, 0, 0, 0, 0, 0],
//   [0, 0, 0, 5, 0, 1, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 1, 0, 0, 0, 1, 0, 0],
// ];

const getCurrentVision = ({ map, char }) => {
  const { position, vision } = char;
  const newVision = [];
  map.forEach((row: any, yIndex: number) => {
    row.forEach((cell: number, xIndex: number) => {
      const currentVisionOfCell = vision[yIndex][xIndex];
      if (currentVisionOfCell !== -1) {
        newVision[yIndex][xIndex] = currentVisionOfCell;
        return;
      }
      if (
        Math.abs(position[0] - xIndex) > 1 ||
        Math.abs(position[1] - yIndex)
      ) {
        newVision[yIndex][xIndex] = -1;
        return;
      }
      newVision[yIndex][xIndex] = cell;
    });
  });
};

const CHARACTER_NUMBER_TO_TYPE = Object.keys(CHARACTER_CONFIG).reduce(
  (acc, current) => {
    const config = CHARACTER_CONFIG[current];
    acc[config.numberOnMap] = current;
  },
  {} as any
);

const init = ({ map }) => {
  map.forEach((row: any, yIndex: number) => {
    row.forEach((cell: number, xIndex: number) => {
      const characterType = CHARACTER_NUMBER_TO_TYPE[cell];
      if (characterType) {
        const char = characters[characterType];
        char.position = [xIndex, yIndex];
        char.vision = getCurrentVision({ map, char });
      }
    });
  });
};

type Args = {
  type: string;
  map: any;
};

const getCharacterMapState = ({ type, map }: Args) => {
  const grid = new PF.Grid(map);
  const playerConfig = CHARACTER_CONFIG[type];
  // const { position, vision } = characters[type];
  const { vision } = characters[type];
  // const finder = new PF.AStarFinder({
  //   diagonalMovement: playerConfig.allowDiagonal
  //     ? DiagonalMovement.Always
  //     : DiagonalMovement.Never,
  // });
  return vision;
};

const charactersHandler = {
  getCharacterMapState,
  init,
};

export default charactersHandler;
