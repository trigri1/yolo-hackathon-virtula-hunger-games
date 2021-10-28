import './style.css';
import React, { useEffect, useState } from 'react';
import Maze from './Maze';
import charactersConfig from './character/config';
import { getCharacterMapState, init } from './character';
import { MazeBuilder } from './Maze/mazeGenerator';

let gameEnded = false;
let winner;
let selectedChar;

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
  { number: 4, status: 0, name: 'strong', index: 0 },
  { number: 5, status: 0, name: 'agile', index: 1 },
  { number: 6, status: 0, name: 'wise', index: 2 },
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
  gameEnded = true;
}

function killCharacter(character: any) {
  console.log(`killing ${character.name}`);
  characters[character.index].status = -1;
}

function updateMapState(characterMapState: any, character: any, map: any) {
  const initialMap = map;
  const characterNumbers = characters.map(({ number }: any) => number);
  const enemyNumber = 3;
  const treasureNumber = 2;
  characterMapState.forEach((row: any, i: number) => {
    row.forEach((_: any, j: number) => {
      if (characterMapState[i][j] === character.number && map[i][j] !== character.number) {
        if (characterNumbers.includes(initialMap[i][j])) {
          // characters fight
          const characterConfig = (charactersConfig as any)[character.name];
          const enemyCharacter = characters.find(
            (char: any) => char.number === initialMap[i][j]
          );
          console.log(`${character.name} and ${(enemyCharacter as any).name} fight [${i}][${j}]`)
          const enemyCharacterConfig = (charactersConfig as any)[
            (enemyCharacter as any).name
          ];
          const result = encounterResult(
            characterConfig.power,
            enemyCharacterConfig.power
          );
          console.log(`result ${result}`);
          if (result === 0) {
            initialMap[i][j] = character.number;
            killCharacter(enemyCharacter);
          } else {
            killCharacter(character);
          }
        } else if (initialMap[i][j] === enemyNumber) {
          // character fight enemy
          console.log(`${character.name} and enemy fight [${i}][${j}]`)
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
      }
    });
  });
  return initialMap;
}

function setGameState() {
  winner = characters.find((char) => char.status === 1);
  const charsLeft = characters.filter((char) => char.status !== -1);
  if (charsLeft.length === 1 && !winner) {
    console.log(`one char left - ${char.name}`);
    winner = charsLeft[0];
  }
}

function getMapState(map: any) {
  let finalMap = map;
  characters.forEach((char: any) => {
    console.log(char);
    if (char.status === 0) {
      let state = getCharacterMapState({ type: char.name, map });
      console.log(`${char.name} state`, state);
      finalMap = updateMapState(state, char, finalMap);
      console.log(`map after update`, finalMap);
    }
  });
  console.log(`map after all characters`, finalMap);
  return finalMap;
}

const Game = () => {
  const [map, setMap] = useState(null);
  useEffect(() => {
    const builder = new MazeBuilder(8, 8);
    const initialMap = builder.maze;
    console.log("initialMap", initialMap);
    setMap(initialMap as any);
    init({ map: initialMap });
    const interval = setInterval(() => {
      setMap(getMapState(map || initialMap) as any);
      setGameState();
      if (gameEnded) {
        console.log(`game ended}`)
        clearInterval(interval)
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  return <div>{map ? <Maze map={map} /> : null}</div>;
};

export default Game;
