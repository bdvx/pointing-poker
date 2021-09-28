import './UpdateIssuePopup.scss';
import { FC, useState } from 'react';
import { Button, DialogActions, FormControl, MenuItem, Select, TextField } from '@material-ui/core';
import { PopUpLinearProgress } from '../Base/PopUpLinearProgress/PopUpLinearProgress';
import { TIssuePriority } from '../../types/IssuePriority.type';
import IUpdateIssuePopupProps from '../../types/UpdateIssuePopupProps.type';
import ServerService from '../../serverService/serverService';

export const UpdateIssuePopup: FC<IUpdateIssuePopupProps> = (props: IUpdateIssuePopupProps) => {
  const { open, onChangePopupState, issue } = props;
  const [loading, setLoading] = useState<boolean>(false);

  const [title, setTitle] = useState<string>(issue.title);
  const [link, setLink] = useState<string>(issue.link);
  const [priority, setPriority] = useState<TIssuePriority>(issue.priority as TIssuePriority);

  const updateIssue = (): void => {
    setLoading(true);

    ServerService.updateIssue({ ...issue, title, priority, link })

    setLoading(false);
    onChangePopupState(false);
  };

  return (
    <PopUpLinearProgress className="CreateIssuePopup UpdateIssuePopup" open={ open } onClose={ () => onChangePopupState(false) } loading={ loading }>
      <form>
        <h3 className="CreateIssuePopup__title">Create Issue</h3>

        <label className="CreateIssuePopup__box">
          <span className="CreateIssuePopup__boxTitle">Title:</span>
          <TextField
            className="CreateIssuePopup__field"
            defaultValue={ title }
            onChange={ (e) => setTitle(e.target.value) }
            name="title"
            variant="outlined"
            size="small"
          />
        </label>

        <label className="CreateIssuePopup__box">
          <span className="CreateIssuePopup__boxTitle">Link:</span>
          <TextField
            className="CreateIssuePopup__field"
            defaultValue={ link }
            onChange={ (e) => setLink(e.target.value) }
            name="link"
            variant="outlined"
            size="small"
          />
        </label>

        <label className="CreateIssuePopup__box">
          <span className="CreateIssuePopup__boxTitle">Priority:</span>

          <FormControl>
            <Select className="CreateIssuePopup__select" value={ priority } onChange={ (e) => setPriority(e.target.value as TIssuePriority) } name="priority">
              <MenuItem value="low">Low</MenuItem>
              <MenuItem value="middle">Middle</MenuItem>
              <MenuItem value="hight">Hight</MenuItem>
            </Select>
          </FormControl>
        </label>

        <DialogActions className="CreateIssuePopup__btns">
          <Button onClick={ updateIssue } variant="contained" color="primary" size="large">Confirm</Button>
          <Button onClick={ () => onChangePopupState(false) } variant="outlined" color="primary" size="large">Cancel</Button>
        </DialogActions>
      </form>
    </PopUpLinearProgress>
  );
};
