import { Avatar, IconButton } from "@material-ui/core";
import BlockIcon from "@material-ui/icons/Block";
import "./PlayerCard.scss";

interface MyProps {
  image: string;
  name: string;
  surname: string;
  position: string;
}

const PlayerCard = (props: MyProps) => {
  const { image, name, surname, position } = props;
  let avatar;
  if (image === undefined || image === "") {
    avatar = name[0];
    if (surname !== undefined && surname !== "") {
      avatar += surname[0];
    }
  }

  return (
    <div className="PlayerCard">
      <Avatar className="PlayerCard_avatar" src={image}>
        {avatar}
      </Avatar>
      <div className="PlayerCard_info">
        <div className="PlayerCard_info__name">
          {name} {surname}
        </div>
        <div className="PlayerCard_info__position">{position}</div>
      </div>
      <IconButton>
        <BlockIcon />
      </IconButton>
    </div>
  );
};

export default PlayerCard;
