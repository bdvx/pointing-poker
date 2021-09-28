import { IssueModel } from '../serverService/models/issueModel';

export default interface IUpdateIssuePopupProps {
  open: boolean;
  onChangePopupState: (open: boolean) => void;
  issue: IssueModel;
  onUpdateIssue: (issue: IssueModel) => void;
};