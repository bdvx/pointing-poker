import './CreateIssuePopup.scss';
import { FC, useState } from 'react';
import { Button, DialogActions, FormControl, MenuItem, Select, TextField } from '@material-ui/core';
import { PopUpLinearProgress } from '../Base/PopUpLinearProgress/PopUpLinearProgress';
import ICreateIssuePopupProps from '../../types/CreateIssuePopupProps.type';
import { TIssuePriority } from '../../types/IssuePriority.type';
import ServerService from '../../serverService/serverService';
import { hashCode } from '../../tool/hashFunction';

export const CreateIssuePopup: FC<ICreateIssuePopupProps> = (props: ICreateIssuePopupProps) => {
  const { open, onChangePopupState } = props;
  const [loading, setLoading] = useState<boolean>(false);

  const [title, setTitle] = useState<string>('');
  const [link, setLink] = useState<string>('');
  const [priority, setPriority] = useState<TIssuePriority>('low');

  const resetFields = (): void => {
    setTitle('');
    setLink('');
    setPriority('low');
  }

  const addNewIssue = (): void => {
    setLoading(true);

    ServerService.makeIssue({ title, priority, link, id: String(hashCode(title) + Date.now()) });

    setLoading(false);
    onChangePopupState(false);
    resetFields();
  };

  return (
    <PopUpLinearProgress className="CreateIssuePopup" open={ open } onClose={ () => onChangePopupState(false) } loading={ loading }>
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
          <Button onClick={ addNewIssue } variant="contained" color="primary" size="large">Confirm</Button>
          <Button onClick={ () => onChangePopupState(false) } variant="outlined" color="primary" size="large">Cancel</Button>
        </DialogActions>
      </form>
    </PopUpLinearProgress>
  );
};
