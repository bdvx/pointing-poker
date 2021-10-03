import { IconButton } from "@material-ui/core";
import { AddCircleOutline, PlusOne } from "@material-ui/icons";
import { useState } from "react";
import "./CardCreator.scss";
import { CreateCardPopup } from "./CreateCardPopup/CreateCardPopup";

const CardCreator = () => {
  const [openPopup, setOpenPopup] = useState<boolean>(false);

  return (
    <div className="card-container">
      <div className="GameCard">
        <div className="GameCard_front">
          <div className="GameCard_add">
            <IconButton  onClick={() => setOpenPopup(true)}>
              <AddCircleOutline fontSize="large" />
            </IconButton>
          </div>
        </div>
      </div>
      <CreateCardPopup
        open={openPopup}
        onChangePopupState={setOpenPopup}
      />
    </div>
  );
};

export default CardCreator;
