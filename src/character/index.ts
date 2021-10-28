import CHARACTER_CONFIG from './config';
import PF, { DiagonalMovement } from 'pathfinding';
import canCharacterMoveToPosition from './CharacterBehaviour';
import Cell from '../Maze/Cell';
import getRandomInRange from '../utils/getRandomInRange';

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

const isCloseCell = ({ position, cell }: any) => {
  const [x, y] = position;
  const [x1, y1] = cell;
  return Math.abs(x - x1) <= 1 && Math.abs(y - y1) <= 1;
};

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
      if (cell === -1) {
        return;
      }
      if (cell === Cell.Obstacle) {
        return;
      }
      const address = `${xIndex}-${yIndex}`;
      if (visitedCells[address]) {
        return;
      }
      cells.push([xIndex, yIndex]);
    });
  });
  return cells;
};

const getRandomCell = ({ possibleCells }: any) => {
  const i = getRandomInRange(0, possibleCells.length - 1);
  return possibleCells[i];
};

const getNextCell = ({ type, map }: any) => {
  const possibleCells = getPossibleCells({ type });
  let cell = getRandomCell({ possibleCells });
  while (!canCharacterMoveToPosition(type, cell, map)) {
    cell = getRandomCell({ possibleCells });
  }
  return cell;
};

const getNextCellToMove = ({ nextCell, type, map }: any) => {
  const grid = new PF.Grid(map);
  const { allowDiagonal } = CHARACTER_CONFIG[type];
  const { position } = characters[type];
  const finder = new PF.AStarFinder({
    diagonalMovement: allowDiagonal
      ? DiagonalMovement.Always
      : DiagonalMovement.Never,
  });
  // const mapForPathFinding = map.reduce((acc, current) => {
  //   acc.push(
  //     current.map((el: number) => {
  //       return el === 0 ? el : 1;
  //     }, [])
  //   );
  //   return acc;
  // }, []);
  // console.log({ position, nextCell, map });
  const path = finder.findPath(
    position[0],
    position[1],
    nextCell[0],
    nextCell[1],
    grid
  );
  console.log({ path });
  return path[0];
};

export const getCharacterMapState = ({ type, map }: Args) => {
  const { numberOnMap } = CHARACTER_CONFIG[type];
  // const { position, vision } = characters[type];
  const { vision, visitedCells } = characters[type];
  const nextCellPosition = getNextCell({ type, map });
  const nextCellToMove = getNextCellToMove({
    nextCell: nextCellPosition,
    type,
    map,
  });
  const [x, y] = nextCellToMove;
  vision[y][x] = numberOnMap;
  visitedCells[`${x}-${y}`] = true;
  // const finder = new PF.AStarFinder({
  //   diagonalMovement: playerConfig.allowDiagonal
  //     ? DiagonalMovement.Always
  //     : DiagonalMovement.Never,
  // });
  return vision;
};
