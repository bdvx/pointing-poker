import { Avatar, IconButton } from "@material-ui/core";
import BlockIcon from "@material-ui/icons/Block";
import { useTypedSelector } from "../../../../hooky/useTypedSelector";
import { VotingModel } from "../../../../serverService/models/votingModel";
import ServerService from "../../../../serverService/serverService";
import "./PlayerCard.scss";

interface PlayerCardProps {
  avatar: string;
  firstName: string;
  lastName: string;
  jobPosition: string;
  login: string
}

const PlayerCard = (props: PlayerCardProps) => {
  const currentUserLogin = useTypedSelector(store => store.userInfo.login);
  const { avatar, firstName, lastName, jobPosition } = props;
  let letterAvatar;
  if (avatar === undefined || avatar === "") {
    letterAvatar = firstName[0];
    if (lastName !== undefined && lastName !== "") {
      letterAvatar += lastName[0];
    }
  }

  const onKickBtnClick = () => {
    const kickVoting:VotingModel = {
      whoKick: props.login,
      amountAgree: 0,
      isVoiting: false,
      message: "kick",
      whoOffer: currentUserLogin
    }
    ServerService.kickPlayer(kickVoting);
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
        <BlockIcon onClick={onKickBtnClick}/>
      </IconButton>
    </div>
  );
};

export default PlayerCard;
