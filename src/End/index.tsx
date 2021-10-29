import React from 'react';
import '../Maze/styles.css';
import './styles.css';

type Props = {
  wonCharacter: string;
  won: boolean;
};

export const EndScreen = ({ wonCharacter, won }: Props) => {
  return (
    <div className="modal">
      <div className="text won">
        The winner is <span className={`cell ${wonCharacter} stand`}></span>
      </div>
      <div className="text result">{won ? 'YOU WON !!!' : 'YOU LOST.. :('}</div>
    </div>
  );
};
