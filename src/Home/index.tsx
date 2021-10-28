import React from 'react';
import {
    Link
  } from "react-router-dom";
import Cell from '../Maze/Cell';
import "../Maze/styles.css";

export default function Home() {
    return(
        <div>
            <header><h1>Choose you character</h1></header>
        <div className="container">
            <Link className="item" to={`game/${Cell.Character1}`}>
                <div className="cell agile stand"></div>
            </Link>
            <Link className="item" to={`game/${Cell.Character2}`}>
                <div className="cell wise stand"></div>
            </Link>
            <Link className="item" to={`game/${Cell.Character3}`}>
                <div className="cell strong stand"></div>
            </Link>
        </div>
      </div>
    );
}
