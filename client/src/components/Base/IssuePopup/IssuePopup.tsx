import './IssuePopup.scss';
import { FC, useState } from 'react';
import { Button, DialogActions, FormControl, MenuItem, Select, TextField } from '@material-ui/core';
import { PopUpLinearProgress } from '../PopUpLinearProgress/PopUpLinearProgress';
import { TIssuePriority } from '../../../types/IssuePriority.type';
import IIssuePopupProps from '../../../types/IssuePopupProps.type';

export const IssuePopup: FC<IIssuePopupProps> = (props: IIssuePopupProps) => {
  const { classes, open, onChangePopupState, issue, onHandleIssue } = props;
  const [loading, setLoading] = useState<boolean>(false);

  const [title, setTitle] = useState<string>(issue.title);
  const [link, setLink] = useState<string>(issue.link);
  const [priority, setPriority] = useState<TIssuePriority>(issue.priority as TIssuePriority);

  const resetFields = (): void => {
    setTitle('');
    setLink('');
    setPriority('low');
  }

  const handleIssue = (): void => {
    setLoading(true);

    onHandleIssue({ title, priority, link, id: issue.id || title });

    setLoading(false);
    onChangePopupState(false);

    if (classes === 'CreateIssuePopup') {
      resetFields();
    }
  };

  return (
    <PopUpLinearProgress className={ `${ classes } IssuePopup` } open={ open } onClose={ () => onChangePopupState(false) } loading={ loading }>
      <form>
        <h3 className="IssuePopup__title">
          { classes === 'CreateIssuePopup' ? 'Create Issue' : 'Update Issue' }
        </h3>

        <label className="IssuePopup__box">
          <span className="IssuePopup__boxTitle">Title:</span>
          <TextField
            className="IssuePopup__field"
            defaultValue={ title }
            onChange={ (e) => setTitle(e.target.value) }
            name="title"
            variant="outlined"
            size="small"
          />
        </label>

        <label className="IssuePopup__box">
          <span className="IssuePopup__boxTitle">Link:</span>
          <TextField
            className="IssuePopup__field"
            defaultValue={ link }
            onChange={ (e) => setLink(e.target.value) }
            name="link"
            variant="outlined"
            size="small"
          />
        </label>

        <label className="IssuePopup__box">
          <span className="IssuePopup__boxTitle">Priority:</span>

          <FormControl>
            <Select className="IssuePopup__select" value={ priority } onChange={ (e) => setPriority(e.target.value as TIssuePriority) } name="priority">
              <MenuItem value="low">Low</MenuItem>
              <MenuItem value="middle">Middle</MenuItem>
              <MenuItem value="hight">Hight</MenuItem>
            </Select>
          </FormControl>
        </label>

        <DialogActions className="IssuePopup__btns">
          <Button onClick={ handleIssue } variant="contained" color="primary" size="large">Confirm</Button>
          <Button onClick={ () => onChangePopupState(false) } variant="outlined" color="primary" size="large">Cancel</Button>
        </DialogActions>
      </form>
    </PopUpLinearProgress>
  );
};
