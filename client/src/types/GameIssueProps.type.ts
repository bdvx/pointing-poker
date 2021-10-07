import { IssueModel } from '../serverService/models/issueModel';

export default interface IGameIssueProps extends IssueModel {
  score?: number;
  isActive: boolean;
  isVoting: boolean;
};