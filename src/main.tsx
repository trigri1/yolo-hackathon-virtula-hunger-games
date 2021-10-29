import './style.css';
import React, { useEffect, useState } from 'react';
import Maze from './Maze';
import charactersConfig from './character/config';
import { getCharacterMapState, init } from './character';
import { MazeBuilder } from './Maze/mazeGenerator';
import { useParams } from 'react-router-dom';
import { EndScreen } from './End';
import { useNotifications } from './Notifications';

let gameEnded = false;
let winner: any;
let selectedChar;
let counter = 1;

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
  function won(power: any) {
    const random = Math.random() * (character + enemy);
    return random < power;
  }
  return won(character) ? 0 : 1;
}

function finishGame(winner: any) {
  characters[winner.index].status = 1;
  gameEnded = true;
}

function killCharacter(character: any) {
  console.log(`killing ${character.name}`);
  characters[character.index].status = -1;
}

function updateMapState(
  characterMapState: any,
  character: any,
  map: any,
  eventCallback: (description: string) => void //use for displaying notification
) {
  const initialMap = map;
  const characterNumbers = characters.map(({ number }: any) => number);
  const enemyNumber = 3;
  const treasureNumber = 2;
  characterMapState.forEach((row: any, i: number) => {
    row.forEach((_: any, j: number) => {
      if (
        characterMapState[i][j] === character.number &&
        map[i][j] !== character.number &&
        character.status !== -1
      ) {
        console.log(`asd`);
        if (characterNumbers.includes(initialMap[i][j])) {
          // characters fight
          const characterConfig = (charactersConfig as any)[character.name];
          const enemyCharacter = characters.find(
            (char: any) => char.number === initialMap[i][j]
          );
          console.log(
            `${character.name} and ${
              (enemyCharacter as any).name
            } fight [${i}][${j}]`
          );
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
          console.log(`${character.name} and enemy fight [${i}][${j}]`);
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
        } else {
          initialMap[i][j] = characterMapState[i][j];
        }
      } else if (characterMapState[i][j] !== -1) {
        initialMap[i][j] = characterMapState[i][j];
      }
    });
  });
  return initialMap;
}

function setGameState() {
  console.log('updating map');
  winner = characters.find((char) => char.status === 1);
  const charsLeft = characters.filter((char) => char.status !== -1);
  if (charsLeft.length === 1 && !winner) {
    console.log(`one char left - ${charsLeft[0].name}`);
    winner = charsLeft[0];
  }
  if (winner) {
    finishGame(winner);
  }
}

function getMapState(map: any, eventCallback: (description: string) => void) {
  let finalMap = map;
  characters.forEach((char: any) => {
    console.log(char);
    if (char.status === 0) {
      let state = getCharacterMapState({ type: char.name, map });
      console.log(`${char.name} state count ${counter}`, state);
      finalMap = updateMapState(state, char, finalMap, eventCallback);
      console.log(`map after update count ${counter}`, finalMap);
    }
  });
  console.log(`map after all characters`, finalMap);
  return [...finalMap];
}

const Game = () => {
  const [map, setMap] = useState(null);
  const { character } = useParams<any>();
  console.log('OUR CHARACTER', character);
  const [isEnded, setIsEnded] = useState(false);
  const { addNotification, NotificationList, notifications } =
    useNotifications();

  useEffect(() => {
    setTimeout(() => {
      addNotification('Character1 killed monster');
    }, 2000);

    setTimeout(() => {
      addNotification('Character2 killed monster');
    }, 4000);

    setTimeout(() => {
      addNotification('Monster ate Character1');
    }, 4400);

    setTimeout(() => {
      addNotification('Character2 killed Character3');
    }, 5400);

    setTimeout(() => {
      addNotification('Character3 killed Character1');
    }, 7400);

    setTimeout(() => {
      addNotification('Monster ate Character3');
    }, 8400);

    setTimeout(() => {
      addNotification('Character2 killed monster');
    }, 9800);
  }, []);

  useEffect(() => {
    const builder = new MazeBuilder(5, 5);
    const initialMap = builder.maze;
    console.log(`initialMap count ${counter}`, initialMap);
    setMap(initialMap as any);
    init({ map: initialMap });
    const interval = setInterval(() => {
      counter++;
      setMap(getMapState(map || initialMap, addNotification) as any);
      setGameState();
      if (gameEnded) {
        console.log(`game ended winner ${winner.name} number${winner.number}`);
        setIsEnded(true);
        clearInterval(interval);
      }
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      {map ? (
        <>
          {isEnded && (
            <EndScreen
              wonCharacter={winner.name}
              won={parseInt(character) == winner.number}
            />
          )}
          <Maze map={map} notifications={NotificationList} />
        </>
      ) : null}
    </div>
  );
};

export default Game;
