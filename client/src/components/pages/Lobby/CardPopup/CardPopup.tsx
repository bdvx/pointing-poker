import { Button, DialogActions, TextField } from "@material-ui/core";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addCard } from "../../../../store/settingsSlice";
import { PopUpLinearProgress } from "../../../Base/PopUpLinearProgress/PopUpLinearProgress";
import { CardPopupProps } from "../CardSettings/CardCreator/CreateCardPopup/CreateCardPopup";

export const CardPopup = (props: CardPopupProps) => {
  const { open, onChangePopupState } = props;
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  const [value, setValue] = useState<string>();

  const resetFields = (): void => {
    setValue("");
  };

  const handleCard = (): void => {
    setLoading(true);
    setLoading(false);
    onChangePopupState(false);
    dispatch(addCard(value))
  };

  return (
    <PopUpLinearProgress
      className={`IssuePopup`}
      open={open}
      onClose={() => onChangePopupState(false)}
      loading={loading}
    >
      <form>
        <h3 className="IssuePopup__title">Card</h3>

        <label className="IssuePopup__box">
          <span className="IssuePopup__boxTitle">Value:</span>
          <TextField
            className="IssuePopup__field"
            defaultValue={value}
            onChange={(e) => setValue(e.target.value)}
            name="title"
            variant="outlined"
            size="small"
          />
        </label>

        <DialogActions className="IssuePopup__btns">
          <Button
            onClick={handleCard}
            variant="contained"
            color="primary"
            size="large"
          >
            Confirm
          </Button>
          <Button
            onClick={() => onChangePopupState(false)}
            variant="outlined"
            color="primary"
            size="large"
          >
            Cancel
          </Button>
        </DialogActions>
      </form>
    </PopUpLinearProgress>
  );
};
