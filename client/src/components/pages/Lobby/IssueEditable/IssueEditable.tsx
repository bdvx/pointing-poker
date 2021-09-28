import './IssueEditable.scss';
import { Issue } from '../../../Base/Issue/Issue';
import { IconButton } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { IssueModel } from '../../../../serverService/models/issueModel';

export const IssueEditable = (props: IssueModel) => {
  const { title, priority, link } = props;

  return (
    <Issue classes="IssueEditable">
      <div className="Issue__info">
        <a className="Issue__title" href={ link } target="_blank">{ title }</a>
        <span className="Issue__priority">{ priority }</span>
      </div>

      <div className="Issue__btns">
        <IconButton>
          <EditIcon />
        </IconButton>
        <IconButton>
          <DeleteIcon />
        </IconButton>
      </div>
    </Issue>
  );
};
