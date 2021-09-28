import { IssueModel } from '../serverService/models/issueModel';

export default interface ICreateIssuePopupProps {
  open: boolean;
  onChangePopupState: (open: boolean) => void;
  onCreateIssue: (issue: IssueModel) => void;
};