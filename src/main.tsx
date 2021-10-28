import "./style.css";
import PF from "pathfinding";
import Grid from "./Grid";
import ReactDOM from "react-dom";

let gameEnded = 0;
let winner;

let map = [
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

function getCharacterState(character) {

}

function getMapState() {
  const characters = [
    // statuses: 0 - alive, 1 - won, -1 - dead
    {number: 4, status: 0, name: 'char_1'},
    {number: 5, status: 0, name: 'char_2'},
    {number: 6, status: 0, name: 'char_3'},
  ]
  function setGameState() {
    winner = characters.find(char => char.status === 1);
    if (winner) {
      gameEnded = 1;
    }
  }
  while (gameEnded == 0) {
    // get each character state and combine them into one
    characters.forEach(char => {
      let state = getCharacterState(char.number);
      // state [[-1, -1, 0, 4, ]]
      
    });
    // decide if game is ended or not, if someone died
    setGameState();

    // update each characters map
  }
}

ReactDOM.render(
  <Grid map={map} playerPos={playerPos} />,
  document.getElementById("app")
);
