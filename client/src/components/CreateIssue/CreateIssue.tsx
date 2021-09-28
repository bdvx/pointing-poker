import './CreateIssue.scss';
import { FC, useState } from 'react';
import { Issue } from '../Base/Issue/Issue';
import { IconButton } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { CreateIssuePopup } from '../CreateIssuePopup/CreateIssuePopup';
import ICreateIssueProps from '../../types/CreateIssueProps.type';

export const CreateIssue: FC<ICreateIssueProps> = ({ onAddIssue }: ICreateIssueProps) => {
  const [openPopup, setOpenPopup] = useState<boolean>(false);
  
  return (
    <Issue classes="CreateIssue">
      <div className="Issue__info">
        <h4 className="Issue__title">Crete new Issue</h4>
      </div>

      <IconButton onClick={ () => setOpenPopup(true) }>
        <AddIcon />
      </IconButton>

      <CreateIssuePopup open={ openPopup } onChangePopupState={ (open) => setOpenPopup(open) } onCreateIssue={ onAddIssue } />
    </Issue>
  );
};
