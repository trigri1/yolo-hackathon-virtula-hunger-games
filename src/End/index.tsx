import React from "react";
import "../Maze/styles.css";
import useRouter from "../utils/hooks/useRouter";
import "./styles.css";

type Props = {
  wonCharacter: string;
  won: boolean;
  betValue: number;
};

export const EndScreen = ({ wonCharacter, won }: Props) => {
  const router = useRouter();
  const betValue = +(router.query as any)?.bet || 3;
  return (
    <div className="modal">
      <div className="text won">
        The winner is <span className={`cell ${wonCharacter} winner`}></span>
      </div>
      <div className="text result">
        {won ? `YOU WON ${betValue * 3} mBTC!!!` : "YOU LOST.. :("}
      </div>
    </div>
  );
};
