import CHARACTER_CONFIG from './config';
import PF, { DiagonalMovement } from 'pathfinding';
import canCharacterMoveToPosition from './CharacterBehaviour';
import Cell from '../Maze/Cell';

const characters = {
  strong: {
    position: [0, 0],
    visitedCells: {},
    vision: null,
  },
  agile: {
    position: [0, 0],
    visitedCells: {},
    vision: null,
  },
  wise: {
    position: [0, 0],
    visitedCells: {},
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

const getCurrentVision = ({ map, char }: any) => {
  const { position, vision } = char;
  const newVision: any[][] = [];
  map.forEach((row: any, yIndex: number) => {
    row.forEach((cell: number, xIndex: number) => {
      if (vision && vision[yIndex][xIndex] !== -1) {
        newVision[yIndex][xIndex] = vision[yIndex][xIndex];
        return;
      }
      if (!newVision[yIndex]) {
        newVision[yIndex] = [];
      }
      const isNotVisible =
        Math.abs(position[0] - xIndex) > 1 ||
        Math.abs(position[1] - yIndex) > 1;
      if (isNotVisible) {
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

export const init = ({ map }: any) => {
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
  type: 'strong' | 'agile' | 'wise';
  map: any;
};

const getPossibleCells = ({ type }: any) => {
  const { vision, visitedCells } = characters[type];
  const cells: any[] = [];
  vision.forEach((row: any, yIndex: number) => {
    row.forEach((cell: number, xIndex: number) => {
      if (cell === Cell.Obstacle) {
        return;
      }
      const address = `${xIndex}-${yIndex}`;
      if (visitedCells[address]) {
        return;
      }
      cells.push({
        position: [xIndex, yIndex],
      });
    });
  });
  return cells;
};

const getNextCell = ({ type, map }: any) => {
  const possibleCells = getPossibleCells({ type });
  let i = 0;
  let cell = possibleCells[i];
  while (!canCharacterMoveToPosition(type, cell, map)) {
    if (i >= possibleCells.length - 1) {
      i = 0;
    } else {
      ++i;
    }
    cell = possibleCells[i];
  }
  return cell;
};

export const getCharacterMapState = ({ type, map }: Args) => {
  const grid = new PF.Grid(map);
  const config = CHARACTER_CONFIG[type];
  // const { position, vision } = characters[type];
  const { vision } = characters[type];
  // const nextCellPosition = getNextCell({ type, map });
  // const nextCellToMove = getNextCellToMove({nextCell: nextCellPosition, });
  // const finder = new PF.AStarFinder({
  //   diagonalMovement: playerConfig.allowDiagonal
  //     ? DiagonalMovement.Always
  //     : DiagonalMovement.Never,
  // });
  return vision;
};
