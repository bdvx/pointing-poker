import "./GameCard.scss";

interface MyProps {
  value: number;
  type: string;
}

const GameCard = (props: MyProps) => {
  const { value, type } = props;
  return (
    <div className="card-container">
      <div className="GameCard">
        <div className="GameCard_front">
          <div className="GameCard_type">{type}</div>
          <div className="GameCard_value">{value}</div>
          <div className="GameCard_type GameCard_type__reverse">{type}</div>
        </div>
        <div className="GameCard_back"></div>
      </div>
    </div>
  );
};

export default GameCard;
