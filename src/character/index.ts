import CHARACTER_CONFIG from "./config";
import PF, { DiagonalMovement } from "pathfinding";
import canCharacterMoveToPosition from "./CharacterBehaviour";
import Cell from "../Maze/cell";
import getRandomInRange from "../utils/getRandomInRange";

const characters = {
  strong: {
    currentTurn: 0,
    position: [0, 0],
    visitedCells: {},
    vision: null,
  },
  agile: {
    currentTurn: 0,
    position: [0, 0],
    visitedCells: {},
    vision: null,
  },
  wise: {
    currentTurn: 0,
    position: [0, 0],
    visitedCells: {},
    vision: null,
  },
} as any;

const getCurrentVision = ({ map, char }: any) => {
  const { position, vision } = char;
  const newVision: any[][] = [];
  map.forEach((row: any, yIndex: number) => {
    row.forEach((cell: number, xIndex: number) => {
      if (!newVision[yIndex]) {
        newVision[yIndex] = [];
      }
      if (vision && vision[yIndex][xIndex] !== -1) {
        newVision[yIndex][xIndex] = cell;
        return;
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

const isCellNear = ({ point1, point2 }: any) => {
  const horDistance = Math.abs(point1[0] - point2[0]);
  const vertDistance = Math.abs(point1[1] - point2[1]);
  return horDistance <= 1 && vertDistance <= 1;
};

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
  type: "strong" | "agile" | "wise";
  map: any;
};

const getPossibleCells = ({ type }: any) => {
  const { numberOnMap } = CHARACTER_CONFIG[type];
  const { vision, visitedCells, position } = characters[type];
  const cells: any[] = [];
  const nearestCells: any[] = [];
  let treasureCell = null;
  vision.forEach((row: any, yIndex: number) => {
    row.forEach((cell: number, xIndex: number) => {
      if (cell === Cell.Treasure) {
        treasureCell = [xIndex, yIndex];
      }
      if (cell === -1) {
        return;
      }
      if (cell === Cell.Obstacle) {
        return;
      }
      if (cell === numberOnMap) {
        return;
      }
      const address = `${xIndex}-${yIndex}`;
      if (visitedCells[address]) {
        return;
      }
      const isNear = isCellNear({
        point1: position,
        point2: [xIndex, yIndex],
      });
      if (isNear) {
        nearestCells.push([xIndex, yIndex]);
        return;
      }
      cells.push([xIndex, yIndex]);
    });
  });
  if (treasureCell) {
    return [treasureCell];
  }
  if (nearestCells.length) {
    return nearestCells;
  }
  return cells;
};

const getRandomCell = ({ possibleCells }: any) => {
  const i = getRandomInRange(0, possibleCells.length - 1);
  return possibleCells[i];
};

const getNextCell = ({ type, map }: any) => {
  const possibleCells = getPossibleCells({ type });
  let cell = getRandomCell({ possibleCells });
  const char = characters[type];
  console.log({ char, possibleCells, cell });
  while (!canCharacterMoveToPosition(type, cell, map)) {
    cell = getRandomCell({ possibleCells });
  }
  return cell;
};

const getNextCellToMove = ({ nextCell, type, map }: any) => {
  const mapForPathFinding = map.reduce((acc: any, current: any) => {
    acc.push(
      current.map((cell: number) => {
        return cell !== Cell.Obstacle ? 0 : 1;
      })
    );
    return acc;
  }, []);
  const grid = new PF.Grid(mapForPathFinding);
  const { allowDiagonal } = CHARACTER_CONFIG[type];
  const { position } = characters[type];
  const finder = new PF.AStarFinder({
    diagonalMovement: allowDiagonal
      ? DiagonalMovement.Always
      : DiagonalMovement.Never,
  });
  const path = finder.findPath(
    position[0],
    position[1],
    nextCell[0],
    nextCell[1],
    grid
  );
  return path[1];
};

export const getCharacterMapState = ({ type, map }: Args) => {
  const char = characters[type];
  const { numberOnMap } = CHARACTER_CONFIG[type];
  const { visitedCells, position, currentTurn } = char;
  char.currentTurn++;

  if (type === "strong" && currentTurn % 2 === 0) {
    return char.vision;
  }

  char.vision = getCurrentVision({ map, char });
  const nextCellPosition = getNextCell({ type, map });
  const nextCellToMove = getNextCellToMove({
    nextCell: nextCellPosition,
    type,
    map,
  });
  const [x, y] = nextCellToMove;
  char.vision[y][x] = numberOnMap;
  char.vision[position[1]][position[0]] = 0;
  char.position = [x, y];
  visitedCells[`${x}-${y}`] = true;
  return char.vision;
};
