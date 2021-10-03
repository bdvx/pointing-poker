import { IssueModel } from "../../../../serverService/models/issueModel";
import { Issue } from "../../../Base/Issue/Issue";

const IssueNonEdiitable = (props: IssueModel) => {
  const { title, priority, link, id } = props;
  return (
    <Issue classes="IssueEditable">
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
