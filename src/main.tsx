import "./style.css";
import PF from "pathfinding";
import Grid from "./Grid";
import ReactDOM from "react-dom";

const map = [
  [0, 0, 0, 1, 0, 0, 0, 0],
  [1, 0, 0, 0, 1, 0, 1, 0],
  [0, 0, 1, 0, 0, 1, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 1, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 1, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
];

const playerPos = {
  x: 1,
  y: 1,
};

ReactDOM.render(
  <Grid map={map} playerPos={playerPos} />,
  document.getElementById("app")
);
