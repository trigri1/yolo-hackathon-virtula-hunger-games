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

const getCurrentVision = ({ map }) => {};

const init = ({ map }) => {
  map.forEach((row: any, index: number) => {
    row.forEach((cell: number, index: number) => {});
  });
  characters.strong.currentPosition = [5, 5];
  characters.strong.currentVision = getCurrentVision({ map });

  characters.agile.currentPosition = [10, 10];
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
