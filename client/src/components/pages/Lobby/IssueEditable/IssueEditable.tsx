import './IssueEditable.scss';
import { Issue } from '../../../Base/Issue/Issue';
import { IconButton } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import IIssueEditableProps from '../../../../types/IssueEditableProps.type';
import { useState } from 'react';
import { UpdateIssuePopup } from '../../../UpdateIssuePopup/UpdateIssuePopup';

export const IssueEditable = (props: IIssueEditableProps) => {
  const { title, priority, link, onDeleteIssue, onUpdateIssue } = props;
  const [openPopup, setOpenPopup] = useState<boolean>(false);

  return (
    <Issue classes="IssueEditable">
      <div className="Issue__info">
        <a className="Issue__title" href={ link } target="_blank">{ title }</a>
        <span className="Issue__priority">{ priority }</span>
      </div>

      <div className="Issue__btns">
        <IconButton onClick={ () => setOpenPopup(true) }>
          <EditIcon />
        </IconButton>
        <IconButton onClick={ onDeleteIssue }>
          <DeleteIcon />
        </IconButton>
      </div>

      <UpdateIssuePopup open={ openPopup } onChangePopupState={ (open) => setOpenPopup(open) } issue={ props } onUpdateIssue={ onUpdateIssue } />
    </Issue>
  );
};
