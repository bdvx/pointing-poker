import { IssueModel } from "../../../../serverService/models/issueModel";
import { Issue } from "../../../Base/Issue/Issue";
import './IssueNonEditable.scss'

const IssueNonEdiitable = (props: IssueModel) => {
  const { title, priority, link, id } = props;
  return (
    <Issue classes="IssueEditable IssueNonEditable">
      <div className="Issue__info">
        <a className="Issue__title" href={link} target="_blank">
          {title}
        </a>
        <span className="Issue__priority">{priority}</span>
      </div>
    </Issue>
  );
};

export default IssueNonEdiitable;
