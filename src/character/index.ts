import CHARACTER_CONFIG from "./config";
import PF, { DiagonalMovement } from "pathfinding";
import canCharacterMoveToPosition from "./CharacterBehaviour";

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
      if (vision && vision[yIndex][xIndex] !== -1) {
        newVision[yIndex][xIndex] = vision[yIndex][xIndex];
        return;
      }
      if (!newVision[yIndex]) {
        newVision[yIndex] = [];
      }
      if (
        Math.abs(position[0] - xIndex) > 1 ||
        Math.abs(position[1] - yIndex) > 1
      ) {
        newVision[yIndex][xIndex] = -1;
        return;
      }
      newVision[yIndex][xIndex] = cell;
    });
  });
  return newVision;
};

const CHARACTER_NUMBER_TO_TYPE = Object.keys(CHARACTER_CONFIG).reduce(
  (acc, current) => {
    const config = CHARACTER_CONFIG[current];
    acc[config.numberOnMap] = current;
    return acc;
  },
  {} as any
);

export const init = ({ map }) => {
  map.forEach((row: any, yIndex: number) => {
    row.forEach((cell: number, xIndex: number) => {
      const characterType = CHARACTER_NUMBER_TO_TYPE[cell];
      if (characterType) {
        const char = characters[characterType];
        if (!char) {
          return;
        }
        char.position = [xIndex, yIndex];
        char.vision = getCurrentVision({ map, char });
      }
    });
  });
};

type Args = {
  type: "strong" | "agile" | "wise";
  map: any;
};

const getPossibleCell = () => {};

const getNextCell = ({ type, map }) => {
  const cell = getPossibleCell();
  while (!canCharacterMoveToPosition(type, cell, map)) {
    return;
  }
};

export const getCharacterMapState = ({ type, map }: Args) => {
  const grid = new PF.Grid(map);
  const playerConfig = CHARACTER_CONFIG[type];
  // const { position, vision } = characters[type];
  const { vision } = characters[type];
  // const cell = getNextCell();
  // const finder = new PF.AStarFinder({
  //   diagonalMovement: playerConfig.allowDiagonal
  //     ? DiagonalMovement.Always
  //     : DiagonalMovement.Never,
  // });
  return vision;
};
