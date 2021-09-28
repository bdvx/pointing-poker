import './UpdateIssuePopup.scss';
import { FC } from 'react';
import { IssuePopup } from '../Base/IssuePopup/IssuePopup';
import IUpdateIssuePopupProps from '../../types/UpdateIssuePopupProps.type';

export const UpdateIssuePopup: FC<IUpdateIssuePopupProps> = (props: IUpdateIssuePopupProps) => {
  return (
    <IssuePopup classes="UpdateIssuePopup" onHandleIssue={ props.onUpdateIssue } { ...props } />
  );
};
