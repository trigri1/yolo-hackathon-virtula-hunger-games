import classnames from "classnames";
import React, { CSSProperties, useEffect, useState } from 'react';
import { Cell } from './mazeGenerator';
import "./styles.css";

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
      })
    }
  );
  console.log(positions);
  return positions;
}

function getStyle(coords: number[]): CSSProperties {
  return {
    top: `${coords[0] * 50}px`,
    left: `${coords[1] * 50}px`,
  };
}

const Maze = ({ map }: { map: Cell[][] }) => {
  const [charsPositions, setCharPositions] = useState([outOfBoardCords, outOfBoardCords, outOfBoardCords]);

  useEffect(() => {
    console.log('updating coords');
    setCharPositions(useGetCharPositions(map));
  }, [map]);

  return (
    <div className="wrapper">
      <div className="map">
        {
          map.map((row, rowIndex) => {
            return (
              <div className="row" key={`row-${rowIndex}`}>
                {
                  row.map((column, columnIndex) => {
                    return (
                      <div className={classnames({
                        cell: true,
                        wall: column === Cell.Rock,
                        treasure: column === Cell.Treasure,
                        enemy: column === Cell.Enemy,
                      })} key={`cell-${columnIndex}`}>
                      </div>
                    )
                  })
                }
              </div>
            )
          })
        }
      </div>
      <div className="cell wise down" style={getStyle(charsPositions[0])} />
      <div className="cell strong left" style={getStyle(charsPositions[1])} />
      <div className="cell agile up" style={getStyle(charsPositions[2])} />
    </div>
  );
};

export default Maze;
