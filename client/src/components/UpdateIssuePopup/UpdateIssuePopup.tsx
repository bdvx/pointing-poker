import './UpdateIssuePopup.scss';
import { FC, useState } from 'react';
import { IssuePopup } from '../Base/IssuePopup/IssuePopup';
import IUpdateIssuePopupProps from '../../types/UpdateIssuePopupProps.type';
import ServerService from '../../serverService/serverService';
import { TIssuePriority } from '../../types/IssuePriority.type';

export const UpdateIssuePopup: FC<IUpdateIssuePopupProps> = (props: IUpdateIssuePopupProps) => {

  const { open, onChangePopupState, issue } = props;
  const [loading, setLoading] = useState<boolean>(false);

  const [title, setTitle] = useState<string>(issue.title);
  const [link, setLink] = useState<string>(issue.link);
  const [priority, setPriority] = useState<TIssuePriority>(issue.priority as TIssuePriority);

  const updateIssue = (): void => {
    setLoading(true);

    ServerService.updateIssue({ ...issue, title, priority, link })

    setLoading(false);
    onChangePopupState(false);
  };

  return (
    <IssuePopup classes="UpdateIssuePopup" onHandleIssue={ updateIssue } { ...props } />
  );
};
