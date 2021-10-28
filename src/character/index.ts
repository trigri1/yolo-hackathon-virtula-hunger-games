import CHARACTER_CONFIG from "./config";
import PF, { DiagonalMovement } from "pathfinding";

const characters = {
  strong: {
    currentPosition: [0, 0],
    currentVision: null,
  },
  agile: {
    currentPosition: [0, 0],
    currentVision: null,
  },
  wise: {
    currentPosition: [0, 0],
    currentVision: null,
  },
} as any;

const getCurrentVision = ({ map, char }) => {};

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
        char.currentPosition = [xIndex, yIndex];
        char.currentVision = getCurrentVision({ map, char });
      }
    });
  });
};

type Args = {
  type: string;
  map: any;
};

const getNextState = ({ type, map }: Args) => {
  const grid = new PF.Grid(map);
  const playerConfig = CHARACTER_CONFIG[type];
  const { currentPosition } = characters[type];
  const finder = new PF.AStarFinder({
    diagonalMovement: playerConfig.allowDiagonal
      ? DiagonalMovement.Always
      : DiagonalMovement.Never,
  });
  return;
};

const charactersHandler = {
  getNextState,
  init,
};

export default charactersHandler;
