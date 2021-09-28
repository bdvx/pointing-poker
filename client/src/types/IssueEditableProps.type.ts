import { IssueModel } from '../serverService/models/issueModel';

export default interface IIssueEditableProps extends IssueModel {
  onUpdateIssue: (issue: IssueModel) => void;
  onDeleteIssue: () => void;
};