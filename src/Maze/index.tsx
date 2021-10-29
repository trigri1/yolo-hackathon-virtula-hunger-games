import classnames from 'classnames';
import { useAnimation, motion } from 'framer-motion';
import React, { CSSProperties, useEffect, useState } from 'react';
import { Cell } from './mazeGenerator';
import './styles.css';

const outOfBoardCords = [-1, -1];

const useGetCharPositions = (map: Cell[][]): number[][] => {
  const positions = [outOfBoardCords, outOfBoardCords, outOfBoardCords];
  map.every((row, rowIndex) => {
    return row.every((cell, columnIndex) => {
      if (cell === Cell.Character_1) {
        positions[0] = [rowIndex, columnIndex];
      }
      if (cell === Cell.Character_2) {
        positions[1] = [rowIndex, columnIndex];
      }
      if (cell === Cell.Character_3) {
        positions[2] = [rowIndex, columnIndex];
      }
      return !positions.every((cords) => cords !== outOfBoardCords);
    });
  });
  console.log(positions);
  return positions;
};

function getStyle(coords: number[]): CSSProperties {
  return {
    top: `${coords[0] * 50}px`,
    left: `${coords[1] * 50}px`,
  };
}

function getMoveClassname(prev: number[], next: number[]) {
  let className = '';
  if (prev[0] < next[0]) {
    className = 'down';
  }
  if (prev[0] > next[0]) {
    className = 'up';
  }
  if (prev[1] > next[1]) {
    className = 'left';
  }
  if (prev[1] < next[1]) {
    className = 'right';
  }
  return className;
}

function getCharClasses(step: number, charPositions: number[][][]) {
  const prev = charPositions[step - 1];
  const next = charPositions[step];
  return [getMoveClassname(prev[0], next[0]), getMoveClassname(prev[1], next[1]), getMoveClassname(prev[2], next[2])]

}

function getCharAnimations(positions: number[][], charIndex: number) {
  return {
    top: `${positions[charIndex][0] * 50}px`,
    left: `${positions[charIndex][1] * 50}px`,
    transition: { duration: 0.5 }
  };
}

const Maze = ({ map }: { map: Cell[][] }) => {
  const [charsPositions, setCharPositions] = useState<number[][][]>([]);
  const [charClasses, setCharClasses] = useState(['', '', '']);

  const wiseControls = useAnimation();
  const strongControls = useAnimation();
  const agileControls = useAnimation();

  useEffect(() => {
    if (charsPositions.length > 1) {
      const step = charsPositions.length - 1;
      const positions = charsPositions[step];
      setCharClasses(getCharClasses(step, charsPositions));

      strongControls.start(getCharAnimations(positions, 0));
      agileControls.start(getCharAnimations(positions, 1));
      wiseControls.start(getCharAnimations(positions, 2));
    }
  }, [charsPositions]);

  useEffect(() => {
    console.log('updating coords', new Date());
    setCharPositions([...charsPositions, useGetCharPositions(map)]);
  }, [map]);

  return (
    <div className="wrapper">
      <div className="map">
        {map.map((row, rowIndex) => {
          return (
            <div className="row" key={`row-${rowIndex}`}>
              {row.map((column, columnIndex) => {
                return (
                  <div
                    className={classnames({
                      cell: true,
                      wall: column === Cell.Rock,
                      treasure: column === Cell.Treasure,
                      enemy: column === Cell.Enemy,
                    })}
                    key={`cell-${columnIndex}`}
                  />
                );
              })}
            </div>
          );
        })}
      </div>
      {
        charsPositions.length && (
          <>
            <motion.div className={classnames({
              cell: true,
              strong: true,
              [charClasses[0]]: true,
            })} style={getStyle(charsPositions?.[0][0])} animate={strongControls} />
            <motion.div className={classnames({
              cell: true,
              agile: true,
              [charClasses[1]]: true,
            })} style={getStyle(charsPositions?.[0][1])} animate={agileControls} />
            <motion.div className={classnames({
              cell: true,
              wise: true,
              [charClasses[2]]: true,
            })} style={getStyle(charsPositions?.[0][2])} animate={wiseControls} />
          </>
        )
      }
    </div>
  );
};

export default Maze;
