import { IssueModel } from '../serverService/models/issueModel';

export default interface IIssueEditableProps extends IssueModel {
  onDeleteIssue: () => void;
};