import { useState } from "react";
import { useTypedSelector } from "../../../../hooky/useTypedSelector";
import GameCard from "../../../GameCard/GameCard";
import CardEditable from "../CardEditable/CardEditable";
import CardCreator from "./CardCreator/CardCreator";
import "./CardSettings.scss";

const CardSettings = () => {
  const settings = useTypedSelector((store) => store.settings);
  const [Cards, setCards] = useState([
    { value: 13 },
    { value: 10 },
    { value: 1 },
  ]);
  console.log(settings)
  return (
    <div className="CardSettings">
      <div className="CardSettings__wrapper">
        <div className="CardSettings__cards">
          {Cards.map((card) => (
            <CardEditable
              value={card.value}
              type={settings.shortScoreType}
              changeValue={(value: any) => (card.value = value)}
            />
          ))}
        </div>
        <div className="CardSettings__add">
          <CardCreator />
        </div>
      </div>
    </div>
  );
};

export default CardSettings;
