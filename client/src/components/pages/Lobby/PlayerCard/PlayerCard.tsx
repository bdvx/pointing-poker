import { Avatar, IconButton } from "@material-ui/core";
import BlockIcon from "@material-ui/icons/Block";
import "./PlayerCard.scss";

interface PlayerCardProps {
  avatar: string;
  firstName: string;
  lastName: string;
  jobPosition: string;
}

const PlayerCard = (props: PlayerCardProps) => {
  const { avatar, firstName, lastName, jobPosition } = props;
  let letterAvatar;
  if (avatar === undefined || avatar === "") {
    letterAvatar = firstName[0];
    if (lastName !== undefined && lastName !== "") {
      letterAvatar += lastName[0];
    }
  }

  return (
    <div className="PlayerCard">
      <Avatar className="PlayerCard_avatar" src={avatar}>
        {avatar}
      </Avatar>
      <div className="PlayerCard_info">
        <div className="PlayerCard_info__name">
          {firstName} {lastName}
        </div>
        <div className="PlayerCard_info__position">{jobPosition}</div>
      </div>
      <IconButton>
        <BlockIcon />
      </IconButton>
    </div>
  );
};

export default PlayerCard;
