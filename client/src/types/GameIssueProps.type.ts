import { IssueModel } from '../serverService/models/issueModel';

export default interface IGameIssueProps extends IssueModel {
  estimate?: string;
};