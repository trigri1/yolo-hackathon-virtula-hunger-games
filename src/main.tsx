import "./style.css";
import ReactDOM from "react-dom";
import React, { useEffect, useState } from "react";
import Maze from "./Maze";
import charactersConfig from "./character/config";
import { getCharacterMapState, init } from "./character";
import { MazeBuilder } from "./Maze/mazeGenerator";

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

const characters = [
  // statuses: 0 - alive, 1 - won, -1 - dead
  { number: 4, status: 0, name: "strong", index: 0 },
  { number: 5, status: 0, name: "agile", index: 1 },
  { number: 6, status: 0, name: "wise", index: 2 },
];

function encounterResult(character: number, enemy: number) {
  let win;
  function won(power: any) {
    const random = Math.random() * 100;
    return random < power;
  }
  for (let i = 0; i < 100; i++) {
    const results = [won(character), won(enemy)];
    if (results[0] && !results[1]) {
      win = 0;
      i = 101;
    } else if (!results[0] && results[1]) {
      win = 1;
      i = 101;
    }
  }
  return win;
}

function finishGame(winner: any) {
  characters[winner.index].status = 1;
  winner = winner.number;
  gameEnded = 1;
}

function killCharacter(character: any) {
  characters[character.index].status = -1;
}

function updateMapState(characterMapState: any, character: any) {
  const characterNumbers = characters.map(({ number }) => number);
  const enemyNumber = 3;
  const treasureNumber = 2;
  characterMapState.forEach((row: any, i: number) => {
    row.forEach((_: any, j: number) => {
      if (characterNumbers.includes(initialMap[i][j])) {
        // characters fight
        const characterConfig = (charactersConfig as any)[character.name];
        const enemyCharacter = characters.find(
          (character) => character.number === initialMap[i][j]
        );
        const enemyCharacterConfig = (charactersConfig as any)[
          (enemyCharacter as any).name
        ];
        const result = encounterResult(
          characterConfig.power,
          enemyCharacterConfig.power
        );
        if (result === 0) {
          initialMap[i][j] = character.number;
          killCharacter(enemyCharacter);
        } else {
          killCharacter(character);
        }
      } else if (initialMap[i][j] === enemyNumber) {
        // character fight enemy
        const characterConfig = (charactersConfig as any)[character.name];
        const enemyConfig = (charactersConfig as any).enemy;
        const result = encounterResult(
          characterConfig.power,
          enemyConfig.power
        );
        if (result === 0) {
          initialMap[i][j] = character.number;
        } else {
          killCharacter(character);
        }
      } else if (initialMap[i][j] === treasureNumber) {
        // character wins
        initialMap[i][j] = character.number;
        finishGame(character);
      }
    });
  });
}

function getMapState() {
  function setGameState() {
    winner = characters.find((char) => char.status === 1);
    const charsLeft = characters.filter((char) => char.status !== -1);
    if (charsLeft.length === 1 && !winner) {
      winner = charsLeft[0];
    }
    if (winner) {
      gameEnded = 1;
    }
  }
  while (gameEnded == 0) {
    // get each character state and combine them into one
    characters.forEach((char) => {
      let state = getCharacterMapState(char.name as any);
      updateMapState(state, char);
    });
    // decide if game is ended or not, if someone died
    setGameState();
  }
}

const App = () => {
  const [map, setMap] = useState(null);
  useEffect(() => {
    // setMap(new MazeBVuilds);
    const builder = new MazeBuilder(10, 10);
    setMap(builder.maze);
    init({ map: builder.maze });
    characters.forEach(({ name }: any) => {
      console.log(
        "vision of",
        name,
        getCharacterMapState({ type: name, map: initialMap })
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
