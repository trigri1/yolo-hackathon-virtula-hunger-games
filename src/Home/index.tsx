import React, { useState } from 'react';
import {
    Link
  } from "react-router-dom";
import Cell from '../Maze/Cell';
import "./styles.css";

export default function Home() {
    const [character, setCharacter] = useState<Cell>();

    if(character) {
        return <div>
            <header><h1>Place your bet</h1></header>
            <div>
                <input></input><span> mBTC</span>
            </div>
            <Link className="button" to={`game/${character}`}>
                Start
            </Link>
        </div>
    }
    return(
        <div>
            <header><h1>Choose you character</h1></header>
        <div className="container">
            <div className="item" onClick={() => setCharacter(Cell.Character1)}>
                <div className="cell agile stand">

                <div className="description">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</div>
                </div>
            </div>
            <div className="item" onClick={() => setCharacter(Cell.Character2)}>
                <div className="cell wise stand">
                <div className="description">Lorem Ipsum is simply dummy text of </div>
                </div>
            </div>
            <div className="item" onClick={() => setCharacter(Cell.Character3)}>
                <div className="cell strong stand">
                    <div className="description">Lorem Ipsum is simply dummy text of </div>
                </div>
            </div>
        </div>
      </div>
    );
}
