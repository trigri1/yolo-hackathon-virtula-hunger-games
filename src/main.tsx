import "./style.css";
import ReactDOM from "react-dom";
import React, { useEffect, useState } from "react";
import Maze from "./Maze";
import { MazeBuilder } from "./Maze/mazeGenerator";
import { getCharacterMapState, init } from "./character";

let gameEnded = 0;
let winner;

let initialMap = [
  [0, 0, 0, 1, 0, 0, 0, 0],
  [1, 4, 0, 0, 1, 0, 1, 0],
  [0, 0, 1, 0, 0, 1, 6, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 1, 0, 0, 0, 0, 0],
  [0, 0, 0, 5, 0, 1, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 0, 0, 0, 1, 0, 0],
];

function getMapState() {
  const characters = [
    // statuses: 0 - alive, 1 - won, -1 - dead
    { number: 4, status: 0, name: "char_1" },
    { number: 5, status: 0, name: "char_2" },
    { number: 6, status: 0, name: "char_3" },
  ];
  function setGameState() {
    winner = characters.find((char) => char.status === 1);
    if (winner) {
      gameEnded = 1;
    }
  }
  while (gameEnded == 0) {
    // get each character state and combine them into one
    characters.forEach((char) => {
      // let state = getCharacterMapState(char.number);
      // state [[-1, -1, 0, 4, ]]
    });
    // decide if game is ended or not, if someone died
    setGameState();

    // update each characters map
  }
}

const characters = ["strong", "agile", "wise"];

const App = () => {
  const [map, setMap] = useState(null);
  useEffect(() => {
    // setMap(new MazeBVuilds);
    setMap(initialMap);
    init({ map: initialMap });
    characters.forEach((type) => {
      console.log(
        "vision of",
        type,
        getCharacterMapState({ type, map: initialMap })
      );
    });
    // const builder = new MazeBuilder();
    // console.log("maze", { maze: builder.maze });
  }, []);
  return (
    <div>
      <Maze map={map} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
