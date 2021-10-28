import React, { useState } from "react";
import "./styles.css";
import classnames from "classnames";
import PF, { DiagonalMovement } from "pathfinding";

const Grid = ({ map, players }: any) => {
  const grid = new PF.Grid(map);
  const [target, setTarget] = useState<any>(null);
  const finder = new PF.AStarFinder({
    diagonalMovement: DiagonalMovement.Always,
  });
  const path = target
    ? finder.findPath(playerPos.x, playerPos.y, target.x, target.y, grid)
    : null;
  const pathStr = path?.map((point: any) => point.join(",")).join("---") || "";
  return (
    <>
      <div>Target: {target ? `${target.x};${target.y}` : "Empty"}</div>
      <div className="board">
        {map.map((row: any, index: number) => {
          return (
            <div key={`row-${index}`} className="row">
              {row.map((cell: any, index2: number) => {
                const isPlayer =
                  index === playerPos.y && index2 === playerPos.x;
                const isObstacle = !isPlayer && cell === 1;
                const isPath = pathStr.includes(`${index2},${index}`);
                return (
                  <div
                    onClick={() => {
                      if (isObstacle || isPlayer) {
                        return;
                      }
                      setTarget({
                        x: index2,
                        y: index,
                      });
                    }}
                    key={`cell-${index}-${index2}`}
                    className={classnames({
                      cell: true,
                      obstacle: isObstacle,
                      player: isPlayer,
                      path: isPath,
                    })}
                  >
                    {isPlayer && "P"}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Grid;
