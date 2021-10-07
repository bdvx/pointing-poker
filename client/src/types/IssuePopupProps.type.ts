import { IssueModel } from '../serverService/models/issueModel';

export default interface IIssuePopupProps {
  classes: string;
  open: boolean;
  onChangePopupState: (open: boolean) => void;
  issue: IssueModel;
};