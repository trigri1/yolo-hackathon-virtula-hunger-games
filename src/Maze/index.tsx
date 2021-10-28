import classnames from "classnames";
import React from "react";
import { Cell, MazeBuilder } from "./mazeGenerator";
import "./styles.css";

const Maze = ({ map }: { map: Cell[][] }) => {
  return (
    <div className="map">
      {map
        ? map.map((row, rowIndex) => {
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
                        cheetah: column === Cell.Character_3,
                        bear: column === Cell.Character_1,
                        wolf: column === Cell.Character_2,
                      })}
                      key={`cell-${columnIndex}`}
                    ></div>
                  );
                })}
              </div>
            );
          })
        : null}
    </div>
  );
};

export default Maze;
