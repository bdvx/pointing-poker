import './CreateIssuePopup.scss';
import { FC } from 'react';
import { IssuePopup } from '../Base/IssuePopup/IssuePopup';
import ICreateIssuePopupProps from '../../types/CreateIssuePopupProps.type';
import { ISSUE_DEFAULT_VALUES } from '../../constants';

export const CreateIssuePopup: FC<ICreateIssuePopupProps> = (props: ICreateIssuePopupProps) => {
  return (
    <IssuePopup classes="CreateIssuePopup" issue={ ISSUE_DEFAULT_VALUES } onHandleIssue={ props.onCreateIssue } { ...props } />
  );
};
