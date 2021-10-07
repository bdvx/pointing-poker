import { IssueModel } from '../serverService/models/issueModel';

export default interface ICreateIssueProps {
  onAddIssue: (issue: IssueModel) => void;
};