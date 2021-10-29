import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Cell from '../Maze/Cell';
import '../Maze/styles.css';
import './styles.css';


export default function Home() {
  const [character, setCharacter] = useState<Cell>();

  if (character) {
    return (
      <div>
        <header>
          <h1>Place your bet</h1>
        </header>
        <div>
          <input></input>
          <span> mBTC</span>
        </div>
        <Link className="button" to={`game/${character}`}>
          Start
        </Link>
      </div>
    );
  }
  return (
    <div>
      <header>
        <h1>Choose you character</h1>
      </header>
      <div className="container">
        <div className="item" onClick={() => setCharacter(Cell.Character1)}>

          <div className="character strong stand">
            <div className="title">
              Kroom
          </div>
            <div className="description">
            Kroom -the Destroyer- came to earth from a galaxy far far away in search of new worlds. He found and fell for carbon based human beings.
            Treasure is important for Kroom because he soon learned the importance of wealth for human beings. And he is learning human habits.
            </div>
            <div className="description">
             Power: 90%
            </div>
            <div className="description">
             Conflict: 100%
            </div>
          </div>
        </div>
        <div className="item" onClick={() => setCharacter(Cell.Character2)}>
          <div className="character agile stand">
            <div className="title">
              Hu-man
        </div>
            <div className="description">
              Hu-man is an average, normal person who always had a difficulties in making real connection with others.
              He thinks, Treasure can help him find sincere friends.
            </div>
            <div className="description">
             Power: 50%
            </div>
            <div className="description">
             Conflict: 50%
            </div>
          </div>
        </div>
        <div className="item" onClick={() => setCharacter(Cell.Character3)}>
          <div className="character wise stand">
            <div className="title">
              Jani
        </div>
            <div className="description">
             Jani - the Genial - is big, friendly and sweet viking. He always try to avoid conflict. Some invaders destroyed his village and
             his clan needs help to rebuild it thats why Jani is after the Treasure.
            </div>
            <div className="description">
             Power: 30%
            </div>
            <div className="description">
             Conflict: 20%
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
