import { Avatar, IconButton } from "@material-ui/core";
import BlockIcon from "@material-ui/icons/Block";
import clientService from "../../../../clientService/clientService";
import { useTypedSelector } from "../../../../hooky/useTypedSelector";
import { VotingModel } from "../../../../serverService/models/votingModel";
import ServerService from "../../../../serverService/serverService";
import "./PlayerCard.scss";

interface PlayerCardProps {
  avatar: string;
  firstName: string;
  lastName: string;
  jobPosition: string;
  login: string;
}

const PlayerCard = (props: PlayerCardProps) => {
  const currentUserLogin = useTypedSelector((store) => store.userInfo.login);
  const room = useTypedSelector((store) => store.roomInfo);
  const cardOwner = clientService.getUserByLogin(room, props.login);
  const isScrum = cardOwner?.isScrum;
  console.log(isScrum)
  const { avatar, firstName, lastName, jobPosition } = props;
  let letterAvatar;
  if (avatar === undefined || avatar === "") {
    letterAvatar = firstName[0];
    if (lastName !== undefined && lastName !== "") {
      letterAvatar += lastName[0];
    }
  }
  
  const onKickBtnClick = () => {
    const kickVoting: VotingModel = {
      whoKick: props.login,
      amountAgree: 0,
      isVoiting: false,
      message: "kick",
      whoOffer: currentUserLogin,
    };
    ServerService.kickPlayer(kickVoting);
  };

  const createBtn = () => {
    if (isScrum) {
      return <div style={{ width: "10px", height: "40px" }}></div>;
    } else {
      return (
        <IconButton>
          <BlockIcon onClick={onKickBtnClick} />
        </IconButton>
      );
    }
  }

  
  const btn = createBtn();

  return (
    <div className="PlayerCard">
      <Avatar className="PlayerCard_avatar" src={avatar}>
        {letterAvatar}
      </Avatar>
      <div className="PlayerCard_info">
        <div className="PlayerCard_info__name">
          {firstName} {lastName}
        </div>
        <div className="PlayerCard_info__position">{jobPosition}</div>
      </div>
      {btn}
    </div>
  );
};

export default PlayerCard;
