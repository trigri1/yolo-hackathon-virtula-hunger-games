import React from 'react';
import CHARACTER_CONFIG from '../character/config';
import '../Maze/styles.css';
import './styles.css';

type Props = {
  wonCharacter: number;
  selectedCharacter: number;
};

export const EndScreen = ({ wonCharacter, selectedCharacter }: Props) => {
  const wonCharName = Object.keys(CHARACTER_CONFIG).find(
    (c) => CHARACTER_CONFIG[c].numberOnMap == wonCharacter
  );

  return (
    <div className="modal">
      <div className="text won">
        The winner is <span className={`cell ${wonCharName} stand`}></span>
      </div>
      <div className="text result">
        {wonCharacter == selectedCharacter ? 'YOU WON !!!' : 'YOU LOST.. :('}
      </div>
    </div>
  );
};
