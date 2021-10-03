import { useState } from "react";
import { useTypedSelector } from "../../../../hooky/useTypedSelector";
import GameCard from "../../../GameCard/GameCard";
import CardEditable from "../CardEditable/CardEditable";
import CardCreator from "./CardCreator/CardCreator";
import "./CardSettings.scss";

export interface CardSettingsProps {
  cards: Array<string>,
}

const CardSettings = (props:CardSettingsProps) => {
  const { cards } = props;
  const settings = useTypedSelector((store) => store.settings);

  return (
    <div className="CardSettings">
      <div className="CardSettings__wrapper">
        <div className="CardSettings__cards">
          {cards.map((card) => (
            <CardEditable
              value={card}
            />
          ))}
        </div>
        <div className="CardSettings__add">
          <CardCreator/>
        </div>
      </div>
    </div>
  );
};

export default CardSettings;
