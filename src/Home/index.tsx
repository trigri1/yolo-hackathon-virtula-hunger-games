import React, { useState } from "react";
import Cell from "../Maze/cell";
import "../Maze/styles.css";
import "./styles.css";
import useRouter from "../utils/hooks/useRouter";

export default function Home() {
  const [character, setCharacter] = useState<Cell>();
  const [bet, setBet] = useState<number>(1);
  const router = useRouter();

  const startGame = () => {
    console.log("startGame", bet);
    if (!bet) {
      return;
    }
    router.push(`/game/${character}?bet=${bet}`);
  };

  if (character) {
    const charClass = `character stand ${getCharacterClass(
      character
    )} character-moving`;

    return (
      <div>
        <header>
          <div className="header-row">
            <div className={charClass}></div>
            <h1>Place your bet</h1>
          </div>
        </header>
        <div className="bet-input-container">
          <input
            onChange={(e: any) => {
              const re = /^[0-9\b]+$/;
              if (e.target.value === "" || re.test(e.target.value)) {
                setBet(e.target.value);
              }
            }}
            onKeyPress={(e: any) => {
              if (e.key !== "Enter") {
                return;
              }
              startGame();
            }}
            value={bet}
          ></input>
          <span> mBTC</span>
        </div>
        <div style={{ textAlign: "center" }}>
          <button disabled={!bet} className="button" onClick={startGame}>
            Start
          </button>
        </div>
        <div
          style={{ marginTop: "10px", fontSize: "24px", textAlign: "center" }}
        >
          You will win: {bet ? bet * 3 : 0} mBTC
          <br />
          (if you are lucky enough)
        </div>
      </div>
    );
  }
  return (
    <div>
      <header>
        <h1>Choose your character</h1>
      </header>
      <div className="character-container">
        <div className="item">
          <div
            className="character strong stand"
            onClick={() => setCharacter(Cell.Character1)}
          >
            <div className="title">Kroom</div>
            <div className="description">
              Kroom -the Destroyer- came to earth from a galaxy far far away in
              search of new worlds. He found and fell for carbon based human
              beings. Treasure is important for Kroom because he soon learned
              the importance of wealth for human beings. And he is learning
              human habits.
            </div>
            <div className="description">Power: 90%</div>
            <div className="description">Conflict: 100%</div>
            <div className="description">
              Movements: Forward, Backwards, Left, Right
            </div>
          </div>
        </div>
        <div className="item">
          <div
            className="character agile stand"
            onClick={() => setCharacter(Cell.Character2)}
          >
            <div className="title">Hu-man</div>
            <div className="description">
              Hu-man -the Genial- always try to avoid conflicts. Some invaders
              destroyed his village, now, his clan needs help to rebuild it
              thats why Hu-man is after the Treasure.
            </div>
            <div className="description">Power: 20%</div>
            <div className="description">Conflict: 20%</div>
            <div className="description">
              Movements: Forward, Backwards, Left, Right, Diagonal
            </div>
          </div>
        </div>
        <div className="item">
          <div
            className="character wise stand"
            onClick={() => setCharacter(Cell.Character3)}
          >
            <div className="title">Jani</div>
            <div className="description">
              Jani is big in size, average, normal human being who always had
              difficulties in making real connection with others. He thinks,
              Treasure can help him find sincere friends.
            </div>
            <div className="description">Power: 50%</div>
            <div className="description">Conflict: 50%</div>
            <div className="description">
              Movements: Forward, Backwards, Left, Right
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const getCharacterClass = (value: Cell) => {
  console.log(value);
  switch (value) {
    case Cell.Character1:
      return "strong";
    case Cell.Character2:
      return "agile";
    case Cell.Character3:
      return "wise";
    default:
      return null;
  }
};
